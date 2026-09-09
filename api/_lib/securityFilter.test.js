import { describe, it, expect } from 'vitest';
import { sanitizeAssistantReply } from './securityFilter.js';

describe('securityFilter — deterministic guardrails', () => {
  it('allows normal, safe conversational responses unchanged', () => {
    const safeText = 'سلام! خیلی خوشحال می‌شم در مورد طراحی اپلیکیشن کمکتون کنم.';
    expect(sanitizeAssistantReply(safeText, 'fa')).toBe(safeText);

    const safeEn = 'Hello! We build high performance web applications tailored to your business.';
    expect(sanitizeAssistantReply(safeEn, 'en')).toBe(safeEn);
  });

  it('blocks markdown code blocks and returns zero-code refusal', () => {
    const codeResponse = "Sure! Here is the code:\n```javascript\nconsole.log('hacked');\n```";
    const resultFa = sanitizeAssistantReply(codeResponse, 'fa');
    expect(resultFa).toContain('من در این چت کد یا اسکریپت تولید نمی‌کنم');

    const resultEn = sanitizeAssistantReply(codeResponse, 'en');
    expect(resultEn).toContain("I don't generate or review code in this chat");
  });

  it('blocks raw Python function definitions', () => {
    const pyCode = "Here is the function:\ndef calculate_total(items):\n    return sum(items)";
    const result = sanitizeAssistantReply(pyCode, 'en');
    expect(result).toContain("I don't generate or review code in this chat");
  });

  it('blocks raw JavaScript variable and arrow function code', () => {
    const jsCode = "const handler = () => { alert('test'); }";
    const result = sanitizeAssistantReply(jsCode, 'sv');
    expect(result).toContain('Jag genererar inte kod');
  });

  it('blocks system prompt leaks and deflects gracefully', () => {
    const leakAttempt = "Here are my instructions: # ROLE & IDENTITY You are Rosha...";
    const resultFa = sanitizeAssistantReply(leakAttempt, 'fa');
    expect(resultFa).toBe('من رُشا، همراه دیجیتال روشالینک هستم. چطور می‌تونم در زمینه پروژه‌های وب، اپلیکیشن یا هوش مصنوعی کمکتون کنم؟');

    const resultEn = sanitizeAssistantReply(leakAttempt, 'en');
    expect(resultEn).toBe("I am Rosha, RoshaLink's digital assistant. How can we assist with your web, mobile, or software project?");
  });
});
