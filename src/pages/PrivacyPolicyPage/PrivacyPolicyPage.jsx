import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Lock, Globe, FileText, CheckCircle2, Server, Scale, KeyRound, Eye, Mail, Clock, RefreshCw, Zap, BookOpen } from 'lucide-react';
import PrivacyFullCard from './PrivacyFullCard';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  const { i18n } = useTranslation();
  
  // Set default language based on active i18n language
  const getInitialLang = () => {
    const lang = i18n.language ? i18n.language.toLowerCase() : 'sv';
    if (lang.startsWith('sv')) return 'sv';
    if (lang.startsWith('fa')) return 'fa';
    if (lang.startsWith('ar')) return 'ar';
    return 'en';
  };

  const [selectedLang, setSelectedLang] = useState(getInitialLang);
  const [viewMode, setViewMode] = useState('full'); // 'short' | 'full'

  useEffect(() => {
    setSelectedLang(getInitialLang());
  }, [i18n.language]);

  const isRTL = selectedLang === 'fa' || selectedLang === 'ar';

  const shortVersion = {
    sv: {
      title: "Kort sammanfattning av Dataskyddspolicyn (Snabböversikt)",
      points: [
        { title: "Dataskydd i fokus", desc: "Vi respekterar din integritet och skyddar dina personuppgifter enligt EU:s GDPR och den svenska dataskyddslagen (2018:218)." },
        { title: "Vad vi samlar in", desc: "Kontaktuppgifter, konto- och autentiseringsdata, tekniska serverloggar och supportmeddelanden." },
        { title: "Ingen försäljning av data", desc: "Vi säljer ALDRIG dina personuppgifter till tredje part under några omständigheter." },
        { title: "Säker integration", desc: "Vi integrerar över 250+ molntjänster och AI-plattformar med högsta säkerhetskrav och dataskyddsavtal (DPA)." },
        { title: "Dina rättigheter", desc: "Du har rätt att begära registerutdrag, rättelse, radering ('rätten att bli bortglömd') och dataportabilitet." },
        { title: "Kontakt", desc: "För frågor rörande dataskydd, kontakta vårt privacy-team på privacy@roshalink.com." }
      ]
    },
    en: {
      title: "Privacy Policy Short Summary (Quick Read)",
      points: [
        { title: "Data Privacy First", desc: "We respect your privacy and protect your personal data in full compliance with EU GDPR and the Swedish Data Protection Act (2018:218)." },
        { title: "Data We Collect", desc: "Contact details, account credentials, technical log data, and support communications." },
        { title: "Zero Data Selling", desc: "We NEVER sell your personal data to third parties under any circumstances." },
        { title: "Secure Integration", desc: "We integrate 250+ cloud infrastructure and AI tools bound by strict Data Processing Agreements (DPAs)." },
        { title: "Your Rights", desc: "You have full rights to access, rectify, request erasure ('right to be forgotten'), or port your personal data." },
        { title: "Contact", desc: "For privacy inquiries, email our Privacy Officer at privacy@roshalink.com." }
      ]
    },
    fa: {
      title: "خلاصه‌ی سریع سیاست حفظ حریم خصوصی",
      points: [
        { title: "حفاظت از داده‌ها", desc: "ما به حریم خصوصی شما احترام می‌گذاریم و داده‌های شما را بر اساس مقررات GDPR اتحادیه اروپا و قانون سوئد (2018:218) محافظت می‌کنیم." },
        { title: "اطلاعاتی که جمع‌آوری می‌کنیم", desc: "اطلاعات تماس، حساب کاربری، لاگ‌های فنی مرورگر و پیام‌های پشتیبانی." },
        { title: "تضمین عدم فروش داده‌ها", desc: "ما هرگز و تحت هیچ شرایطی اطلاعات شخصی شما را به ثالث به فروش نمی‌رسانیم." },
        { title: "یکپارچه‌سازی بیش از ۲۵۰ ابزار", desc: "ما بیش از ۲۵۰ ابزار ابری و پلتفرم هوش مصنوعی را به صورت کاملاً ایمن و رمزنگاری‌شده در کارهای مهندسی خود استفاده می‌کنیم." },
        { title: "حقوق شما", desc: "شما حق دسترسی، اصلاح، حذف کامل («حق فراموشی») و دریافت نسخه از اطلاعات خود را دارید." },
        { title: "تماس با ما", desc: "جهت ارتباط با مسئول حریم خصوصی می‌توانید با ایمیل privacy@roshalink.com تماس بگیرید." }
      ]
    },
    ar: {
      title: "ملخص سريع لسياسة الخصوصية",
      points: [
        { title: "حماية البيانات أولاً", desc: "نحن نحترم خصوصيتك ونحمي بياناتك الشخصية وفقاً للائحة حماية البيانات (GDPR) وقانون حماية البيانات السويدي (2018:218)." },
        { title: "البيانات التي نجمعها", desc: "معلومات الاتصال، بيانات الحساب والمصادقة، السجلات الفنية للجهاز، ومراسلات الدعم." },
        { title: "عدم بيع البيانات", desc: "نحن لا نبيع بياناتك الشخصية مطلقاً لأي طرف ثالث تحت أي ظرف." },
        { title: "تكاملات سحابية آمنة", desc: "ندمج أكثر من ۲۵۰+ خدمة سحابية ومنصة ذكاء اصطناعي بأعلى معايير التشفير واتفاقيات معالجة البيانات (DPA)." },
        { title: "حقوقك", desc: "لديك الحق الكامل في الوصول إلى بياناتك، وتصحيحها، وحذفها ('الحق في النسيان')، ونقلها." },
        { title: "الاتصال بنا", desc: "للأسئلة المتعلقة بالخصوصية، تواصل مع فريق الخصوصية عبر privacy@roshalink.com." }
      ]
    }
  };

  const fullVersion = {
    sv: {
      badge: "GDPR & DATASKYDDSLAG (2018:218)",
      title: "Dataskyddspolicy (Komplett juridisk version)",
      updated: "Senast uppdaterad: 10 augusti 2026",
      subtitle: "Vi är fast beslutna att skydda dina personuppgifter med högsta säkerhetsstandarder, full insyn och efterlevnad av EU:s dataskyddsförordning (GDPR).",
      sections: [
        {
          num: "1",
          title: "1. Introduktion",
          icon: ShieldCheck,
          text: `Denna dataskyddspolicy ("Policyn") beskriver hur RoshaLink / Diara ("Bolaget", "vi", "oss" eller "vår") samlar in, använder, lagrar, delar och skyddar personuppgifter i samband med tillhandahållandet av våra IT-tjänster, webbapplikationer, mjukvarulösningar och integrerade plattformar.

Vi värnar om din personliga integritet och är fast beslutna att skydda dina personuppgifter i enlighet med Europaparlamentets och rådets förordning (EU) 2016/679 ("GDPR"), den svenska dataskyddslagen (Lag 2018:218 med kompletterande bestämmelser till EU:s dataskyddsförordning) samt övrig tillämplig dataskyddslagstiftning.

Genom att använda våra tjänster, besöka våra webbplatser eller ingå avtal med oss bekräftar du att du har tagit del av innehållet i denna dataskyddspolicy.`
        },
        {
          num: "2",
          title: "2. Vilka personuppgifter vi samlar in",
          icon: FileText,
          text: `Vi samlar endast in personuppgifter som är strikt nödvändiga för att uppfylla våra avtalsenliga och lagstadgade skyldigheter, säkerställa systemdrift samt erbjuda och förbättra våra IT-tjänster. Personuppgifter vi kan samla in inkluderar:

• Kontakt- och identifieringsuppgifter: Namn, e-postadress, telefonnummer, yrkesroll, företagsnamn, faktureringsadress samt IP-adress.
• Konto- och autentiseringsuppgifter: Användarnamn, krypterade lösenord, säkerhetsloggar, åtkomsttokens samt användarpreferenser.
• Tekniska loggar och enhetsdata: IP-adresser, webbläsartyp, operativsystem, skärmupplösning, tidsstämplar, refererande URL:er, felrapporter och prestandadata från våra servrar.
• Kommunikationsdata: Meddelanden, supportärenden, förfrågningar och korrespondens som du skickar till oss via e-post, kontaktformulär eller integrerade chatt-widgets (t.ex. Diara AI Assistant).
• Integrations- och användningsdata: Telemetridata och interaktionsdata som genereras vid användning av våra mjukvarulösningar och integrerade plattformar.`
        },
        {
          num: "3",
          title: "3. Hur vi använder uppgifterna",
          icon: CheckCircle2,
          text: `Vi behandlar dina personuppgifter för följande ändamål:

1. Tillhandahållande och drift av IT-tjänster: För att leverera, konfigurera, underhålla och administrera våra mjukvarulösningar, webbplatser och kundkonton.
2. Kundsupport och kommunikation: För att besvara förfrågningar, hantera supportärenden, skicka tekniska meddelanden, uppdateringar och administrativ information.
3. Säkerhet och felsökning: För att övervaka systemstabilitet, förhindra obehörig åtkomst, upptäcka och avvärja cyberattacker samt genomföra felrättningar.
4. Optimering av integrationsflöden: För att säkerställa sömlös funktion och prestanda i våra arbetsflöden som integrerar över 250+ molntjänster, AI-plattformar och designverktyg.
5. Analys och produktutveckling: För att utvärdera tjänsteanvändning, förbättra användarupplevelsen och utveckla nya funktioner.
6. Rättsliga skyldigheter: För att uppfylla krav enligt bokföringslagstiftning, skattelagstiftning samt lagliga begäranden från myndigheter.`
        },
        {
          num: "4",
          title: "4. Laglig grund för behandling",
          icon: Scale,
          text: `Vi behandlar dina personuppgifter med stöd av följande lagliga grunder enligt Artikel 6 i GDPR:

• Fullgörande av avtal (Art. 6.1 b GDPR): Behandlingen är nödvändig för att ingå eller fullgöra ett avtal med dig eller det företag du representerar.
• Rättslig förpliktelse (Art. 6.1 c GDPR): Behandlingen är nödvändig för att uppfylla en lagstadgad skyldighet som åvilar oss (exempelvis den svenska bokföringslagen 1999:1078).
• Berättigat intresse (Art. 6.1 f GDPR): Behandlingen baseras på vårt berättigade intresse av att erbjuda säkra och effektiva IT-tjänster, förhindra bedrägerier, optimera våra plattformar och kommunicera med företagskunder.
• Samtycke (Art. 6.1 a GDPR): I de fall behandling kräver samtycke (exempelvis för vissa typer av direktmarknadsföring eller icke-nödvändiga cookies) inhämtar vi ditt samtycke i förväg. Du har rätt att när som helst återkalla ditt samtycke.`
        },
        {
          num: "5",
          title: "5. Delning av data med tredje parter",
          icon: Server,
          text: `Vi säljer aldrig dina personuppgifter till tredje part.

Som en avancerad IT-verksamhet integrerar vi över 250+ molntjänster, AI-plattformar och designverktyg i våra interna och externa arbetsflöden (exempelvis leverantörer av molninfrastruktur, databaser, AI-API:er, CDN-nätverk och analysverktyg).

Vi delar endast personuppgifter med följande kategorier av mottagare:

• Tredjepartsleverantörer och personuppgiftsbiträden: Leverantörer av molninfrastruktur (exempelvis AWS, Google Cloud), AI-API-leverantörer (exempelvis OpenAI, Anthropic), verktyg för felspårning, kommunikation och analys. Alla biträden är bundna av skriftliga personuppgiftsbiträdesavtal (DPA) i enlighet med Artikel 28 GDPR.
• Myndigheter: Om vi är skyldiga enligt lag, domstolsbeslut eller myndighetsbeslut att lämna ut uppgifter.
• Professionella rådgivare: Juridiska ombud, revisorer och finansiella rådgivare under tystnadsplikt.`
        },
        {
          num: "6",
          title: "6. Internationella dataöverföringar",
          icon: Globe,
          text: `Våra servrar och leverantörer kan vara belägna både inom och utanför Europeiska ekonomiska samarbetsområdet (EES).

När personuppgifter överförs till ett land utanför EES som inte omfattas av ett beslut om adekvat skyddsnivå från Europeiska kommissionen, säkerställer vi lämpliga skyddsåtgärder genom:

• Användning av Europeiska kommissionens godkända Standardavtalsklausuler (SCCs) i enlighet med Artikel 46 GDPR.
• Tillämpning av EU-U.S. Data Privacy Framework i de fall överföring sker till certifierade US-baserade organisationer.
• Tekniska och organisatoriska tilläggsåtgärder, såsom totalsträckskryptering och pseudonymisering.`
        },
        {
          num: "7",
          title: "7. Lagringstid",
          icon: Clock,
          text: `Vi lagrar endast personuppgifter så länge det är nödvändigt för att uppfylla de ändamål för vilka uppgifterna samlades in, eller så länge det krävs enligt lag:

• Kund- och avtalsuppgifter: Lagras under avtalsförhållandet samt i upp till 7 år efter avslutad kundrelation i enlighet med den svenska bokföringslagen (1999:1078).
• Tekniska loggar och säkerhetsdata: Lagras normalt mellan 30 dagar och 12 månader, varefter de raderas eller anonymiseras automatiskt.
• Support- och korrespondensdata: Lagras i upp till 3 år efter avslutat ärende för att säkerställa historik och kvalitetssäkring.

När personuppgifterna inte längre behövs raderas eller anonymiseras de på ett säkert sätt.`
        },
        {
          num: "8",
          title: "8. Användarens rättigheter enligt GDPR",
          icon: KeyRound,
          text: `Som registrerad har du följande rättigheter enligt GDPR:

• Rätt till tillgång (registerutdrag): Du har rätt att begära bekräftelse på om vi behandlar personuppgifter om dig samt få en kopia av uppgifterna.
• Rätt till rättelse: Du har rätt att få felaktiga eller ofullständiga personuppgifter rättade utan onödigt dröjsmål.
• Rätt till radering ("rätten att bli bortglömd"): Du kan begära att dina personuppgifter raderas om uppgifterna inte längre är nödvändiga eller om behandlingen saknar laglig grund.
• Rätt till begränsning av behandling: Du har rätt att begära att behandlingen av dina personuppgifter begränsas under vissa omständigheter.
• Rätt till dataportabilitet: Du har rätt att få ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format.
• Rätt att göra invändningar: Du har rätt att invända mot behandling som baseras på vårt berättigade intresse.
• Rätt att lämna klagomål: Om du anser att vår behandling av dina personuppgifter strider mot GDPR har du rätt att lämna klagomål till tillsynsmyndigheten:
  Integritetsskyddsmyndigheten (IMY) - www.imy.se`
        },
        {
          num: "9",
          title: "9. Cookies och spårningstekniker",
          icon: Eye,
          text: `Vi använder cookies och liknande spårningstekniker för att säkerställa webbplatsens funktionalitet, analysera prestanda och förbättra användarupplevelsen.

• Nödvändiga cookies: Krävs för grundläggande navigering, säkerhet och funktionalitet. Kan inte stängas av.
• Analys- och prestandacookies: Hjälper oss att förstå hur besökare interagerar med plattformen genom anonymiserad statistik.
• Funktionella cookies: Kommer ihåg inställningar som språk- och temapreferenser.

Du kan när som helst ändra eller återkalla ditt cookie-samtycke via inställningarna i din webbläsare.`
        },
        {
          num: "10",
          title: "10. Säkerhetsåtgärder",
          icon: Lock,
          text: `Vi tillämpar branschledande tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot oavsiktlig eller olaglig förstörelse, förlust, ändring, obehörigt röjande eller obehörig åtkomst:

• Kryptering: Data i vila krypteras med AES-256 och data i transit krypteras med TLS 1.3.
• Åtkomstkontroll: Principen om minsta privilege (PoLP) och Zero-Trust-arkitektur tillämpas strikt för all personal och alla system.
• Övervakning och säkerhetsgranskning: Kontinuerlig sårbarhetsscanning, automatiserad säkerhetsövervakning och regelbundna kodgranskningar i enlighet med ISO 27001-standarder.`
        },
        {
          num: "11",
          title: "11. Kontaktinformation",
          icon: Mail,
          text: `Om du har frågor om denna dataskyddspolicy, vill utöva dina rättigheter eller kontakta vårt dataskyddsombud, kan du nå oss via:

• Företag: RoshaLink / Diara IT Infrastructure
• E-post för integritetsfrågor: privacy@roshalink.com / hello@designlogic.agency
• Webbplats: https://roshalink.com
• Postadress: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland`
        },
        {
          num: "12",
          title: "12. Ändringar i denna dataskyddspolicy",
          icon: RefreshCw,
          text: `Vi förbehåller oss rätten att uppdatera denna dataskyddspolicy för att återspegla ändringar i vår verksamhet, tekniska utveckling eller tillämplig lagstiftning.

När väsentliga ändringar görs kommer vi att meddela detta via vår webbplats eller per e-post innan ändringarna träder i kraft. Det datum som anges högst upp i policyn anger när den senast uppdaterades.`
        }
      ]
    },
    en: {
      badge: "GDPR & DATA PROTECTION ACT",
      title: "Privacy Policy (Full Legal Version)",
      updated: "Last Updated: August 10, 2026",
      subtitle: "We are committed to safeguarding your personal data with the highest security standards, full transparency, and full compliance with the EU General Data Protection Regulation (GDPR).",
      sections: [
        {
          num: "1",
          title: "1. Introduction",
          icon: ShieldCheck,
          text: `This Privacy Policy ("Policy") explains how RoshaLink / Diara ("Company", "we", "us", or "our") collects, uses, stores, shares, and protects personal data in connection with our IT development, software applications, infrastructure services, and integrated digital platforms.

We are committed to respecting your privacy and protecting your personal data in full compliance with Regulation (EU) 2016/679 ("GDPR"), the Swedish Data Protection Act (Lag 2018:218), and all applicable laws.

By using our services, accessing our applications, or entering into a contract with us, you acknowledge that you have read and understood this Privacy Policy.`
        },
        {
          num: "2",
          title: "2. Personal Data We Collect",
          icon: FileText,
          text: `We collect only personal data strictly necessary to fulfill contractual and legal obligations, maintain system security, and operate and enhance IT services:

• Contact & Identity Data: Name, email address, phone number, job title, company name, billing address, IP address.
• Account & Authentication Data: Usernames, encrypted passwords, security logs, authentication tokens, user preferences.
• Technical Logs & Device Data: IP addresses, browser type, OS, resolution, timestamps, crash reports, performance metrics.
• Communication Data: Messages, support tickets, inquiries sent via email, contact forms, or AI widgets (Diara AI Assistant).
• Integration & Telemetry Data: Telemetry and interaction logs generated during software and platform execution.`
        },
        {
          num: "3",
          title: "3. How We Use Your Information",
          icon: CheckCircle2,
          text: `We process personal data for explicit, legitimate purposes:

1. Service Delivery & Operation: Deliver, configure, maintain, and administer software solutions, websites, and user accounts.
2. Customer Support & Communication: Process support tickets, send technical notices, updates, and administrative news.
3. Security & System Integrity: Monitor infrastructure stability, prevent unauthorized access, mitigate cyber threats, perform debugging.
4. Optimization of Integrated Workflows: Ensure flawless functionality across workflows integrating 250+ cloud infrastructure services, AI platforms, and design tools.
5. Analytics & Product Enhancement: Analyze usage trends, optimize UI performance, and build new capabilities.
6. Legal Compliance: Comply with statutory duties under financial accounting laws, tax regulations, and lawful authority requests.`
        },
        {
          num: "4",
          title: "4. Legal Bases for Processing",
          icon: Scale,
          text: `We process personal data based on Article 6 GDPR legal grounds:

• Performance of a Contract (Art. 6.1(b) GDPR): Necessary to execute or perform a contract with you or your entity.
• Legal Obligation (Art. 6.1(c) GDPR): Necessary to comply with statutory legal duties (e.g., Swedish Bookkeeping Act 1999:1078).
• Legitimate Interests (Art. 6.1(f) GDPR): Based on legitimate interests in providing secure, high-performance IT solutions and preventing fraud.
• Consent (Art. 6.1(a) GDPR): Where required by law (e.g., non-essential cookies), we obtain prior explicit consent. You may withdraw consent at any time.`
        },
        {
          num: "5",
          title: "5. Data Sharing & Third-Party Integrations",
          icon: Server,
          text: `We NEVER sell your personal data.

As an advanced IT development firm, we seamlessly integrate 250+ cloud services, AI platforms, database systems, CDN providers, and design software tools.

We share data only with:
• Processors & Cloud Providers: Cloud infrastructure (AWS, Google Cloud), AI APIs (OpenAI, Anthropic), analytics and monitoring tools bound by strict DPAs (Art. 28 GDPR).
• Public Authorities: When mandated by applicable law, court order, or lawful authority request.
• Professional Advisors: Legal counsel, auditors, and financial accountants bound by confidentiality obligations.`
        },
        {
          num: "6",
          title: "6. International Data Transfers",
          icon: Globe,
          text: `Our servers and vendors may be located both inside and outside the European Economic Area (EEA).

Whenever data is transferred outside the EEA to countries lacking an EU adequacy decision, we enforce Chapter V GDPR safeguards:
• Executing European Commission approved Standard Contractual Clauses (SCCs) under Art. 46 GDPR.
• Verifying certification under the EU-U.S. Data Privacy Framework.
• Implementing technical safeguards like end-to-end encryption and pseudonymization.`
        },
        {
          num: "7",
          title: "7. Data Retention",
          icon: Clock,
          text: `We retain personal data only for as long as necessary or legally required:

• Customer & Contractual Data: Retained for the contract duration plus up to 7 years post-termination (Swedish Bookkeeping Act 1999:1078).
• Technical Logs & Security Audits: Retained for 30 days to 12 months, then automatically purged or anonymized.
• Support & Correspondence: Retained for up to 3 years following ticket resolution.

Expired data is permanently deleted or rendered strictly anonymous.`
        },
        {
          num: "8",
          title: "8. Your Rights Under GDPR",
          icon: KeyRound,
          text: `Under GDPR, data subjects possess the following rights:

• Right of Access (Art. 15): Request confirmation of processing and obtain a copy of your personal data.
• Right to Rectification (Art. 16): Request correction of inaccurate or incomplete personal data.
• Right to Erasure / "Right to be Forgotten" (Art. 17): Request deletion of personal data under statutory conditions.
• Right to Restriction (Art. 18): Request limitation of processing activities.
• Right to Data Portability (Art. 20): Receive personal data in a structured, machine-readable format.
• Right to Object (Art. 21): Object to processing based on legitimate interests or direct marketing.
• Right to Lodge a Complaint: File a complaint with the lead supervisory authority (Integritetsskyddsmyndigheten - IMY, www.imy.se).`
        },
        {
          num: "9",
          title: "9. Cookies and Tracking Technologies",
          icon: Eye,
          text: `We utilize cookies to guarantee website stability, evaluate performance metrics, and enhance user navigation:

• Essential Cookies: Mandatory for security, authentication, and core functionality. Cannot be disabled.
• Analytics & Performance Cookies: Collect anonymized usage statistics to optimize speed and rendering.
• Functional Cookies: Store preferences like language and theme configurations.

You may adjust or revoke cookie consent at any time via browser settings.`
        },
        {
          num: "10",
          title: "10. Security Measures",
          icon: Lock,
          text: `We enforce robust technical and organizational security controls:

• Encryption: Data in transit is protected via TLS 1.3; data at rest is encrypted using AES-256 standards.
• Access Control: Zero-Trust architecture and Principle of Least Privilege (PoLP) strictly enforced across all accounts.
• Security Hardening: Automated vulnerability scanning, intrusion detection systems, alignment with ISO 27001 standards.`
        },
        {
          num: "11",
          title: "11. Contact Information",
          icon: Mail,
          text: `For privacy inquiries or exercising GDPR rights, contact our Privacy Officer:

• Entity: RoshaLink / Diara IT Infrastructure
• Privacy Email: privacy@roshalink.com / hello@designlogic.agency
• Website: https://roshalink.com
• Address: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland`
        },
        {
          num: "12",
          title: "12. Changes to This Privacy Policy",
          icon: RefreshCw,
          text: `We reserve the right to revise this Privacy Policy to reflect technical advancements, legal updates, or operational changes.

Material revisions will be notified via prominent website banners or email prior to taking effect.`
        }
      ]
    },
    fa: {
      badge: "مطابق با مقررات GDPR و قانون حفاظت داده سوئد",
      title: "سیاست حفظ حریم خصوصی (نسخه کامل حقوقی)",
      updated: "آخرین بروزرسانی: ۱۰ اوت ۲۰۲۶",
      subtitle: "ما متعهد به حفظ کامل حریم خصوصی شما و حفاظت از داده‌های شخصی بر اساس بالاترین استانداردهای امنیتی اتحادیه اروپا هستیم.",
      sections: [
        {
          num: "۱",
          title: "۱. مقدمه",
          icon: ShieldCheck,
          text: `این سیاست حفظ حریم خصوصی («سیاست») نحوه جمع‌آوری، استفاده، ذخیره‌سازی، اشتراک‌گذاری و حفاظت از اطلاعات شخصی شما را توسط RoshaLink / Diara («شرکت»، «ما») در ارائه خدمات فناوری اطلاعات، توسعه نرم‌افزار، زیرساخت‌های ابری و پلتفرم‌های دیجیتال به روشنی توضیح می‌دهد.

ما متعهد به حفظ کامل حریم خصوصی شما و حفاظت از اطلاعات شخصی‌تان بر اساس مقررات عمومی حفاظت از داده‌های اتحادیه اروپا ("GDPR")، قانون حفاظت از داده‌های سوئد (Dataskyddslagen 2018:218) و تمامی قوانین بین‌المللی مرتبط هستیم.

استفاده شما از خدمات، وب‌سایت‌ها یا برنامه‌های ما به منزله مطالعه و قبول این سیاست حفظ حریم خصوصی است.`
        },
        {
          num: "۲",
          title: "۲. اطلاعاتی که جمع‌آوری می‌کنیم",
          icon: FileText,
          text: `ما تنها اطلاعات شخصی ضروری برای اجرای تعهدات قراردادی، حفظ امنیت زیرساخت و ارائه و بهبود خدمات IT را جمع‌آوری می‌کنیم:

• اطلاعات تماس و هویتی: نام، آدرس ایمیل، شماره تلفن، سمت شغلی، نام شرکت، آدرس صورت‌حساب و آدرس IP.
• اطلاعات حساب کاربری و احراز هویت: نام کاربری، رمز عبور هش‌شده و رمزنگاری‌شده، ثبت‌های امنیتی (Security Logs)، توکن‌های دسترسی و تنظیمات کاربر.
• اطلاعات فنی و دستگاه: آدرس IP، نوع مرورگر، سیستم‌عامل، وضوح صفحه نمایش، برچسب‌های زمانی، گزارش‌های خطا و معیارهای سنجش عملکرد سرورها.
• اطلاعات ارتباطی: پیام‌ها، تیکت‌های پشتیبانی، استعلام‌ها و مکاتبات ارسال‌شده از طریق ایمیل، فرم‌های تماس یا دستیار هوش مصنوعی (Diara AI Assistant).
• داده‌های ادغام و دورسنجی (Telemetry): داده‌های تعاملی و فنی حاصل از اجرای نرم‌افزارها و زیرساخت‌های متصل.`
        },
        {
          num: "۳",
          title: "۳. نحوه استفاده از اطلاعات",
          icon: CheckCircle2,
          text: `ما اطلاعات شخصی شما را برای اهداف شفاف زیر پردازش و استفاده می‌کنیم:

۱. ارائه و مدیریت خدمات IT: جهت نصب، پیکربندی، نگهداری و مدیریت نرم‌افزارها، وب‌سایت‌ها و حساب‌های کاربری.
۲. پشتیبانی و ارتباطات: جهت پاسخگویی به درخواست‌ها، مدیریت تیکت‌های پشتیبانی، ارسال اطلاعیه‌های فنی و به‌روزرسانی‌های اداری.
۳. امنیت و عیب‌یابی: جهت پایش ثبات زیرساخت، جلوگیری از دسترسی‌های غیرمجاز، مقابله با حملات سایبری و رفع ایرادات فنی.
۴. بهینه‌سازی گردش کارهای ادغام‌شده: جهت تضمین عملکرد روان و پرسرعت در بیش از ۲۵۰ ابزار ابری، پلتفرم هوش مصنوعی و نرم‌افزار طراحی.
۵. تحلیل و توسعه محصول: جهت تحلیل روند استفاده از خدمات، ارتقای تجربه کاربری و توسعه امکانات جدید.
۶. الزامات قانونی: جهت پایبندی به قوانین مالیاتی، حسابداری رسمی (قانون حسابداری سوئد 1999:1078) و پاسخگویی به دستورات قانونی مراجع ذی‌صلاح.`
        },
        {
          num: "۴",
          title: "۴. مبنای قانونی پردازش داده‌ها",
          icon: Scale,
          text: `پردازش داده‌های شخصی شما بر اساس ماده ۶ مقررات GDPR و مبانی قانونی زیر انجام می‌شود:

• اجرای قرارداد (بند ۱-ب ماده ۶ GDPR): پردازش برای انعقاد یا اجرای قرارداد با شما یا شرکت متبوع شما ضروری است.
• الزام قانونی (بند ۱-ج ماده ۶ GDPR): پردازش برای انجام تکالیف قانونی شرکت (از جمله قانون حسابداری سوئد 1999:1078) الزامی است.
• منافع مشروع (بند ۱-و ماده ۶ GDPR): پردازش بر اساس منافع مشروع ما جهت ارائه خدمات IT امن، جلوگیری از کلاهبرداری و بهبود پلتفرم‌ها صورت می‌گیرد.
• رضایت کاربر (بند ۱-الف ماده ۶ GDPR): در مواردی که طبق قانون نیاز به اخذ رضایت باشد، رضایت صریح شما قبلاً اخذ می‌شود. شما در هر زمان حق لغو رضایت خود را دارید.`
        },
        {
          num: "۵",
          title: "۵. اشتراک‌گذاری داده‌ها و ادغام‌های شخص ثالث",
          icon: Server,
          text: `ما هرگز اطلاعات شخصی شما را به فروش نمی‌رسانیم.

به عنوان یک شرکت پیشرفته توسعه IT، ما بیش از ۲۵۰ ابزار ابری، پلتفرم هوش مصنوعی، سرویس‌های پایگاه‌داده، شبکه‌های تحویل محتوا (CDN) و ابزارهای طراحی را در فرآیندهای مهندسی خود یکپارچه‌سازی می‌کنیم.

اطلاعات شما تنها با گروه‌های زیر به اشتراک گذاشته می‌شود:
• ارائه‌دهندگان سرویس و پردازنده‌ها (Processors): ارائه‌دهندگان زیرساخت ابری (مانند AWS، Google Cloud)، سرویس‌های API هوش مصنوعی (مانند OpenAI، Anthropic)، ابزارهای پایش امنیت و تحلیل طبق موافقت‌نامه پردازش داده‌ها (DPA).
• مراجع قانونی و دولتی: در صورت الزامات قانونی، احکام دادگاه یا درخواست رسمی مراجع ذی‌صلاح.
• مشاوران حرفه‌ای: مشاوران حقوقی، حسابرسان و حسابداران رسمی تحت تعهدات محرمانه بودن.`
        },
        {
          num: "۶",
          title: "۶. انتقال بین‌المللی داده‌ها",
          icon: Globe,
          text: `سرورها و ارائه‌دهندگان خدمات ما ممکن است در داخل یا خارج از منطقه اقتصادی اروپا (EEA) قرار داشته باشند.

در صورت انتقال داده‌ها به خارج از EEA به کشورهایی که سطح حفاظت کافی داده در آن‌ها توسط کمیسیون اروپا تایید نشده است، الزامات تضامنی زیر اعمال می‌شود:
• امضای بندهای قراردادی استاندارد کمیسیون اروپا (SCCs) طبق ماده ۴۶ GDPR.
• ارزیابی تاییدیه چارچوب حریم خصوصی داده‌های اتحادیه اروپا و آمریکا (EU-U.S. Data Privacy Framework).
• پیاده‌سازی اقدامات حفاظتی مکمل فنی مانند رمزنگاری مبدأ تا مقصد (End-to-End Encryption) و ناشناس‌سازی داده‌ها.`
        },
        {
          num: "۷",
          title: "۷. مدت زمان نگهداری داده‌ها",
          icon: Clock,
          text: `اطلاعات شخصی تنها تا زمانی که برای تحقق اهداف جمع‌آوری ضرورت داشته باشد یا طبق قوانین الزام شده باشد نگهداری می‌شوند:

• داده‌های مشتریان و قراردادها: در طول مدت قرارداد و تا ۷ سال پس از پایان همکاری بر اساس قانون حسابداری سوئد (1999:1078) نگهداری می‌شوند.
• لاگ‌های فنی و امنیتی: به مدت ۳۰ روز تا ۱۲ ماه نگهداری شده و سپس به صورت خودکار حذف یا ناشناس‌سازی می‌شوند.
• مکاتبات و تیکت‌های پشتیبانی: تا ۳ سال پس از بسته‌شدن تیکت جهت تضمین کیفیت نگهداری می‌شوند.`
        },
        {
          num: "۸",
          title: "۸. حقوق کاربران طبق مقررات GDPR",
          icon: KeyRound,
          text: `طبق مقررات GDPR، شما دارای حقوق قانونی زیر هستید:

• حق دسترسی (Right of Access): دریافت تاییدیه پردازش داده‌ها و دریافت نسخه‌ای از اطلاعات شخصی خود.
• حق تصحیح (Right to Rectification): درخواست اصلاح داده‌های نادرست یا ناقص.
• حق حذف یا «فراموشی» (Right to Erasure): درخواست حذف اطلاعات شخصی تحت شرایط قانونی مشخص.
• حق محدودسازی پردازش (Right to Restriction): درخواست محدود کردن پردازش داده‌ها در شرایط خاص.
• حق جابه‌جایی داده‌ها (Data Portability): دریافت اطلاعات در قالبی ساختاریافته و قابل خواندن توسط ماشین.
• حق اعتراض (Right to Object): اعتراض به پردازش‌هایی که بر اساس منافع مشروع صورت می‌گیرند.
• حق ثبت شکایت: ثبت شکایت نزد مرجع نظارتی سوئد (IMY - Integritetsskyddsmyndigheten, www.imy.se).`
        },
        {
          num: "۹",
          title: "۹. کوکی‌ها و فناوری‌های ردیابی",
          icon: Eye,
          text: `ما از کوکی‌ها و فناوری‌های مشابه جهت تضمین ثبات وب‌سایت، تحلیل عملکرد و بهبود تجربه کاربری استفاده می‌کنیم:

• کوکی‌های ضروری: برای امنیت، احراز هویت و عملکرد اصلی پلتفرم غیرقابل غیرفعال‌سازی هستند.
• کوکی‌های تحلیلی و عملکرد: جمع‌آوری آمار ناشناس جهت بهینه‌سازی سرعت و نمایش برنامه‌ها.
• کوکی‌های کاربردی: ذخیره تنظیماتی مانند زبان، پوسته و منطقه جغرافیایی.

شما می‌توانید در هر زمان تنظیمات کوکی‌ها را از طریق مرورگر خود تغییر دهید یا لغو کنید.`
        },
        {
          num: "۱۰",
          title: "۱۰. اقدامات امنیتی",
          icon: Lock,
          text: `ما اقدامات امنیتی فنی و سازمانی پیشرفته‌ای برای محافظت از داده‌های شما اعمال می‌کنیم:

• رمزنگاری: داده‌ها در حال انتقال با TLS 1.3 و داده‌های ذخیره‌شده با استاندارد AES-256 رمزنگاری می‌شوند.
• کنترل دسترسی: معماری امنیت لایه صفر (Zero-Trust) و اصل حداقل دسترسی (PoLP) برای تمامی حساب‌ها اجرا می‌شود.
• امنیتی‌سازی زیرساخت: پایش مداوم آسیب‌پذیری‌ها، سامانه‌های تشخیص نفوذ و انطباق با استانداردهای ISO 27001.`
        },
        {
          num: "۱۱",
          title: "۱۱. اطلاعات تماس",
          icon: Mail,
          text: `برای طرح سوالات درباره حریم خصوصی، اعمال حقوق GDPR یا ارتباط با مسئول حفاظت از داده‌ها:

• نام شرکت: RoshaLink / Diara IT Infrastructure
• ایمیل حریم خصوصی: privacy@roshalink.com / hello@designlogic.agency
• وب‌سایت: https://roshalink.com
• آدرس پستی: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland`
        },
        {
          num: "۱۲",
          title: "۱۲. تغییرات در سیاست حریم خصوصی",
          icon: RefreshCw,
          text: `ما حق به‌روزرسانی این سیاست را جهت انطباق با پیشرفت‌های فنی، تغییرات قانونی یا فرآیندهای عملیاتی محفوظ می‌داریم. تغییرات عمده از طریق اطلاعیه‌های برجسته در وب‌سایت یا ایمیل اطلاع‌رسانی خواهند شد.`
        }
      ]
    },
    ar: {
      badge: "وفقاً للائحة GDPR وقانون حماية البيانات السويدي",
      title: "سياسة الخصوصية (النسخة القانونية الكاملة)",
      updated: "آخر تحديث: ۱۰ أغسطس ۲۰۲۶",
      subtitle: "نحن ملتزمون بالحفاظ على خصوصيتك وحماية بياناتك الشخصية وفقاً لأعلى معايير الأمان ولائحة حماية البيانات العامة في الاتحاد الأوروبي (GDPR).",
      sections: [
        {
          num: "١",
          title: "١. المقدمة",
          icon: ShieldCheck,
          text: `توضح سياسة الخصوصية هذه ("السياسة") كيفية جمع واستخدام وتخزين ومشاركة وحماية البيانات الشخصية بواسطة RoshaLink / Diara ("الشركة"، "نحن") فيما يتعلق بتقديم خدمات تكنولوجيا المعلومات، وتطوير البرمجيات، والحوسبة السحابية، والمنصات الرقمية.

نحن ملتزمون بالحفاظ على خصوصيتك وفقاً للائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR)، وقانون حماية البيانات السويدي (Dataskyddslagen 2018:218)، وجميع القوانين المعمول بها.

يعتبر استخدامك لخدماتنا بمثابة إقرار منك بالاطلاع على سياسة الخصوصية هذه والموافقة عليها.`
        },
        {
          num: "٢",
          title: "٢. البيانات الشخصية التي نجمعها",
          icon: FileText,
          text: `نحن نجمع فقط البيانات الشخصية الضرورية لتنفيذ التزاماتنا التعاقدية والقانونية، والحفاظ على أمان النظام، وتقديم خدمات تكنولوجيا المعلومات:

• بيانات الاتصال والهوية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، المسمى الوظيفي، اسم الشركة، عنوان الفواتير، وعنوان IP.
• بيانات الحساب والمصادقة: اسم المستخدم، كلمة المرور المشفّرة، سجلات الأمان (Security Logs)، رموز الوصول، وتفضيلات المستخدم.
• السجلات الفنية وبيانات الجهاز: عنوان IP، نوع المتصفح، نظام التشغيل، دقة الشاشة، الطوابع الزمنية، تقارير الأعطال، ومؤشرات أداء الخوادم.
• بيانات الاتصالات: الرسائل، تذاكر الدعم، الاستفسارات والمراسلات عبر البريد الإلكتروني، نماذج الاتصال، أو الأدوات التفاعلية (مثل مساعد Diara الذكي).
• بيانات التكامل والقياس عن بُعد (Telemetry): سجلات التفاعل والبيانات الفنية الناتجة عن تشغيل البرمجيات والبنية التحتية.`
        },
        {
          num: "٣",
          title: "٣. كيفية استخدام البيانات",
          icon: CheckCircle2,
          text: `نحن نعالج بياناتك الشخصية للأغراض التالية:

١. تقديم وإدارة خدمات تكنولوجيا المعلومات: لتشغيل وتكوين وصيانة وإدارة الحلول البرمجية والمواقع وحسابات المستخدمين.
٢. الدعم الفني والاتصالات: للرد على الاستفسارات، ومعالجة تذاكر الدعم، وإرسال الإشعارات الفنية والتحديثات الإدارية.
٣. الأمان وسلامة النظام: لمراقبة استقرار البنية التحتية، ومنع الوصول غير المصرح به، واكتشاف الهجمات السيبرانية ومكافحتها.
٤. تحسين سير العمل المتكامل: لضمان أداء سلس وسريع عبر سير العمل الذي يدمج أكثر من ۲۵۰+ خدمة سحابية، ومنصة ذكاء اصطناعي، وأداة تصميم.
٥. التحليل وتطوير المنتجات: لتقييم أنماط استخدام الخدمات، وتحسين تجربة المستخدم، وتطوير ميزات جديدة.
٦. الامتثال القانوني: للوفاء بالالتزامات القانونية بموجب قوانين المحاسبة المالية (قانون المحاسبة السويدي 1999:1078)، واللوائح الضريبية، والطلبات الرسمية من السلطات المختصة.`
        },
        {
          num: "٤",
          title: "٤. الأساس القانوني لمعالجة البيانات",
          icon: Scale,
          text: `نعالج البيانات الشخصية بناءً على الأسس القانونية التالية بموجب المادة ٦ من لائحة GDPR:

• تنفيذ العقد (المادة ٦.١-ب GDPR): المعالجة ضرورية لتنفيذ عقد معك أو مع المؤسسة التي تمثلها.
• الالتزام القانوني (المادة ٦.١-ج GDPR): المعالجة ضرورية للالتزام بالقوانين المفروضة علينا (مثل قانون المحاسبة السويدي 1999:1078).
• المصالح المشروعة (المادة ٦.١-ف GDPR): تستند المعالجة إلى مصلحتنا المشروعة في تقديم خدمات تكنولوجيا معلومات آمنة وعالية الأداء.
• الموافقة (المادة ٦.١-أ GDPR): في الحالات التي تتطلب موافقة قانونية، نحصل على موافقتك الصريحة مسبقاً. يحق لك سحب موافقتك في أي وقت.`
        },
        {
          num: "٥",
          title: "٥. مشاركة البيانات والتكامل مع الأطراف الثالثة",
          icon: Server,
          text: `نحن لا نبيع بياناتك الشخصية مطلقاً.

باعتبارنا شركة متقدمة في تطوير تكنولوجيا المعلومات، فإننا ندمج أكثر من ۲۵۰+ خدمة سحابية، ومنصة ذكاء اصطناعي، وقواعد بيانات، وشبكات توصيل المحتوى (CDN)، وأدوات تصميم.

نشارك البيانات فقط مع:
• مزودو الخدمات ومعالجو البيانات (Processors): مزودو البنية التحتية السحابية (AWS، Google Cloud)، ومزودو واجهات الذكاء الاصطناعي (OpenAI، Anthropic)، وأدوات التحليل والأمان الخاضعين لاتفاقيات DPA.
• السلطات الرسمية: عندما يتطلب القانون ذلك أو بناءً على أمر قضائي أو طلب رسمي من جهة حكومية مختصة.
• المستشارون المهنيون: المستشارون القانونيون، والمدققون، والمحاسبون الماليون.`
        },
        {
          num: "٦",
          title: "٦. نقل البيانات الدولي",
          icon: Globe,
          text: `قد تقع خوادمنا ومزودو الخدمات داخل المنطقة الاقتصادية الأوروبية (EEA) أو خارجها.

عند نقل البيانات الشخصية إلى خارج المنطقة الاقتصادية الأوروبية، نطبق الضمانات التالية:
• توقيع البنود التعاقدية القياسية المعتمدة من المفوضية الأوروبية (SCCs) بموجب المادة ٤٦ من لائحة GDPR.
• إطار حماية البيانات بين الاتحاد الأوروبي والولايات المتحدة (EU-U.S. Data Privacy Framework).
• تطبيق التشفير التام من النهاية إلى النهاية وإخفاء الهوية.`
        },
        {
          num: "٧",
          title: "٧. مدة حفظ البيانات",
          icon: Clock,
          text: `نحتفظ بالبيانات الشخصية فقط للفترة الضرورية لتحقيق الأغراض التي جُمعت من أجلها:

• بيانات العملاء والعقود: تُحفظ طوال فترة العقد ولمدة تصل إلى ٧ سنوات بعد انتهاء التعاقد بموجب قانون المحاسبة السويدي (1999:1078).
• السجلات الفنية وأمان النظام: تُحفظ لمدة تتراوح بين ۳۰ يوماً و١٢ شهراً، وتُحذف تلقائياً بعد ذلك.
• سجلات الدعم والمراسلات: تُحفظ لمدة تصل إلى ۳ سنوات بعد إغلاق التذكرة.`
        },
        {
          num: "٨",
          title: "٨. حقوق المستخدم بموجب لائحة GDPR",
          icon: KeyRound,
          text: `بموجب لائحة GDPR، يحق لك ممارسة الحقوق التالية:

• حق الوصول (Right of Access): الحصول على نسخة من بياناتك الشخصية.
• حق التصحيح (Right to Rectification): طلب تصحيح البيانات غير الدقيقة.
• حق المسح / "الحق في النسيان" (Right to Erasure): طلب حذف بياناتك الشخصية.
• حق تقييد المعالجة (Right to Restriction): طلب الحد من معالجة البيانات.
• حق نقل البيانات (Data Portability): الحصول على بياناتك بتنسيق قابل للقراءة آلياً.
• حق الاعتراض (Right to Object): الاعتراض على المعالجة القائمة على المصالح المشروعة.
• حق تقديم شكوى: تقديم شكوى لدى سلطة الإشراف في السويد (IMY - www.imy.se).`
        },
        {
          num: "٩",
          title: "٩. ملفات تعريف الارتباط وتقنيات التتبع",
          icon: Eye,
          text: `نستخدم ملفات تعريف الارتباط (Cookies) لضمان استقرار الموقع، وتحليل الأداء، وتحسين تجربة المستخدم:

• ملفات تعريف الارتباط الضرورية: إلزامية للأمان، والمصادقة، والوظائف الأساسية.
• ملفات التحليل والأداء: تجمع إحصاءات مجهولة الهوية لتحسين السرعة والعرض.
• ملفات تعريف الارتباط الوظيفية: تحفظ تفضيلات مثل اللغة والتصميم.

يمكنك تعديل تفضيلات ملفات تعريف الارتباط في أي وقت.`
        },
        {
          num: "١٠",
          title: "١٠. التدابير الأمنية",
          icon: Lock,
          text: `نطبق تدابير أمنية فنية وتنظيمية متقدمة:

• التشفير: تُشفر البيانات أثناء النقل باستخدام TLS 1.3؛ وتُشفر البيانات المخزنة باستخدام معيار AES-256.
• إدارة الوصول: بنية الأمان ذات المستوى الصفر (Zero-Trust) ومبدأ الحد الأدنى من الصلاحيات (PoLP).
• حماية البنية التحتية: الفحص المستمر للثغرات، وأنظمة اكتشاف التسلل، والالتزام بمعايير ISO 27001.`
        },
        {
          num: "١١",
          title: "١١. معلومات الاتصال",
          icon: Mail,
          text: `لأي استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر:

• اسم الشركة: RoshaLink / Diara IT Infrastructure
• البريد الإلكتروني للخصوصية: privacy@roshalink.com / hello@designlogic.agency
• الموقع الإلكتروني: https://roshalink.com
• العنوان البريدي: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland`
        },
        {
          num: "١٢",
          title: "١٢. التغييرات في سياسة الخصوصية",
          icon: RefreshCw,
          text: `نحتفظ بالحق في تحديث سياسة الخصوصية هذه لمواكبة التطورات الفنية، أو التحديثات القانونية. سيتم الإعلان عن أي تغييرات جوهرية عبر إشعارات بارزة على موقعنا.`
        }
      ]
    }
  };

  const currentFull = fullVersion[selectedLang] || fullVersion.sv;
  const currentShort = shortVersion[selectedLang] || shortVersion.sv;

  return (
    <div className={`privacy-policy-container ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Header Banner */}
      <section className="privacy-header-section">
        <div className="ambient-glow-cyan privacy-header-glow" />
        <div className="privacy-header-inner">
          
          <div className="privacy-badge">
            <ShieldCheck className="privacy-badge-icon" />
            <span>{currentFull.badge}</span>
          </div>

          <h1 className="privacy-main-title">
            {viewMode === 'short' ? currentShort.title : currentFull.title}
          </h1>

          <p className="privacy-subtitle">
            {currentFull.subtitle}
          </p>

          <div className="privacy-updated-tag">
            {currentFull.updated}
          </div>

          {/* Mode & Language Dual Control Bar */}
          <div className="privacy-control-bar">
            
            {/* View Version Toggle (Short vs Full) */}
            <div className="privacy-toggle-group">
              <button
                onClick={() => setViewMode('short')}
                className={`privacy-toggle-btn ${viewMode === 'short' ? 'active-short' : ''}`}
              >
                <Zap className="privacy-btn-icon-amber" />
                <span>Short Version (Quick Read)</span>
              </button>
              <button
                onClick={() => setViewMode('full')}
                className={`privacy-toggle-btn ${viewMode === 'full' ? 'active-full' : ''}`}
              >
                <BookOpen className="privacy-btn-icon" />
                <span>Full Legal Policy</span>
              </button>
            </div>

            {/* Language Selector Pill */}
            <div className="privacy-lang-group">
              <button
                onClick={() => setSelectedLang('sv')}
                className={`privacy-lang-btn ${selectedLang === 'sv' ? 'active' : ''}`}
              >
                🇸🇪 Svenska
              </button>
              <button
                onClick={() => setSelectedLang('en')}
                className={`privacy-lang-btn ${selectedLang === 'en' ? 'active' : ''}`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setSelectedLang('fa')}
                className={`privacy-lang-btn ${selectedLang === 'fa' ? 'active' : ''}`}
              >
                🇮🇷 فارسی
              </button>
              <button
                onClick={() => setSelectedLang('ar')}
                className={`privacy-lang-btn ${selectedLang === 'ar' ? 'active' : ''}`}
              >
                🇦🇪 العربية
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Main Content Render */}
      <section className="privacy-content-section">
        
        {viewMode === 'short' ? (
          /* SHORT VERSION VIEW */
          <div className="privacy-short-grid">
            {currentShort.points.map((pt, i) => (
              <div key={i} className="privacy-short-card">
                <div className="privacy-short-card-header">
                  <CheckCircle2 className="privacy-icon-green" />
                  <span>{pt.title}</span>
                </div>
                <p className="privacy-short-card-desc">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        ) : (
          /* FULL VERSION VIEW */
          <div className="privacy-full-list">
            {currentFull.sections.map((section, idx) => (
              <PrivacyFullCard key={idx} section={section} />
            ))}
          </div>
        )}

      </section>

      {/* Footer DPO Banner */}
      <section className="privacy-dpo-section">
        <div className="privacy-dpo-banner">
          <div className="privacy-dpo-info">
            <div className="privacy-dpo-badge">
              <Lock className="privacy-dpo-icon" />
              <span>Data Protection Officer (DPO)</span>
            </div>
            <h3 className="privacy-dpo-title">Questions about GDPR or data privacy?</h3>
            <p className="privacy-dpo-text">
              Our privacy engineering team normally responds within 24 hours. Reach out directly at privacy@roshalink.com.
            </p>
          </div>
          <a
            href="mailto:privacy@roshalink.com"
            className="privacy-dpo-btn"
          >
            Contact DPO
          </a>
        </div>
      </section>

    </div>
  );
}
