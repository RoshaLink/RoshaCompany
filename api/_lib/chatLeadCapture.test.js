import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  normalizeDigits,
  extractContactInfo,
  extractName,
  inferService,
  detectAndCaptureChatLead,
} from './chatLeadCapture.js';

describe('chatLeadCapture — utilities', () => {
  it('normalizes Persian and Arabic numerals to ASCII digits', () => {
    expect(normalizeDigits('۰۹۱۲۳۴۵۶۷۸۹')).toBe('09123456789');
    expect(normalizeDigits('٠٥٠١٢٣٤٥٦٧')).toBe('0501234567');
    expect(normalizeDigits('0701234567')).toBe('0701234567');
  });

  describe('extractContactInfo', () => {
    it('extracts standard email addresses', () => {
      const res = extractContactInfo('Please email me at sarah.connor@example.com for specs');
      expect(res).toEqual({ type: 'email', value: 'sarah.connor@example.com' });
    });

    it('extracts international phone numbers', () => {
      const res = extractContactInfo('You can call me on +46 70 123 4567 anytime');
      expect(res).not.toBeNull();
      expect(res.type).toBe('phone');
      expect(res.value.replace(/\D/g, '')).toBe('46701234567');
    });

    it('extracts Iranian phone numbers with Persian digits', () => {
      const res = extractContactInfo('شماره من ۰۹۱۲۳۴۵۶۷۸۹ است، تماس بگیرید');
      expect(res).not.toBeNull();
      expect(res.type).toBe('phone');
      expect(res.value.replace(/\D/g, '')).toBe('09123456789');
    });

    it('returns null when no contact info is present', () => {
      expect(extractContactInfo('What services do you offer?')).toBeNull();
      expect(extractContactInfo('')).toBeNull();
    });
  });

  describe('extractName', () => {
    it('extracts English names', () => {
      expect(extractName('Hi, my name is Alex Murphy')).toBe('Alex Murphy');
      expect(extractName("I'm Sarah Connor")).toBe('Sarah Connor');
    });

    it('extracts Swedish names', () => {
      expect(extractName('Hej, jag heter Johan Lindqvist')).toBe('Johan Lindqvist');
    });

    it('extracts Persian names', () => {
      expect(extractName('سلام من علی رضایی هستم')).toBe('علی رضایی');
    });

    it('returns null if no introduction pattern is found', () => {
      expect(extractName('We need a mobile app for our business')).toBeNull();
    });
  });

  describe('inferService', () => {
    it('detects Mobile Apps category', () => {
      expect(inferService('We need an iOS and Android app for our e-commerce store')).toBe(
        'E-commerce & Startup Mobile Apps'
      );
      expect(inferService('می‌خواهیم یک اپلیکیشن موبایل بسازیم')).toBe(
        'E-commerce & Startup Mobile Apps'
      );
    });

    it('detects Dashboards category', () => {
      expect(inferService('Can you build an internal admin dashboard and CRM?')).toBe(
        'Management Dashboards & Internal Platforms'
      );
      expect(inferService('نیاز به یک پنل مدیریت و داشبورد شرکتی داریم')).toBe(
        'Management Dashboards & Internal Platforms'
      );
    });

    it('detects AI Automation category', () => {
      expect(inferService('We want AI automation for customer support')).toBe(
        'AI Automation & Intelligent Workflows'
      );
      expect(inferService('سیستم خودکارسازی و هوش مصنوعی برای کسب‌وکار')).toBe(
        'AI Automation & Intelligent Workflows'
      );
    });

    it('detects Web Applications category', () => {
      expect(inferService('We need a high performance web application in React')).toBe(
        'Advanced Web Applications'
      );
    });

    it('defaults to general consultation', () => {
      expect(inferService('How does your team work?')).toBe('Consultation & Strategy');
    });
  });
});

describe('chatLeadCapture — dispatch', () => {
  beforeEach(() => {
    vi.stubEnv('BACKEND_API_URL', 'https://mock-backend.com');
    vi.stubEnv('RESEND_API_KEY', 'resend-test-key');
    vi.stubEnv('LEAD_TO_EMAIL', 'leads@roshalink.com');
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: true, status: 200, text: async () => '' }))
    );
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('captures lead and forwards to backend with source chat', async () => {
    const result = await detectAndCaptureChatLead({
      message: 'My name is John, contact me at john@example.com for a web app',
      history: [{ role: 'user', content: 'Do you build web apps?' }],
      uiLang: 'en',
      clientIp: '127.0.0.1',
    });

    expect(result.captured).toBe(true);
    expect(result.lead.email).toBe('john@example.com');
    expect(result.lead.name).toBe('John');
    expect(result.lead.source).toBe('chat');

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://mock-backend.com/api/lead',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
      })
    );
  });

  it('ignores messages without contact details', async () => {
    const result = await detectAndCaptureChatLead({
      message: 'Just looking around, thank you!',
      history: [],
      uiLang: 'en',
    });

    expect(result.captured).toBe(false);
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });
});
