import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  sv: {
    translation: {
      aboutPage: {
        teamPerspectives: {
          badge: "STRATEGISKA PERSPEKTIV & LEDARSKAP",
          title: "Vårt kärnteam driver företagsinnovation och tillväxt",
          titlePrefix: "Vårt kärnteam driver ",
          titleGradient: "företagsinnovation & tillväxt",
          titleSuffix: "",
          subtitle: "Upptäck hur våra 5 seniora partners konstruerar lösningar, eliminerar produktfriktion och garanterar mätbara resultat.",
          morteza: {
            quote: "Mjukvaruarkitektur måste tjäna affären och framtida intäkter. Vi eliminerar teknisk skuld från dag ett genom att bygga rena, skräddarsydda lösningar utan mallar.",
            name: "Morteza",
            role: "CEO & Huvudarkitekt"
          },
          bella: {
            quote: "Enastående UI/UX förenar teknisk precision med emotionell koppling, vilket mångdubblar konverteringsgraden och stärker ert varumärke.",
            name: "Bella",
            role: "Head of Product & Brand"
          },
          sohrab: {
            quote: "Distribuerade molnsystem med under 20 ms svarstid och 99,99 % upptid säkerställer att er plattform aldrig vacklar under maximal trafik.",
            name: "Sam",
            role: "Senior Full-Stack & Cloud Ingenjör"
          },
          mina: {
            quote: "Efter att ha varit konsult för globala jättar som Ericsson vet jag att rigorös affärsanalys före kodning sparar månader av onödigt omarbete.",
            name: "Mina",
            role: "Affärsanalytiker & Rådgivare"
          },
          milad: {
            quote: "Från avancerad databasoptimering till blixtsnabba gränssnitt – ren och skalbar kod är ryggraden i varje framgångsrik applikation.",
            name: "Milad",
            role: "Senior Full-Stack Utvecklare"
          },
          synergy: {
            quote: "Vår tvärvetenskapliga synergi mellan djup företagsanalys och senior ingenjörskonst ger våra kunder en oslagbar konkurrensfördel.",
            name: "Bella",
            role: "Head of Product & Brand"
          },
          guarantee: {
            quote: "Vi lämnar aldrig över projekt till juniora praktikanter. Varje kund samarbetar direkt i realtid med de 5 seniora partners som bygger plattformen.",
            name: "Morteza",
            role: "CEO & Huvudarkitekt"
          }
        },
        hero: {
          badge: "OM OSS & VÅR VISION",
          titlePrefix: "Vi arkitektoniserar ",
          titleGradient: "NÄSTA GENERATION",
          titleSuffix: " av digitala produkter & AI",
          subtitle: "Vi är en elitgrupp av seniora ingenjörer, produktarkitekter och affärsanalytiker som förenar djupgående företagsanalys med skottsäker kod för maximal tillväxt.",
          stats: {
            stat1Val: "100%",
            stat1Label: "Skräddarsydd kod",
            stat1Sub: "Inga mallar eller genvägar",
            stat2Val: "99.99%",
            stat2Label: "Uptime & Stabilitet",
            stat2Sub: "Modern molninfrastruktur",
            stat3Val: "<20ms",
            stat3Label: "Svarstid & Prestanda",
            stat3Sub: "100/100 Lighthouse & SEO",
            stat4Val: "5+",
            stat4Label: "Seniora Partnerarkitekter",
            stat4Sub: "Direkt samarbete utan mellanhänder"
          }
        },
        teamShowcase: {
          badge: "LEDARSKAPSTEAMET",
          title: "Lär känna vårt expertteam",
          titlePrefix: "Lär känna vårt ",
          titleGradient: "expertteam",
          titleSuffix: "",
          description: "Vi är ett sammansvetsat team av passionerade arkitekter, designers och ingenjörer som brinner för att skapa banbrytande digitala upplevelser. Upptäck personerna som förvandlar era visioner till verklighet.",
          button: "Boka strategisamtal med teamet",
          members: [
          {
                    "name": "Sam",
                    "role": "Senior Full-Stack Utvecklare",
                    "tag": "Cloud & Web Arkitektur",
                    "quote": "Jag bygger robusta applikationer och distribuerade molnsystem. Målet är alltid att leverera skalbar, blixtsnabb kod som överträffar förväntningarna."
          },
          {
                    "name": "Bella",
                    "role": "Head of Product & Brand",
                    "tag": "UI/UX & Kreativ Ledning",
                    "quote": "Att skapa fängslande digitala berättelser och bygga starka varumärkesidentiteter är min passion. Vi kopplar ihop era produkter med rätt målgrupp."
          },
          {
                    "name": "Morteza",
                    "role": "CEO & Huvudarkitekt",
                    "tag": "AI & Systemarkitektur",
                    "quote": "Med mångårig erfarenhet av att bygga tech-startups globalt skapar vi mjukvarulösningar som löser verkliga problem genom innovation och teknisk excellens."
          },
          {
                    "name": "Mina",
                    "role": "Affärsanalytiker & Rådgivare",
                    "tag": "Ex-Ericsson & Strategi",
                    "quote": "Efter att ha konsultat för globala telekom- och techjättar som Ericsson fokuserar jag på arbetsflödesoptimering, strategisk analys och mätbar tillväxt."
          },
          {
                    "name": "Milad",
                    "role": "Senior Full-Stack Utvecklare",
                    "tag": "Backend & Databassystem",
                    "quote": "Från komplexa backend-arkitekturer till intuitiva användargränssnitt konstruerar jag stabila mjukvarusystem som driver moderna företagsapplikationer."
          }
]
        },
        missionBento: {
          badge: "VÅR FILOSOFI & STANDARD",
          title: "Varför RoshaLink bygger annorlunda",
          titlePrefix: "Varför RoshaLink bygger ",
          titleGradient: "helt annorlunda",
          titleSuffix: "",
          subtitle: "Vi eliminerar teknisk skuld och bygger mjukvara som tål att växa med er verksamhet.",
          card1Badge: "AFFÄRSANALYS FÖRST",
          card1Title: "Strategi",
          card1Desc: "Företag kämpar ofta med osammanhängande system och generiska mallar. Vi analyserar era arbetsflöden och bygger lösningar anpassade exakt efter era affärsmål.",
          card2Badge: "NOLL DOWNTIME",
          card2Title: "Prestanda",
          card2Desc: "Modulära, händelsestyrda mikrotjänster med ISO 27001-standard och sub-20ms transaktionstider som garanterar oavbruten drift.",
          card3Badge: "DIREKT PARTNERSKAP",
          card3Title: "Partnerskap",
          card3Desc: "Inga juniora utvecklare eller oerfarna mellanhänder. Ni samarbetar direkt med de 5 seniora arkitekterna som bygger er plattform.",
          card4Badge: "AI & FRAMTIDSSÄKERHET",
          card4Title: "Automation",
          card4Desc: "Vi integrerar anpassade AI-modeller, smarta arbetsflöden och moderna API-kopplingar som sparar hundratals timmar manuellt arbete."
        },
        methodology: {
          badge: "VÅR METODIK",
          title: "Från vision till skottsäker leverans i 4 steg",
          titlePrefix: "Från vision till skottsäker leverans i ",
          titleGradient: "4 steg",
          titleSuffix: "",
          subtitle: "En strukturerad och beprövad utvecklingsprocess designad för precision och snabbhet.",
          step1Num: "01",
          step1Title: "Strategisk Affärsanalys & Kartläggning",
          step1Desc: "Djupgående analys av er affärsmodell, användarresor, tekniska krav och datastrukturer.",
          step2Num: "02",
          step2Title: "Tokeniserat Designsystem & Prototyp",
          step2Desc: "Skapande av ett modernt, flexibelt UI/UX-designsystem med interaktiva prototyper.",
          step3Num: "03",
          step3Title: "Skräddarsydd Kodarkitektur",
          step3Desc: "Byggnation med ren, skalbar kod i React, moderna backend-API:er och molninfrastruktur utan mallar.",
          step4Num: "04",
          step4Title: "Prestandaoptimering & Global Driftsättning",
          step4Desc: "100/100 Lighthouse-optimering, automatiserad CI/CD, ISO-säkerhet och kontinuerlig monitorering."
        },
        values: {
          badge: "GRUNDLÄGGANDE PRINCIPER",
          title: "Principer som vägleder varje rad kod vi skriver",
          subtitle: "Vår kompromisslösa kvalitetsstandard för moderna företagsapplikationer.",
          v1Title: "Skräddarsydd Ingenjörskonst",
          v1Desc: "Varje komponent och databasstruktur konstrueras utan färdiga standardmallar för maximal flexibilitet och renhet.",
          v2Title: "Säkerhet & Zero Trust",
          v2Desc: "Företagsklassad dataintegritet och ISO 27001-efterlevnad integrerad djupt i alla applikationslager.",
          v3Title: "Mätbar Affärseffekt",
          v3Desc: "Vi mäter vår framgång i era intäktsökningar, högre konverteringar, sänkta latenser och nöjdare användare.",
          v4Title: "Transparent Samarbete",
          v4Desc: "Direkt kommunikation med seniora partnerarkitekter i realtid med full insyn i utvecklingen.",
          v5Title: "Blixtsnabb Responstid",
          v5Desc: "Sub-20ms gränssnitt och optimerad kod som levererar 100/100 betyg på Google PageSpeed och SEO.",
          v6Title: "Långsiktigt Partnerskap",
          v6Desc: "Vi är er kontinuerliga teknologipartner som utvecklar, skalar och underhåller er plattform över tid."
        },
        awards: {
          "sectionTitle": "Branscherkännande & Utmärkelser",
          "titlePrefix": "Branscherkännande & ",
          "titleGradient": "Utmärkelser",
          "titleSuffix": "",
          "sectionSubtitle": "Vår hängivenhet till teknisk excellens, banbrytande arkitektur och kompromisslös design belönas internationellt.",
          "a1": {
                  "title": "BÄSTA WEBB-ARKITEKTUR",
                  "subtitle": "Global Cloud & Scalability Awards",
                  "recipient": "RoshaLink Architecture Squad",
                  "date": "2025",
                  "level": "gold"
          },
          "a2": {
                  "title": "FULL-STACK INNOVATION",
                  "subtitle": "Enterprise Scalability & Speed Honors",
                  "recipient": "RoshaLink Engineering",
                  "date": "2025",
                  "level": "platinum"
          },
          "a3": {
                  "title": "TOPP UI/UX DESIGN",
                  "subtitle": "Nordic Digital Experience & Product Awards",
                  "recipient": "RoshaLink Product Studio",
                  "date": "2024 - 2025",
                  "level": "gold"
          },
          "a4": {
                  "title": "AI & APP INNOVATION",
                  "subtitle": "Next-Gen Enterprise Web & Mobile Platform",
                  "recipient": "RoshaLink Labs",
                  "date": "2025",
                  "level": "platinum"
          }
},
          cta: {
          badge: "SAMARBETA MED OSS",
          title: "Vill du bygga nästa framgångsrika produkt med vårt ledarteam?",
          titlePrefix: "Vill du bygga nästa framgångsrika produkt med ",
          titleGradient: "vårt ledarteam?",
          titleSuffix: "",
          subtitle: "Boka en strategisk upptäcktsworkshop med våra 5 seniora partners och låt oss transformera er digitala vision.",
          button: "Boka strategisamtal nu"
        }
      },
      nav: {
        home: "Hem",
        portfolio: "Portfölj",
        services: "Tjänster",
        about: "Om oss",
        contact: "Kontakt",
        getStarted: "Börja nu"
      },
      hero: {
        badge: "DIGITAL AFFÄRSTRANSFORMATION & AI-ARKITEKTUR",
        titlePrefix: "Skapa Skräddarsydda ",
        titleGradient: "Digitala Produkter",
        titleSuffix: " & AI-Lösningar",
        subtitle: "Vi analyserar er affärsmodell och bygger skräddarsydda webblösningar, mobilappar och AI-system optimerade för maximal tillväxt.",
        getStarted: "Kom igång",
        explore: "Utforska kapabiliteter",
        card1Title: "AI-Driven Automation",
        card1Sub: "Intelligenta arbetsflöden & agenter",
        card2Title: "Blixtsnabb Prestanda",
        card2Sub: "100/100 Google Lighthouse & SEO",
        card3Title: "Skräddarsydd Kod",
        card3Sub: "Unik arkitektur utan mallar"
      },
      brands: {
        badge: "FÖRETAGSTEKNISK EKOSYSTEM",
        title: "Arkitektoniserad med verktyg och varumärken vi arbetar med",
        subtitle: "Vi integrerar över 250+ ledande molntjänster, AI-plattformar och designverktyg i vårt utvecklingsarbetsflöde.",
        auditBtn: "Starta teknikaudit",
        exploreBtn: "Utforska teknikstack"
      },
      features: {
        badge: "FUNKTIONSHÖJDPUNKTER",
        title: "Nästa generations arkitektur inbyggd i varje lösning",
        subtitle: "Upplev staplad prestanda, företagssäkerhet och tokeniserad designsystemarkitektur från start.",
        bullet1: "ISO 27001-certifierad säkerhet & Zero-Trust åtkomst",
        bullet2: "Tokeniserat React-komponentbibliotek för flera varumärken",
        bullet3: "Realtids händelsedrivna mikro-frontends och analys",
        exploreBtn: "Utforska lösningsarkitektur",
        viewSpecBtn: "Visa hela specifikationen"
      },
      searchVisibility: {
        badge: "SÖKSYNLIGHET & GOOGLE-RANKING",
        titlePrefix: "Din webbplats visas ",
        titleGradient: "högst upp på Google",
        titleSuffix: " i sökresultaten",
        subtitle: "Med RoshaLinks blixtsnabba prestanda, SEO-optimerade kod och automatiska indexering rankar din webbplats överst och blir det första valet för dina kunder.",
        bullet1: "Topplaceringar på Google och sökmoduler",
        bullet2: "Blixtsnabb laddningstid (100/100 Lighthouse-poäng)",
        bullet3: "Automatisk SEO-struktur och rika sökresultat",
        button: "Förbättra din sökplacering"
      },
      businessAnalysis: {
        badge: "STRATEGISK BUSINESS-ANALYS & SKRÄDDARSYDD UTVECKLING",
        titlePrefix: "Vi analyserar ditt företag & bygger",
        titleGradient: "SKRÄDDARSYDDA LÖSNINGAR",
        titleSuffix: "för dina behov",
        subtitle: "Varje företag är unikt. RoshaLink analyserar er affärsmodell, identifierar flaskhalsar och bygger kundanpassad mjukvara för maximal lönsamhet och tillväxt.",
        bullet1: "Djupgående analys av affärsmodell & användarresor",
        bullet2: "Skräddarsydd kod- och produktarkitektur utan mallar",
        bullet3: "Automatiserade arbetsflöden & kontinuerlig mätbarhet",
        button: "Boka skräddarsydd analys",
        exploreBtn: "Utforska funktioner",
        modalTitle: "Business Analys Funktioner",
        modalSubtitle: "Upptäck hur vår affärsanalys kan transformera din verksamhet",
        feature4Title: "Marknadspositionering",
        feature4Desc: "Identifiera viktiga marknadsmöjligheter för konkurrensfördelar.",
        feature5Title: "Prestandaoptimering",
        feature5Desc: "Analysera systemflaskhalsar för att öka den övergripande effektiviteten.",
        feature6Title: "Skalbarhetsplanering",
        feature6Desc: "Skapa färdplaner för framtida expansion.",
        closeBtn: "Stäng"
      },
      customSolution: {
        badge: "AFFÄRSANALYS & SKRÄDDARSYDD UTVECKLING",
        titlePrefix: "Vi bygger högpresterande",
        titleGradient: "WEBBPLATSER & MOBILAPPAR",
        titleSuffix: "för er framtid",
        subtitle: "Från avancerade webbplattformar till användarvänliga mobilappar. Vi utvecklar modern, skalbar och säker mjukvara helt anpassad för er verksamhet.",
        feature1Title: "Djupgående affärsanalys",
        feature1Desc: "Vi identifierar er målgrupp och arbetsflöden innan vi påbörjar kodningen.",
        feature2Title: "Skräddarsydda webbplatser & appar",
        feature2Desc: "Unik kod och arkitektur byggd exakt efter er verksamhets specifika behov.",
        feature3Title: "Konstruerad för mätbar tillväxt",
        feature3Desc: "Högpresterande lösningar som ökar konverteringen och driver er affär framåt.",
        getStartedBtn: "Starta ert skräddarsydda projekt",
        exploreBtn: "Utforska våra tjänster",
        modalTitle: "Våra Skräddarsydda Tjänster",
        modalSubtitle: "Upptäck hur vi bygger för framtiden",
        feature4Title: "Säkerhet i Världsklass",
        feature4Desc: "Dina data skyddas av moderna säkerhetsprotokoll och kryptering.",
        feature5Title: "Molnbaserad Infrastruktur",
        feature5Desc: "Skalbara lösningar byggda på modern molnteknik för maximal upptid.",
        feature6Title: "Ständig Övervakning",
        feature6Desc: "Vi övervakar din applikation dygnet runt för att garantera prestanda.",
        closeBtn: "Stäng"
      },
      connectWithUs: {
        badge: "FLERSPRÅKIG SUPPORT & RÅDGIVNING",
        titlePrefix: "Ta kontakt med oss —",
        titleGradient: "SUPPORT PÅ 4 SPRÅK",
        titleSuffix: "(Svenska, Engelska, Farsi & Arabiska)",
        subtitle: "Vårt ledarteam ger dig direkt rådgivning på det språk du föredrar. Vi eliminerar alla språkbarriärer så att dina projektkrav blir 100% förstådda och perfekt utförda.",
        langSvTitle: "Svensk Support",
        langSvDesc: "Direkt kommunikation med vårt lokala svenska team för alla dina affärs- och teknikfrågor.",
        langEnTitle: "English Support",
        langEnDesc: "Global enterprise consultation and technical support for international teams.",
        langFaTitle: "پشتیبانی فارسی",
        langFaDesc: "ارتباط مستقیم و هم‌زبانی برای درک کامل نیازها و پیاده‌سازی دقیق پروژه.",
        langArTitle: "الدعم باللغة العربية",
        langArDesc: "استشارات وخدمات دعم فني مباشرة باللغة العربية لتلبية متطلبات مشروعك بدقة متناهية.",
        contactBtn: "Kontakta oss nu",
        bookCallBtn: "Boka ett strategimöte"
      },
      salesAndSeo: {
        badge: "FÖRSÄLJNINGSTILLVÄXT & GOOGLE-RANKING",
        titlePrefix: "Öka din försäljning &",
        titleGradient: "DOMINERA SÖKRESULTATEN",
        titleSuffix: "på internet",
        subtitle: "Vi kombinerar blixtsnabb prestanda, konverteringsoptimering (CRO) och avancerad Google-SEO för att säkerställa att ditt företag syns överst och förvandlar besökare till betalande kunder.",
        highlight1Title: "Maximerad försäljning & konvertering",
        highlight1Desc: "Strategisk UX och kraftfulla köpflöden som driver er omsättning framåt.",
        highlight2Title: "Topplacering på Google och sökmoduler",
        highlight2Desc: "Nå förstaplatsen i sökresultaten med automatiserad SEO-arkitektur och snabb indexering.",
        highlight3Title: "Blixtsnabb prestanda & laddtid",
        highlight3Desc: "Sub-sekund laddtider som får besökare att stanna kvar och köpa mer.",
        boostBtn: "Öka din försäljning & SEO nu",
        exploreBtn: "Utforska våra kapabiliteter",
        modalTitle: "Utforska Våra Kapabiliteter",
        modalSubtitle: "Upptäck hur våra funktioner kan transformera din verksamhet",
        feature4Title: "Avancerad Dataanalys",
        feature4Desc: "Få djupa insikter med integrerade analysverktyg.",
        feature5Title: "Företagsklassad Säkerhet",
        feature5Desc: "Skydda din data med marknadsledande säkerhetsstandarder.",
        feature6Title: "Obegränsad Skalbarhet",
        feature6Desc: "System designade för att växa med dina framtida behov.",
        closeBtn: "Stäng"
      },
      mobileApp: {
        badge: "MOBILAPPUTVECKLING & APP STORE-PUBLICERING",
        titlePrefix: "Skräddarsydda mobilappar publicerade på",
        titleGradient: "APP STORE & GOOGLE PLAY",
        titleSuffix: "",
        subtitle: "Nå dina kunder direkt i mobilen. Vi utvecklar högpresterande mobilapplikationer för iOS och Android samt hanterar hela publiceringsprocessen på Apple App Store och Google Play Store.",
        feature1Title: "Högpresterande iOS & Android-appar",
        feature1Desc: "Smidiga och blixtsnabba mobilgränssnitt med 60fps prestanda och modern arkitektur.",
        feature2Title: "Komplett publicering på App Store & Google Play",
        feature2Desc: "Vi hanterar godkännande, riktlinjer och smidig lansering i båda appbutikerna.",
        feature3Title: "Push-notiser & Offlineläge",
        feature3Desc: "Håll dina kunder engagerade med realtidsnotiser och funktioner utan internetuppkoppling.",
        feature4Title: "Sömlös API-integration",
        feature4Desc: "Koppla ihop appen med era befintliga system och databaser smidigt.",
        feature5Title: "Skräddarsydd UI/UX-design",
        feature5Desc: "Pixelperfekta gränssnitt skapade för maximal användarvänlighet.",
        feature6Title: "Högsta Säkerhetsstandard",
        feature6Desc: "Datakryptering och säkerhetsfunktioner som skyddar era användare.",
        modalTitle: "Mobila Funktioner",
        modalSubtitle: "Upptäck allt vi erbjuder för din app",
        closeBtn: "Stäng",
        buildBtn: "Bygg din mobilapp nu",
        exploreBtn: "Utforska våra tjänster"
      },
      whoWeAre: {
        badge: "VILKA VI ÄR",
        title: "Möt vårt ledarteam på 5 personer",
        subtitle: "Vi är en elitgrupp av seniöra arkitekter, produktdesigners och säkerhetsingenjörer dedikerade till att transformera komplexa digitala produkter.",
        calloutTitle: "Vill du samarbeta direkt med våra 5 huvudpartners?",
        calloutSub: "Boka en teknisk upptäcktsblandning med våra kärnteamledare idag.",
        bookBtn: "Boka upptäcktsmöte",
        team: [
          {
            name: "Morteza",
            designation: "CEO & Grundare",
            quote: "Med många års erfarenhet av att bygga startups i olika länder, tror jag på att skapa produkter som verkligen löser globala problem genom innovation och uthållighet."
          },
          {
            name: "Bella",
            designation: "Marknads- & Reklamchef",
            quote: "Att skapa fängslande berättelser och bygga starka varumärken är min passion. Min långa erfarenhet inom reklam har lärt mig hur man kopplar samman produkter med rätt målgrupp."
          },
          {
            name: "Sam",
            designation: "Senior Full-Stack Webbutvecklare",
            quote: "Jag har byggt robusta applikationer och webbplatser med olika ramverk. Mitt mål är alltid att leverera skalbara, högpresterande webblösningar som överträffar förväntningarna."
          },
          {
            name: "Mina",
            designation: "Affärsanalytiker & Rådgivare",
            quote: "Efter att ha varit konsult för stora globala företag som Ericsson specialiserar jag mig på arbetsflödesoptimering, strategisk analys och att driva mätbar affärstillväxt."
          },
          {
            name: "Milad",
            designation: "Senior Full-Stack Utvecklare",
            quote: "Från komplexa backend-arkitekturer till sömlösa frontend-gränssnitt, jag drivs av att konstruera robusta mjukvarusystem som driver moderna digitala upplevelser."
          }
        ]
      },
      perspolisProject: {
        category: "RESTAURANG & GÄSTFRIHET",
        title: "Perspolis Restaurangplattform",
        desc: "En modern och högpresterande webbapplikation för Perspolis Restaurang med interaktiv digital meny, online bordsbokningssystem, flerspråkigt stöd och responsiv design.",
        featuredBadge: "★ Utvalt Kundcase",
        feature1: "Interaktiv digital meny & rätter",
        feature2: "Bordsbokningssystem online",
        feature3: "Flerspråkig UI & snabb laddtid",
        previewBtn: "Utforska interaktiv förhandsgranskning"
      },
      ffstechProject: {
        category: "INTEGRERADE BYGGNADSSYSTEM & NÄTVERK",
        title: "FFSTECH Digital Plattform & Infrastruktur",
        desc: "Högpresterande digital webbapplikation utvecklad för FFSTECH med fokus på intelligenta brand- och säkerhetssystem, passersystem, övervakning, AV-nätverk och integrerad digital infrastruktur.",
        featuredBadge: "★ Utvalt Kundcase",
        feature1: "Intelligenta brand- och säkerhetssystem",
        feature2: "Smarta passersystem & IP-övervakning",
        feature3: "Integrerad AV & nätverksinfrastruktur",
        previewBtn: "Utforska interaktiv förhandsgranskning"
      },
      dentistProject: {
        category: "TANDVÅRD & HÄLSO- OCH SJUKVÅRD",
        title: "Tandläkaren – Digital Tandvårdsplattform",
        desc: "En modern och omhändertagande digital webbapplikation för Tandläkarkliniken med online tidsbokning, interaktiv behandlingsoversikt, patientportal och flerspråkigt stöd.",
        featuredBadge: "★ Utvalt Kundcase",
        feature1: "Online tidsbokningssystem för patienter",
        feature2: "Interaktiv behandlings- och vårdkatalog",
        feature3: "Patientportal & snabb responsiv UI",
        previewBtn: "Utforska interaktiv förhandsgranskning"
      },
      shiraziProject: {
        category: "JURIDIK & INVANDRINGSRÅDGIVNING",
        title: "Shirazi Associates – Juridisk Plattform",
        desc: "Exklusiv digital plattform utvecklad för Shirazi Associates med fokus på affärsjuridik, invandringsrätt, konsultationsbokning online samt ett modernt flerspråkigt gränssnitt.",
        featuredBadge: "★ Utvalt Kundcase",
        feature1: "Online Konsultationsbokning & Juridisk Rådgivning",
        feature2: "Portfölj för Affärsjuridik & Visumtjänster",
        feature3: "Säker Ärendehantering & Flerspråkig UX",
        previewBtn: "Utforska interaktiv förhandsgranskning"
      },
      parsLawProject: {
        category: "JURIDISK BYRÅ & ADVOKATTJÄNSTER",
        title: "Pars Law Firm – Advokatbyrå Plattform",
        desc: "Komplett digital applikation för Pars Law Firm med funktioner för klientbokning, juridisk rådgivning, ärendepresentation samt en förtroendegivande och snabb responsiv webbdesign.",
        featuredBadge: "★ Utvalt Kundcase",
        feature1: "Klientbokning & Inledande Rådgivning",
        feature2: "Juridisk Ärendekatalog & Rättsområden",
        feature3: "Blixtsnabb Kod & Förtroendegivande UX",
        previewBtn: "Utforska interaktiv förhandsgranskning"
      },
      portfolioHero: {
        badge: "VÅR PORTFÖLJ & KUNDCASES",
        pillTitle: "100% Skräddarsydda Lösningar",
        pillSubtitle: "Idéer för varje affärsmodell",
        titlePrefix: "Utforska våra framgångsrika ",
        titleGradient: "PROJEKT & LÖSNINGAR",
        titleSuffix: " för alla branscher",
        subtitle: "Vi täcker alla affärsområden och industrier. Oavsett vilken affärsmodell eller nisch ditt företag har, skapar vi skräddarsydda digitala produkter, mjukvaror och appar som driver mätbar tillväxt.",
        viewPillarsBtn: "Utforska våra 6 pelare för framgång",
        modalTitle: "Våra 6 pelare för digital framgång",
        modalSubtitle: "Hur vi utvecklar högpresterande applikationer skräddarsydda för dina affärsmål",
        feature1Title: "Skräddarsydda idéer för varje affärsmodell",
        feature1Desc: "Varje bransch kräver en unik strategi. Vi analyserar er nisch och skapar exakt anpassade koncept.",
        feature2Title: "Mångsidiga projekt i olika branscher",
        feature2Desc: "Från E-handel, FinTech och Restaurang till AI-plattformar och komplexa SaaS-system.",
        feature3Title: "Konstruerad för mätbar försäljning & SEO",
        feature3Desc: "Blixtsnabb kod och optimerad UX som rankar högt på Google och konverterar besökare till kunder.",
        feature4Title: "Blixtsnabb kod & Framtidssäker arkitektur",
        feature4Desc: "Vi använder den senaste webbteknologin för ultra-snabb laddningstid, högsta säkerhet och sömlös skalbarhet.",
        feature5Title: "Högsta säkerhet & Kvalitetsgaranti",
        feature5Desc: "Strikt kodedisciplin och robust struktur som skyddar er verksamhet och kunddata dygnet runt.",
        feature6Title: "Dedikerat partnerskap & Kontinuerlig support",
        feature6Desc: "Vi är er långsiktiga digitala partner som stöttar och vidareutvecklar era produkter i varje steg.",
        exploreBtn: "Utforska portföljen",
        buildBtn: "Starta ditt skräddarsydda projekt",
        ctaTitle: "Har du en idé om en högpresterande produkt?",
        ctaSubtitle: "Samarbeta med vårt team för att designa, utveckla och lansera högpresterande digitala applikationer anpassade för dina affärsmål.",
        ctaBtn: "Bygg din produkt"
      },
      ourWork: {
        badge: "VÅRT SENASTE ARBETE",
        titlePrefix: "Skala ditt företag genom ",
        titleGradient: "strategisk produktinnovation",
        subtitle: "Transformera er företagspotential genom högpresterande mjukvara och precisionsdesign.",
        bullet1: "4M+ aktiva företagsanvändare som stöds",
        bullet2: "Under 20ms transaktions- och analysprestanda",
        bullet3: "Tokeniserat modulärt React-komponentdesignsystem",
        explorePortfolio: "Utforska hela portföljen",
        startProject: "Starta ditt projekt"
      },
      brandGrid: {
        badge: "VARUMÄRKE & PRODUKTGALLERI",
        title: "Designprecision och varumärkesmaterial",
        subtitle: "Utforska hur vi förenar digitala gränssnitt med fysiskt material, tokeniserade designsystem och företagsvarumärke.",
        requestKit: "Begär varumärkespaket"
      },
      testimonials: {
        badge: "KUNDRECENSIONER OCH FEEDBACK",
        title: "Betrodd av 140+ produktledare",
        rating: "5.0 / 5.0 Betyg",
        reviews: {
          r1: "RoshaLink transformerade vår gamla stambankspanel till en mikrofrontendsarkitektur med under 20 ms svarstid.",
          r2: "Designsystemet från deras team ökade vår utvecklingshastighet för flera plattformar med 300 %.",
          r3: "Felfri leverans utan avbrott. Deras DevOps-team byggde vår molndistributionspipeline på rekordtid.",
          r4: "Enastående visuell estetik kombinerat med rigorösa prestandamått. Rekommenderas varmt!",
          r5: "De integrerade skräddarsydda generativa AI-flöden i vår webbapplikation helt sömlöst.",
          r6: "Det tokeniserade designsystemet är så rent och enkelt att underhålla för både mobil- och webbteam.",
          r7: "ISO 27001-efterlevnad och nollförtroendesäkerhet levererade utan att kompromissa med användarupplevelsen.",
          r8: "Konverteringsgraden ökade med 48 % inom två månader efter lanseringen av den nya UI-designen.",
          r9: "Framstående teknisk precision. Den rörliga telemetridashbaorden ger oss komplett operativ översikt.",
          r10: "Att arbeta med deras seniöra 5-mannateam kändes som en direkt förlängning av våra egna grundare.",
          r11: "Skalade vårt spårningssystem i realtid till miljontals samtidiga anrop utan problem.",
          r12: "Vacker UI-design och skottsäker backend-kod. De överträffade alla våra företagsmål.",
          r13: "Latens under 20 ms bibehölls även under maximala spikar i företagsgrafiken.",
          r14: "Ren visuell perfektion. 3D-animationerna och mikro-interaktionerna gläder våra användare varje dag.",
          r15: "Levererade vår komplexa webbapplikation före tidsplanen med 100 % testtäckning.",
          r16: "Designsystemet förenklade vår internationalisering över 12 språk.",
          r17: "Intuitiva instrumentpaneler för komplexa AI-algoritmer. Våra användare älskar den nya upplevelsen.",
          r18: "Högsta nivå av professionalism och teknisk kompetens. En sann 5-stjärnig partner.",
          r19: "Extremt ren kodstruktur. Deras React & Vite-arkitektur gjorde introduktionen av nya utvecklare busenkel.",
          r20: "De förvandlade vår varumärkesidentitet och webbapplikation till ett riktmärke för branschen."
        }
      },
      ctaBanner: {
        title: "Redo att bygga er nästa högpresterande produkt?",
        subtitle: "Boka ett strategisamtal med vårt huvudsakliga design- och ingenjörsteam idag.",
        button: "Inled strategisk brief"
      },
      footer: {
        brandRosha: "ROSHA",
        brandLink: "LINK",
        description: "Bryggan mellan noggrann affärsanalys och banbrytande produktutveckling.",
        navigation: "Navigering",
        capabilities: "Kapabiliteter",
        stayUpdated: "Håll dig uppdaterad",
        newsletterSub: "Få kvartalsvisa strategiska insikter och tekniska briefs.",
        emailPlaceholder: "Ange arbetsemail",
        subscribe: "Prenumerera",
        rights: "© 2026 RoshaLink. Alla rättigheter förbehållna."
      },
      modal: {
        badge: "INLED PRODUKTUPPTÄCKT",
        title: "Starta ditt projekt",
        subtitle: "Direkt upptäcktsmöte med våra 5 huvudpartners.",
        name: "Namn",
        email: "Arbetsemail",
        focus: "Huvudfokus",
        budget: "Uppskattad budget",
        overview: "Kort översikt",
        submit: "Skicka upptäcktsbegäran",
        submittedTitle: "Brief skickad!",
        submittedSub: "Tack för att du inledde din brief. Vårt ledarteam kontaktar dig inom 4 timmar.",
        done: "Klar",
        sending: "Skickar...",
        error: "Vi kunde inte skicka din förfrågan. Försök igen om en stund."
      },
      chat: {
        badge: "AI-ASSISTENT",
        title: "Rosha AI-assistent",
        status: "Online",
        hoverLabel: "Chatta med Rosha",
        greeting: "Hej! Jag är Rosha. Hur kan jag hjälpa dig med ditt projekt idag?",
        placeholder: "Skriv ditt meddelande...",
        send: "Skicka meddelande",
        close: "Stäng chatten",
        typing: "Rosha skriver",
        retry: "Försök igen",
        cta: "Boka ett kostnadsfritt möte",
        disclaimer: "Rosha är en AI-assistent och kan göra misstag.",
        errorNetwork: "Jag kunde inte nå servern. Kontrollera din uppkoppling och försök igen.",
        errorRateLimit: "Du skickar meddelanden lite för snabbt. Vänta ett ögonblick och försök igen.",
        errorTooLong: "Det meddelandet är för långt. Kan du korta ner det lite?",
        errorGeneric: "Något gick fel på min sida. Försök gärna igen om en stund."
      },
      privacyPolicy: {
        toggleShort: "Kort version (Snabböversikt)",
        toggleFull: "Komplett juridisk policy",
        dpoBadge: "Dataskyddsombud (DPO)",
        dpoTitle: "Frågor om GDPR eller dataskydd?",
        dpoText: "Vårt dataskyddsteam svarar normalt inom 24 timmar. Kontakta oss direkt på privacy@roshalink.com.",
        dpoBtn: "Kontakta DPO",
        shortTitle: "Kort sammanfattning av Dataskyddspolicyn (Snabböversikt)",
        shortPoints: [
          { title: "Dataskydd i fokus", desc: "Vi respekterar din integritet och skyddar dina personuppgifter enligt EU:s GDPR och den svenska dataskyddslagen (2018:218)." },
          { title: "Vad vi samlar in", desc: "Kontaktuppgifter, konto- och autentiseringsdata, tekniska serverloggar och supportmeddelanden." },
          { title: "Ingen försäljning av data", desc: "Vi säljer ALDRIG dina personuppgifter till tredje part under några omständigheter." },
          { title: "Säker integration", desc: "Vi integrerar över 250+ molntjänster och AI-plattformar med högsta säkerhetskrav och dataskyddsavtal (DPA)." },
          { title: "Dina rättigheter", desc: "Du har rätt att begära registerutdrag, rättelse, radering ('rätten att bli bortglömd') och dataportabilitet." },
          { title: "Kontakt", desc: "För frågor rörande dataskydd, kontakta vårt privacy-team på privacy@roshalink.com." }
        ],
        badge: "GDPR & DATASKYDDSLAG (2018:218)",
        fullTitle: "Dataskyddspolicy (Komplett juridisk version)",
        updated: "Senast uppdaterad: 10 augusti 2026",
        subtitle: "Vi är fast beslutna att skydda dina personuppgifter med högsta säkerhetsstandarder, full insyn och efterlevnad av EU:s dataskyddsförordning (GDPR).",
        fullSections: [
          { num: "1", title: "1. Introduktion", icon: "ShieldCheck", text: `Denna dataskyddspolicy ("Policyn") beskriver hur RoshaLink / Diara ("Bolaget", "vi", "oss" eller "vår") samlar in, använder, lagrar, delar och skyddar personuppgifter i samband med tillhandahållandet av våra IT-tjänster, webbapplikationer, mjukvarulösningar och integrerade plattformar.\n\nVi värnar om din personliga integritet och är fast beslutna att skydda dina personuppgifter i enlighet med Europaparlamentets och rådets förordning (EU) 2016/679 ("GDPR"), den svenska dataskyddslagen (Lag 2018:218 med kompletterande bestämmelser till EU:s dataskyddsförordning) samt övrig tillämplig dataskyddslagstiftning.\n\nGenom att använda våra tjänster, besöka våra webbplatser eller ingå avtal med oss bekräftar du att du har tagit del av innehållet i denna dataskyddspolicy.` },
          { num: "2", title: "2. Vilka personuppgifter vi samlar in", icon: "FileText", text: `Vi samlar endast in personuppgifter som är strikt nödvändiga för att uppfylla våra avtalsenliga och lagstadgade skyldigheter, säkerställa systemdrift samt erbjuda och förbättra våra IT-tjänster. Personuppgifter vi kan samla in inkluderar:\n\n• Kontakt- och identifieringsuppgifter: Namn, e-postadress, telefonnummer, yrkesroll, företagsnamn, faktureringsadress samt IP-adress.\n• Konto- och autentiseringsuppgifter: Användarnamn, krypterade lösenord, säkerhetsloggar, åtkomsttokens samt användarpreferenser.\n• Tekniska loggar och enhetsdata: IP-adresser, webbläsartyp, operativsystem, skärmupplösning, tidsstämplar, refererande URL:er, felrapporter och prestandadata från våra servrar.\n• Kommunikationsdata: Meddelanden, supportärenden, förfrågningar och korrespondens som du skickar till oss via e-post, kontaktformulär eller integrerade chatt-widgets (t.ex. Diara AI Assistant).\n• Integrations- och användningsdata: Telemetridata och interaktionsdata som genereras vid användning av våra mjukvarulösningar och integrerade plattformar.` },
          { num: "3", title: "3. Hur vi använder uppgifterna", icon: "CheckCircle2", text: `Vi behandlar dina personuppgifter för följande ändamål:\n\n1. Tillhandahållande och drift av IT-tjänster: För att leverera, konfigurera, underhålla och administrera våra mjukvarulösningar, webbplatser och kundkonton.\n2. Kundsupport och kommunikation: För att besvara förfrågningar, hantera supportärenden, skicka tekniska meddelanden, uppdateringar och administrativ information.\n3. Säkerhet och felsökning: För att övervaka systemstabilitet, förhindra obehörig åtkomst, upptäcka och avvärja cyberattacker samt genomföra felrättningar.\n4. Optimering av integrationsflöden: För att säkerställa sömlös funktion och prestanda i våra arbetsflöden som integrerar över 250+ molntjänster, AI-plattformar och designverktyg.\n5. Analys och produktutveckling: För att utvärdera tjänsteanvändning, förbättra användarupplevelsen och utveckla nya funktioner.\n6. Rättsliga skyldigheter: För att uppfylla krav enligt bokföringslagstiftning, skattelagstiftning samt lagliga begäranden från myndigheter.` },
          { num: "4", title: "4. Laglig grund för behandling", icon: "Scale", text: `Vi behandlar dina personuppgifter med stöd av följande lagliga grunder enligt Artikel 6 i GDPR:\n\n• Fullgörande av avtal (Art. 6.1 b GDPR): Behandlingen är nödvändig för att ingå eller fullgöra ett avtal med dig eller det företag du representerar.\n• Rättslig förpliktelse (Art. 6.1 c GDPR): Behandlingen är nödvändig för att uppfylla en lagstadgad skyldighet som åvilar oss (exempelvis den svenska bokföringslagen 1999:1078).\n• Berättigat intresse (Art. 6.1 f GDPR): Behandlingen baseras på vårt berättigade intresse av att erbjuda säkra och effektiva IT-tjänster, förhindra bedrägerier, optimera våra plattformar och kommunicera med företagskunder.\n• Samtycke (Art. 6.1 a GDPR): I de fall behandling kräver samtycke (exempelvis för vissa typer av direktmarknadsföring eller icke-nödvändiga cookies) inhämtar vi ditt samtycke i förväg. Du har rätt att när som helst återkalla ditt samtycke.` },
          { num: "5", title: "5. Delning av data med tredje parter", icon: "Server", text: `Vi säljer aldrig dina personuppgifter till tredje part.\n\nSom en avancerad IT-verksamhet integrerar vi över 250+ molntjänster, AI-plattformar och designverktyg i våra interna och externa arbetsflöden (exempelvis leverantörer av molninfrastruktur, databaser, AI-API:er, CDN-nätverk och analysverktyg).\n\nVi delar endast personuppgifter med följande kategorier av mottagare:\n\n• Tredjepartsleverantörer och personuppgiftsbiträden: Leverantörer av molninfrastruktur (exempelvis AWS, Google Cloud), AI-API-leverantörer (exempelvis OpenAI, Anthropic), verktyg för felspårning, kommunikation och analys. Alla biträden är bundna av skriftliga personuppgiftsbiträdesavtal (DPA) i enlighet med Artikel 28 GDPR.\n• Myndigheter: Om vi är skyldiga enligt lag, domstolsbeslut eller myndighetsbeslut att lämna ut uppgifter.\n• Professionella rådgivare: Juridiska ombud, revisorer och finansiella rådgivare under tystnadsplikt.` },
          { num: "6", title: "6. Internationella dataöverföringar", icon: "Globe", text: `Våra servrar och leverantörer kan vara belägna både inom och utanför Europeiska ekonomiska samarbetsområdet (EES).\n\nNär personuppgifter överförs till ett land utanför EES som inte omfattas av ett beslut om adekvat skyddsnivå från Europeiska kommissionen, säkerställer vi lämpliga skyddsåtgärder genom:\n\n• Användning av Europeiska kommissionens godkända Standardavtalsklausuler (SCCs) i enlighet med Artikel 46 GDPR.\n• Tillämpning av EU-U.S. Data Privacy Framework i de fall överföring sker till certifierade US-baserade organisationer.\n• Tekniska och organisatoriska tilläggsåtgärder, såsom totalsträckskryptering och pseudonymisering.` },
          { num: "7", title: "7. Lagringstid", icon: "Clock", text: `Vi lagrar endast personuppgifter så länge det är nödvändigt för att uppfylla de ändamål för vilka uppgifterna samlades in, eller så länge det krävs enligt lag:\n\n• Kund- och avtalsuppgifter: Lagras under avtalsförhållandet samt i upp till 7 år efter avslutad kundrelation i enlighet med den svenska bokföringslagen (1999:1078).\n• Tekniska loggar och säkerhetsdata: Lagras normalt mellan 30 dagar och 12 månader, varefter de raderas eller anonymiseras automatiskt.\n• Support- och korrespondensdata: Lagras i upp till 3 år efter avslutat ärende för att säkerställa historik och kvalitetssäkring.\n\nNär personuppgifterna inte längre behövs raderas eller anonymiseras de på ett säkert sätt.` },
          { num: "8", title: "8. Användarens rättigheter enligt GDPR", icon: "KeyRound", text: `Som registrerad har du följande rättigheter enligt GDPR:\n\n• Rätt till tillgång (registerutdrag): Du har rätt att begära bekräftelse på om vi behandlar personuppgifter om dig samt få en kopia av uppgifterna.\n• Rätt till rättelse: Du har rätt att få felaktiga eller ofullständiga personuppgifter rättade utan onödigt dröjsmål.\n• Rätt till radering ("rätten att bli bortglömd"): Du kan begära att dina personuppgifter raderas om uppgifterna inte längre är nödvändiga eller om behandlingen saknar laglig grund.\n• Rätt till begränsning av behandling: Du har rätt att begära att behandlingen av dina personuppgifter begränsas under vissa omständigheter.\n• Rätt till dataportabilitet: Du har rätt att få ut dina personuppgifter i ett strukturerat, allmänt använt och maskinläsbart format.\n• Rätt att göra invändningar: Du har rätt att invända mot behandling som baseras på vårt berättigade intresse.\n• Rätt att lämna klagomål: Om du anser att vår behandling av dina personuppgifter strider mot GDPR har du rätt att lämna klagomål till tillsynsmyndigheten:\n  Integritetsskyddsmyndigheten (IMY) - www.imy.se` },
          { num: "9", title: "9. Cookies och spårningstekniker", icon: "Eye", text: `Vi använder cookies och liknande spårningstekniker för att säkerställa webbplatsens funktionalitet, analysera prestanda och förbättra användarupplevelsen.\n\n• Nödvändiga cookies: Krävs för grundläggande navigering, säkerhet och funktionalitet. Kan inte stängas av.\n• Analys- och prestandacookies: Hjälper oss att förstå hur besökare interagerar med plattformen genom anonymiserad statistik.\n• Funktionella cookies: Kommer ihåg inställningar som språk- och temapreferenser.\n\nDu kan när som helst ändra eller återkalla ditt cookie-samtycke via inställningarna i din webbläsare.` },
          { num: "10", title: "10. Säkerhetsåtgärder", icon: "Lock", text: `Vi tillämpar branschledande tekniska och organisatoriska säkerhetsåtgärder för att skydda dina personuppgifter mot oavsiktlig eller olaglig förstörelse, förlust, ändring, obehörigt röjande eller obehörig åtkomst:\n\n• Kryptering: Data i vila krypteras med AES-256 och data i transit krypteras med TLS 1.3.\n• Åtkomstkontroll: Principen om minsta privilege (PoLP) och Zero-Trust-arkitektur tillämpas strikt för all personal och alla system.\n• Övervakning och säkerhetsgranskning: Kontinuerlig sårbarhetsscanning, automatiserad säkerhetsövervakning och regelbundna kodgranskningar i enlighet med ISO 27001-standarder.` },
          { num: "11", title: "11. Kontaktinformation", icon: "Mail", text: `Om du har frågor om denna dataskyddspolicy, vill utöva dina rättigheter eller kontakta vårt dataskyddsombud, kan du nå oss via:\n\n• Företag: RoshaLink / Diara IT Infrastructure\n• E-post för integritetsfrågor: privacy@roshalink.com / hello@designlogic.agency\n• Webbplats: https://roshalink.com\n• Postadress: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland` },
          { num: "12", title: "12. Ändringar i denna dataskyddspolicy", icon: "RefreshCw", text: `Vi förbehåller oss rätten att uppdatera denna dataskyddspolicy för att återspegla ändringar i vår verksamhet, tekniska utveckling eller tillämplig lagstiftning.\n\nNär väsentliga ändringar görs kommer vi att meddela detta via vår webbplats eller per e-post innan ändringarna träder i kraft. Det datum som anges högst upp i policyn anger när den senast uppdaterades.` }
        ]
      },
      servicesPage: {
        hero: {
          titlePrefix: "Vi bygger det du faktiskt ",
          titleGradient: "Behöver & Drömmer om",
          titleSuffix: "",
          subtitle: "Inget fluff, inga mallar. Vi sätter oss in i din verksamhet, förstår dina mål och bygger precis det som krävs — webb, app eller AI — snabbt och hållbart.",
          primaryCta: "Prata med oss idag",
          secondaryCta: "Se vad vi erbjuder",
          floatingPillTitle: "Molnbaserat & skalbart från dag ett",
          floatingPillSubtitle: "Säkert, snabbt och byggt för att växa",
          metric1Value: "100/100",
          metric1Label: "Google Lighthouse & SEO",
          metric2Value: "< 20ms",
          metric2Label: "Snabbhet globalt",
          metric3Value: "ISO 27001",
          metric3Label: "Säker & pålitlig",
          metric4Value: "5 Seniorer",
          metric4Label: "Du pratar direkt med dem som bygger"
        },
        servicesSection: {
          title: "6 saker vi är riktigt bra på",
          subtitle: "Oavsett om du är startup eller etablerat bolag — vi har verktygen och erfarenheten att ta dig dit du vill.",
          deliverablesLabel: "Vad du får:",
          techTagsLabel: "Teknologier vi använder:"
        },
        servicesList: [
          {
            id: "discovery",
            category: "AFFÄRSSTRATEGI",
            title: "Strategisk Affärsanalys & Kartläggning",
            desc: "Vi analyserar era intäktsmodeller, användarresor och tekniska flaskhalsar innan en enda rad kod skrivs för att säkerställa maximal ROI och affärsnytta.",
            deliverables: [
              "Djupgående affärsmodell & processkartläggning",
              "Teknisk genomförbarhet & arkitekturritning",
              "Datamodellering & API-specifikationer",
              "Strategisk produktfärdplan & tidsestimat"
            ],
            techTags: ["System Mapping", "Figma Design Tokens", "Data Modeling", "ROI Analysis"]
          },
          {
            id: "web-architecture",
            category: "FRONTEND & WEBB",
            title: "Skräddarsydd Webbarkitektur & React",
            desc: "Moderna, blixtsnabba webbapplikationer och företagsportaler konstruerade med ren React-kod, modulära komponenter och perfekt Lighthouse-optimering.",
            deliverables: [
              "Bespoke Single Page Apps (SPA) & Portaler",
              "Tokeniserat UI/UX Designsystem",
              "WCAG 2.1 AA Tillgänglighet & Responsivitet",
              "100/100 Core Web Vitals & Google SEO"
            ],
            techTags: ["React 19", "Vite", "Tailwind / CSS Tokens", "Framer Motion"]
          },
          {
            id: "cloud-backend",
            category: "BACKEND & INFRASTRUKTUR",
            title: "Företagsklassad Backend & Mikrotjänster",
            desc: "Stabila och felsäkra backend-system, databaser och API-arkitekturer med sub-20ms transaktionstider och 99.99% garanterad drifttid.",
            deliverables: [
              "Händelsestyrda mikrotjänster & REST/GraphQL",
              "PostgreSQL, Redis & NoSQL Databasarkitektur",
              "ISO 27001 Säkerhet & Zero-Trust Autentisering",
              "Automatiserade CI/CD-pipelines & Docker"
            ],
            techTags: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP"]
          },
          {
            id: "ai-automation",
            category: "AI & INTELLIGENS",
            title: "AI-Automation & Smarta Arbetsflöden",
            desc: "Integrera anpassade AI-modeller, autonoma agenter och intelligenta datapipelines som automatiserar hundratals timmar av repetitivt arbete.",
            deliverables: [
              "LLM & RAG-system (OpenAI, Gemini, Anthropic)",
              "Intelligenta företagschattar & AI-agenter",
              "Automatiserad datainläsning & analyspipelines",
              "AI-driven prediktiv analys & dashboards"
            ],
            techTags: ["OpenAI API", "Gemini", "RAG / Vector DB", "Python Automation"]
          },
          {
            id: "mobile-apps",
            category: "MOBILAPPAR",
            title: "Mobilapplikationer iOS & Android",
            desc: "Sömlösa mobilapplikationer med nativ prestanda, realtidssynkronisering mot webbens backend och intuitiv touch-design.",
            deliverables: [
              "Cross-platform iOS & Android-appar",
              "Realtidssynkronisering via WebSockets",
              "Biometrisk säkerhet & offline-läge",
              "App Store & Google Play Driftsättning"
            ],
            techTags: ["React Native", "Expo", "WebSockets", "Push Notifications"]
          },
          {
            id: "seo-performance",
            category: "PRESTANDA & SÖK",
            title: "SEO-Optimering & Global CDN",
            desc: "Topplaceringar på Google och global räckvidd genom strukturerad semantisk kod, automatiserad indexering och blixtsnabb edge-infrastruktur.",
            deliverables: [
              "Strukturerad JSON-LD & Schema Markup",
              "Global Cloudflare Edge CDN & Caching",
              "Automatiserad XML Sitemap & Search Console",
              "Konverteringsoptimering & A/B-testning"
            ],
            techTags: ["SEO Schema", "Cloudflare CDN", "Lighthouse 100", "Analytics"]
          }
        ],
        techMatrix: {
          title: "Vår Företagsklassade Teknikstack",
          subtitle: "Vi väljer noggrant de mest stabila och moderna teknologierna för att bygga system som tål att växa.",
          tabFrontend: "Frontend & Design",
          tabBackend: "Backend & Databaser",
          tabAi: "AI & Automation",
          tabCloud: "Moln & Säkerhet",
          frontend: [
            { title: "React 19 & Vite", desc: "Nästa generations komponentlivscykel, blixtsnabb HMR och optimerad klientrendering utan onödig overhead." },
            { title: "Framer Motion & WebGL", desc: "Hårdvaruaccelererade 60fps mikro-animationer och fysikbaserade interaktioner för en engagerande upplevelse." },
            { title: "Tokeniserade Designsystem", desc: "Strikta designtokens med fullt stöd för mörkt och ljust läge samt automatisk responsiv skalning." },
            { title: "Vanilla CSS & Tailwind", desc: "Noll körtidsbelastning, ren modulär CSS-arkitektur och kompromisslös renderprestanda." }
          ],
          backend: [
            { title: "Node.js & Mikrotjänster", desc: "Asynkron händelsestyrd körtid utvecklad för mikrotjänster med svarstider under 20 millisekunder." },
            { title: "PostgreSQL & Prisma", desc: "ACID-kompatibel relationsdatamodellering med automatiserade och typsäkra databasmigreringar." },
            { title: "Redis & Upstash", desc: "Distribuerad in-memory-cache med sub-millisekunds latens och realtidsrate-limiting." },
            { title: "WebSockets & Telemetri", desc: "Tvåvägs realtidssynkronisering med kontinuerlig händelsebevakning och telemetriåterkoppling." }
          ],
          ai: [
            { title: "Anpassade LLM-Modeller", desc: "Skräddarsydd integration med OpenAI, Claude och Gemini för domänspecifik resonemangskraft." },
            { title: "RAG & Vektordatabaser", desc: "Kontextuell semantisk dokumentsökning och säker kunskapsinhämtning utan modellhallucinationer." },
            { title: "Autonoma AI-Agenter", desc: "Fleragentssystem som självständigt utför komplexa och repetitiva operativa processer." },
            { title: "Datapipelines i Python", desc: "Automatiserad datainsamling, tvättning och strukturerade transformationspipelines för analys." }
          ],
          cloud: [
            { title: "Docker & Containerisering", desc: "Isolerade och reproducerbara container-miljöer för friktionsfri utveckling och drift." },
            { title: "AWS & Cloudflare Edge", desc: "Serverlös global edge-distribution i över 300 städer med inbyggt enterprise DDoS-skydd." },
            { title: "ISO 27001 & Säkerhet", desc: "Total AES-256-kryptering, TLS 1.3 och strikt Zero-Trust åtkomstkontroll i alla lager." },
            { title: "Automatiserad CI/CD", desc: "Automatisk testning, kodanalys och driftsättning via GitHub Actions med 99.99% upptid." }
          ]
        },
        process: {
          title: "Så här jobbar vi — steg för steg",
          subtitle: "En tydlig och trygg process där du vet exakt vad som händer — och varför.",
          stageBadge1: "STEG 01 — VI LYSSNAR & PLANERAR",
          stageBadge2: "STEG 02 — VI DESIGNAR TILLSAMMANS",
          stageBadge3: "STEG 03 — VI BYGGER ORDENTLIGT",
          stageBadge4: "STEG 04 — VI LANSERAR & FÖLJER UPP",
          step1Num: "01",
          step1Title: "Vi förstår ditt behov",
          step1Desc: "Vi sätter oss ner med dig, lyssnar noga och kartlägger vad du faktiskt behöver — innan vi skriver en enda rad kod.",
          step1Tags: ["Affärsanalys & mål", "Teknisk planering", "Data & API-design"],
          step2Num: "02",
          step2Title: "Design & prototyp",
          step2Desc: "Du ser hur produkten kommer se ut och kännas redan innan vi börjar bygga — och kan påverka varje detalj.",
          step2Tags: ["Klickbar prototyp i Figma", "Design som matchar ditt varumärke", "Testad mot verkliga fall"],
          step3Num: "03",
          step3Title: "Vi bygger det du godkänt",
          step3Desc: "Våra 5 seniora partners skriver all kod själva — ren, snabb och utan generiska genvägar.",
          step3Tags: ["Skräddarsydd React-kod", "AI-integration om det behövs", "Skalbar arkitektur"],
          step4Num: "04",
          step4Title: "Lansering & driftsättning",
          step4Desc: "Vi testar allt noggrant, säkerställer att allt fungerar perfekt och rullar ut till hela världen — utan ett enda driftstopp.",
          step4Tags: ["100/100 Lighthouse", "Säkerhetsgranskning", "Globalt CDN & 99.99% drifttid"],
          nextStage: "Nästa steg",
          stageCounter: "Steg {{current}} av {{total}}"
        },
        comparison: {
          title: "Varför RoshaLink — och inte en vanlig byrå?",
          subtitle: "Vi dömer ingen, men vi tror på ärlighet. Här är skillnaden i praktiken.",
          featureCol: "Vad vi jämför",
          agencyCol: "Typisk Byrå",
          roshaCol: "RoshaLink",
          f1: "Vem gör jobbet?",
          f1Agency: "Juniorer med en säljare emellan",
          f1Rosha: "5 seniora grundare — de kodar direkt",
          f2: "Hur byggs det?",
          f2Agency: "WordPress-mallar och färdiga teman",
          f2Rosha: "Ren, skräddarsydd React & Node.js-kod",
          f3: "Hur snabb är den?",
          f3Agency: "Långsam (2–5 sek), dåliga poäng",
          f3Rosha: "Blixtsnabb (< 20ms), 100/100 Lighthouse",
          f4: "Vem äger koden?",
          f4Agency: "Osäkra plugins, oklar äganderätt",
          f4Rosha: "Du äger allt — 100% från dag ett",
          f5: "Hur ser priset ut?",
          f5Agency: "Dolda timkostnader som drar iväg",
          f5Rosha: "Fast pris, klart scope, inga överraskningar"
        },
        faq: {
          title: "Vanliga frågor — vi svarar ärligt",
          subtitle: "Inget krångel, inga säljsnack. Bara raka svar på det du verkligen undrar.",
          q1: "Hur snabbt kan vi sätta igång?",
          a1: "Normalt sett är vi igång med analys och planering inom 48 timmar efter vårt första samtal. Du pratar direkt med oss som bygger — ingen mellankommunikation.",
          q2: "Använder ni färdiga mallar?",
          a2: "Nej, aldrig. Vi bygger allt från grunden, skräddarsytt för dig. Det ger snabbare sida, bättre säkerhet och fullständig flexibilitet framöver.",
          q3: "Vem skriver egentligen koden?",
          a3: "Vi 5 senior-partners gör det — direkt och personligen. Vi lägger aldrig ut till juniorer eller externa konsulter.",
          q4: "Vem äger koden och min data?",
          a4: "Du äger allt från första dagen. All källkod, alla designs, alla rättigheter — 100% ditt. Vi följer ISO 27001 och GDPR.",
          q5: "Finns det support efter att vi lanserat?",
          a5: "Absolut. Vi erbjuder löpande underhåll, 24/7-övervakning och fortsätter utveckla produkten i takt med att du växer."
        },
        cta: {
          title: "Redo att ta nästa steg?",
          subtitle: "Boka ett kort samtal med oss — utan förpliktelser. Vi lyssnar, ställer frågor och berättar ärligt vad vi kan göra för dig.",
          button: "Boka ett samtal idag"
        }
      }
    }
  },
  en: {
    translation: {
      aboutPage: {
        teamPerspectives: {
          badge: "STRATEGIC PERSPECTIVES & LEADERSHIP",
          title: "Direct Founding Leadership Driving Enterprise Innovation",
          titlePrefix: "Direct Founding Leadership Driving ",
          titleGradient: "Enterprise Innovation",
          titleSuffix: "",
          subtitle: "How our 5 senior partners engineer tailor-made solutions, eliminate technical friction, and guarantee measurable revenue growth.",
          morteza: {
            quote: "Software architecture must directly serve revenue and long-term business goals. We eliminate technical debt from day one by building clean, bespoke foundations without templates.",
            name: "Morteza",
            role: "CEO & Lead Architect"
          },
          bella: {
            quote: "Exceptional UI/UX connects technical precision with emotional human connection, boosting conversion rates and enterprise brand prestige.",
            name: "Bella",
            role: "Head of Product & Brand"
          },
          sohrab: {
            quote: "Distributed cloud systems with sub-20ms latency and 99.99% uptime guarantee your platform never fails under peak enterprise traffic.",
            name: "Sam",
            role: "Senior Full-Stack & Cloud Engineer"
          },
          mina: {
            quote: "Having consulted for global enterprise titans like Ericsson, rigorous business process auditing before writing code saves months of rework.",
            name: "Mina",
            role: "Business Analyst & Strategic Advisor"
          },
          milad: {
            quote: "From database indexing to silky frontend interactivity, pure and scalable code is the backbone of high-growth applications.",
            name: "Milad",
            role: "Senior Full-Stack & Systems Engineer"
          },
          synergy: {
            quote: "Our cross-disciplinary synergy between deep business analysis and senior engineering gives clients an unfair competitive advantage.",
            name: "Bella",
            role: "Head of Product & Brand"
          },
          guarantee: {
            quote: "We don't hand off projects to junior contractors. Every single client collaborates directly in real-time with the 5 senior partners building their software.",
            name: "Morteza",
            role: "CEO & Lead Architect"
          }
        },
        hero: {
          badge: "ABOUT US & OUR VISION",
          titlePrefix: "Architecting the ",
          titleGradient: "NEXT GENERATION",
          titleSuffix: " of Digital Products & AI",
          subtitle: "We are an elite squad of senior software architects, product designers, and strategic business analysts dedicated to transforming complex digital products with tailor-made precision.",
          stats: {
            stat1Val: "100%",
            stat1Label: "Tailor-Made Code",
            stat1Sub: "No templates or shortcuts",
            stat2Val: "99.99%",
            stat2Label: "Uptime & Reliability",
            stat2Sub: "Modern cloud infrastructure",
            stat3Val: "<20ms",
            stat3Label: "Response & Latency",
            stat3Sub: "100/100 Lighthouse & SEO",
            stat4Val: "5+",
            stat4Label: "Senior Partner Architects",
            stat4Sub: "Direct collaboration without middle layers"
          }
        },
        teamShowcase: {
          badge: "LEADERSHIP SQUAD",
          title: "Get to Know Our Expert Team",
          titlePrefix: "Get to Know Our ",
          titleGradient: "Expert Leadership Squad",
          titleSuffix: "",
          description: "We are a dedicated squad of senior software architects, product designers, and strategic advisors passionate about crafting world-class digital experiences and engineering your vision into reality.",
          button: "Schedule Strategy Call with Team",
          members: [
          {
                    "name": "Sam",
                    "role": "Senior Full-Stack Engineer",
                    "tag": "Cloud & Web Architecture",
                    "quote": "I construct resilient web applications and distributed cloud systems. The goal is always to deliver scalable, lightning-fast performance that exceeds expectations."
          },
          {
                    "name": "Bella",
                    "role": "Head of Product & Brand",
                    "tag": "UI/UX & Creative Direction",
                    "quote": "Crafting compelling digital narratives and memorable brand identities is my passion. We bridge cutting-edge interfaces with real human connection."
          },
          {
                    "name": "Morteza",
                    "role": "CEO & Lead Architect",
                    "tag": "AI & System Architecture",
                    "quote": "With extensive experience building startups across international markets, we engineer software that solves real-world challenges through relentless innovation and technical mastery."
          },
          {
                    "name": "Mina",
                    "role": "Business Analyst & Advisor",
                    "tag": "Ex-Ericsson & Strategy",
                    "quote": "Having consulted for global enterprise titans like Ericsson, I specialize in workflow optimization, strategic audits, and driving measurable revenue growth."
          },
          {
                    "name": "Milad",
                    "role": "Senior Full-Stack Engineer",
                    "tag": "Backend & Distributed Systems",
                    "quote": "From complex database backends to silky frontend experiences, I am dedicated to engineering bulletproof software architectures powering modern business."
          }
]
        },
        missionBento: {
          badge: "OUR PHILOSOPHY & STANDARD",
          title: "Why RoshaLink Builds Differently",
          titlePrefix: "Why RoshaLink Builds ",
          titleGradient: "Differently",
          titleSuffix: "",
          subtitle: "We eliminate technical debt and engineer software built to scale gracefully with your business.",
          card1Badge: "BUSINESS ANALYSIS FIRST",
          card1Title: "Strategy",
          card1Desc: "Modern enterprises struggle with disconnected design systems, slow legacy backends, and bloated software. We analyze your core workflows first and craft custom solutions designed for profit.",
          card2Badge: "ZERO DOWNTIME",
          card2Title: "Performance",
          card2Desc: "Modular, event-driven architectures engineered for 99.99% uptime, sub-20ms transaction speeds, and multi-platform consistency across web and mobile.",
          card3Badge: "DIRECT PARTNERSHIP",
          card3Title: "Partnership",
          card3Desc: "No junior developers, no offshore outsourcing, and no project manager proxies. You work in real-time with the 5 senior partners who write your code.",
          card4Badge: "AI & FUTURE-PROOFING",
          card4Title: "Automation",
          card4Desc: "We seamlessly integrate bespoke AI models, intelligent agents, and automated data pipelines that eliminate hundreds of hours of manual overhead.",
        },
        methodology: {
          badge: "OUR METHODOLOGY",
          title: "From Vision to Flawless Delivery in 4 Steps",
          titlePrefix: "From Vision to Flawless Delivery in ",
          titleGradient: "4 Proven Steps",
          titleSuffix: "",
          subtitle: "A proven, high-velocity engineering workflow designed for architectural rigor and speed.",
          step1Num: "01",
          step1Title: "Strategic Business Discovery & Audit",
          step1Desc: "In-depth audit of business models, user personas, technical requirements, and data schemas.",
          step2Num: "02",
          step2Title: "Tokenized Design System & Prototype",
          step2Desc: "Interactive high-fidelity prototypes and accessible, modular UI design systems.",
          step3Num: "03",
          step3Title: "Tailor-Made Code Engineering",
          step3Desc: "Pure, template-free custom development in React, Node/Cloud backends, and micro-frontends.",
          step4Num: "04",
          step4Title: "Performance Tuning & Global Deployment",
          step4Desc: "100/100 Lighthouse optimization, automated CI/CD pipelines, ISO compliance, and 24/7 observability."
        },
        values: {
          badge: "CORE PRINCIPLES",
          title: "The Standards Guiding Every Line of Code We Write",
          subtitle: "Our uncompromising engineering values crafted for modern enterprise growth.",
          v1Title: "Tailor-Made Engineering",
          v1Desc: "Every UI component and backend pipeline is custom-coded from scratch without generic templates or bloated dependencies.",
          v2Title: "Security & Zero Trust",
          v2Desc: "Enterprise-grade data privacy and ISO 27001 standards baked into the core application layer.",
          v3Title: "Measurable Impact",
          v3Desc: "We measure success in customer revenue growth, reduced latency, higher retention, and measurable ROI.",
          v4Title: "Transparent Collaboration",
          v4Desc: "Real-time communication with senior partner architects with full transparency across every development sprint.",
          v5Title: "Lightning Speed & SEO",
          v5Desc: "Sub-20ms interfaces and clean code architecture achieving 100/100 ratings across Google PageSpeed and SEO.",
          v6Title: "Long-Term Partnership",
          v6Desc: "We operate as your dedicated technical leadership partner, evolving and scaling your software continuously."
        },
        awards: {
          "sectionTitle": "Industry Recognition & Honors",
          "titlePrefix": "Industry Recognition & ",
          "titleGradient": "Honors",
          "titleSuffix": "",
          "sectionSubtitle": "Our relentless commitment to architectural mastery, bulletproof engineering, and intuitive product design.",
          "a1": {
                  "title": "BEST WEB ARCHITECTURE",
                  "subtitle": "Global Cloud & Scalability Awards",
                  "recipient": "RoshaLink Architecture Squad",
                  "date": "2025",
                  "level": "gold"
          },
          "a2": {
                  "title": "FULL-STACK INNOVATION",
                  "subtitle": "Enterprise Scalability & Speed Honors",
                  "recipient": "RoshaLink Engineering",
                  "date": "2025",
                  "level": "platinum"
          },
          "a3": {
                  "title": "TOP UI/UX DESIGN",
                  "subtitle": "Nordic Digital Experience & Product Awards",
                  "recipient": "RoshaLink Product Studio",
                  "date": "2024 - 2025",
                  "level": "gold"
          },
          "a4": {
                  "title": "AI & APP INNOVATION",
                  "subtitle": "Next-Gen Enterprise Web & Mobile Platform",
                  "recipient": "RoshaLink Labs",
                  "date": "2025",
                  "level": "platinum"
          }
},
          cta: {
          badge: "PARTNER WITH US",
          title: "Ready to Build Your Next High-Performance Product?",
          titlePrefix: "Ready to Build Your Next High-Performance Product with ",
          titleGradient: "Our Leadership Squad?",
          titleSuffix: "",
          subtitle: "Schedule a strategic discovery workshop with our 5 founding partners today and turn your digital ambition into reality.",
          button: "Schedule Strategy Call Now"
        }
      },
      nav: {
        home: "Home",
        portfolio: "Portfolio",
        services: "Services",
        about: "About Us",
        contact: "Contact",
        getStarted: "Get Started"
      },
      hero: {
        badge: "DIGITAL BUSINESS TRANSFORMATION & AI ARCHITECTURE",
        titlePrefix: "Building Custom ",
        titleGradient: "Digital Products",
        titleSuffix: " & AI Solutions",
        subtitle: "We analyze your business model and engineer bespoke web apps, mobile applications, and AI systems built for maximum growth.",
        getStarted: "Get Started",
        explore: "Explore Capabilities",
        card1Title: "AI-Driven Automation",
        card1Sub: "Intelligent workflows & AI agents",
        card2Title: "Lightning Speed",
        card2Sub: "100/100 Google Lighthouse & SEO",
        card3Title: "Tailor-Made Code",
        card3Sub: "Custom architecture without templates"
      },
      brands: {
        badge: "ENTERPRISE TECH ECOSYSTEM",
        title: "Architected with Enterprise Tools & Brands We Work With",
        subtitle: "We integrate over 250+ top-tier cloud services, AI platforms, and design tools directly into our engineering workflow for seamless scalability.",
        auditBtn: "Initiate Technology Audit",
        exploreBtn: "Explore Tech Stack"
      },
      features: {
        badge: "FEATURE HIGHLIGHTS",
        title: "Next-Gen Architecture Built into Every Solution",
        subtitle: "Experience stacked performance, enterprise security, and tokenized design system architecture out-of-the-box. We build software that stays fast at scale.",
        bullet1: "ISO 27001 Certified Security & Zero-Trust Access",
        bullet2: "Tokenized Multi-Brand React Component Library",
        bullet3: "Real-Time Event-Driven Micro-frontends & Analytics",
        exploreBtn: "Explore Solution Architecture",
        viewSpecBtn: "View Full Tech Spec"
      },
      searchVisibility: {
        badge: "SEARCH VISIBILITY & GOOGLE RANKING",
        titlePrefix: "Your Website Ranks ",
        titleGradient: "#1 on Google",
        titleSuffix: " Search Results",
        subtitle: "With RoshaLink's ultra-fast architecture, automated SEO optimization, and instant indexing, your website dominates search engines and becomes the first choice for your customers.",
        bullet1: "Top Rankings in Google Search Results",
        bullet2: "Sub-Second Load Times (100/100 Lighthouse Score)",
        bullet3: "Automated SEO Structure & Rich Snippets",
        button: "Boost Your Search Ranking"
      },
      businessAnalysis: {
        badge: "STRATEGIC BUSINESS ANALYSIS & CUSTOM ENGINEERING",
        titlePrefix: "We Analyze Your Business & Build",
        titleGradient: "TAILOR-MADE SOLUTIONS",
        titleSuffix: "Designed for Your Needs",
        subtitle: "Every business is unique. RoshaLink analyzes your workflow, identifies bottlenecks, and crafts custom software engineered specifically for your growth and revenue.",
        bullet1: "Deep Business Model & User Journey Audits",
        bullet2: "Tailor-Made Architecture Built Without Generic Templates",
        bullet3: "Automated Workflows & Measurable Growth Metrics",
        button: "Request Custom Analysis",
        exploreBtn: "Explore Features",
        modalTitle: "Business Analysis Features",
        modalSubtitle: "Discover how our custom analysis accelerates your growth",
        feature4Title: "Market Positioning",
        feature4Desc: "Identifying key market opportunities for competitive advantage.",
        feature5Title: "Performance Optimization",
        feature5Desc: "Analyzing system bottlenecks to increase overall efficiency.",
        feature6Title: "Scalability Planning",
        feature6Desc: "Creating roadmaps for seamless future business expansion.",
        closeBtn: "Close"
      },
      customSolution: {
        badge: "BUSINESS ANALYSIS & CUSTOM DEVELOPMENT",
        titlePrefix: "We Analyze Your Business & Build",
        titleGradient: "TAILOR-MADE WEBSITES & APPS",
        titleSuffix: "Built for Your Growth",
        subtitle: "No generic templates. We deeply analyze your business model, audience, and goals to build custom web and mobile applications specifically engineered to drive your revenue and growth.",
        feature1Title: "Deep Business Analysis",
        feature1Desc: "Auditing your exact customer journey and workflows before writing a single line of code.",
        feature2Title: "Bespoke Web & Mobile Applications",
        feature2Desc: "Unique architecture and custom software engineered precisely for your business needs.",
        feature3Title: "Driven for Scalable Growth",
        feature3Desc: "High-performance digital products crafted to maximize conversion rates and enterprise scale.",
        getStartedBtn: "Start Your Custom Project",
        exploreBtn: "Explore Our Services",
        modalTitle: "Our Custom Services",
        modalSubtitle: "Discover how we build for the future",
        feature4Title: "World-Class Security",
        feature4Desc: "Your data is protected by modern security protocols and encryption.",
        feature5Title: "Cloud-Native Infrastructure",
        feature5Desc: "Scalable solutions built on modern cloud tech for maximum uptime.",
        feature6Title: "Continuous Monitoring",
        feature6Desc: "We monitor your application 24/7 to guarantee performance.",
        closeBtn: "Close"
      },
      connectWithUs: {
        badge: "MULTILINGUAL SUPPORT & CONSULTING",
        titlePrefix: "Connect With Us —",
        titleGradient: "4-LANGUAGE SUPPORT",
        titleSuffix: "(Swedish, English, Farsi & Arabic)",
        subtitle: "Our leadership squad provides direct consultation in your preferred language. We eliminate communication barriers to ensure your exact product requirements are understood and executed with precision.",
        langSvTitle: "Swedish Support",
        langSvDesc: "Direct communication with our local team for all business and technical strategy.",
        langEnTitle: "English Support",
        langEnDesc: "Global enterprise consultation and technical architecture support for international teams.",
        langFaTitle: "Farsi Support",
        langFaDesc: "Direct consultation in Farsi to thoroughly understand your business vision and requirements.",
        langArTitle: "Arabic Support",
        langArDesc: "Direct consultation in Arabic to ensure complete understanding and execution of your project needs.",
        contactBtn: "Connect With Us Now",
        bookCallBtn: "Book Strategy Session"
      },
      salesAndSeo: {
        badge: "REVENUE ACCELERATION & SEARCH VISIBILITY",
        titlePrefix: "Supercharge Your Sales &",
        titleGradient: "DOMINATE SEARCH RANKINGS",
        titleSuffix: "Online",
        subtitle: "We combine ultra-fast web performance, targeted conversion rate optimization (CRO), and advanced Google SEO architecture to ensure your brand gets noticed and converts traffic into revenue.",
        highlight1Title: "Maximized Conversion & Sales Growth",
        highlight1Desc: "Persuasive UX and optimized checkout funnels that turn visitors into loyal customers.",
        highlight2Title: "Dominant #1 Google Search Positions",
        highlight2Desc: "Reach top rankings in Google with structured SEO metadata and instant search indexing.",
        highlight3Title: "Ultra-Fast Speed & High Engagement",
        highlight3Desc: "Sub-second page load speeds (100/100 Lighthouse) keeping users hooked and buying.",
        boostBtn: "Boost Your Sales & SEO Now",
        exploreBtn: "Explore Capabilities",
        modalTitle: "Explore Our Capabilities",
        modalSubtitle: "Discover how our features can transform your business",
        feature4Title: "Advanced Analytics Integration",
        feature4Desc: "Gain deep insights into user behavior and business metrics.",
        feature5Title: "Enterprise-Grade Security",
        feature5Desc: "Protect your data with industry-leading security standards.",
        feature6Title: "Infinite Scalability",
        feature6Desc: "Cloud-native architectures designed to grow seamlessly.",
        closeBtn: "Close"
      },
      mobileApp: {
        badge: "iOS & ANDROID MOBILE APP ENGINEERING",
        titlePrefix: "Bespoke Mobile Apps Published on",
        titleGradient: "APP STORE & GOOGLE PLAY",
        titleSuffix: "",
        subtitle: "Expand your brand into your customers' pockets. We engineer high-performance iOS and Android mobile applications, handling full design, architecture, and seamless publishing on the Apple App Store and Google Play Store.",
        feature1Title: "High-Performance iOS & Android Apps",
        feature1Desc: "Silky smooth mobile user interfaces with 60fps performance and modular architecture.",
        feature2Title: "Full Publishing on App Store & Google Play",
        feature2Desc: "We manage 100% of store compliance, approval guidelines, and global deployment.",
        feature3Title: "Push Notifications & Offline Capabilities",
        feature3Desc: "Re-engage customers in real-time with push alerts and offline data synchronization.",
        feature4Title: "Seamless API Integration",
        feature4Desc: "Connect the app with your existing systems and databases smoothly.",
        feature5Title: "Custom UI/UX Design",
        feature5Desc: "Pixel-perfect interfaces designed for maximum user friendliness.",
        feature6Title: "Highest Security Standard",
        feature6Desc: "Data encryption and security features that protect your users.",
        modalTitle: "Mobile Features",
        modalSubtitle: "Discover everything we offer for your app",
        closeBtn: "Close",
        buildBtn: "Build Your Mobile App Now",
        exploreBtn: "Explore Our Services"
      },
      whoWeAre: {
        badge: "WHO WE ARE",
        title: "Meet Our 5-Member Leadership Squad",
        subtitle: "We are an elite squad of senior architects, product designers, and security engineers dedicated to transforming complex digital products.",
        calloutTitle: "Want to partner directly with our 5 principal partners?",
        calloutSub: "Schedule a technical discovery session with our core team leaders today.",
        bookBtn: "Book Discovery Call",
        team: [
          {
            name: "Morteza",
            designation: "CEO & Founder",
            quote: "With years of experience building startups across various countries, I believe in creating products that truly solve global problems through innovation and resilience."
          },
          {
            name: "Bella",
            designation: "Head of Marketing & Advertising",
            quote: "Crafting compelling narratives and building strong brands is my passion. My long history in advertising has taught me how to connect products with the right audience."
          },
          {
            name: "Sam",
            designation: "Senior Full-Stack Web Developer",
            quote: "I've built robust applications and websites using diverse frameworks. My goal is always to deliver scalable, high-performance web solutions that exceed expectations."
          },
          {
            name: "Mina",
            designation: "Business Analyst & Advisor",
            quote: "Having consulted for major global corporations like Ericsson, I specialize in workflow optimization, strategic analysis, and driving measurable business growth."
          },
          {
            name: "Milad",
            designation: "Senior Full-Stack Developer",
            quote: "From complex backend architectures to seamless frontend interfaces, I thrive on engineering resilient software systems that power modern digital experiences."
          }
        ]
      },
      perspolisProject: {
        category: "FOOD & HOSPITALITY WEB APP",
        title: "Perspolis Restaurant Platform",
        desc: "Comprehensive digital web application engineered for Perspolis Restaurant featuring interactive digital menus, online table reservation system, multi-language UI, and sleek responsive design.",
        featuredBadge: "★ Featured Case Study",
        feature1: "Interactive Digital Menu & Customization",
        feature2: "Online Table Booking System",
        feature3: "Multi-Language & Theme Engine",
        previewBtn: "View Interactive Live Preview"
      },
      ffstechProject: {
        category: "BUILDING SYSTEMS & ENTERPRISE TECH",
        title: "FFSTECH Integrated Infrastructure Platform",
        desc: "High-performance digital enterprise application engineered for FFSTECH, featuring mission-critical building infrastructure management, intelligent fire & safety systems, smart access control, and low-voltage system architecture.",
        featuredBadge: "★ Featured Case Study",
        feature1: "Fire & Life Safety Ecosystems",
        feature2: "Smart Access Control & IP Surveillance",
        feature3: "Integrated AV & Communication Backbone",
        previewBtn: "View Interactive Live Preview"
      },
      dentistProject: {
        category: "DENTAL & HEALTHCARE WEB APP",
        title: "Tandläkaren – Dental Clinic Platform",
        desc: "Comprehensive digital healthcare web application engineered for Dental Clinics, featuring online patient appointment booking, interactive treatment overview, patient portal, and responsive multi-language design.",
        featuredBadge: "★ Featured Case Study",
        feature1: "Online Patient Appointment Booking",
        feature2: "Interactive Dental Care & Services",
        feature3: "Patient Portal & Fast Responsive UI",
        previewBtn: "View Interactive Live Preview"
      },
      shiraziProject: {
        category: "LEGAL & IMMIGRATION ADVISORY PLATFORM",
        title: "Shirazi Associates – Legal & Advisory Platform",
        desc: "High-end digital legal platform engineered for Shirazi Associates, specializing in corporate law, immigration advisory, online consultation scheduling, and a responsive multi-language portal.",
        featuredBadge: "★ Featured Case Study",
        feature1: "Online Consultation Booking & Legal Advisory",
        feature2: "Corporate Law & Visa Immigration Services",
        feature3: "Secure Case Handling & Multi-Language UX",
        previewBtn: "View Interactive Live Preview"
      },
      parsLawProject: {
        category: "LAW PRACTICE & LEGAL SERVICES WEB APP",
        title: "Pars Law Firm – Premium Legal Practice",
        desc: "Comprehensive digital enterprise web application crafted for Pars Law Firm, featuring client consultation scheduling, practice area overview, client case submission, and rapid responsive UI.",
        featuredBadge: "★ Featured Case Study",
        feature1: "Client Appointment Booking & Consultation",
        feature2: "Comprehensive Legal Practice Areas",
        feature3: "Rapid Performance & Trust-Building UX",
        previewBtn: "View Interactive Live Preview"
      },
      portfolioHero: {
        badge: "OUR PORTFOLIO & CASE STUDIES",
        pillTitle: "100% Customized Solutions",
        pillSubtitle: "Ideas for Every Business Model",
        titlePrefix: "Explore Our Diverse ",
        titleGradient: "PRODUCTION PROJECTS",
        titleSuffix: " & Custom Solutions",
        subtitle: "Explore our live projects built across multiple industries and fields. No matter your business model or niche, we engineer tailored ideas and high-performing digital applications built for scalable growth.",
        viewPillarsBtn: "Explore Our 6 Strategic Pillars",
        modalTitle: "Our 6 Pillars for Digital Success",
        modalSubtitle: "How we engineer high-performing applications tailored to your strategic business goals",
        feature1Title: "Custom Ideas for Every Business Model",
        feature1Desc: "Every industry requires a tailored strategy. We analyze your niche and construct dedicated concepts.",
        feature2Title: "Multi-Industry Diverse Portfolio",
        feature2Desc: "From Hospitality, E-Commerce, and FinTech to AI Engines and Enterprise SaaS Systems.",
        feature3Title: "Built for Revenue Growth & SEO Ranking",
        feature3Desc: "Sub-second load times and optimized UX engineered to rank #1 on Google and boost sales.",
        feature4Title: "Sub-Second Speed & Future-Proof Stack",
        feature4Desc: "We leverage cutting-edge tech stacks for ultra-fast loading, enterprise security, and seamless scalability.",
        feature5Title: "Enterprise Security & Quality Guarantee",
        feature5Desc: "Strict engineering discipline and robust architecture protecting your enterprise and user data 24/7.",
        feature6Title: "Dedicated Partnership & Ongoing Growth",
        feature6Desc: "We act as your long-term tech partner, supporting and scaling your digital products every step of the way.",
        exploreBtn: "Explore Portfolio",
        buildBtn: "Build Your Custom Product",
        ctaTitle: "Have a High-Impact Product in Mind?",
        ctaSubtitle: "Partner with our team to design, engineer, and deploy high-performing digital applications tailored to your business goals.",
        ctaBtn: "Build Your Product"
      },
      ourWork: {
        badge: "OUR LATEST WORK",
        titlePrefix: "Scale Your Business Through ",
        titleGradient: "Strategic Product Innovation",
        subtitle: "Transform your enterprise potential through high-performance software and precision user design.",
        bullet1: "4M+ Active Enterprise Users Supported",
        bullet2: "Sub-20ms Transaction & Analytics Performance",
        bullet3: "Tokenized Modular React Component Design System",
        explorePortfolio: "Explore Full Portfolio",
        startProject: "Start Your Project"
      },
      brandGrid: {
        badge: "BRAND & PRODUCT GALLERY",
        title: "Design Precision & Brand Collateral",
        subtitle: "Explore how we unify digital interfaces with physical collateral, tokenized design systems, and enterprise product branding.",
        requestKit: "Request Brand Kit"
      },
      testimonials: {
        badge: "CLIENT TESTIMONIALS & REVIEWS",
        title: "Trusted by 140+ Industry Leaders",
        rating: "5.0 / 5.0 Overall Rating",
        reviews: {
          r1: "RoshaLink transformed our legacy core banking dashboard into a sub-20ms micro-frontend architecture.",
          r2: "The design system provided by their team increased our multi-platform dev velocity by 300%.",
          r3: "Flawless zero-downtime execution. Their DevOps team built our multi-cloud deployment pipeline in record time.",
          r4: "Exceptional visual aesthetics combined with rigorous performance metrics. Highly recommended!",
          r5: "They integrated custom generative AI pipelines into our web application seamlessly.",
          r6: "The tokenized design system is so clean and easy to maintain across mobile and web teams.",
          r7: "ISO 27001 compliance and zero-trust security standards delivered without compromising user experience.",
          r8: "Conversion rate increased by 48% within two months of releasing the new UI redesign.",
          r9: "Outstanding engineering rigor. The real-time telemetry dashboard gives us complete operational visibility.",
          r10: "Working with their senior 5-member team felt like an inline extension of our own core founders.",
          r11: "Scaled our real-time tracking system to millions of concurrent requests effortlessly.",
          r12: "Beautiful UI design and bulletproof backend code. They exceeded all our corporate targets.",
          r13: "Sub-20ms latency maintained even under peak enterprise traffic spikes.",
          r14: "Pure visual perfection. The 3D animations and micro-interactions delight our users every day.",
          r15: "Delivered our complex web application ahead of schedule with 100% test coverage.",
          r16: "The design system simplified our internationalization efforts across 12 languages.",
          r17: "Intuitive dashboards for complex AI algorithms. Our users love the new experience.",
          r18: "Highest level of professionalism and technical competence. A true 5-star partner.",
          r19: "Extremely clean code structure. Their React & Vite architecture made onboarding new devs a breeze.",
          r20: "They transformed our brand identity and web application into an industry benchmark."
        }
      },
      ctaBanner: {
        title: "Ready to Build Your Next High-Impact Product?",
        subtitle: "Schedule a strategy call with our principal design & engineering team today.",
        button: "Initiate Strategic Brief"
      },
      footer: {
        brandRosha: "ROSHA",
        brandLink: "LINK",
        description: "Bridging the gap between rigorous business analysis and cutting-edge product development.",
        navigation: "Navigation",
        capabilities: "Capabilities",
        stayUpdated: "Stay Updated",
        newsletterSub: "Get quarterly strategic insights and technical briefs.",
        emailPlaceholder: "Enter work email",
        subscribe: "Subscribe",
        rights: "© 2026 RoshaLink. All rights reserved."
      },
      modal: {
        badge: "INITIATE PROJECT DISCOVERY",
        title: "Start Your Project",
        subtitle: "Direct discovery call with our 5 principal partners.",
        name: "Name",
        email: "Work Email",
        focus: "Primary Focus",
        budget: "Est. Budget Range",
        overview: "Brief Overview",
        submit: "Submit Discovery Request",
        submittedTitle: "Brief Submitted!",
        submittedSub: "Thank you for initiating your brief. Our senior leadership team will contact you within 4 hours.",
        done: "Done",
        sending: "Sending...",
        error: "We couldn't send your request. Please try again in a moment."
      },
      chat: {
        badge: "AI ASSISTANT",
        title: "Rosha AI Assistant",
        status: "Online",
        hoverLabel: "Chat with Rosha",
        greeting: "Hi! I'm Rosha. How can I help you with your project today?",
        placeholder: "Type a message...",
        send: "Send message",
        close: "Close chat",
        typing: "Rosha is typing",
        retry: "Try again",
        cta: "Book a free discovery call",
        disclaimer: "Rosha is an AI assistant and can make mistakes.",
        errorNetwork: "I couldn't reach the server. Please check your connection and try again.",
        errorRateLimit: "You're sending messages a little too quickly. Please wait a moment and try again.",
        errorTooLong: "That message is too long. Could you shorten it a little?",
        errorGeneric: "Something went wrong on my end. Please try again in a moment."
      },
      privacyPolicy: {
        toggleShort: "Short Version (Quick Read)",
        toggleFull: "Full Legal Policy",
        dpoBadge: "Data Protection Officer (DPO)",
        dpoTitle: "Questions about GDPR or data privacy?",
        dpoText: "Our privacy engineering team normally responds within 24 hours. Reach out directly at privacy@roshalink.com.",
        dpoBtn: "Contact DPO",
        shortTitle: "Privacy Policy Short Summary (Quick Read)",
        shortPoints: [
          { title: "Data Privacy First", desc: "We respect your privacy and protect your personal data in full compliance with EU GDPR and the Swedish Data Protection Act (2018:218)." },
          { title: "Data We Collect", desc: "Contact details, account credentials, technical log data, and support communications." },
          { title: "Zero Data Selling", desc: "We NEVER sell your personal data to third parties under any circumstances." },
          { title: "Secure Integration", desc: "We integrate 250+ cloud infrastructure and AI tools bound by strict Data Processing Agreements (DPAs)." },
          { title: "Your Rights", desc: "You have full rights to access, rectify, request erasure ('right to be forgotten'), or port your personal data." },
          { title: "Contact", desc: "For privacy inquiries, email our Privacy Officer at privacy@roshalink.com." }
        ],
        badge: "GDPR & DATA PROTECTION ACT",
        fullTitle: "Privacy Policy (Full Legal Version)",
        updated: "Last Updated: August 10, 2026",
        subtitle: "We are committed to safeguarding your personal data with the highest security standards, full transparency, and full compliance with the EU General Data Protection Regulation (GDPR).",
        fullSections: [
          { num: "1", title: "1. Introduction", icon: "ShieldCheck", text: `This Privacy Policy ("Policy") explains how RoshaLink / Diara ("Company", "we", "us", or "our") collects, uses, stores, shares, and protects personal data in connection with our IT development, software applications, infrastructure services, and integrated digital platforms.\n\nWe are committed to respecting your privacy and protecting your personal data in full compliance with Regulation (EU) 2016/679 ("GDPR"), the Swedish Data Protection Act (Lag 2018:218), and all applicable laws.\n\nBy using our services, accessing our applications, or entering into a contract with us, you acknowledge that you have read and understood this Privacy Policy.` },
          { num: "2", title: "2. Personal Data We Collect", icon: "FileText", text: `We collect only personal data strictly necessary to fulfill contractual and legal obligations, maintain system security, and operate and enhance IT services:\n\n• Contact & Identity Data: Name, email address, phone number, job title, company name, billing address, IP address.\n• Account & Authentication Data: Usernames, encrypted passwords, security logs, authentication tokens, user preferences.\n• Technical Logs & Device Data: IP addresses, browser type, OS, resolution, timestamps, crash reports, performance metrics.\n• Communication Data: Messages, support tickets, inquiries sent via email, contact forms, or AI widgets (Diara AI Assistant).\n• Integration & Telemetry Data: Telemetry and interaction logs generated during software and platform execution.` },
          { num: "3", title: "3. How We Use Your Information", icon: "CheckCircle2", text: `We process personal data for explicit, legitimate purposes:\n\n1. Service Delivery & Operation: Deliver, configure, maintain, and administer software solutions, websites, and user accounts.\n2. Customer Support & Communication: Process support tickets, send technical notices, updates, and administrative news.\n3. Security & System Integrity: Monitor infrastructure stability, prevent unauthorized access, mitigate cyber threats, perform debugging.\n4. Optimization of Integrated Workflows: Ensure flawless functionality across workflows integrating 250+ cloud infrastructure services, AI platforms, and design tools.\n5. Analytics & Product Enhancement: Analyze usage trends, optimize UI performance, and build new capabilities.\n6. Legal Compliance: Comply with statutory duties under financial accounting laws, tax regulations, and lawful authority requests.` },
          { num: "4", title: "4. Legal Bases for Processing", icon: "Scale", text: `We process personal data based on Article 6 GDPR legal grounds:\n\n• Performance of a Contract (Art. 6.1(b) GDPR): Necessary to execute or perform a contract with you or your entity.\n• Legal Obligation (Art. 6.1(c) GDPR): Necessary to comply with statutory legal duties (e.g., Swedish Bookkeeping Act 1999:1078).\n• Legitimate Interests (Art. 6.1(f) GDPR): Based on legitimate interests in providing secure, high-performance IT solutions and preventing fraud.\n• Consent (Art. 6.1(a) GDPR): Where required by law (e.g., non-essential cookies), we obtain prior explicit consent. You may withdraw consent at any time.` },
          { num: "5", title: "5. Data Sharing & Third-Party Integrations", icon: "Server", text: `We NEVER sell your personal data.\n\nAs an advanced IT development firm, we seamlessly integrate 250+ cloud services, AI platforms, database systems, CDN providers, and design software tools.\n\nWe share data only with:\n• Processors & Cloud Providers: Cloud infrastructure (AWS, Google Cloud), AI APIs (OpenAI, Anthropic), analytics and monitoring tools bound by strict DPAs (Art. 28 GDPR).\n• Public Authorities: When mandated by applicable law, court order, or lawful authority request.\n• Professional Advisors: Legal counsel, auditors, and financial accountants bound by confidentiality obligations.` },
          { num: "6", title: "6. International Data Transfers", icon: "Globe", text: `Our servers and vendors may be located both inside and outside the European Economic Area (EEA).\n\nWhenever data is transferred outside the EEA to countries lacking an EU adequacy decision, we enforce Chapter V GDPR safeguards:\n• Executing European Commission approved Standard Contractual Clauses (SCCs) under Art. 46 GDPR.\n• Verifying certification under the EU-U.S. Data Privacy Framework.\n• Implementing technical safeguards like end-to-end encryption and pseudonymization.` },
          { num: "7", title: "7. Data Retention", icon: "Clock", text: `We retain personal data only for as long as necessary or legally required:\n\n• Customer & Contractual Data: Retained for the contract duration plus up to 7 years post-termination (Swedish Bookkeeping Act 1999:1078).\n• Technical Logs & Security Audits: Retained for 30 days to 12 months, then automatically purged or anonymized.\n• Support & Correspondence: Retained for up to 3 years following ticket resolution.\n\nExpired data is permanently deleted or rendered strictly anonymous.` },
          { num: "8", title: "8. Your Rights Under GDPR", icon: "KeyRound", text: `Under GDPR, data subjects possess the following rights:\n\n• Right of Access (Art. 15): Request confirmation of processing and obtain a copy of your personal data.\n• Right to Rectification (Art. 16): Request correction of inaccurate or incomplete personal data.\n• Right to Erasure / "Right to be Forgotten" (Art. 17): Request deletion of personal data under statutory conditions.\n• Right to Restriction (Art. 18): Request limitation of processing activities.\n• Right to Data Portability (Art. 20): Receive personal data in a structured, machine-readable format.\n• Right to Object (Art. 21): Object to processing based on legitimate interests or direct marketing.\n• Right to Lodge a Complaint: File a complaint with the lead supervisory authority (Integritetsskyddsmyndigheten - IMY, www.imy.se).` },
          { num: "9", title: "9. Cookies and Tracking Technologies", icon: "Eye", text: `We utilize cookies to guarantee website stability, evaluate performance metrics, and enhance user navigation:\n\n• Essential Cookies: Mandatory for security, authentication, and core functionality. Cannot be disabled.\n• Analytics & Performance Cookies: Collect anonymized usage statistics to optimize speed and rendering.\n• Functional Cookies: Store preferences like language and theme configurations.\n\nYou may adjust or revoke cookie consent at any time via browser settings.` },
          { num: "10", title: "10. Security Measures", icon: "Lock", text: `We enforce robust technical and organizational security controls:\n\n• Encryption: Data in transit is protected via TLS 1.3; data at rest is encrypted using AES-256 standards.\n• Access Control: Zero-Trust architecture and Principle of Least Privilege (PoLP) strictly enforced across all accounts.\n• Security Hardening: Automated vulnerability scanning, intrusion detection systems, alignment with ISO 27001 standards.` },
          { num: "11", title: "11. Contact Information", icon: "Mail", text: `For privacy inquiries or exercising GDPR rights, contact our Privacy Officer:\n\n• Entity: RoshaLink / Diara IT Infrastructure\n• Privacy Email: privacy@roshalink.com / hello@designlogic.agency\n• Website: https://roshalink.com\n• Address: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland` },
          { num: "12", title: "12. Changes to This Privacy Policy", icon: "RefreshCw", text: `We reserve the right to revise this Privacy Policy to reflect technical advancements, legal updates, or operational changes.\n\nMaterial revisions will be notified via prominent website banners or email prior to taking effect.` }
        ]
      },
      servicesPage: {
        hero: {
          titlePrefix: "We Build What You ",
          titleGradient: "Actually Need",
          titleSuffix: "",
          subtitle: "No templates, no fluff. We take time to understand your business, then build exactly what makes sense — web, mobile, or AI — properly and built to last.",
          primaryCta: "Let's Talk",
          secondaryCta: "See What We Do",
          floatingPillTitle: "Cloud-native & built to scale",
          floatingPillSubtitle: "Fast, secure, and ready for growth",
          metric1Value: "100/100",
          metric1Label: "Google Lighthouse & SEO",
          metric2Value: "< 20ms",
          metric2Label: "Global response speed",
          metric3Value: "ISO 27001",
          metric3Label: "Secure & reliable",
          metric4Value: "5 Seniors",
          metric4Label: "You talk directly to who builds it"
        },
        servicesSection: {
          title: "6 Things We're Really Good At",
          subtitle: "Whether you're a startup or a scaling company — we have the tools and experience to get you where you want to go.",
          deliverablesLabel: "What you get:",
          techTagsLabel: "Technologies we use:"
        },
        servicesList: [
          {
            id: "discovery",
            category: "BUSINESS STRATEGY",
            title: "Strategic Business Discovery & Architecture Mapping",
            desc: "We analyze your revenue models, user journeys, and technical bottlenecks before writing a single line of code to guarantee maximum ROI and tangible business impact.",
            deliverables: [
              "In-depth business model & workflow mapping",
              "Technical feasibility & architecture blueprint",
              "Data modeling & API interface specifications",
              "Strategic product roadmap & timeline estimates"
            ],
            techTags: ["System Mapping", "Figma Design Tokens", "Data Modeling", "ROI Analysis"]
          },
          {
            id: "web-architecture",
            category: "FRONTEND & WEB",
            title: "Bespoke Web Architecture & React Engineering",
            desc: "Ultra-fast web applications and enterprise portals engineered with clean React code, modular tokenized components, and 100/100 Google Lighthouse optimization.",
            deliverables: [
              "Bespoke Single Page Apps (SPA) & Portals",
              "Tokenized UI/UX Design Systems",
              "WCAG 2.1 AA Accessibility & Responsiveness",
              "100/100 Core Web Vitals & Search Indexing"
            ],
            techTags: ["React 19", "Vite", "Tailwind / CSS Tokens", "Framer Motion"]
          },
          {
            id: "cloud-backend",
            category: "BACKEND & INFRASTRUCTURE",
            title: "Enterprise Backend & Microservices Architecture",
            desc: "Resilient server architectures, distributed databases, and event-driven API pipelines with sub-20ms transaction speeds and 99.99% guaranteed uptime.",
            deliverables: [
              "Event-driven microservices & REST/GraphQL APIs",
              "PostgreSQL, Redis & NoSQL Database Architecture",
              "ISO 27001 Security & Zero-Trust Authentication",
              "Automated CI/CD Deployment Pipelines & Docker"
            ],
            techTags: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP"]
          },
          {
            id: "ai-automation",
            category: "AI & INTELLIGENCE",
            title: "AI Automation & Intelligent Data Pipelines",
            desc: "Integrate bespoke AI models, autonomous task agents, and intelligent data ingestion pipelines that eliminate hundreds of hours of manual operational overhead.",
            deliverables: [
              "Custom LLM & RAG Systems (OpenAI, Gemini, Anthropic)",
              "Intelligent Enterprise Assistants & Autonomous Agents",
              "Automated data ingestion & processing pipelines",
              "Predictive analytics & intelligent executive dashboards"
            ],
            techTags: ["OpenAI API", "Gemini", "RAG / Vector DB", "Python Automation"]
          },
          {
            id: "mobile-apps",
            category: "MOBILE APPS",
            title: "Cross-Platform Mobile Applications (iOS & Android)",
            desc: "Seamless mobile applications with native execution performance, real-time backend synchronization, biometric authentication, and intuitive UX.",
            deliverables: [
              "Cross-platform iOS & Android mobile apps",
              "Real-time WebSocket & data synchronization",
              "Biometric security & offline-first capability",
              "App Store & Google Play production deployment"
            ],
            techTags: ["React Native", "Expo", "WebSockets", "Push Notifications"]
          },
          {
            id: "seo-performance",
            category: "PERFORMANCE & SEO",
            title: "Organic SEO Engineering & Global Edge CDN",
            desc: "Top rankings on Google and global low-latency distribution through structured semantic HTML, automated schema markup, and high-performance CDN routing.",
            deliverables: [
              "Structured JSON-LD & Rich Search Schema Markup",
              "Global Cloudflare Edge CDN & Smart Caching",
              "Automated XML Sitemap & Search Console indexing",
              "Conversion rate optimization (CRO) & A/B testing"
            ],
            techTags: ["SEO Schema", "Cloudflare CDN", "Lighthouse 100", "Analytics"]
          }
        ],
        techMatrix: {
          title: "Our Enterprise Technology Stack",
          subtitle: "We intentionally select the most robust, battle-tested modern technologies to build platforms engineered to scale.",
          tabFrontend: "Frontend & Design",
          tabBackend: "Backend & Data",
          tabAi: "AI & Automation",
          tabCloud: "Cloud & Security",
          frontend: [
            { title: "React 19 & Vite", desc: "Next-gen component lifecycle, sub-second HMR, and ultra-fast client rendering with zero unnecessary overhead." },
            { title: "Framer Motion & WebGL", desc: "Hardware-accelerated 60fps micro-animations and physics-based interactions for delightful user flow." },
            { title: "Tokenized Design Systems", desc: "Strict design tokens with full multi-theme light/dark mode support and seamless responsive scaling." },
            { title: "Vanilla CSS & Tailwind", desc: "Zero-runtime bloat, clean modular layout rules, and strict CSS architecture for optimal rendering." }
          ],
          backend: [
            { title: "Node.js & Microservices", desc: "High-concurrency async runtime engineered for microservices with sub-20ms low-latency transaction pipelines." },
            { title: "PostgreSQL & Prisma", desc: "Robust ACID-compliant relational data modeling with automated type-safe database migrations." },
            { title: "Redis & Upstash", desc: "Distributed in-memory caching with sub-millisecond latency, distributed rate limiting, and pub/sub queues." },
            { title: "WebSockets & Telemetry", desc: "Bidirectional live synchronization streams with instant continuous event monitoring and telemetry." }
          ],
          ai: [
            { title: "Custom LLM Integrations", desc: "Tailored integration with OpenAI, Claude, and Gemini for domain-specific business intelligence." },
            { title: "RAG & Vector Databases", desc: "Contextual semantic document search and zero-hallucination enterprise knowledge retrieval." },
            { title: "Autonomous Task Agents", desc: "Multi-agent workflows autonomously executing multi-step business operations without human lag." },
            { title: "Python Data Pipelines", desc: "Automated data ingestion, sanitization, and structured transformation pipelines for analytics." }
          ],
          cloud: [
            { title: "Docker & Containerization", desc: "Isolated, reproducible development and production container environments for effortless deployment." },
            { title: "AWS & Cloudflare Edge", desc: "Global edge serverless execution across 300+ cities with enterprise-grade DDoS shielding." },
            { title: "ISO 27001 & Security", desc: "End-to-end AES-256 encryption, TLS 1.3, and strict Zero-Trust access policies across all infrastructure." },
            { title: "Automated CI/CD", desc: "Zero-downtime automated test suites, linting, and instant deployment pipelines via GitHub Actions." }
          ]
        },
        process: {
          title: "How We Work — Step by Step",
          subtitle: "A clear, honest process where you always know what's happening — and why.",
          stageBadge1: "STEP 01 — WE LISTEN & PLAN",
          stageBadge2: "STEP 02 — WE DESIGN TOGETHER",
          stageBadge3: "STEP 03 — WE BUILD IT RIGHT",
          stageBadge4: "STEP 04 — WE LAUNCH & SUPPORT",
          step1Num: "01",
          step1Title: "We Understand Your Needs",
          step1Desc: "We sit down with you, listen carefully, and map exactly what you need — before writing a single line of code.",
          step1Tags: ["Business goals & analysis", "Technical planning", "Data & API design"],
          step2Num: "02",
          step2Title: "Design & Prototype",
          step2Desc: "You'll see how the product looks and feels before we build it — and you can shape every detail along the way.",
          step2Tags: ["Clickable Figma prototype", "Design that fits your brand", "Tested against real use cases"],
          step3Num: "03",
          step3Title: "We Build What You've Approved",
          step3Desc: "Our 5 senior partners write all the code themselves — clean, fast, and without shortcuts.",
          step3Tags: ["Custom React code", "AI integration if needed", "Scalable architecture"],
          step4Num: "04",
          step4Title: "Launch & Go Live",
          step4Desc: "We test everything thoroughly and deploy globally — without a single minute of downtime.",
          step4Tags: ["100/100 Lighthouse", "Security review", "Global CDN & 99.99% uptime"],
          nextStage: "Next Step",
          stageCounter: "Step {{current}} of {{total}}"
        },
        comparison: {
          title: "Why RoshaLink — and not a regular agency?",
          subtitle: "No judgment, just honesty. Here's what the difference looks like in practice.",
          featureCol: "What we compare",
          agencyCol: "Typical Agency",
          roshaCol: "RoshaLink",
          f1: "Who does the work?",
          f1Agency: "Junior devs with a salesperson in between",
          f1Rosha: "5 senior founders — they code directly",
          f2: "How is it built?",
          f2Agency: "WordPress templates and purchased themes",
          f2Rosha: "Clean, custom React & Node.js code",
          f3: "How fast is it?",
          f3Agency: "Slow (2–5 seconds), poor scores",
          f3Rosha: "Lightning fast (< 20ms), 100/100 Lighthouse",
          f4: "Who owns the code?",
          f4Agency: "Unsafe plugins, unclear ownership",
          f4Rosha: "You own everything — 100% from day one",
          f5: "What does pricing look like?",
          f5Agency: "Hidden hourly costs that creep up",
          f5Rosha: "Fixed price, clear scope, no surprises"
        },
        faq: {
          title: "Common questions — answered honestly",
          subtitle: "No sales talk, no jargon. Just straight answers to what you actually want to know.",
          q1: "How quickly can we get started?",
          a1: "Usually within 48 hours of our first call, we're already planning and scoping. You talk directly to the people who build it — no middlemen.",
          q2: "Do you use ready-made templates?",
          a2: "Never. We build everything from scratch, tailored to you. That means a faster site, better security, and full flexibility going forward.",
          q3: "Who actually writes the code?",
          a3: "We do — the 5 of us, directly and personally. We never outsource to juniors or outside contractors.",
          q4: "Who owns the code and my data?",
          a4: "You own everything from day one — all source code, designs, and rights. 100% yours. We follow ISO 27001 and GDPR.",
          q5: "Is there support after launch?",
          a5: "Absolutely. We offer ongoing maintenance, 24/7 monitoring, and keep developing your product as your business grows."
        },
        cta: {
          title: "Ready to take the next step?",
          subtitle: "Book a quick call with us — no obligations. We'll listen, ask the right questions, and tell you honestly what we can do for you.",
          button: "Book a Call Today"
        }
      }
    }
  },
  fa: {
    translation: {
      aboutPage: {
        teamPerspectives: {
          badge: "دیدگاه‌های استراتژیک و رهبری فنی",
          title: "همکاری مستقیم با تیم اصلی و تضمین رشد پایدار",
          titlePrefix: "رهبری مستقیم بنیان‌گذاران در مسیر ",
          titleGradient: "نوآوری و رشد سازمانی",
          titleSuffix: "",
          subtitle: "چگونه ۵ پارتنر ارشد روشالینک اصطکاک محصولات را حذف کرده و راهکارهای سودآور خلق می‌کنند.",
          morteza: {
            quote: "معماری نرم‌افزار باید مستقیماً در خدمت افزایش درآمد و اهداف تجاری باشد. ما با کدنویسی کاملاً اختصاصی و بدون قالب، بدهی فنی را از روز اول حذف می‌کنیم.",
            name: "مرتضی",
            role: "مدیرعامل و معمار ارشد سیستم"
          },
          bella: {
            quote: "طراحی استثنایی UI/UX دقت فنی را با ارتباط عاطفی کاربران پیوند می‌دهد و نرخ تبدیل و وفاداری به برند شما را به اوج می‌رساند.",
            name: "بلا",
            role: "مدیر ارشد محصول و برندینگ"
          },
          sohrab: {
            quote: "زیرساخت‌های توزیع‌شده ابری با زمان پاسخ زیر ۲۰ میلی‌ثانیه و آپ‌تایم ۹۹.۹۹٪ تضمین می‌کنند پلتفرم شما زیر سنگین‌ترین ترافیک‌ها هم پایدار بماند.",
            name: "سام",
            role: "مهندس ارشد فول‌استک و کلاد"
          },
          mina: {
            quote: "با تجربه مشاوره برای غول‌های جهانی مانند اریکسون، اطمینان دارم که تحلیل دقیق فرآیندهای کسب‌وکار قبل از کدنویسی از ماه‌ها دوباره‌کاری جلوگیری می‌کند.",
            name: "مینا",
            role: "تحلیل‌گر ارشد کسب‌وکار و مشاور"
          },
          milad: {
            quote: "از بهینه‌سازی دیتابیس تا رابط‌های کاربری روان و پرسرعت، کد تمیز و مقیاس‌پذیر ستون فقرات هر اپلیکیشن پیشرو است.",
            name: "میلاد",
            role: "مهندس ارشد فول‌استک و سیستم"
          },
          synergy: {
            quote: "هم‌افزایی میان تحلیل عمیق بیزینس و مهندسی ارشد نرم‌افزار، مزیتی رقابتی و دست‌نیافتنی برای مشتریان ما خلق می‌کند.",
            name: "بلا",
            role: "مدیر ارشد محصول و برندینگ"
          },
          guarantee: {
            quote: "ما هیچ پروژه‌ای را به نیروهای کم‌تجربه برون‌سپاری نمی‌کنیم. شما مستقیماً با ۵ پارتنر ارشد که خود کد را می‌نویسند کار می‌کنید.",
            name: "مرتضی",
            role: "مدیرعامل و معمار ارشد نرم‌افزار"
          }
        },
        hero: {
          badge: "درباره ما و چشم‌انداز روشالینک",
          titlePrefix: "طراحی و مهندسی ",
          titleGradient: "نسل آینده",
          titleSuffix: " محصولات دیجیتال و هوش مصنوعی",
          subtitle: "ما تیمی نخبه از معماران نرم‌افزار، طراحان محصول و تحلیل‌گران ارشد کسب‌وکار هستیم که تحلیل دقیق تجاری را با برنامه‌نویسی اختصاصی برای رشد حداکثری شما ترکیب می‌کنیم.",
          stats: {
            stat1Val: "۱۰۰٪",
            stat1Label: "کدنویسی کاملاً اختصاصی",
            stat1Sub: "بدون استفاده از قالب‌های آماده",
            stat2Val: "۹۹.۹۹٪",
            stat2Label: "پایداری و آپ‌تایم سیستم",
            stat2Sub: "زیرساخت ابری مدرن و پایدار",
            stat3Val: "کمتر از ۲۰ms",
            stat3Label: "سرعت پاسخگویی و لود",
            stat3Sub: "امتیاز ۱۰۰/۱۰۰ گوگل و لایت‌هاوس",
            stat4Val: "۵+",
            stat4Label: "معمار و پارتنر ارشد",
            stat4Sub: "همکاری مستقیم بدون واسطه"
          }
        },
        teamShowcase: {
          badge: "تیم راهبری و پارتنرها",
          title: "با تیم متخصص و خلاق ما آشنا شوید",
          titlePrefix: "با تیم متخصص و ",
          titleGradient: "پارتنرهای ارشد ما",
          titleSuffix: " آشنا شوید",
          description: "ما تیمی منسجم از معماران نرم‌افزار، طراحان محصول و مهندسان ارشد هستیم که با تعهد و تخصص، ایده‌های شما را به محصولات دیجیتال قدرتمند، چشم‌نواز و مقیاس‌پذیر تبدیل می‌کنیم.",
          button: "رزرو جلسه استراتژیک با تیم",
          members: [
          {
                    "name": "سام",
                    "role": "مهندس ارشد فول‌استک و کلاد",
                    "tag": "معماری وب و زیرساخت ابری",
                    "quote": "تخصص من توسعه اپلیکیشن‌های مقیاس‌پذیر و زیرساخت‌های پایدار ابری است. هدف همیشگی من ارائه کدی سریع، بهینه و فراتر از انتظارات است."
          },
          {
                    "name": "بلا",
                    "role": "مدیر ارشد محصول و برندینگ",
                    "tag": "طراحی UI/UX و هدایت خلاقانه",
                    "quote": "خلق داستان‌های ماندگار برند و طراحی رابط‌های کاربری جذاب تخصص من است؛ ما محصول شما را به بهترین شکل به مخاطبان هدف متصل می‌کنیم."
          },
          {
                    "name": "مرتضی",
                    "role": "مدیرعامل و معمار ارشد نرم‌افزار",
                    "tag": "هوش مصنوعی و معماری سیستم",
                    "quote": "با سال‌ها تجربه در راه‌اندازی استارتاپ‌ها در کشورهای مختلف، باور دارم که نرم‌افزار باید مسائل واقعی کسب‌وکارها را با نوآوری و مهندسی دقیق حل کند."
          },
          {
                    "name": "مینا",
                    "role": "تحلیل‌گر ارشد کسب‌وکار و مشاور",
                    "tag": "سابقه اریکسون و استراتژی رشد",
                    "quote": "با تجربه مشاوره برای غول‌های جهانی فناوری مانند اریکسون، روی بهینه‌سازی جریان کار، تحلیل استراتژیک و افزایش درآمد تمرکز دارم."
          },
          {
                    "name": "میلاد",
                    "role": "مهندس ارشد فول‌استک و سیستم",
                    "tag": "توسعه بک‌اند و پایگاه داده",
                    "quote": "از معماری‌های پیچیده سمت سرور تا رابط‌های کاربری فوق‌سریع، اشتیاق من مهندسی سیستم‌های پایدار و قدرتمند برای وب مدرن است."
          }
]
        },
        missionBento: {
          badge: "فلسفه و استانداردهای ما",
          title: "چرا روشالینک به شکلی متفاوت می‌سازد؟",
          titlePrefix: "چرا روشالینک به شکلی ",
          titleGradient: "کاملاً متفاوت می‌سازد؟",
          titleSuffix: "",
          subtitle: "ما بدهی‌های فنی را حذف می‌کنیم و نرم‌افزاری مقیاس‌پذیر برای آینده سازمان شما می‌سازیم.",
          card1Badge: "تحلیل کسب‌وکار پیش از کدنویسی",
          card1Title: "استراتژی",
          card1Desc: "بسیاری از سازمان‌ها با سیستم‌های کند و قالب‌های آماده ناکارآمد دست‌وپنجه نرم می‌کنند. ما ابتدا مدل کسب‌وکار شما را تحلیل کرده و راهکاری سفارشی خلق می‌کنیم.",
          card2Badge: "آپ‌تایم و امنیت پایدار",
          card2Title: "عملکرد",
          card2Desc: "معماری ماژولار و رویدادمحور با استاندارد امنیتی ISO 27001 و سرعت پاسخ کمتر از ۲۰ میلی‌ثانیه برای تضمین عملکرد بی‌وقفه.",
          card3Badge: "همکاری مستقیم با تیم اصلی",
          card3Title: "مشارکت",
          card3Desc: "بدون برون‌سپاری یا واسطه؛ شما مستقیماً با ۵ پارتنر و معمار ارشد سیستم در ارتباط هستید که خود کدنویسی پروژه را انجام می‌دهند.",
          card4Badge: "هوش مصنوعی و آینده‌نگری",
          card4Title: "اتوماسیون",
          card4Desc: "ادغام مدل‌های اختصاصی هوش مصنوعی و فرآیندهای خودکار برای صرفه‌جویی در صدها ساعت کار دستی و افزایش بهره‌وری کسب‌وکار شما.",
        },
        methodology: {
          badge: "متدولوژی و فرآیند ما",
          title: "از ایده تا تحویل بی‌نقص در ۴ گام مهندسی‌شده",
          titlePrefix: "از ایده تا تحویل بی‌نقص در ",
          titleGradient: "۴ گام مهندسی‌شده",
          titleSuffix: "",
          subtitle: "فرآیندی شفاف، سریع و آزموده‌شده برای تولید نرم‌افزارهای مدرن در بالاترین سطح کیفی.",
          step1Num: "۰۱",
          step1Title: "تحلیل استراتژیک و کشف نیازمندی‌ها",
          step1Desc: "بررسی عمیق مدل درآمدی، پرسونای مخاطبان، جریان‌های کاری و معماری داده‌های پروژه.",
          step2Num: "۰۲",
          step2Title: "دیزاین سیستم ماژولار و پروتوتایپ",
          step2Desc: "طراحی رابط کاربری مدرن، سیستم توکنایز شده و پروتوتایپ‌های تعاملی قبل از کدنویسی.",
          step3Num: "۰۳",
          step3Title: "توسعه نرم‌افزار کاملاً اختصاصی",
          step3Desc: "برنامه‌نویسی تمیز با React، وب‌سرویس‌های ابری و فرانت‌اند بدون استفاده از هیچ قالب عمومی.",
          step4Num: "۰۴",
          step4Title: "بهینه‌سازی لایت‌هاوس و استقرار جهانی",
          step4Desc: "دستیابی به امتیاز ۱۰۰/۱۰۰ سرعت و سئو، امنیت ایزو و استقرار در شبکه‌های ابری جهانی."
        },
        values: {
          badge: "اصول و ارزش‌های کلیدی",
          title: "اصولی که در هر خط کد پایبند آن هستیم",
          subtitle: "استاندارد کیفی سخت‌گیرانه ما برای تضمین موفقیت پروژه‌های سازمان شما.",
          v1Title: "توسعه کاملاً سفارشی",
          v1Desc: "هر کامپوننت و ساختار داده‌ها به صورت صفر تا صد و متناسب با برند شما برنامه‌نویسی می‌شود.",
          v2Title: "امنیت داده و Zero Trust",
          v2Desc: "رعایت استانداردهای بین‌المللی ISO 27001 و حفظ حریم خصوصی در تمامی لایه‌های نرم‌افزار.",
          v3Title: "تاثیر ملموس بر درآمد",
          v3Desc: "موفقیت ما با افزایش فروش، کاهش نرخ پرش، سرعت لود بالا و رشد مشتریان شما سنجیده می‌شود.",
          v4Title: "شفافیت و همکاری پویا",
          v4Desc: "ارتباط پیوسته و لحظه‌ای با مهندسان ارشد در تمام مراحل اسپرینت‌ها و توسعه محصول.",
          v5Title: "سرعت برق‌آسا و سئو عالی",
          v5Desc: "کدنویسی بهینه با زمان لود زیر ۱ ثانیه و رتبه‌بندی صدر جدول در نتایج جستجوی گوگل.",
          v6Title: "پشتیبانی و همراهی بلندمدت",
          v6Desc: "ما به عنوان بازوی فنی سازمان شما، به طور مداوم محصول را ارتقا داده و پشتیبانی می‌کنیم."
        },
        awards: {
          "sectionTitle": "جوایز و افتخارات بین‌المللی",
          "titlePrefix": "جوایز و ",
          "titleGradient": "افتخارات بین‌المللی",
          "titleSuffix": "",
          "sectionSubtitle": "تعهد بی‌وقفه ما به برتری فنی، معماری بی‌نقص نرم‌افزار و طراحی محصول در کلاس جهانی.",
          "a1": {
                  "title": "برترین معماری وب و کلاد",
                  "subtitle": "جایزه جهانی کلاد و مقیاس‌پذیری ۲۰۲۵",
                  "recipient": "تیم معماری سیستم روشالینک",
                  "date": "۲۰۲۵",
                  "level": "gold"
          },
          "a2": {
                  "title": "نوآوری فول‌استک سازمانی",
                  "subtitle": "افتخار سرعت و پایداری سیستم‌های توزیع‌شده",
                  "recipient": "دپارتمان مهندسی روشالینک",
                  "date": "۲۰۲۵",
                  "level": "platinum"
          },
          "a3": {
                  "title": "برترین طراحی UI/UX محصول",
                  "subtitle": "افتخار برتر تجربه دیجیتال و دیزاین نوردیک",
                  "recipient": "استودیو طراحی محصول روشالینک",
                  "date": "۲۰۲۴ - ۲۰۲۵",
                  "level": "gold"
          },
          "a4": {
                  "title": "نوآوری هوش مصنوعی و وب‌اپ",
                  "subtitle": "پلتفرم سال نسل بعد برای وب و موبایل سازمانی",
                  "recipient": "آزمایشگاه نوآوری روشالینک",
                  "date": "۲۰۲۵",
                  "level": "platinum"
          }
},
          cta: {
          badge: "همکاری با روشالینک",
          title: "آماده‌اید محصول برتر بعدی خود را با تیم رهبری ما بسازید؟",
          titlePrefix: "آماده‌اید محصول برنده بعدی خود را با ",
          titleGradient: "تیم رهبری ما",
          titleSuffix: " بسازید؟",
          subtitle: "همین امروز یک جلسه استراتژیک با ۵ پارتنر ارشد ما رزرو کنید تا مسیر تحول دیجیتال کسب‌وکارتان را ترسیم کنیم.",
          button: "رزرو جلسه استراتژیک اکنون"
        }
      },
      nav: {
        home: "خانه",
        portfolio: "نمونه‌کارها",
        services: "خدمات",
        about: "درباره ما",
        contact: "تماس با ما",
        getStarted: "شروع کنید"
      },
      hero: {
        badge: "تحول دیجیتال کسب‌وکار و معماری هوش مصنوعی",
        titlePrefix: "طراحی و توسعه اختصاصی ",
        titleGradient: "محصولات دیجیتال",
        titleSuffix: " و راهکارهای هوش مصنوعی",
        subtitle: "ما مدل کسب‌وکار شما را بررسی کرده و وب‌سایت، اپلیکیشن و سیستم‌های هوش مصنوعی اختصاصی برای رشد حداکثری شما می‌سازیم.",
        getStarted: "شروع کنید",
        explore: "بررسی قابلیت‌ها",
        card1Title: "اتوماسیون هوش مصنوعی",
        card1Sub: "فرآیندهای هوشمند و ایجنت‌های کاربردی",
        card2Title: "سرعت فوق‌العاده و سئو",
        card2Sub: "امتیاز ۱۰۰/۱۰۰ گوگل و رتبه اول",
        card3Title: "توسعه اختصاصی",
        card3Sub: "معماری سفارشی بدون قالب‌های عمومی"
      },
      brands: {
        badge: "اکوسیستم فناوری سازمانی",
        title: "معماری‌شده با ابزارها و برندهای معتبر جهانی",
        subtitle: "ما بیش از ۲۵۰ سرویس ابری، پلتفرم هوش مصنوعی و ابزار طراحی مطرح را مستقیماً در گردش کار مهندسی خود ادغام می‌کنیم.",
        auditBtn: "شروع ممیزی فنی",
        exploreBtn: "بررسی تکنولوژی‌ها"
      },
      features: {
        badge: "ویژگی‌های برجسته",
        title: "معماری نسل جدید در تمام راهکارهای نرم‌افزاری",
        subtitle: "سرعت فوق‌العاده، امنیت سازمانی و دیزاین سیستم توکن‌شده را به همراه پشتیبانی کامل تجربه کنید.",
        bullet1: "امنیت دارنده گواهینامه ISO 27001 و دسترسی Zero-Trust",
        bullet2: "کتابخانه کامپوننت‌های ری‌اکت توکن‌شده برای چند برند",
        bullet3: "میکرو-فرانت‌اندها و تحلیل‌های آنی رویدادمحور",
        exploreBtn: "بررسی معماری راهکارها",
        viewSpecBtn: "مشاهده مشخصات فنی کامل"
      },
      searchVisibility: {
        badge: "دیدپذیری در گوگل و سئو",
        titlePrefix: "وب‌سایت شما در ",
        titleGradient: "رتبه ۱ گوگل",
        titleSuffix: " قرار می‌گیرد",
        subtitle: "با معماری فوق‌سریع روشالینک، بهینه‌سازی خودکار سئو و ایندکس آنی، وب‌سایت شما در صدر نتایج گوگل می‌درخشد و نخستین انتخاب مشتریان خواهد بود.",
        bullet1: "رتبه‌بندی برتر در نتایج جستجوی گوگل",
        bullet2: "سرعت بارگذاری فوق‌العاده (امتیاز ۱۰۰/۱۰۰ لایت‌هاوس)",
        bullet3: "ساختار استاندارد سئو و ایندکس سریع صفحات",
        button: "ارتقای رتبه در گوگل"
      },
      businessAnalysis: {
        badge: "تحلیل استراتژیک کسب‌وکار و توسعه اختصاصی",
        titlePrefix: "ما کسب‌وکار شما را تحلیل کرده و",
        titleGradient: "راهکارهای کاملاً اختصاصی",
        titleSuffix: "می‌سازیم",
        subtitle: "هر کسب‌وکاری منحصر به‌فرد است. روشالینک مدل کاری شما را بررسی کرده، گلوگاه‌ها را شناسایی می‌کند و نرم‌افزار اختصاصی متناسب با اهداف دقیق شما می‌سازید.",
        bullet1: "تحلیل عمیق مدل کسب‌وکار و مسیر مشتریان",
        bullet2: "توسعه نرم‌افزار اختصاصی بدون استفاده از قالب‌های عمومی",
        bullet3: "خودکارسازی فرآیندها و ارتقای ملموس بازدهی مالی",
        button: "درخواست تحلیل اختصاصی",
        exploreBtn: "بررسی قابلیت‌ها",
        modalTitle: "قابلیت‌های تحلیل کسب‌وکار",
        modalSubtitle: "کشف کنید که چگونه تحلیل اختصاصی ما رشد شما را تسریع می‌کند",
        feature4Title: "جایگاه‌یابی در بازار",
        feature4Desc: "شناسایی فرصت‌های کلیدی بازار برای کسب مزیت رقابتی.",
        feature5Title: "بهینه‌سازی عملکرد",
        feature5Desc: "تحلیل گلوگاه‌های سیستم برای افزایش کارایی کلی.",
        feature6Title: "برنامه‌ریزی مقیاس‌پذیری",
        feature6Desc: "ایجاد نقشه‌راه برای توسعه یکپارچه کسب‌وکار در آینده.",
        closeBtn: "بستن"
      },
      customSolution: {
        badge: "تحلیل استراتژیک کسب‌وکار و توسعه اختصاصی",
        titlePrefix: "ما کسب‌وکار شما را تحلیل کرده و",
        titleGradient: "وب‌سایت و اپلیکیشن اختصاصی",
        titleSuffix: "متناسب با نیازتان می‌سازیم",
        subtitle: "بدون استفاده از قالب‌های عمومی. روشالینک اهداف، مخاطبان و فرآیندهای کسب‌وکار شما را به دقت تحلیل کرده و وب‌سایت یا اپلیکیشن اختصاصی برای ارتقای بازدهی و رشد مستمر شما طراحی می‌کند.",
        feature1Title: "تحلیل دقیق نیازها و کسب‌وکار",
        feature1Desc: "بررسی کامل مسیر مشتریان و گلوگاه‌های کاری پیش از آغاز کدنویسی.",
        feature2Title: "طراحی اختصاصی وب‌سایت و اپلیکیشن",
        feature2Desc: "توسعه نرم‌افزار و وب‌سایت با معماری کاملاً سفارشی و بدون محدودیت.",
        feature3Title: "مهندسی‌شده برای رشد و افزایش درآمد",
        feature3Desc: "محصولات دیجیتال پرسرعت و بهینه‌سازی‌شده برای جذب حداکثری مشتریان.",
        getStartedBtn: "شروع پروژه اختصاصی شما",
        exploreBtn: "بررسی خدمات ما",
        modalTitle: "خدمات اختصاصی ما",
        modalSubtitle: "کشف کنید که چگونه برای آینده می‌سازیم",
        feature4Title: "امنیت کلاس جهانی",
        feature4Desc: "داده‌های شما با پروتکل‌های امنیتی مدرن و رمزنگاری محافظت می‌شود.",
        feature5Title: "زیرساخت ابری مقیاس‌پذیر",
        feature5Desc: "راهکارهای توسعه‌یافته بر روی فناوری ابری برای حداکثر پایداری.",
        feature6Title: "نظارت و پشتیبانی مستمر",
        feature6Desc: "ما به صورت ۲۴ ساعته بر برنامه شما نظارت داریم تا عملکرد را تضمین کنیم.",
        closeBtn: "بستن"
      },
      connectWithUs: {
        badge: "پشتیبانی چندزبانه و مشاوره تخصصی",
        titlePrefix: "با ما در ارتباط باشید —",
        titleGradient: "پشتیبانی به ۴ زبان زنده",
        titleSuffix: "(سوئدی، انگلیسی، فارسی و عربی)",
        subtitle: "تیم ارشد ما آماده ارائه مشاوره مستقیم به زبان دلخواه شماست. ما تمامی موانع زبانی را از بین برده‌ایم تا نیازمندی‌های دقیق پروژه شما با بالاترین کیفیت پیاده‌سازی شود.",
        langSvTitle: "پشتیبانی زبان سوئدی",
        langSvDesc: "ارتباط مستقیم برای پروژه‌های فعال در سوئد و حوزه اسکاندیناوی.",
        langEnTitle: "پشتیبانی زبان انگلیسی",
        langEnDesc: "مشاوره بین‌المللی و توسعه نرم‌افزار برای تیم‌ها و شرکت‌های جهانی.",
        langFaTitle: "پشتیبانی کامل زبان فارسی",
        langFaDesc: "هم‌زبانی و مشاوره دقیق برای انتقال کامل ایده و پیاده‌سازی بدون ابهام.",
        langArTitle: "پشتیبانی کامل زبان عربی",
        langArDesc: "ارتباط مستقیم و مشاوره به زبان عربی برای پوشش کامل نیازها و اجرای دقیق پروژه.",
        contactBtn: "تماس با ما",
        bookCallBtn: "رزرو جلسه مشاوره استراتژیک"
      },
      salesAndSeo: {
        badge: "افزایش فروش و دیدپذیری در گوگل",
        titlePrefix: "فروش خود را افزایش دهید و",
        titleGradient: "رتبه اول نتایج گوگل",
        titleSuffix: "را تصاحب کنید",
        subtitle: "ما سرعت فوق‌العاده، بهینه‌سازی نرخ تبدیل مشتری (CRO) و سئوی پیشرفته گوگل را با هم ترکیب می‌کنیم تا برند شما در اینترنت به بهترین شکل دیده شده و بازدیدکنندگان به مشتریان واقعی تبدیل شوند.",
        highlight1Title: "حداکثرسازی فروش و نرخ تبدیل",
        highlight1Desc: "طراحی استراتژیک تجربه کاربری و قیف‌های خرید هوشمند برای افزایش چشمگیر درآمد شما.",
        highlight2Title: "رتبه اول در گوگل و موتورهای جستجو",
        highlight2Desc: "دستیابی به بالاترین نتایج جستجو با معماری خودکار سئو و ایندکس سریع صفحات.",
        highlight3Title: "سرعت فوق‌العاده و بارگذاری آنی",
        highlight3Desc: "سرعت لود زیر یک ثانیه که نرخ ماندگاری کاربر را افزایش داده و فروش را بیشتر می‌کند.",
        boostBtn: "افزایش فروش و سئوی سایت",
        exploreBtn: "بررسی قابلیت‌های بیشتر",
        modalTitle: "بررسی قابلیت‌های افزایش فروش و سئو",
        modalSubtitle: "ببینید چگونه راهکارهای سئو و پرفورمنس ما کسب‌وکار شما را متحول می‌کنند",
        feature4Title: "تحلیل پیشرفته داده‌ها",
        feature4Desc: "دریافت گزارش‌های عمیق تحلیلی با ابزارهای یکپارچه‌سازی‌شده مانیتورینگ.",
        feature5Title: "امنیت در سطح سازمانی",
        feature5Desc: "محافظت از داده‌های شما با استانداردهای امنیتی پیشرو در صنعت.",
        feature6Title: "مقیاس‌پذیری نامحدود",
        feature6Desc: "معماری مبتنی بر فضای ابری که برای رشد یکپارچه طراحی شده است.",
        closeBtn: "بستن"
      },
      mobileApp: {
        badge: "توسعه اپلیکیشن موبایل و انتشار در استورها",
        titlePrefix: "طراحی اپلیکیشن موبایل و انتشار در",
        titleGradient: "اپ استور و گوگل پلی",
        titleSuffix: "",
        subtitle: "کسب‌وکار خود را مستقیماً به تلفن همراه مشتریان ببرید. ما اپلیکیشن‌های پرسرعت iOS و Android می‌سازیم و صفر تا صد مراحل تایید و انتشار در اپ استور اپل (App Store) و گوگل پلی (Google Play) را انجام می‌دهیم.",
        feature1Title: "اپلیکیشن‌های فوق‌العاده iOS و Android",
        feature1Desc: "رابط کاربری نرم و پرسرعت (۶۰ فریم) با جدیدترین فریم‌ورک‌های توسعه موبایل.",
        feature2Title: "انتشار کامل در App Store و Google Play",
        feature2Desc: "انجام کامل مراحل تایید فنی، قوانین استورها و انتشار رسمی اپلیکیشن شما.",
        feature3Title: "ارسال نوتیفیکیشن و قابلیت آفلاین",
        feature3Desc: "تعامل آنی با مشتریان از طریق پوش‌نوتیفیکیشن و امکان استفاده بدون اینترنت.",
        feature4Title: "یکپارچگی روان با APIها",
        feature4Desc: "اتصال بدون مشکل اپلیکیشن به سیستم‌ها و پایگاه‌داده‌های فعلی شما.",
        feature5Title: "طراحی رابط کاربری اختصاصی",
        feature5Desc: "رابط‌های کاربری بی‌نقص که برای حداکثر راحتی کاربر طراحی شده‌اند.",
        feature6Title: "بالاترین استاندارد امنیتی",
        feature6Desc: "رمزنگاری داده‌ها و ویژگی‌های امنیتی پیشرفته برای محافظت از کاربران.",
        modalTitle: "قابلیت‌های اپلیکیشن موبایل",
        modalSubtitle: "امکانات گسترده ما برای اپلیکیشن شما را کشف کنید",
        closeBtn: "بستن",
        buildBtn: "ساخت اپلیکیشن موبایل اختصاصی",
        exploreBtn: "بررسی خدمات توسعه"
      },
      whoWeAre: {
        badge: "درباره تیم ما",
        title: "ملاقات با تیم ۵ نفره رهبری ارشد",
        subtitle: "ما یک تیم زبده از معماران ارشد سیستم، طراحان محصول و مهندسان امنیت هستیم که روی ساخت محصولات دیجیتال پیچیده تمرکز داریم.",
        calloutTitle: "می‌خواهید مستقیماً با ۵ شریک اصلی ما همکاری کنید؟",
        calloutSub: "همین امروز یک جلسه بررسی فنی با رهبران اصلی تیم ما رزرو کنید.",
        bookBtn: "رزرو جلسه مشاوره",
        team: [
          {
            name: "Morteza",
            designation: "مدیرعامل و هم‌بنیان‌گذار",
            quote: "با سال‌ها تجربه در راه‌اندازی استارتاپ‌ها در کشورهای مختلف، من به ساخت محصولاتی اعتقاد دارم که با نوآوری و تاب‌آوری مشکلات جهانی را حل کنند."
          },
          {
            name: "Bella",
            designation: "مدیر بازاریابی و تبلیغات",
            quote: "خلق روایت‌های جذاب و ساخت برندهای قدرتمند اشتیاق من است. سابقه طولانی من در تبلیغات به من آموخته که چگونه محصولات را به مخاطبان هدف متصل کنم."
          },
          {
            name: "Sam",
            designation: "توسعه‌دهنده ارشد فول‌استک وب",
            quote: "من اپلیکیشن‌ها و وب‌سایت‌های مقیاس‌پذیر و پایداری با فریم‌ورک‌های مختلف توسعه داده‌ام. هدف من همواره ارائه راهکارهای وب فوق‌العاده با عملکرد بالا است که فراتر از انتظارات باشند."
          },
          {
            name: "Mina",
            designation: "تحلیل‌گر ارشد کسب‌وکار و مشاور",
            quote: "با سابقه مشاوره برای شرکت‌های بزرگ چندملیتی مانند اریکسون، روی بهینه‌سازی جریان‌های کاری، تحلیل‌های استراتژیک و ایجاد رشد پایدار در کسب‌وکارها تخصص دارم."
          },
          {
            name: "Milad",
            designation: "توسعه‌دهنده ارشد فول‌استک",
            quote: "از معماری‌های پیچیده سمت سرور تا رابط‌های کاربری چشم‌نواز و روان، انگیزه من ساخت سیستم‌های نرم‌افزاری پایدار و قدرتمند برای وب مدرن است."
          }
        ]
      },
      perspolisProject: {
        category: "رستوران و صنعت پذیرایی",
        title: "پلتفرم دیجیتال رستوران پرسپولیس",
        desc: "یک وب‌اپلیکیشن مدرن و فوق‌سریع برای رستوران پرسپولیس با منوی دیجیتال تعاملی، سیستم رزرواسیون آنلاین میز، پشتیبانی چندزبانه و طراحی کاملاً واکنش‌گرا.",
        featuredBadge: "★ نمونه پروژه برگزیده",
        feature1: "منوی دیجیتال تعاملی و سفارش غذا",
        feature2: "سیستم رزرواسیون آنلاین میز",
        feature3: "رابط کاربری چندزبانه و سرعت لود فوق‌العاده",
        previewBtn: "مشاهده پیش‌نمایش تعاملی زنده"
      },
      ffstechProject: {
        category: "سیستم‌های هوشمند و زیرساخت شبکه",
        title: "پلتفرم دیجیتال و زیرساخت FFSTECH",
        desc: "وب‌اپلیکیشن سازمانی با کارایی بالا توسعه‌یافته برای شرکت FFSTECH با تمرکز بر سیستم‌های اعلام و اطفای حریق، کنترل تردد هوشمند، نظارت تصویری و زیرساخت‌های یکپارچه دیجیتال.",
        featuredBadge: "★ نمونه پروژه برگزیده",
        feature1: "سیستم‌های هوشمند اعلام و اطفای حریق",
        feature2: "سیستم‌های هوشمند کنترل تردد و نظارت تصویری",
        feature3: "زیرساخت یکپارچه صوت و تصویر و شبکه",
        previewBtn: "مشاهده پیش‌نمایش تعاملی زنده"
      },
      dentistProject: {
        category: "وب‌اپلیکیشن پزشکی و کلینیک دندانپزشکی",
        title: "Tandläkaren – پلتفرم کلینیک دندانپزشکی",
        desc: "وب‌اپلیکیشن جامع خدمات درمانی و سلامت برای کلینیک‌های دندانپزشکی شامل نوبت‌دهی آنلاین بیماران، معرفی تعاملی خدمات درمانی، پورتال اختصاصی و طراحی چندزبانه سریع.",
        featuredBadge: "★ نمونه پروژه برگزیده",
        feature1: "نوبت‌دهی آنلاین بیماران و رزرو وقت",
        feature2: "معرفی تعاملی خدمات و مراقبت‌های دندانپزشکی",
        feature3: "پورتال بیماران با رابط کاربری سریع و واکنش‌گرا",
        previewBtn: "مشاهده پیش‌نمایش تعاملی زنده"
      },
      shiraziProject: {
        category: "پلتفرم حقوقی و مشاوره مهاجرت",
        title: "موسسه حقوقی شیرازی – پلتفرم مشاوره و وکالت",
        desc: "پلتفرم دیجیتال حقوقی پیشرفته طراحی‌شده برای دفتر وکالت شیرازی، متخصص در حقوق شرکت‌ها، مشاوره‌های مهاجرتی، رزرو آنلاین جلسات مشاوره و پورتال چندزبانه.",
        featuredBadge: "★ نمونه پروژه برگزیده",
        feature1: "رزرو آنلاین جلسات مشاوره حقوقی",
        feature2: "خدمات حقوق شرکتی، تجاری و اخذ ویزا",
        feature3: "مدیریت امن پرونده‌ها و تجربه کاربری چندزبانه",
        previewBtn: "مشاهده پیش‌نمایش تعاملی زنده"
      },
      parsLawProject: {
        category: "وب‌اپلیکیشن موسسه حقوقی و خدمات وکالت",
        title: "موسسه حقوقی پارس – پلتفرم خدمات وکالت",
        desc: "وب‌اپلیکیشن جامع سازمانی ساخته‌شده برای موسسه حقوقی پارس شامل سیستم وقت‌دهی موکلین، معرفی حوزه‌های وکالت، ارسال آنلاین پرونده‌ها و رابط کاربری واکنش‌گرا و معتمد.",
        featuredBadge: "★ نمونه پروژه برگزیده",
        feature1: "رزرو وقت و مشاوره آنلاین با وکلا",
        feature2: "معرفی جامع حوزه‌های تخصصی حقوقی",
        feature3: "سرعت لود بسیار بالا و ایجاد اعتماد حداکثری",
        previewBtn: "مشاهده پیش‌نمایش تعاملی زنده"
      },
      portfolioHero: {
        badge: "نمونه کارها و پروژه‌های ما",
        pillTitle: "راهکارهای ۱۰۰٪ اختصاصی",
        pillSubtitle: "ایده‌های متناسب با هر مدل تجاری",
        titlePrefix: "مشاهده پروژه‌های متنوع ",
        titleGradient: "عملیاتی و تجاری",
        titleSuffix: " و راهکارهای اختصاصی ما",
        subtitle: "مجموعه‌ای از پروژه‌های زنده و موفق ما در صنایع گوناگون را بررسی کنید. مدل کسب‌وکار شما هرچه باشد، ما ایده‌های نوآورانه و اپلیکیشن‌های دیجیتال اختصاصی را برای رشد حداکثری شما خلق می‌کنیم.",
        viewPillarsBtn: "مشاهده ۶ ستون استراتژیک ما",
        modalTitle: "۶ ستون موفقیت دیجیتال شما در روشالینک",
        modalSubtitle: "چگونه اپلیکیشن‌هایی با کارایی بالا و منطبق با اهداف استراتژیک بیزینس شما مهندسی می‌کنیم",
        feature1Title: "ایده‌های اختصاصی برای هر بیزینس مدل",
        feature1Desc: "هر صنعتی نیازمند استراتژی منحصر‌به‌فرد است. ما بازار شما را تحلیل کرده و راهکارهای کاملاً ویژه می‌سازیم.",
        feature2Title: "پورتفولیوی متنوع در صنایع گوناگون",
        feature2Desc: "از رستوران و فروشگاه آنلاین تا سیستم‌های فین‌تک، موتورهای هوش مصنوعی و SaaS سازمانی.",
        feature3Title: "بهینه‌شده برای رشد درآمد و سئو",
        feature3Desc: "سرعت لود زیر یک ثانیه و رابط کاربری بهینه‌شده برای رتبه ۱ گوگل و افزایش فروش.",
        feature4Title: "سرعت فوق‌العاده و فناوری‌های آینده‌نگر",
        feature4Desc: "استفاده از به‌روزترین استک‌های فنی برای لود آنی، امنیت سازمانی و مقیاس‌پذیری بی‌نقص.",
        feature5Title: "امنیت در سطح سازمانی و تضمین کیفیت",
        feature5Desc: "نظم مهندسی دقیق و معماری مستحکم که به صورت ۲۴/۷ از اطلاعات سازمان و کاربران شما محافظت می‌کند.",
        feature6Title: "شراکت بلندمدت و توسعه مستمر",
        feature6Desc: "ما به عنوان شریک فنی همیشگی شما، در تمامی مراحل رشد، توسعه و نگهداری همراهتان هستیم.",
        exploreBtn: "مشاهده پورتفولیو",
        buildBtn: "سفارش ساخت محصول اختصاصی",
        ctaTitle: "ایده‌ای برای یک محصول دیجیتال بزرگ دارید؟",
        ctaSubtitle: "با همکاری تیم متخصص ما، اپلیکیشن‌هایی قدرتمند و سفارشی بسازید که دقیقاً اهداف تجاری شما را محقق کنند.",
        ctaBtn: "ساخت محصول اختصاصی"
      },
      ourWork: {
        badge: "آخرین پروژه‌های ما",
        titlePrefix: "رشد کسب‌وکار خود را با ",
        titleGradient: "نوآوری استراتژیک در محصول",
        subtitle: "پتانسیل سازمان خود را با نرم‌افزارهای پرسرعت و طراحی رابط کاربری اختصاصی متحول کنید.",
        bullet1: "پشتیبانی از بیش از ۴ میلیون کاربر سازمانی فعال",
        bullet2: "سرعت تراکنش و تحلیل داده زیر ۲۰ میلی‌ثانیه",
        bullet3: "سیستم دیزاین ماژولار مبتنی بر توکن‌های اختصاصی React",
        explorePortfolio: "مشاهده کل پورتفولیو",
        startProject: "شروع پروژه شما"
      },
      brandGrid: {
        badge: "گالری برند و محصولات",
        title: "دقت در طراحی و اقلام هویت بصری",
        subtitle: "مشاهده کنید چگونه واسط‌های دیجیتال را با اقلام فیزیکی، دیزاین سیستم‌ها و برندینگ سازمانی یکپارچه می‌کنیم.",
        requestKit: "درخواست پکیج برند"
      },
      testimonials: {
        badge: "نظرات و رضایت مشتریان",
        title: "مورد اعتماد بیش از ۱۴۰ مدیر ارشد محصول",
        rating: "امتیاز ۵.۰ از ۵.۰",
        reviews: {
          r1: "روشالینک داشبورد قدیمی بانکداری سازمانی ما را به یک معماری میکروفرانت‌اند فوق‌سریع با زمان پاسخ زیر ۲۰ میلی‌ثانیه تبدیل کرد.",
          r2: "سیستم دیزاین ارائه‌شده توسط تیم آن‌ها، سرعت توسعه چندپلتفرمی ما را تا ۳۰۰٪ افزایش داد.",
          r3: "اجرای بی‌نقص و بدون یک ثانیه قطعی. تیم DevOps آن‌ها پایپ‌لاین استقرار چندابری ما را در زمانی حدنصاب ساخت.",
          r4: "زیبایی بصری فوق‌العاده همراه با معیارهای سنجش عملکرد دقیق. کاملاً پیشنهادی و عالی!",
          r5: "آن‌ها پایپ‌لاین‌های هوش مصنوعی مولد اختصاصی را به صورت کاملاً یکپارچه در وب‌اپلیکیشن ما ادغام کردند.",
          r6: "سیستم دیزاین توکن‌شده آن‌ها به قدری تمیز است که مدیریت آن بین تیم‌های وب و موبایل بسیار آسان شده است.",
          r7: "انطباق با استاندارد ISO 27001 و امنیت Zero-Trust بدون کوچک‌ترین افت در تجربه کاربری تحویل داده شد.",
          r8: "تنها طی دو ماه پس از بازطراحی رابط کاربری جدید، نرخ تبدیل مشتریان ما ۴۸٪ افزایش یافت.",
          r9: "دقت مهندسی فوق‌العاده. داشبورد دورسنجی آنلاین، دید کامل عملیاتی را در اختیار ما قرار داد.",
          r10: "همکاری با تیم ۵ نفره ارشد آن‌ها مانند داشتن یک تیم هم‌بنیان‌گذار مستقیم در کنار خودمان بود.",
          r11: "سیستم ردیابی آنلاین ما را بدون هیچ زحمتی برای پاسخگویی به میلیون‌ها درخواست هم‌زمان مقیاس‌پذیر کردند.",
          r12: "طراحی رابط کاربری بسیار زیبا و کدبیس بک‌اند ضدگلوله. آن‌ها از تمامی اهداف تعیین‌شده ما فراتر رفتند.",
          r13: "زمان تاخیر زیر ۲۰ میلی‌ثانیه حتی در اوج ترافیک سنگین سازمانی به طور کامل حفظ شد.",
          r14: "کمال محض در زیبایی بصری. انیمیشن‌های سه‌بعدی و ریزتعامل‌ها هر روز کاربران ما را شگفت‌زده می‌کنند.",
          r15: "وب‌اپلیکیشن پیچیده ما را زودتر از موعد مقرر و با پوشش تست ۱۰۰٪ تحویل دادند.",
          r16: "سیستم دیزاین آن‌ها فرآیند بین‌المللی‌سازی و چندزبانه کردن پلتفرم ما را به ۱۲ زبان بسیار ساده کرد.",
          r17: "داشبوردهای بسیار آسان و هوشمند برای الگوریتم‌های پیچیده هوش مصنوعی. کاربران ما عاشق تجربه جدید شده‌اند.",
          r18: "بالاترین سطح حرفه‌ای‌گری و صلاحیت فنی. یک شریک واقعی ۵ ستاره برای ما.",
          r19: "ساختار کد فوق‌العاده تمیز. معماری React & Vite آن‌ها اضافه شدن برنامه‌نویسان جدید به تیم را بسیار آسان کرد.",
          r20: "آن‌ها هویت برند و وب‌اپلیکیشن ما را به یک استاندارد برتر در صنعت تبدیل کردند."
        }
      },
      ctaBanner: {
        title: "آماده ساخت محصول بعدی خود هستید؟",
        subtitle: "همین امروز یک جلسه مشاوره استراتژیک با تیم ارشد طراحی و مهندسی ما تنظیم کنید.",
        button: "شروع ثبت پروپوزال"
      },
      footer: {
        brandRosha: "روشا",
        brandLink: "لینک",
        description: "پل ارتباطی میان تحلیل دقیق کسب‌وکار و توسعه محصولات دیجیتال پیشرفته.",
        navigation: "ناوبری",
        capabilities: "قابلیت‌ها",
        stayUpdated: "به‌روز بمانید",
        newsletterSub: "دریافت تحلیل‌های استراتژیک و خبرنامه‌های فنی سه ماهه.",
        emailPlaceholder: "ایمیل کاری خود را وارد کنید",
        subscribe: "عضویت در خبرنامه",
        rights: "© ۲۰۲۶ RoshaLink. تمامی حقوق محفوظ است."
      },
      modal: {
        badge: "شروع بررسی پروژه",
        title: "پروژه خود را آغاز کنید",
        subtitle: "جلسه مشاوره مستقیم با ۵ شریک ارشد آژانس.",
        name: "نام کامل",
        email: "ایمیل کاری",
        focus: "حوزه اصلی پروژه",
        budget: "حدود بودجه پیشنهادی",
        overview: "توضیحات کوتاه پروژه",
        submit: "ارسال درخواست بررسی",
        submittedTitle: "درخواست شما ثبت شد!",
        submittedSub: "با تشکر از ارسال اطلاعات. تیم رهبری ارشد ما ظرف ۴ ساعت کاری با شما تماس خواهند گرفت.",
        done: "تایید",
        sending: "در حال ارسال...",
        error: "متأسفانه ارسال درخواست شما ممکن نشد. لطفاً کمی بعد دوباره تلاش کنید."
      },
      chat: {
        badge: "دستیار هوشمند",
        title: "دستیار هوشمند روشا",
        status: "آنلاین",
        hoverLabel: "گفتگو با روشا",
        greeting: "سلام! من روشا هستم. چطور می‌توانم امروز در مورد پروژه‌تان کمکتان کنم؟",
        placeholder: "پیام خود را بنویسید...",
        send: "ارسال پیام",
        close: "بستن گفتگو",
        typing: "روشا در حال نوشتن است",
        retry: "تلاش دوباره",
        cta: "رزرو جلسه مشاوره رایگان",
        disclaimer: "روشا یک دستیار هوش مصنوعی است و ممکن است اشتباه کند.",
        errorNetwork: "نتوانستم به سرور متصل شوم. لطفاً اتصال اینترنت خود را بررسی کرده و دوباره تلاش کنید.",
        errorRateLimit: "پیام‌ها را کمی سریع ارسال می‌کنید. لطفاً چند لحظه صبر کنید و دوباره تلاش کنید.",
        errorTooLong: "این پیام بسیار طولانی است. می‌توانید کمی کوتاه‌ترش کنید؟",
        errorGeneric: "مشکلی از سمت من پیش آمد. لطفاً کمی بعد دوباره تلاش کنید."
      },
      privacyPolicy: {
        toggleShort: "نسخه کوتاه (مرور سریع)",
        toggleFull: "نسخه کامل حقوقی",
        dpoBadge: "مسئول حفاظت از داده‌ها (DPO)",
        dpoTitle: "سوالی درباره GDPR یا حریم خصوصی دارید؟",
        dpoText: "تیم مهندسی حریم خصوصی ما معمولاً ظرف ۲۴ ساعت پاسخ می‌دهد. مستقیماً با privacy@roshalink.com تماس بگیرید.",
        dpoBtn: "ارتباط با DPO",
        shortTitle: "خلاصه‌ی سریع سیاست حفظ حریم خصوصی",
        shortPoints: [
          { title: "حفاظت از داده‌ها", desc: "ما به حریم خصوصی شما احترام می‌گذاریم و داده‌های شما را بر اساس مقررات GDPR اتحادیه اروپا و قانون سوئد (2018:218) محافظت می‌کنیم." },
          { title: "اطلاعاتی که جمع‌آوری می‌کنیم", desc: "اطلاعات تماس، حساب کاربری، لاگ‌های فنی مرورگر و پیام‌های پشتیبانی." },
          { title: "تضمین عدم فروش داده‌ها", desc: "ما هرگز و تحت هیچ شرایطی اطلاعات شخصی شما را به ثالث به فروش نمی‌رسانیم." },
          { title: "یکپارچه‌سازی بیش از ۲۵۰ ابزار", desc: "ما بیش از ۲۵۰ ابزار ابری و پلتفرم هوش مصنوعی را به صورت کاملاً ایمن و رمزنگاری‌شده در کارهای مهندسی خود استفاده می‌کنیم." },
          { title: "حقوق شما", desc: "شما حق دسترسی، اصلاح، حذف کامل («حق فراموشی») و دریافت نسخه از اطلاعات خود را دارید." },
          { title: "تماس با ما", desc: "جهت ارتباط با مسئول حریم خصوصی می‌توانید با ایمیل privacy@roshalink.com تماس بگیرید." }
        ],
        badge: "مطابق با مقررات GDPR و قانون حفاظت داده سوئد",
        fullTitle: "سیاست حفظ حریم خصوصی (نسخه کامل حقوقی)",
        updated: "آخرین بروزرسانی: ۱۰ اوت ۲۰۲۶",
        subtitle: "ما متعهد به حفظ کامل حریم خصوصی شما و حفاظت از داده‌های شخصی بر اساس بالاترین استانداردهای امنیتی اتحادیه اروپا هستیم.",
        fullSections: [
          { num: "۱", title: "۱. مقدمه", icon: "ShieldCheck", text: `این سیاست حفظ حریم خصوصی («سیاست») نحوه جمع‌آوری، استفاده، ذخیره‌سازی، اشتراک‌گذاری و حفاظت از اطلاعات شخصی شما را توسط RoshaLink / Diara («شرکت»، «ما») در ارائه خدمات فناوری اطلاعات، توسعه نرم‌افزار، زیرساخت‌های ابری و پلتفرم‌های دیجیتال به روشنی توضیح می‌دهد.\n\nما متعهد به حفظ کامل حریم خصوصی شما و حفاظت از اطلاعات شخصی‌تان بر اساس مقررات عمومی حفاظت از داده‌های اتحادیه اروپا ("GDPR")، قانون حفاظت از داده‌های سوئد (Dataskyddslagen 2018:218) و تمامی قوانین بین‌المللی مرتبط هستیم.\n\nاستفاده شما از خدمات، وب‌سایت‌ها یا برنامه‌های ما به منزله مطالعه و قبول این سیاست حفظ حریم خصوصی است.` },
          { num: "۲", title: "۲. اطلاعاتی که جمع‌آوری می‌کنیم", icon: "FileText", text: `ما تنها اطلاعات شخصی ضروری برای اجرای تعهدات قراردادی، حفظ امنیت زیرساخت و ارائه و بهبود خدمات IT را جمع‌آوری می‌کنیم:\n\n• اطلاعات تماس و هویتی: نام، آدرس ایمیل، شماره تلفن، سمت شغلی، نام شرکت، آدرس صورت‌حساب و آدرس IP.\n• اطلاعات حساب کاربری و احراز هویت: نام کاربری، رمز عبور هش‌شده و رمزنگاری‌شده، ثبت‌های امنیتی (Security Logs)، توکن‌های دسترسی و تنظیمات کاربر.\n• اطلاعات فنی و دستگاه: آدرس IP، نوع مرورگر، سیستم‌عامل، وضوح صفحه نمایش، برچسب‌های زمانی، گزارش‌های خطا و معیارهای سنجش عملکرد سرورها.\n• اطلاعات ارتباطی: پیام‌ها، تیکت‌های پشتیبانی، استعلام‌ها و مکاتبات ارسال‌شده از طریق ایمیل، فرم‌های تماس یا دستیار هوش مصنوعی (Diara AI Assistant).\n• داده‌های ادغام و دورسنجی (Telemetry): داده‌های تعاملی و فنی حاصل از اجرای نرم‌افزارها و زیرساخت‌های متصل.` },
          { num: "۳", title: "۳. نحوه استفاده از اطلاعات", icon: "CheckCircle2", text: `ما اطلاعات شخصی شما را برای اهداف شفاف زیر پردازش و استفاده می‌کنیم:\n\n۱. ارائه و مدیریت خدمات IT: جهت نصب، پیکربندی، نگهداری و مدیریت نرم‌افزارها، وب‌سایت‌ها و حساب‌های کاربری.\n۲. پشتیبانی و ارتباطات: جهت پاسخگویی به درخواست‌ها، مدیریت تیکت‌های پشتیبانی، ارسال اطلاعیه‌های فنی و به‌روزرسانی‌های اداری.\n۳. امنیت و عیب‌یابی: جهت پایش ثبات زیرساخت، جلوگیری از دسترسی‌های غیرمجاز، مقابله با حملات سایبری و رفع ایرادات فنی.\n۴. بهینه‌سازی گردش کارهای ادغام‌شده: جهت تضمین عملکرد روان و پرسرعت در بیش از ۲۵۰ ابزار ابری، پلتفرم هوش مصنوعی و نرم‌افزار طراحی.\n۵. تحلیل و توسعه محصول: جهت تحلیل روند استفاده از خدمات، ارتقای تجربه کاربری و توسعه امکانات جدید.\n۶. الزامات قانونی: جهت پایبندی به قوانین مالیاتی، حسابداری رسمی (قانون حسابداری سوئد 1999:1078) و پاسخگویی به دستورات قانونی مراجع ذی‌صلاح.` },
          { num: "۴", title: "۴. مبنای قانونی پردازش داده‌ها", icon: "Scale", text: `پردازش داده‌های شخصی شما بر اساس ماده ۶ مقررات GDPR و مبانی قانونی زیر انجام می‌شود:\n\n• اجرای قرارداد (بند ۱-ب ماده ۶ GDPR): پردازش برای انعقاد یا اجرای قرارداد با شما یا شرکت متبوع شما ضروری است.\n• الزام قانونی (بند ۱-ج ماده ۶ GDPR): پردازش برای انجام تکالیف قانونی شرکت (از جمله قانون حسابداری سوئد 1999:1078) الزامی است.\n• منافع مشروع (بند ۱-و ماده ۶ GDPR): پردازش بر اساس منافع مشروع ما جهت ارائه خدمات IT امن، جلوگیری از کلاهبرداری و بهبود پلتفرم‌ها صورت می‌گیرد.\n• رضایت کاربر (بند ۱-الف ماده ۶ GDPR): در مواردی که طبق قانون نیاز به اخذ رضایت باشد، رضایت صریح شما قبلاً اخذ می‌شود. شما در هر زمان حق لغو رضایت خود را دارید.` },
          { num: "۵", title: "۵. اشتراک‌گذاری داده‌ها و ادغام‌های شخص ثالث", icon: "Server", text: `ما هرگز اطلاعات شخصی شما را به فروش نمی‌رسانیم.\n\nبه عنوان یک شرکت پیشرفته توسعه IT، ما بیش از ۲۵۰ ابزار ابری، پلتفرم هوش مصنوعی، سرویس‌های پایگاه‌داده، شبکه‌های تحویل محتوا (CDN) و ابزارهای طراحی را در فرآیندهای مهندسی خود یکپارچه‌سازی می‌کنیم.\n\nاطلاعات شما تنها با گروه‌های زیر به اشتراک گذاشته می‌شود:\n• ارائه‌دهندگان سرویس و پردازنده‌ها (Processors): ارائه‌دهندگان زیرساخت ابری (مانند AWS، Google Cloud)، سرویس‌های API هوش مصنوعی (مانند OpenAI، Anthropic)، ابزارهای پایش امنیت و تحلیل طبق موافقت‌نامه پردازش داده‌ها (DPA).\n• مراجع قانونی و دولتی: در صورت الزامات قانونی، احکام دادگاه یا درخواست رسمی مراجع ذی‌صلاح.\n• مشاوران حرفه‌ای: مشاوران حقوقی، حسابرسان و حسابداران رسمی تحت تعهدات محرمانه بودن.` },
          { num: "۶", title: "۶. انتقال بین‌المللی داده‌ها", icon: "Globe", text: `سرورها و ارائه‌دهندگان خدمات ما ممکن است در داخل یا خارج از منطقه اقتصادی اروپا (EEA) قرار داشته باشند.\n\nدر صورت انتقال داده‌ها به خارج از EEA به کشورهایی که سطح حفاظت کافی داده در آن‌ها توسط کمیسیون اروپا تایید نشده است، الزامات تضامنی زیر اعمال می‌شود:\n• امضای بندهای قراردادی استاندارد کمیسیون اروپا (SCCs) طبق ماده ۴۶ GDPR.\n• ارزیابی تاییدیه چارچوب حریم خصوصی داده‌های اتحادیه اروپا و آمریکا (EU-U.S. Data Privacy Framework).\n• پیاده‌سازی اقدامات حفاظتی مکمل فنی مانند رمزنگاری مبدأ تا مقصد (End-to-End Encryption) و ناشناس‌سازی داده‌ها.` },
          { num: "۷", title: "۷. مدت زمان نگهداری داده‌ها", icon: "Clock", text: `اطلاعات شخصی تنها تا زمانی که برای تحقق اهداف جمع‌آوری ضرورت داشته باشد یا طبق قوانین الزام شده باشد نگهداری می‌شوند:\n\n• داده‌های مشتریان و قراردادها: در طول مدت قرارداد و تا ۷ سال پس از پایان همکاری بر اساس قانون حسابداری سوئد (1999:1078) نگهداری می‌شوند.\n• لاگ‌های فنی و امنیتی: به مدت ۳۰ روز تا ۱۲ ماه نگهداری شده و سپس به صورت خودکار حذف یا ناشناس‌سازی می‌شوند.\n• مکاتبات و تیکت‌های پشتیبانی: تا ۳ سال پس از بسته‌شدن تیکت جهت تضمین کیفیت نگهداری می‌شوند.` },
          { num: "۸", title: "۸. حقوق کاربران طبق مقررات GDPR", icon: "KeyRound", text: `طبق مقررات GDPR، شما دارای حقوق قانونی زیر هستید:\n\n• حق دسترسی (Right of Access): دریافت تاییدیه پردازش داده‌ها و دریافت نسخه‌ای از اطلاعات شخصی خود.\n• حق تصحیح (Right to Rectification): درخواست اصلاح داده‌های نادرست یا ناقص.\n• حق حذف یا «فراموشی» (Right to Erasure): درخواست حذف اطلاعات شخصی تحت شرایط قانونی مشخص.\n• حق محدودسازی پردازش (Right to Restriction): درخواست محدود کردن پردازش داده‌ها در شرایط خاص.\n• حق جابه‌جایی داده‌ها (Data Portability): دریافت اطلاعات در قالبی ساختاریافته و قابل خواندن توسط ماشین.\n• حق اعتراض (Right to Object): اعتراض به پردازش‌هایی که بر اساس منافع مشروع صورت می‌گیرند.\n• حق ثبت شکایت: ثبت شکایت نزد مرجع نظارتی سوئد (IMY - Integritetsskyddsmyndigheten, www.imy.se).` },
          { num: "۹", title: "۹. کوکی‌ها و فناوری‌های ردیابی", icon: "Eye", text: `ما از کوکی‌ها و فناوری‌های مشابه جهت تضمین ثبات وب‌سایت، تحلیل عملکرد و بهبود تجربه کاربری استفاده می‌کنیم:\n\n• کوکی‌های ضروری: برای امنیت، احراز هویت و عملکرد اصلی پلتفرم غیرقابل غیرفعال‌سازی هستند.\n• کوکی‌های تحلیلی و عملکرد: جمع‌آوری آمار ناشناس جهت بهینه‌سازی سرعت و نمایش برنامه‌ها.\n• کوکی‌های کاربردی: ذخیره تنظیماتی مانند زبان، پوسته و منطقه جغرافیایی.\n\nشما می‌توانید در هر زمان تنظیمات کوکی‌ها را از طریق مرورگر خود تغییر دهید یا لغو کنید.` },
          { num: "۱۰", title: "۱۰. اقدامات امنیتی", icon: "Lock", text: `ما اقدامات امنیتی فنی و سازمانی پیشرفته‌ای برای محافظت از داده‌های شما اعمال می‌کنیم:\n\n• رمزنگاری: داده‌ها در حال انتقال با TLS 1.3 و داده‌های ذخیره‌شده با استاندارد AES-256 رمزنگاری می‌شوند.\n• کنترل دسترسی: معماری امنیت لایه صفر (Zero-Trust) و اصل حداقل دسترسی (PoLP) برای تمامی حساب‌ها اجرا می‌شود.\n• امنیتی‌سازی زیرساخت: پایش مداوم آسیب‌پذیری‌ها، سامانه‌های تشخیص نفوذ و انطباق با استانداردهای ISO 27001.` },
          { num: "۱۱", title: "۱۱. اطلاعات تماس", icon: "Mail", text: `برای طرح سوالات درباره حریم خصوصی، اعمال حقوق GDPR یا ارتباط با مسئول حفاظت از داده‌ها:\n\n• نام شرکت: RoshaLink / Diara IT Infrastructure\n• ایمیل حریم خصوصی: privacy@roshalink.com / hello@designlogic.agency\n• وب‌سایت: https://roshalink.com\n• آدرس پستی: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland` },
          { num: "۱۲", title: "۱۲. تغییرات در سیاست حریم خصوصی", icon: "RefreshCw", text: `ما حق به‌روزرسانی این سیاست را جهت انطباق با پیشرفت‌های فنی، تغییرات قانونی یا فرآیندهای عملیاتی محفوظ می‌داریم. تغییرات عمده از طریق اطلاعیه‌های برجسته در وب‌سایت یا ایمیل اطلاع‌رسانی خواهند شد.` }
        ]
      },
      servicesPage: {
        hero: {
          titlePrefix: "مهندسی نرم‌افزار و ",
          titleGradient: "معماری دیجیتال اختصاصی",
          titleSuffix: "",
          subtitle: "بدون قالب آماده، بدون پیچیدگی‌های اضافه. ما اول کسب‌وکار شما رو درست می‌فهمیم، بعد دقیقاً چیزی می‌سازیم که نیاز دارید — وب، اپ یا هوش مصنوعی.",
          primaryCta: "یه مکالمه کوتاه داشته باشیم",
          secondaryCta: "ببین چی می‌سازیم",
          floatingPillTitle: "ابری، سریع و آماده رشد",
          floatingPillSubtitle: "امن، مطمئن و ساخته‌شده برای ماندگاری",
          metric1Value: "۱۰۰/۱۰۰",
          metric1Label: "امتیاز گوگل و سئو",
          metric2Value: "< ۲۰ms",
          metric2Label: "سرعت پاسخ جهانی",
          metric3Value: "ISO 27001",
          metric3Label: "امن و قابل اعتماد",
          metric4Value: "۵ متخصص ارشد",
          metric4Label: "مستقیم با سازنده‌ها صحبت می‌کنی"
        },
        servicesSection: {
          title: "۶ چیزی که واقعاً بلدیم",
          subtitle: "چه استارتاپ باشی، چه کسب‌وکار تثبیت‌شده — ابزار و تجربه‌ای داریم که بهت کمک کنه به جایی که می‌خوای برسی.",
          deliverablesLabel: "چی تحویل می‌گیری:",
          techTagsLabel: "تکنولوژی‌هایی که استفاده می‌کنیم:"
        },
        servicesList: [
          {
            id: "discovery",
            category: "استراتژی کسب‌وکار",
            title: "تحلیل استراتژیک کسب‌وکار و فرآیندها",
            desc: "ما پیش از نوشتن حتی یک خط کد، مدل‌های درآمدی، سفرهای کاربری و گلوگاه‌های فنی شما را تحلیل می‌کنیم تا حداکثر بازگشت سرمایه و ارزش بیزینسی تضمین شود.",
            deliverables: [
              "نقشه‌برداری جامع مدل کسب‌وکار و جریان کار",
              "امکان‌سنجی فنی و ترسیم بلوپرینت معماری",
              "مدل‌سازی پایگاه‌داده و مشخصات دقیق API",
              "برنامه زمانی و نقشه راه استراتژیک محصول"
            ],
            techTags: ["System Mapping", "Figma Tokens", "Data Modeling", "ROI Analysis"]
          },
          {
            id: "web-architecture",
            category: "فرانت‌اند و وب",
            title: "معماری اختصاصی وب و توسعه با React",
            desc: "وب‌اپلیکیشن‌ها و پورتال‌های سازمانی فوق‌سریع که با کدهای تمیز React، کامپوننت‌های ماژولار و بهینه‌سازی ۱۰۰/۱۰۰ لایت‌هاوس مهندسی شده‌اند.",
            deliverables: [
              "وب‌اپلیکیشن‌های تک‌صفحه‌ای (SPA) و پرتال‌ها",
              "سیستم دیزاین توکنیزه‌شده UI/UX",
              "انطباق با استاندارد دسترس‌پذیری WCAG 2.1 AA",
              "امتیاز ۱۰۰/۱۰۰ Core Web Vitals و سئو گوگل"
            ],
            techTags: ["React 19", "Vite", "Tailwind / CSS Tokens", "Framer Motion"]
          },
          {
            id: "cloud-backend",
            category: "بک‌اند و زیرساخت",
            title: "بک‌اند سازمانی و معماری میکروسرویس‌ها",
            desc: "معماری سرورهای پایدار، پایگاه‌های داده توزیع‌شده و APIهای رویدادمحور با سرعت پاسخ کمتر از ۲۰ میلی‌ثانیه و آپ‌تایم ۹۹.۹۹٪ تضمین‌شده.",
            deliverables: [
              "میکروسرویس‌های رویدادمحور و APIهای REST/GraphQL",
              "معماری دیتابیس PostgreSQL، Redis و NoSQL",
              "امنیت ISO 27001 و احراز هویت Zero-Trust",
              "خطوط لوله اتوماتیک CI/CD و کانتینرسازی Docker"
            ],
            techTags: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP"]
          },
          {
            id: "ai-automation",
            category: "هوش مصنوعی و اتوماسیون",
            title: "اتوماسیون هوش مصنوعی و خطوط داده هوشمند",
            desc: "ادغام مدل‌های اختصاصی هوش مصنوعی، ایجنت‌های خودکار و پردازش هوشمند داده‌ها برای صرفه‌جویی در صدها ساعت کار دستی در سازمان شما.",
            deliverables: [
              "سیستم‌های اختصاصی LLM و RAG (OpenAI، Gemini)",
              "دستیاران هوشمند سازمانی و ایجنت‌های خودکار",
              "خطوط اتوماتیک ورود و پردازش داده‌ها",
              "داشبوردهای هوشمند تحلیلی و پیش‌بینی داده‌ها"
            ],
            techTags: ["OpenAI API", "Gemini", "RAG / Vector DB", "Python Automation"]
          },
          {
            id: "mobile-apps",
            category: "اپلیکیشن موبایل",
            title: "اپلیکیشن‌های موبایل کراس‌پلتفرم (iOS و Android)",
            desc: "توسعه اپلیکیشن‌های موبایل با پرفورمنس نیتیو، همگام‌سازی بلادرنگ با بک‌اند وب، امنیت بیومتریک و طراحی لمسی جذاب.",
            deliverables: [
              "اپلیکیشن‌های چندسکویی برای iOS و Android",
              "همگام‌سازی داده‌ها در زمان واقعی با WebSockets",
              "امنیت بیومتریک و قابلیت کارکرد آفلاین",
              "انتشار رسمی در App Store و Google Play"
            ],
            techTags: ["React Native", "Expo", "WebSockets", "Push Notifications"]
          },
          {
            id: "seo-performance",
            category: "پرفورمنس و سئو",
            title: "مهندسی سئو ارگانیک و توزیع ابری Edge CDN",
            desc: "کسب رتبه‌های اول گوگل و توزیع جهانی محتوا با کمترین تاخیر از طریق کدهای سمانتیک، اسکیماهای ساختاریافته و شبکه Cloudflare CDN.",
            deliverables: [
              "ساختار نشانه‌گذاری JSON-LD و ریچ اسنیپت‌ها",
              "شبکه جهانی Cloudflare Edge CDN و کشینگ هوشمند",
              "نقشه سایت اتوماتیک و ایندکس سریع در سرچ کنسول",
              "بهینه‌سازی نرخ تبدیل (CRO) و تست‌های A/B"
            ],
            techTags: ["SEO Schema", "Cloudflare CDN", "Lighthouse 100", "Analytics"]
          }
        ],
        techMatrix: {
          title: "استک فناوری‌های سازمانی ما",
          subtitle: "ما دقیق‌ترین و مدرن‌ترین ابزارهای استاندارد دنیا را برای مهندسی سیستم‌هایی با طول عمر بالا انتخاب می‌کنیم.",
          tabFrontend: "فرانت‌اند و دیزاین",
          tabBackend: "بک‌اند و دیتابیس",
          tabAi: "هوش مصنوعی و اتوماسیون",
          tabCloud: "ابر و امنیت",
          frontend: [
            { title: "React 19 & Vite", desc: "معماری کامپوننت‌های نسل جدید، رندرینگ فوق‌سریع و HMR بدون اتلاف وقت و بدون کدهای زائد." },
            { title: "Framer Motion & WebGL", desc: "انیمیشن‌های روان ۶۰ فریم بر ثانیه با شتاب‌دهی سخت‌افزاری و تعاملات فیزیک‌محور جذاب." },
            { title: "سیستم‌های دیزاین توکنیزه", desc: "متغیرهای توکنیزه و ساختاریافته با پشتیبانی کامل از حالت تاریک و روشن و ریسپانسیو استاندارد." },
            { title: "Vanilla CSS & Tailwind", desc: "معماری تمیز و ماژولار CSS با پرفورمنس حداکثری و لود سریع در تمامی پلتفرم‌ها." }
          ],
          backend: [
            { title: "Node.js و میکروسرویس‌ها", desc: "محیط اجرایی ناهمگام پرسرعت برای پردازش خطوط داده با زمان پاسخگویی زیر ۲۰ میلی‌ثانیه." },
            { title: "PostgreSQL و Prisma", desc: "مدل‌سازی پایگاه‌داده رابطه‌ای منطبق بر استاندارد ACID همراه با مایگریشن‌های تایپ‌سیف." },
            { title: "Redis و Upstash", desc: "کشینگ توزیع‌شده با تاخیر زیر میلی‌ثانیه، صف‌های Pub/Sub و کنترل همزمانی درخواست‌ها." },
            { title: "WebSockets و تله‌متری", desc: "ارتباط بلادرنگ دوطرفه کلاینت و سرور همراه با مانیتورینگ زنده جریان داده‌ها." }
          ],
          ai: [
            { title: "اتصال اختصاصی به LLMها", desc: "یکپارچه‌سازی اختصاصی با مدل‌های OpenAI GPT-4o، Claude و Gemini برای استدلال تخصصی کسب‌وکار." },
            { title: "سیستم‌های RAG و دیتابیس وکتور", desc: "جستجوی معنایی اسناد سازمانی و بازیابی دقیق دانش بدون توهم یا خطای مدل هوش مصنوعی." },
            { title: "ایجنت‌های خودکار وظایف", desc: "سیستم‌های چند ایجنتی که فرآیندهای پیچیده سازمانی را به صورت کاملاً خودکار و بی‌وقفه انجام می‌دهند." },
            { title: "پایپ‌لاین داده با Python", desc: "خطوط اتوماتیک جمع‌آوری، پاک‌سازی، ساختاردهی و پردازش تحلیلی داده‌های کلان." }
          ],
          cloud: [
            { title: "Docker و کانتینرسازی", desc: "محیط‌های ایزوله و یکپارچه برای توسعه و استقرار سریع و بدون ریسک در محیط پروداکشن." },
            { title: "AWS و Cloudflare Edge", desc: "توزیع سرورلس جهانی در بیش از ۳۰۰ شهر دنیا با محافظت پیشرفته سازمانی در برابر DDoS." },
            { title: "امنیت ISO 27001 و Zero-Trust", desc: "رمزنگاری سراسری AES-256 و TLS 1.3 با سیاست‌های دسترسی بدون اعتماد در تمامی لایه‌ها." },
            { title: "خطوط اتوماتیک CI/CD", desc: "تست خودکار، ممیزی امنیتی و استقرار پیوسته روی GitHub Actions با پایداری ۹۹.۹۹٪." }
          ]
        },
        process: {
          title: "چطور کار می‌کنیم — قدم به قدم",
          subtitle: "یه فرآیند شفاف و مطمئن که همیشه می‌دونی کجا هستی و قدم بعدی چیه.",
          stageBadge1: "قدم ۰۱ — گوش می‌دیم و برنامه‌ریزی می‌کنیم",
          stageBadge2: "قدم ۰۲ — با هم طراحی می‌کنیم",
          stageBadge3: "قدم ۰۳ — درست می‌سازیم",
          stageBadge4: "قدم ۰۴ — لانچ می‌کنیم و پشتیبانی می‌دیم",
          step1Num: "۰۱",
          step1Title: "نیازت رو می‌فهمیم",
          step1Desc: "می‌شینیم کنارت، با دقت گوش می‌دیم و دقیقاً می‌فهمیم چی نیاز داری — قبل از اینکه یه خط کد بنویسیم.",
          step1Tags: ["تحلیل کسب‌وکار و اهداف", "برنامه‌ریزی فنی", "طراحی داده و API"],
          step2Num: "۰۲",
          step2Title: "طراحی و پروتوتایپ",
          step2Desc: "قبل از ساخت، می‌بینی محصول چطور به نظر می‌رسه — و می‌تونی روی هر جزئیاتی نظر بدی.",
          step2Tags: ["پروتوتایپ تعاملی در فیگما", "طراحی متناسب با برندت", "تست با سناریوهای واقعی"],
          step3Num: "۰۳",
          step3Title: "اونی که تأیید کردی رو می‌سازیم",
          step3Desc: "۵ متخصص ارشد ما خودشون همه کدها رو می‌نویسن — تمیز، سریع و بدون میانبرهای مضر.",
          step3Tags: ["کد اختصاصی React", "ادغام هوش مصنوعی در صورت نیاز", "معماری مقیاس‌پذیر"],
          step4Num: "۰۴",
          step4Title: "لانچ و راه‌اندازی",
          step4Desc: "همه چیز رو کامل تست می‌کنیم و بدون حتی یه ثانیه قطعی، راه‌اندازی می‌کنیم.",
          step4Tags: ["امتیاز ۱۰۰ لایت‌هاوس", "بررسی امنیتی", "CDN جهانی و آپ‌تایم ۹۹.۹۹٪"],
          nextStage: "مرحله بعدی",
          stageCounter: "مرحله {{current}} از {{total}}"
        },
        comparison: {
          title: "چرا روشالینک؟ نه یه آژانس معمولی",
          subtitle: "قضاوت نمی‌کنیم، فقط صادقانه می‌گیم فرق در عمل چیه.",
          featureCol: "چی مقایسه می‌کنیم",
          agencyCol: "آژانس معمول",
          roshaCol: "روشالینک",
          f1: "کار رو کی انجام می‌ده؟",
          f1Agency: "جونیورها با یه مدیر واسطه",
          f1Rosha: "۵ متخصص ارشد — خودشون مستقیم کد می‌زنن",
          f2: "چطور ساخته می‌شه؟",
          f2Agency: "قالب‌های وردپرس و تِم‌های آماده",
          f2Rosha: "کد تمیز و اختصاصی React و Node.js",
          f3: "چقدر سریعه؟",
          f3Agency: "کُند (۲ تا ۵ ثانیه)، امتیاز پایین",
          f3Rosha: "فوق‌العاده سریع (< ۲۰ms)، امتیاز ۱۰۰",
          f4: "کد مال کیه؟",
          f4Agency: "پلاگین‌های ناامن، مالکیت نامشخص",
          f4Rosha: "از روز اول ۱۰۰٪ مال توئه",
          f5: "قیمت‌گذاری چطوره؟",
          f5Agency: "هزینه‌های پنهان ساعتی که بالا می‌ره",
          f5Rosha: "قیمت ثابت، محدوده مشخص، بدون غافلگیری"
        },
        faq: {
          title: "سوال‌های پرتکرار — جواب صادقانه",
          subtitle: "بدون فروش، بدون اصطلاح‌های پیچیده. فقط جواب‌های مستقیم به چیزی که واقعاً می‌خوای بدونی.",
          q1: "چقدر طول می‌کشه شروع کنیم؟",
          a1: "معمولاً ظرف ۴۸ ساعت از اولین مکالمه‌مون، برنامه‌ریزی و تحلیل شروع می‌شه. مستقیم با کسایی صحبت می‌کنی که کد می‌زنن — بدون واسطه.",
          q2: "از قالب آماده استفاده می‌کنید؟",
          a2: "هرگز. همه چیز از صفر، اختصاصی برای تو ساخته می‌شه. نتیجه؟ سایت سریع‌تر، امنیت بهتر، و آزادی کامل برای آینده.",
          q3: "واقعاً کی کد می‌نویسه؟",
          a3: "ما ۵ نفر — مستقیم و شخصی. هیچ‌وقت به جونیور یا پیمانکار خارجی نمی‌سپاریم.",
          q4: "کد و اطلاعاتم مال کیه؟",
          a4: "از روز اول همه چیز مال توئه — سورس‌کد، طراحی، و تمام حقوق. ۱۰۰٪. طبق استانداردهای ISO 27001 و GDPR کار می‌کنیم.",
          q5: "بعد از لانچ پشتیبانی دارید؟",
          a5: "حتماً. پشتیبانی مداوم، مانیتورینگ ۲۴/۷، و ادامه توسعه محصول با رشد کسب‌وکارت ارائه می‌دیم."
        },
        cta: {
          title: "آماده‌ای قدم بعدی رو برداری؟",
          subtitle: "یه مکالمه کوتاه با ما داشته باش — بدون تعهد. گوش می‌دیم، سوال می‌پرسیم و صادقانه می‌گیم چی می‌تونیم برات بکنیم.",
          button: "امروز یه مکالمه رزرو کن"
        }
      }
    }
  },
  ar: {
    translation: {
      aboutPage: {
        teamPerspectives: {
          badge: "رؤى استراتيجية وقيادة تنفيذية",
          title: "قيادة مباشرة تدفع الابتكار والنمو لمشروعك",
          titlePrefix: "القيادة المباشرة للمؤسسين لدفع ",
          titleGradient: "الابتكار ونمو الأعمال",
          titleSuffix: "",
          subtitle: "كيف يهندس الشركاء المؤسسون الخمسة حلولاً مخصصة تقضي على العقبات وتضمن نمواً ملموساً.",
          morteza: {
            quote: "يجب أن تخدم الهندسة البرمجية أهداف الأعمال ونمو الإيرادات. نقضي على الديون التقنية من اليوم الأول عبر كود مخصص بدون قوالب جاهزة.",
            name: "مرتضى",
            role: "الرئيس التنفيذي وكبير المعماريين"
          },
          bella: {
            quote: "التصميم الاستثنائي لـ UI/UX يدمج الدقة التقنية بالتواصل الإنساني الملهم، مما يضاعف معدلات التحويل وقوة علامتك التجارية.",
            name: "بيلا",
            role: "رئيسة المنتجات والهوية البصرية"
          },
          sohrab: {
            quote: "الأنظمة السحابية الموزعة بزمن استجابة أقل من 20 مللي ثانية وجاهزية 99.99% تضمن استقرار منصتكم حتى في أعلى ذروات الترافيك.",
            name: "سام",
            role: "كبير مهندسي الويب والسحابة"
          },
          mina: {
            quote: "بخبرتي الاستشارية لكبرى الشركات مثل إريكسون، فإن التدقيق المعمق لعمليات الأعمال قبل البرمجة يوفر أشهراً من الهدر.",
            name: "مينا",
            role: "مستشارة ومحللة أعمال أولى"
          },
          milad: {
            quote: "من فهرسة قواعد البيانات المعقدة إلى الواجهات التفاعلية السلسة، البرمجة النظيفة القابلة للتوسع هي الركيزة الأساسية للنجاح.",
            name: "ميلاد",
            role: "كبير مهندسي الأنظمة وقواعد البيانات"
          },
          synergy: {
            quote: "التناغم بين التحليل المؤسسي الدقيق والهندسة البرمجية المتقدمة يمنح عملاءنا ميزة تنافسية استثنائية.",
            name: "بيلا",
            role: "رئيسة المنتجات والهوية البصرية"
          },
          guarantee: {
            quote: "لا نفوّض العمل لمطورين مبتدئين؛ يعمل كل عميل مباشرة وفي الوقت الفعلي مع الشركاء الخمسة الذين يطورون الكود بأنفسهم.",
            name: "مرتضى",
            role: "الرئيس التنفيذي وكبير المعماريين"
          }
        },
        hero: {
          badge: "من نحن ورؤيتنا",
          titlePrefix: "نهندس ",
          titleGradient: "الجيل القادم",
          titleSuffix: " من المنتجات الرقمية والذكاء الاصطناعي",
          subtitle: "نحن نخبة من كبار مهندسي البرمجيات ومصممي المنتجات ومحللي الأعمال، ندمج التحليل الاستراتيجي مع البرمجة المخصصة لتحقيق أقصى درجات النمو لشركتك.",
          stats: {
            stat1Val: "100%",
            stat1Label: "كود برمجي مخصص بالكامل",
            stat1Sub: "بدون قوالب جاهزة أو حلول سريعة",
            stat2Val: "99.99%",
            stat2Label: "جاهزية واستقرار النظام",
            stat2Sub: "بنية تحتية سحابية متطورة",
            stat3Val: "<20ms",
            stat3Label: "سرعة الاستجابة والأداء",
            stat3Sub: "100/100 في Google Lighthouse",
            stat4Val: "5+",
            stat4Label: "شركاء ومهندسون تنفيذيون",
            stat4Sub: "تعاون مباشر بدون وسطاء"
          }
        },
        teamShowcase: {
          badge: "فريق القيادة التنفيذي",
          title: "تعرف على فريق خبرائنا ورواد الابتكار",
          titlePrefix: "تعرف على فريق ",
          titleGradient: "خبرائنا ورواد الابتكار",
          titleSuffix: "",
          description: "نحن فريق متكامل وشغوف من كبار مهندسي البرمجيات ومصممي المنتجات، نكرس خبراتنا لبناء تجارب رقمية رائدة وتطوير حلول برمجية مخصصة تقود نجاح أعمالكم.",
          button: "احجز جلسة استشارية مع الفريق",
          members: [
          {
                    "name": "سام",
                    "role": "كبير مهندسي الويب والسحابة",
                    "tag": "الحوسبة السحابية وهندسة الويب",
                    "quote": "أبني تطبيقات ويب عالية المرونة وأنظمة سحابية موزعة. هدفي دائماً تقديم أداء فائق السرعة يتجاوز كافة التوقعات."
          },
          {
                    "name": "بيلا",
                    "role": "رئيسة المنتجات والهوية البصرية",
                    "tag": "تصميم UI/UX والإخراج الإبداعي",
                    "quote": "شغفي هو بناء هوية تجارية ملهمة وتصميم واجهات رقمية استثنائية تربط منتجاتكم بالعملاء بأعلى درجات التأثير."
          },
          {
                    "name": "مرتضى",
                    "role": "الرئيس التنفيذي وكبير المعماريين",
                    "tag": "الذكاء الاصطناعي وهندسة الأنظمة",
                    "quote": "بخبرة واسعة في إطلاق الشركات الناشئة دولياً، نبني برمجيات تعالج التحديات الحقيقية للأعمال عبر الابتكار والتميز التقني."
          },
          {
                    "name": "مينا",
                    "role": "مستشارة ومحللة أعمال أولى",
                    "tag": "خبرة سابقة في إريكسون والاستراتيجية",
                    "quote": "بعد سنوات من العمل الاستشاري لكبرى الشركات العالمية مثل إريكسون، أركز على تحسين سير العمل وزيادة الإيرادات والأرباح."
          },
          {
                    "name": "ميلاد",
                    "role": "كبير مهندسي الأنظمة وقواعد البيانات",
                    "tag": "الأنظمة الخلفية وقواعد البيانات",
                    "quote": "من الأنظمة الخلفية المعقدة إلى الواجهات التفاعلية السلسة، أهتم بهندسة معمارية برمجية فائقة الاستقرار للتطبيقات الحديثة."
          }
]
        },
        missionBento: {
          badge: "فلسفتنا ومعاييرنا",
          title: "لماذا تختلف منهجية روشالينك في البناء؟",
          titlePrefix: "لماذا تختلف منهجية روشالينك ",
          titleGradient: "في البناء والابتكار؟",
          titleSuffix: "",
          subtitle: "نقضي على الديون التقنية ونبني برمجيات قابلة للتوسع مع نمو أعمالكم.",
          card1Badge: "التحليل المؤسسي أولاً",
          card1Title: "الاستراتيجية",
          card1Desc: "تعاني المؤسسات غالباً من أنظمة متباعدة وقوالب جاهزة غير ملائمة. نحلل نماذج أعمالكم أولاً ونبني برمجيات مفصلة خصيصاً لتحقيق الأرباح.",
          card2Badge: "جاهزية واستقرار مطلق",
          card2Title: "الأداء",
          card2Desc: "معمارية معيارية حديثة متوافقة مع معايير ISO 27001 وسرعة استجابة أقل من 20 مللي ثانية لضمان استمرارية الأعمال دون انقطاع.",
          card3Badge: "شراكة مباشرة",
          card3Title: "الشراكة",
          card3Desc: "لا يوجد مطورون مبتدئون أو وسطاء؛ تعملون مباشرة وبشكل فوري مع الشركاء الخمسة الذين يطورون كود مشروعكم بأنفسهم.",
          card4Badge: "ذكاء اصطناعي مستقبلي",
          card4Title: "الأتمتة",
          card4Desc: "ندمج نماذج الذكاء الاصطناعي المخصصة ووكلاء الأتمتة لتقليص مئات ساعات العمل اليدوي وتعزيز الكفاءة الإنتاجية.",
        },
        methodology: {
          badge: "منهجية العمل",
          title: "من الرؤية إلى الإطلاق الاحترافي في 4 خطوات",
          titlePrefix: "من الرؤية إلى الإطلاق الاحترافي في ",
          titleGradient: "4 خطوات مدروسة",
          titleSuffix: "",
          subtitle: "منهجية تطوير سريعة ومثبتة تضمن الدقة المعمارية وسرعة الوصول إلى السوق.",
          step1Num: "01",
          step1Title: "الاستكشاف والتحليل الاستراتيجي",
          step1Desc: "تحليل معمق لنموذج العمل، تجربة المستخدمين، المتطلبات التقنية وهيكلية البيانات.",
          step2Num: "02",
          step2Title: "نظام التصميم المعياري والنموذج التفاعلي",
          step2Desc: "بناء نظام UI/UX متطور وعالي التفاعل وموائم لكافة متطلبات علامتكم التجارية.",
          step3Num: "03",
          step3Title: "الهندسة البرمجية المخصصة",
          step3Desc: "كتابة كود برمجي نظيف بدون قوالب جاهزة باستخدام React وأحدث الأنظمة السحابية.",
          step4Num: "04",
          step4Title: "تحسين الأداء والنشر العالمي",
          step4Desc: "تحقيق علامة 100/100 في معايير Google Lighthouse والنشر الآمن في السحابة مع المراقبة المستمرة."
        },
        values: {
          badge: "القيم والمبادئ الأساسية",
          title: "المعايير التي توجه كل سطر كود نكتبه",
          subtitle: "قيمنا الهندسية الصارمة المصممة لنمو أعمال المؤسسات الحديثة.",
          v1Title: "هندسة برمجية مخصصة",
          v1Desc: "يتم بناء كل مكون وقاعدة بيانات من الصفر بما يتناسب تماماً مع متطلبات عملكم الفريدة.",
          v2Title: "الأمان ومبدأ انعدام الثقة",
          v2Desc: "حماية البيانات بمستويات المؤسسات الكبرى مع تطبيق معايير ISO 27001 في كافة طبقات النظام.",
          v3Title: "تأثير ملموس على الإيرادات",
          v3Desc: "نقيس نجاحنا بنمو إيراداتكم، رفع معدل التحويل، سرعة النظام ورضا عملائكم.",
          v4Title: "شفافية وتواصل دائم",
          v4Desc: "تواصل مباشر مع كبار المهندسين والشركاء مع شفافية كاملة في كل مراحل الإنجاز.",
          v5Title: "سرعة استجابة فائقة وسيو متميز",
          v5Desc: "كود متقدم يحقق سرعة لود أقل من ثانية وتصدر نتائج البحث في محركات جوجل.",
          v6Title: "شراكة استراتيجية مستمرة",
          v6Desc: "نعمل كشريككم التقني المستمر لتطوير وتوسيع وصيانة منصاتكم البرمجية دائماً."
        },
        awards: {
          "sectionTitle": "الجوائز والتقدير الدولي",
          "titlePrefix": "الجوائز و ",
          "titleGradient": "التقدير الدولي",
          "titleSuffix": "",
          "sectionSubtitle": "التزامنا الراسخ بالتميز الهندسي والابتكار المعماري وتصميم المنتجات الرقمية الرائدة.",
          "a1": {
                  "title": "أفضل هندسة معمارية للويب",
                  "subtitle": "جوائز السحابة وقابلية التوسع العالمية 2025",
                  "recipient": "فريق المعمارية البرمجية روشالينك",
                  "date": "2025",
                  "level": "gold"
          },
          "a2": {
                  "title": "الابتكار المؤسسي الشامل",
                  "subtitle": "جوائز سرعة واستقرار الأنظمة السحابية",
                  "recipient": "الهندسة البرمجية روشالينك",
                  "date": "2025",
                  "level": "platinum"
          },
          "a3": {
                  "title": "أفضل تصميم لتجربة المستخدم",
                  "subtitle": "تكريم التجربة الرقمية وتصميم المنتجات نورديك",
                  "recipient": "استوديو تصميم المنتجات روشالينك",
                  "date": "2024 - 2025",
                  "level": "gold"
          },
          "a4": {
                  "title": "الابتكار في الذكاء الاصطناعي",
                  "subtitle": "منصة العام للجيل القادم من تطبيقات الويب والموبايل",
                  "recipient": "مختبرات الابتكار روشالينك",
                  "date": "2025",
                  "level": "platinum"
          }
},
          cta: {
          badge: "ابنِ معنا",
          title: "هل أنت جاهز لتطوير منتجك عالي الأداء مع فريق القيادة لدينا؟",
          titlePrefix: "هل أنت جاهز لتطوير منتجك الرقمي مع ",
          titleGradient: "فريق القيادة لدينا؟",
          titleSuffix: "",
          subtitle: "احجز جلسة استشارية استراتيجية مع الشركاء المؤسسين الخمسة اليوم وحوّل رؤيتك الرقمية إلى واقع ملموس.",
          button: "احجز الجلسة الاستشارية الآن"
        }
      },
      nav: {
        home: "الرئيسية",
        portfolio: "أعمالنا",
        services: "خدماتنا",
        about: "من نحن",
        contact: "تواصل معنا",
        getStarted: "ابدأ الآن"
      },
      hero: {
        badge: "التحول الرقمي للأعمال وهندسة الذكاء الاصطناعي",
        titlePrefix: "تطوير اختصاصي لـ ",
        titleGradient: "المنتجات الرقمية",
        titleSuffix: " وحلول الذكاء الاصطناعي",
        subtitle: "نحلل نموذج عملك ونبني تطبيقات الويب والموبايل وأنظمة الذكاء الاصطناعي المخصصة لتحقيق أقصى درجات النمو.",
        getStarted: "ابدأ الآن",
        explore: "استكشف إمكانياتنا",
        card1Title: "أتمتة قائمة على الذكاء الاصطناعي",
        card1Sub: "سير عمل ذكي ووكلاء ذكاء اصطناعي",
        card2Title: "سرعة فائقة للأداء",
        card2Sub: "100/100 في اختبارات Google Lighthouse و SEO",
        card3Title: "كود برمجي مخصص",
        card3Sub: "معمارية فريدة بدون قوالب جاهزة"
      },
      brands: {
        badge: "منظومة التقنية للمؤسسات",
        title: "مصممة بأحدث الأدوات والحلول التقنية العالمية",
        subtitle: "نحن ندمج أكثر من 250+ خدمة سحابية ومنصة ذكاء اصطناعي وأداة تصميم مباشرة في مسار عملنا الهندسي.",
        auditBtn: "ابدأ التدقيق التقني",
        exploreBtn: "استكشف البنية التقنية"
      },
      features: {
        badge: "أبرز الميزات",
        title: "جيل جديد من المعمارية البرمجية في كل حل نقدمه",
        subtitle: "استمتع بأداء متفوق وأمان المؤسسات ومعمارية أنظمة التصميم المرمزة جاهزة للاستخدام.",
        bullet1: "أمان معتمد بشهادة ISO 27001 ووصول قائم على الثقة الصفرية Zero-Trust",
        bullet2: "مكتبة مكونات React رمزيّة ومتعددة العلامات التجارية",
        bullet3: "واجهات ميكرو أنيّة مدعومة بالأحداث والتحليلات المباشرة",
        exploreBtn: "استكشف معمارية الحلول",
        viewSpecBtn: "عرض المواصفات التقنية الكاملة"
      },
      searchVisibility: {
        badge: "الظهور في محركات البحث وترتيب جوجل",
        titlePrefix: "موقعك الإلكتروني يتصدر ",
        titleGradient: "المرتبة الأولى على جوجل",
        titleSuffix: " في نتائج البحث",
        subtitle: "بفضل أداء روشالينك الفائق وكودها المحسّن لمحركات البحث والأرشفة التلقائية، سيتصدر موقعك نتائج البحث ليكون الخيار الأول لعملائك.",
        bullet1: "المراكز الأولى في نتائج بحث جوجل ووحدات البحث",
        bullet2: "سرعة تحميل فائقة (100/100 في تقييم Lighthouse)",
        bullet3: "بنية SEO تلقائية ونتائج بحث غنية بالأشكال المميزة",
        button: "حسّن ترتيبك في البحث الآن"
      },
      businessAnalysis: {
        badge: "تحليل الأعمال الاستراتيجي والتطوير المخصص",
        titlePrefix: "نحن نحلل أعمالك ونبني",
        titleGradient: "حلولاً مخصصة بالكامل",
        titleSuffix: "لتلبية احتياجاتك",
        subtitle: "كل شركة فريدة من نوعها. تقوم روشالينك بتحليل نموذج أعمالك وتحديد العقبات وبناء برمجيات مخصصة لتحقيق أعلى درجات الربحية والنمو.",
        bullet1: "تحليل عميق لنموذج الأعمال ورحلات المستخدم",
        bullet2: "معمارية برمجية مخصصة بدون قوالب جاهزة",
        bullet3: "سير عمل مؤتمت ومقاييس نمو قابلة للقياس باستمرار",
        button: "طلب تحليل مخصص",
        exploreBtn: "استكشف الميزات",
        modalTitle: "ميزات تحليل الأعمال",
        modalSubtitle: "اكتشف كيف يسرع تحليلنا المخصص من نموك",
        feature4Title: "تحديد الموقع في السوق",
        feature4Desc: "تحديد فرص السوق الرئيسية للحصول على ميزة تنافسية.",
        feature5Title: "تحسين الأداء",
        feature5Desc: "تحليل اختناقات النظام لزيادة الكفاءة العامة.",
        feature6Title: "تخطيط قابلية التوسع",
        feature6Desc: "إنشاء خرائط طريق لتوسيع الأعمال التجارية في المستقبل بسلاسة.",
        closeBtn: "إغلاق"
      },
      customSolution: {
        badge: "تحليل الأعمال والتطوير المخصص",
        titlePrefix: "نحن نحلل أعمالك ونبني",
        titleGradient: "مواقع وتطبيقات مخصصة",
        titleSuffix: "لتنمو وتزدهر",
        subtitle: "لا نستخدم قوالب جاهزة. نحن ندرس نموذج أعمالك وعملاءك بعمق لنصمم برمجيات ومواقع وتطبيقات هاتف مخصصة ومصممة خصيصاً لزيادة أرباحك وتوسيع نطاق أعمالك.",
        feature1Title: "تحليل عميق للأعمال",
        feature1Desc: "ندرس مسار عملائك وسير عملياتك بدقة قبل كتابة أي سطر برمجيات.",
        feature2Title: "مواقع وتطبيقات جوال مخصصة",
        feature2Desc: "كود ومعمارية فريدة مبنية تماماً وفق متطلبات مؤسستك الخاصة.",
        feature3Title: "مصممة للنمو القابل للقياس",
        feature3Desc: "حلول فائقة الأداء تزيد من معدلات التحويل وتدفع أعمالك للأمام.",
        getStartedBtn: "ابدأ مشروعك المخصص",
        exploreBtn: "استكشف خدماتنا",
        modalTitle: "خدماتنا المخصصة",
        modalSubtitle: "اكتشف كيف نبني من أجل المستقبل",
        feature4Title: "أمان عالمي المستوى",
        feature4Desc: "بياناتك محمية ببروتوكولات الأمان الحديثة والتشفير.",
        feature5Title: "بنية تحتية سحابية مرنة",
        feature5Desc: "حلول قابلة للتطوير مبنية على تقنيات سحابية حديثة لأقصى وقت تشغيل.",
        feature6Title: "مراقبة مستمرة",
        feature6Desc: "نحن نراقب تطبيقك على مدار الساعة لضمان الأداء.",
        closeBtn: "إغلاق"
      },
      connectWithUs: {
        badge: "الدعم الاستشاري متعدد اللغات",
        titlePrefix: "تواصل معنا —",
        titleGradient: "دعم بـ 4 لغات",
        titleSuffix: "(السويدية، الإنجليزية، الفارسية والعربية)",
        subtitle: "يقدم لك فريقنا القيادي استشارات مباشرة باللغة التي تفضلها. نحن نزيل جميع الحواجز اللغوية لضمان فهم متطلبات مشروعك وتنفيذها بدقة 100%.",
        langSvTitle: "الدعم بالسويدية",
        langSvDesc: "تواصل مباشر مع فريقنا السويدي المحلي لجميع استفساراتك التقنية والتجارية.",
        langEnTitle: "English Support",
        langEnDesc: "استشارات وتطوير تقني متقدم للشركات والمؤسسات الدولية.",
        langFaTitle: "پشتیبانی فارسی",
        langFaDesc: "ارتباط مستقیم و هم‌زبانی برای درک کامل نیازها و پیاده‌سازی دقیق پروژه.",
        langArTitle: "الدعم باللغة العربية",
        langArDesc: "تواصل مباشر واستشارات باللغة العربية لفهم كافة متطلبات مشروعك وتنفيذها بدقة عالية.",
        contactBtn: "تواصل معنا الآن",
        bookCallBtn: "احجز جلسة استراتيجية"
      },
      salesAndSeo: {
        badge: "نمو المبيعات وتصدر نتائج البحث",
        titlePrefix: "ضاعف مبيعاتك و",
        titleGradient: "سيطر على نتائج البحث",
        titleSuffix: "عبر الإنترنت",
        subtitle: "نحن نجمع بين الأداء السريع، تحسين معدل التحويل (CRO)، وهندسة SEO المتقدمة من جوجل لضمان ظهور موقعك في المقدمة وتحويل الزوار إلى عملاء دائمين.",
        highlight1Title: "أعلى معدلات تحويل ونمو المبيعات",
        highlight1Desc: "تجربة مستخدم استراتيجية ومسارات شراء قوية تزيد من إيراداتك.",
        highlight2Title: "المرتبة الأولى في جوجل ومحركات البحث",
        highlight2Desc: "احصل على أعلى المراكز في البحث بأرشفة سريعة وبنية SEO متطورة.",
        highlight3Title: "سرعة تحميل فائقة وأداء مذهل",
        highlight3Desc: "سرعة تحميل أقل من ثانية تبقي الزوار وتزيد من تفاعلهم وشراء المنتجات.",
        boostBtn: "زد مبيعاتك وحسّن SEO الآن",
        exploreBtn: "استكشف إمكانياتنا",
        modalTitle: "استكشف إمكانياتنا",
        modalSubtitle: "اكتشف كيف يمكن لميزاتنا أن تحوّل أعمالك",
        feature4Title: "تكامل التحليلات المتقدمة",
        feature4Desc: "احصل على رؤى عميقة حول سلوك المستخدمين ومؤشرات الأعمال.",
        feature5Title: "أمان بمستوى المؤسسات",
        feature5Desc: "احمِ بياناتك بمعايير أمان رائدة في القطاع.",
        feature6Title: "قابلية توسّع لا محدودة",
        feature6Desc: "بنية سحابية أصلية مصممة للنمو بسلاسة.",
        closeBtn: "إغلاق"
      },
      mobileApp: {
        badge: "تطوير تطبيقات الجوال ونشرها",
        titlePrefix: "تطبيقات جوال مخصصة منشورة على",
        titleGradient: "APP STORE & GOOGLE PLAY",
        titleSuffix: "",
        subtitle: "صل إلى عملائك مباشرة على هواتفهم. نحن نطور تطبيقات جوال عالية الأداء لنظامي iOS و Android ونتولى عمليات النشر الكاملة على متجري Apple App Store و Google Play Store.",
        feature1Title: "تطبيقات iOS و Android عالية الأداء",
        feature1Desc: "واجهات جوال سلسة وسريعة للغاية بأداء 60 إطاراً في الثانية ومعمارية حديثة.",
        feature2Title: "نشر كامل على App Store و Google Play",
        feature2Desc: "ندير جميع شروط الموافقة والإرشادات والاطلاق السلس في المتجرين.",
        feature3Title: "إشعارات فوريّة وضع العمل بدون إنترنت",
        feature3Desc: "حافظ على تفاعل عملائك بإشعارات في الوقت الفعلي وميزات تعمل بدون اتصال بالإنترنت.",
        feature4Title: "تكامل سلس مع واجهات برمجة التطبيقات",
        feature4Desc: "اربط التطبيق بأنظمتك وقواعد بياناتك الحالية بسلاسة.",
        feature5Title: "تصميم واجهة مستخدم مخصص",
        feature5Desc: "واجهات مثالية مصممة لتوفير أقصى درجات الراحة للمستخدم.",
        feature6Title: "أعلى معايير الأمان",
        feature6Desc: "تشفير البيانات وميزات الأمان المتقدمة لحماية المستخدمين.",
        modalTitle: "ميزات تطبيق الهاتف المحمول",
        modalSubtitle: "اكتشف كل ما نقدمه لتطبيقك",
        closeBtn: "إغلاق",
        buildBtn: "ابنِ تطبيق الجوال الخاص بك الآن",
        exploreBtn: "استكشف خدماتنا"
      },
      whoWeAre: {
        badge: "من نحن",
        title: "تعرّف على فريق القيادة المكون من 5 خبراء",
        subtitle: "نحن فريق نخبة من كبار المهندسين المعماريين، مصممي المنتجات، ومهندسي الأمان المكرسين لتحويل المنتجات الرقمية المعقدة.",
        calloutTitle: "هل ترغب في التعاون مباشرة مع شركائنا الخمسة الأساسيين؟",
        calloutSub: "احجز جلسة استكشاف تقني مع قادة فريقنا اليوم.",
        bookBtn: "احجز جلسة استكشاف",
        team: [
          {
            name: "Morteza",
            designation: "الرئيس التنفيذي والمؤسس المشارك",
            quote: "من خلال سنوات من الخبرة في بناء الشركات الناشئة في دول مختلفة، أؤمن بإنشاء منتجات تحل المشكلات العالمية حقاً من خلال الابتكار والمرونة."
          },
          {
            name: "Bella",
            designation: "مديرة التسويق والإعلان",
            quote: "إنشاء قصص جذابة وبناء علامات تجارية قوية هو شغفي. علمتني خبرتي الطويلة في الإعلان كيفية ربط المنتجات بالمجموعات المستهدفة المناسبة."
          },
          {
            name: "Sam",
            designation: "مطور وب ارشد Full-Stack",
            quote: "لقد بنيت تطبيقات ومواقع قوية باستخدام أطر عمل مختلفة. هدفي دائماً هو تقديم حلول وب مقياسة وعالية الأداء تتجاوز التوقعات."
          },
          {
            name: "Mina",
            designation: "محللة ومستشارة أعمال",
            quote: "بعد تقديم الاستشارات لكبرى الشركات العالمية مثل إريكسون، أتخصص في بهينة سير العمل، التحليل الاستراتيجي، وتحقيق نمو ملموس للأعمال."
          },
          {
            name: "Milad",
            designation: "مطور ارشد Full-Stack",
            quote: "من المعماريات الخلفية المعقدة إلى الواجهات الأمامية السلسة، أنشط في هندسة أنظمة برمجية قوية تمنح الطاقة للتجارب الرقمية الحديثة."
          }
        ]
      },
      perspolisProject: {
        category: "منصة إلكترونية للمطاعم والضيافة",
        title: "منصة مطعم برسبوليس الرقمية",
        desc: "تطبيق ويب متكامل ومخصص لمطعم برسبوليس يتميز بقائمة طعام رقمية تفاعلية، نظام حجز الطاولات عبر الإنترنت، دعم متعدد اللغات، وتصميم عصري سريع للغاية.",
        featuredBadge: "★ دراسة حالة متميزة",
        feature1: "قائمة طعام رقمية تفاعلية",
        feature2: "نظام حجز الطاولات إلكترونياً",
        feature3: "دعم متعدد اللغات وواجهة حديثة",
        previewBtn: "عرض المعاينة التفاعلية للموقع"
      },
      ffstechProject: {
        category: "الأنظمة الذكية والبنية التحتية الرقمية",
        title: "منصة FFSTECH للأنظمة والبنية التحتية",
        desc: "تطبيق ويب متكامل ومخصص لشركة FFSTECH متخصص في الأنظمة الذكية للمباني، شبكات السلامة وإدارة الحريق، مراقبة الفيديو، أنظمة التحكم بالدخول، والبنية التحتية الرقمية.",
        featuredBadge: "★ دراسة حالة متميزة",
        feature1: "أنظمة السلامة وإدارة الحريق الذكية",
        feature2: "التحكم بالدخول ومراقبة الفيديو IP",
        feature3: "الأنظمة الصوتية والمرئية وشبكات الاتصال",
        previewBtn: "عرض المعاينة التفاعلية للموقع"
      },
      dentistProject: {
        category: "منصة الرعاية الصحية وطب الأسنان",
        title: "منصة عيادة طب الأسنان الرقمية",
        desc: "تطبيق ويب متكامل ومخصص لعيادات طب الأسنان يتميز بنظام حجز المواعيد إلكترونياً للمرضى، استعراض الخدمات العلاجية التفاعلية، وبوابة المرضى الرقمية.",
        featuredBadge: "★ دراسة حالة متميزة",
        feature1: "نظام حجز المواعيد إلكترونياً للمرضى",
        feature2: "دليل الخدمات التفاعلي لطب الأسنان",
        feature3: "بوابة المرضى الرقمية وواجهة حديثة",
        previewBtn: "عرض المعاينة التفاعلية للموقع"
      },
      shiraziProject: {
        category: "منصة الاستشارات القانونية والهجرة",
        title: "مؤسسة شیرازی القانونية – Shirazi Associates",
        desc: "منصة رقمية قانونية متكاملة مخصصة لمؤسسة شیرازی تضمن خدمات القانون التجاري، استشارات الهجرة والتأشيرات، نظام حجز الاستشارات إلكترونياً، وواجهة متعددة اللغات عالية الأداء.",
        featuredBadge: "★ دراسة حالة متميزة",
        feature1: "حجز الاستشارات القانونية إلكترونياً",
        feature2: "خدمات القانون التجاري وتأشيرات الهجرة",
        feature3: "إدارة آمنة للقضايا وواجهة تفاعلية",
        previewBtn: "عرض المعاينة التفاعلية للموقع"
      },
      parsLawProject: {
        category: "منصة المحاماة والخدمات القانونية",
        title: "مكتب پارس للمحاماة – Pars Law Firm",
        desc: "تطبيق ويب متكامل مخصص لمكتب پارس للمحاماة والاستشارات القانونية يتميز بنظام حجز مواعيد موكلين، عرض مجالات الاختصاص القضائي، واستقبال الطلبات إلكترونياً بسرعة وأمان عالٍ.",
        featuredBadge: "★ دراسة حالة متميزة",
        feature1: "حجز مواعيد الموكلين وطلب الاستشارة",
        feature2: "دليل مجالات الاختصاص والقضايا القانونية",
        feature3: "سرعة فائقة وتجربة موثوقة للمستخدم",
        previewBtn: "عرض المعاينة التفاعلية للموقع"
      },
      portfolioHero: {
        badge: "معرض أعمالنا والدراسات الميدانية",
        pillTitle: "حلول مخصصة بنسبة 100%",
        pillSubtitle: "أفكار لكل نموذج عمل",
        titlePrefix: "استكشف مشاريعنا الناجحة في ",
        titleGradient: "مختلف قطاعات الأعمال",
        titleSuffix: "",
        subtitle: "استكشف مجموعة مشاريعنا المنفذة عبر مختلف القطاعات والمجالات. مهما كان نموذج عملك أو مجال اختصاصك، ننفذ أفكاراً وحلولاً رقمية مخصصة تضمن نمواً مستداماً لمؤسستك.",
        viewPillarsBtn: "استكشف الركائز الاستراتيجية الـ 6",
        modalTitle: "ركائزنا الـ 6 للنجاح الرقمي",
        modalSubtitle: "كيف نبني تطبيقات عالية الأداء مخصصة خصيصاً لأهداف عملك الاستراتيجية",
        feature1Title: "أفكار وحلول مخصصة لكل نموذج عمل",
        feature1Desc: "كل قطاع يتطلب استراتيجية فريدة؛ نحن نحت تحليل متطلبات مجالك ونبني حلولاً مخصصة بالكامل.",
        feature2Title: "مشاريع متنوّعة في مختلف الصناعات",
        feature2Desc: "من المطاعم والتجارة الإلكترونية والتكنولوجيا المالية إلى منصات الذكاء الاصطناعي وأنظمة SaaS.",
        feature3Title: "مصممة لزيادة المبيعات والتصدّر في نتائج البحث",
        feature3Desc: "سرعة تحميل فائقة وتجربة مستخدم محسّنة للتصدّر في Google وتحويل الزوار إلى عملاء دائمين.",
        feature4Title: "سرعة فائقة وبنية برمجية مستقبليّة",
        feature4Desc: "نستخدم أحدث التقنيات البرمجية لتحقيق سرعة تحميل فائقة وأمان عالي وقابلية توسّع غير محدودة.",
        feature5Title: "أمان عالي وضمان جودة البرمجيات",
        feature5Desc: "انضباط برمجي صارم وبنية قوية لحماية بيانات مؤسستك وعملائك على مدار الساعة.",
        feature6Title: "شراكة مخصصة ودعم مستمر للنمو",
        feature6Desc: "نعمل كشريك تكنولوجي طويل الأجل لمؤسستك ونرافقك في كافة مراحل تطوير وتوسيع منتجك.",
        exploreBtn: "استكشف أعمالنا",
        buildBtn: "ابدأ مشروعك المخصص",
        ctaTitle: "هل لديك فكرة لمنتج رقمي فريد ومتميز؟",
        ctaSubtitle: "تعاون مع فريقنا الخبير لتصميم وهندسة وإطلاق تطبيقات رقمية عالية الأداء مصممة خصيصاً لتحقيق أهداف عملك.",
        ctaBtn: "ابدأ بناء منتجك الآن"
      },
      ourWork: {
        badge: "أحدث أعمالنا",
        titlePrefix: "وسّع نطاق عملك من خلال ",
        titleGradient: "الابتكار الاستراتيجي للمنتجات",
        subtitle: "حوّل إمكانيات مؤسستك من خلال برمجيات عالية الأداء وتصميم عالي الدقة.",
        bullet1: "دعم أكثر من 4 مليون کاربر نشط في المؤسسات",
        bullet2: "أداء معاملات وتحليلات في أقل من 20 ملي ثانية",
        bullet3: "نظام تصميم مكونات React مرمزة وماجولار",
        explorePortfolio: "استكشف المعرض بالكامل",
        startProject: "ابدأ مشروعك الآن"
      },
      brandGrid: {
        badge: "معرض العلامة التجارية والمنتجات",
        title: "دقة التصميم ومواد الهوية البصرية",
        subtitle: "استكشف كيف ندمج الواجهات الرقمية مع المواد الملموسة وأنظمة التصميم المرمزة والهوية البصرية.",
        requestKit: "طلب حزمة العلامة التجارية"
      },
      testimonials: {
        badge: "آراء ورضا العملاء",
        title: "موثوق بنا من قبل أكثر من 140 قائد منتج",
        rating: "تقييم 5.0 من 5.0",
        reviews: {
          r1: "قامت روشالينك بتحويل لوحة تحكم الخدمات المصرفية القديمة لدينا إلى معمارية ميكرو فرونت إند فائقة السرعة بزمن استجابة أقل من 20 ملي ثانية.",
          r2: "نظام التصميم المقدم من فريقهم زاد من سرعة التطوير متعدد المنصات لدينا بنسبة 300%.",
          r3: "تنفيذ لا تشوبه شائبة وبدون انقطاع واحد. قام فريق DevOps الخاص بهم بإنشاء خط أنابيب النشر السحابي في وقت قياسي.",
          r4: "جماليات بصرية مذهلة ومقاييس أداء دقيقة. موصى به بشدة!",
          r5: "لقد قاموا بدمج مسارات الذكاء الاصطناعي التوليدي المخصصة بشكل سلس تماماً في تطبيق الويب الخاص بنا.",
          r6: "نظام التصميم المرمز رائع للغاية ومنظم لدرجة أن إدارته بين فريقي الويب والجوال أصبحت سهلة للغاية.",
          r7: "تم تسليم الامتثال لأعلى معايير ISO 27001 وأمان Zero-Trust دون أي تأثير على تجربة المستخدم.",
          r8: "ارتفع معدل التحويل لدينا بنسبة 48% خلال شهرين فقط من إطلاق الواجهة الجديدة.",
          r9: "دقة هندسية استثنائية. منحتنا لوحة التحكم المباشرة رؤية تشغيلية كاملة.",
          r10: "العمل مع فريقهم القيادي المكون من 5 خبراء كان بمثابة العمل مع فريق مؤسس مشارك معنا مباشرة.",
          r11: "قاموا بتوسيع نظام التتبع المباشر لدينا ليتعامل مع ملايين الطلبات المتزامنة بكل سهولة.",
          r12: "تصميم واجهة مستخدم جميل وكود برمدي خلفي متين للغاية. لقد تجاوزوا كل أهدافنا.",
          r13: "حافظ الموقع على زمن استجابة أقل من 20 ملي ثانية حتى أثناء ذروة الحركة والترافيك العالي.",
          r14: "كمال بصري تام. الرسوم المتحركة ثلاثية الأبعاد والتفاعلات الدقيقة تسعد مستخدمينا كل يوم.",
          r15: "تم تسليم تطبيق الويب المعقد قبل الموعد المحدد وبنسبة تغطية اختبار 100%.",
          r16: "بسّط نظام التصميم الخاص بهم عملية تدويل المنصة وترجمتها إلى 12 لغة.",
          r17: "لوحات تحكم ذكية وسلسة لخوارزميات الذكاء الاصطناعي المعقدة. يعشق مستخدمونا التجربة الجديدة.",
          r18: "أعلى مستويات الاحترافية والكفاءة التقنية. شريك حقيقي من فئة 5 نجوم.",
          r19: "هيكل كود برمدي نظيف للغاية. جعلت معمارية React & Vite انضمام المطورين الجدد سهلاً وسريعاً.",
          r20: "لقد حولوا هوية علامتنا التجارية وتطبيق الويب إلى معيار رائد في قطاع الصناعة."
        }
      },
      ctaBanner: {
        title: "هل أنت مستعد لبناء منتجك القادم؟",
        subtitle: "احجز جلسة استشارية استراتيجية مع فريق التصميم والهندسة الرئيسي اليوم.",
        button: "ابدأ تقديم المقترح"
      },
      footer: {
        brandRosha: "روشا",
        brandLink: "لينك",
        description: "جسر التواصل بين التحليل الدقيق للأعمال وتطوير المنتجات الرقمية المتقدمة.",
        navigation: "التنقل",
        capabilities: "القدرات",
        stayUpdated: "كن على اطلاع",
        newsletterSub: "احصل على تحليلات استراتيجية ونشرات تقنية ربع سنوية.",
        emailPlaceholder: "أدخل بريدك الإلكتروني في العمل",
        subscribe: "اشترك في النشرة",
        rights: "© 2026 RoshaLink. جميع الحقوق محفوظة."
      },
      modal: {
        badge: "بدء استكشاف المشروع",
        title: "ابدأ مشروعك الآن",
        subtitle: "جلسة استشارية مباشرة مع شركائنا الـ 5 الرئيسيّين.",
        name: "الاسم الكامل",
        email: "بريد العمل",
        focus: "المجال الرئيسي للمشروع",
        budget: "الميزانية المقترحة",
        overview: "نظرة عامة مختصرة",
        submit: "إرسال طلب الاستكشاف",
        submittedTitle: "تم تسجيل طلبك بنجاح!",
        submittedSub: "شكراً لإرسال معلوماتك. سيتواصل معك فريق القيادة لدينا خلال 4 ساعات عمل.",
        done: "تأكيد",
        sending: "جاري الإرسال...",
        error: "تعذّر إرسال طلبك. يرجى المحاولة مرة أخرى بعد قليل."
      },
      chat: {
        badge: "مساعد ذكي",
        title: "مساعد روشا الذكي",
        status: "متصل",
        hoverLabel: "تحدث مع روشا",
        greeting: "مرحباً! أنا روشا. كيف يمكنني مساعدتك في مشروعك اليوم؟",
        placeholder: "اكتب رسالتك هنا...",
        send: "إرسال الرسالة",
        close: "إغلاق المحادثة",
        typing: "روشا تكتب الآن",
        retry: "حاول مرة أخرى",
        cta: "احجز استشارة مجانية",
        disclaimer: "روشا مساعد ذكاء اصطناعي وقد يقع في الأخطاء.",
        errorNetwork: "لم أتمكن من الوصول إلى الخادم. يرجى التحقق من اتصالك والمحاولة مرة أخرى.",
        errorRateLimit: "أنت ترسل الرسائل بسرعة كبيرة. يرجى الانتظار لحظة ثم المحاولة مرة أخرى.",
        errorTooLong: "هذه الرسالة طويلة جداً. هل يمكنك اختصارها قليلاً؟",
        errorGeneric: "حدث خطأ من جانبي. يرجى المحاولة مرة أخرى بعد قليل."
      },
      privacyPolicy: {
        toggleShort: "نسخة مختصرة (قراءة سريعة)",
        toggleFull: "النسخة القانونية الكاملة",
        dpoBadge: "مسؤول حماية البيانات (DPO)",
        dpoTitle: "أسئلة حول لائحة GDPR أو حماية البيانات؟",
        dpoText: "فريق هندسة الخصوصية لدينا يجيب عادة خلال ۲۴ ساعة. تواصل مباشرة عبر privacy@roshalink.com.",
        dpoBtn: "التواصل مع DPO",
        shortTitle: "ملخص سريع لسياسة الخصوصية",
        shortPoints: [
          { title: "حماية البيانات أولاً", desc: "نحن نحترم خصوصيتك ونحمي بياناتك الشخصية وفقاً للائحة حماية البيانات (GDPR) وقانون حماية البيانات السويدي (2018:218)." },
          { title: "البيانات التي نجمعها", desc: "معلومات الاتصال، بيانات الحساب والمصادقة، السجلات الفنية للجهاز، ومراسلات الدعم." },
          { title: "عدم بيع البيانات", desc: "نحن لا نبيع بياناتك الشخصية مطلقاً لأي طرف ثالث تحت أي ظرف." },
          { title: "تكاملات سحابية آمنة", desc: "ندمج أكثر من ۲۵۰+ خدمة سحابية ومنصة ذكاء اصطناعي بأعلى معايير التشفير واتفاقيات معالجة البيانات (DPA)." },
          { title: "حقوقك", desc: "لديك الحق الكامل في الوصول إلى بياناتك، وتصحيحها، وحذفها ('الحق في النسيان')، ونقلها." },
          { title: "الاتصال بنا", desc: "للأسئلة المتعلقة بالخصوصية، تواصل مع فريق الخصوصية عبر privacy@roshalink.com." }
        ],
        badge: "وفقاً للائحة GDPR وقانون حماية البيانات السويدي",
        fullTitle: "سياسة الخصوصية (النسخة القانونية الكاملة)",
        updated: "آخر تحديث: ۱۰ أغسطس ۲۰۲۶",
        subtitle: "نحن ملتزمون بالحفاظ على خصوصيتك وحماية بياناتك الشخصية وفقاً لأعلى معايير الأمان ولائحة حماية البيانات العامة في الاتحاد الأوروبي (GDPR).",
        fullSections: [
          { num: "١", title: "١. المقدمة", icon: "ShieldCheck", text: `توضح سياسة الخصوصية هذه ("السياسة") كيفية جمع واستخدام وتخزين ومشاركة وحماية البيانات الشخصية بواسطة RoshaLink / Diara ("الشركة"، "نحن") فيما يتعلق بتقديم خدمات تكنولوجيا المعلومات، وتطوير البرمجيات، والحوسبة السحابية، والمنصات الرقمية.\n\nنحن ملتزمون بالحفاظ على خصوصيتك وفقاً للائحة العامة لحماية البيانات في الاتحاد الأوروبي (GDPR)، وقانون حماية البيانات السويدي (Dataskyddslagen 2018:218)، وجميع القوانين المعمول بها.\n\nيعتبر استخدامك لخدماتنا بمثابة إقرار منك بالاطلاع على سياسة الخصوصية هذه والموافقة عليها.` },
          { num: "٢", title: "٢. البيانات الشخصية التي نجمعها", icon: "FileText", text: `نحن نجمع فقط البيانات الشخصية الضرورية لتنفيذ التزاماتنا التعاقدية والقانونية، والحفاظ على أمان النظام، وتقديم خدمات تكنولوجيا المعلومات:\n\n• بيانات الاتصال والهوية: الاسم، عنوان البريد الإلكتروني، رقم الهاتف، المسمى الوظيفي، اسم الشركة، عنوان الفواتير، وعنوان IP.\n• بيانات الحساب والمصادقة: اسم المستخدم، كلمة المرور المشفّرة، سجلات الأمان (Security Logs)، رموز الوصول، وتفضيلات المستخدم.\n• السجلات الفنية وبيانات الجهاز: عنوان IP، نوع المتصفح، نظام التشغيل، دقة الشاشة، الطوابع الزمنية، تقارير الأعطال، ومؤشرات أداء الخوادم.\n• بيانات الاتصالات: الرسائل، تذاكر الدعم، الاستفسارات والمراسلات عبر البريد الإلكتروني، نماذج الاتصال، أو الأدوات التفاعلية (مثل مساعد Diara الذكي).\n• بيانات التكامل والقياس عن بُعد (Telemetry): سجلات التفاعل والبيانات الفنية الناتجة عن تشغيل البرمجيات والبنية التحتية.` },
          { num: "٣", title: "٣. كيفية استخدام البيانات", icon: "CheckCircle2", text: `نحن نعالج بياناتك الشخصية للأغراض التالية:\n\n١. تقديم وإدارة خدمات تكنولوجيا المعلومات: لتشغيل وتكوين وصيانة وإدارة الحلول البرمجية والمواقع وحسابات المستخدمين.\n٢. الدعم الفني والاتصالات: للرد على الاستفسارات، ومعالجة تذاكر الدعم، وإرسال الإشعارات الفنية والتحديثات الإدارية.\n٣. الأمان وسلامة النظام: لمراقبة استقرار البنية التحتية، ومنع الوصول غیر المصرح به، واكتشاف الهجمات السيبرانية ومكافحتها.\n٤. تحسين سير العمل المتكامل: لضمان أداء سلس وسريع عبر سير العمل الذي يدمج أكثر من ۲۵۰+ خدمة سحابية، ومنصة ذكاء اصطناعي، وأداة تصميم.\n٥. التحليل وتطوير المنتجات: لتقييم أنماط استخدام الخدمات، وتحسين تجربة المستخدم، وتطوير ميزات جدیدة.\n٦. الامتثال القانوني: للوفاء بالالتزامات القانونية بموجب قوانين المحاسبة المالية (قانون المحاسبة السويدي 1999:1078)، واللوائح الضريبية، والطلبات الرسمية من السلطات المختصة.` },
          { num: "٤", title: "٤. الأساس القانوني لمعالجة البيانات", icon: "Scale", text: `نعالج البيانات الشخصية بناءً على الأسس القانونية التالية بموجب المادة ٦ من لائحة GDPR:\n\n• تنفيذ العقد (المادة ٦.١-ب GDPR): المعالجة ضرورية لتنفيذ عقد معك أو مع المؤسسة التي تمثلها.\n• الالتزام القانوني (المادة ٦.١-ج GDPR): المعالجة ضرورية للالتزام بالقوانين المفروضة علينا (مثل قانون المحاسبة السويدي 1999:1078).\n• المصالح المشروعة (المادة ٦.١-ف GDPR): تستند المعالجة إلى مصلحتنا المشروعة في تقديم خدمات تكنولوجيا معلومات آمنة وعالية الأداء.\n• الموافقة (المادة ٦.١-أ GDPR): في الحالات التي تتطلب موافقة قانونية، نحصل على موافقتك الصريحة مسبقاً. يحق لك سحب موافقتك في أي وقت.` },
          { num: "٥", title: "٥. مشاركة البيانات والتكامل مع الأطراف الثالثة", icon: "Server", text: `نحن لا نبيع بياناتك الشخصية مطلقاً.\n\nباعتبارنا شركة متقدمة في تطوير تكنولوجيا المعلومات، فإننا ندمج أكثر من ۲۵۰+ خدمة سحابية، ومنصة ذكاء اصطناعي، وقواعد بيانات، وشبكات توصيل المحتوى (CDN)، وأدوات تصميم.\n\nنشارك البيانات فقط مع:\n• مزودو الخدمات ومعالجو البيانات (Processors): مزودو البنية التحتية السحابية (AWS، Google Cloud)، ومزودو واجهات الذكاء الاصطناعي (OpenAI، Anthropic)، وأدوات التحليل والأمان الخاضعين لاتفاقيات DPA.\n• السلطات الرسمية: عندما يتطلب القانون ذلك أو بناءً على أمر قضائي أو طلب رسمي من جهة حكومية مختصة.\n• المستشارون المهنيون: المستشارون القانونيون، والمدققون، والمحاسبون الماليون.` },
          { num: "٦", title: "٦. نقل البيانات الدولي", icon: "Globe", text: `قد تقع خوادمنا ومزودو الخدمات داخل المنطقة الاقتصادية الأوروبية (EEA) أو خارجها.\n\nعند نقل البيانات الشخصية إلى خارج المنطقة الاقتصادية الأوروبية، نطبق الضمانات التالية:\n• توقيع البنود التعاقدية القياسية المعتمدة من المفوضية الأوروبية (SCCs) بموجب المادة ٤٦ من لائحة GDPR.\n• إطار حماية البيانات بين الاتحاد الأوروبي والولايات المتحدة (EU-U.S. Data Privacy Framework).\n• تطبيق التشفير التام من النهاية إلى النهاية وإخفاء الهوية.` },
          { num: "٧", title: "٧. مدة حفظ البيانات", icon: "Clock", text: `نحتفظ بالبيانات الشخصية فقط للفترة الضرورية لتحقيق الأغراض التي جُمعت من أجلها:\n\n• بيانات العملاء والعقود: تُحفظ طوال فترة العقد ولمدة تصل إلى ٧ سنوات بعد انتهاء التعاقد بموجب قانون المحاسبة السويدي (1999:1078).\n• السجلات الفنية وأمان النظام: تُحفظ لمدة تتراوح بين ۳۰ يوماً و١٢ شهراً، وتُحذف تلقائياً بعد ذلك.\n• سجلات الدعم والمراسلات: تُحفظ لمدة تصل إلى ۳ سنوات بعد إغلاق التذكرة.` },
          { num: "٨", title: "٨. حقوق المستخدم بموجب لائحة GDPR", icon: "KeyRound", text: `بموجب لائحة GDPR، يحق لك ممارسة الحقوق التالية:\n\n• حق الوصول (Right of Access): الحصول على نسخة من بياناتك الشخصية.\n• حق تصحيح (Right to Rectification): طلب تصحيح البيانات غير الدقيقة.\n• حق المسح / "الحق في النسيان" (Right to Erasure): طلب حذف بياناتك الشخصية.\n• حق تقييد المعالجة (Right to Restriction): طلب الحد من معالجة البيانات.\n• حق نقل البيانات (Data Portability): الحصول على بياناتك بتنسيق قابل للقراءة آلياً.\n• حق اعتراض (Right to Object): الاعتراض على المعالجة القائمة على المصالح المشروعة.\n• حق تقديم شكوى: تقديم شكوى لدى سلطة الإشراف في السويد (IMY - www.imy.se).` },
          { num: "٩", title: "٩. ملفات تعریف الارتباط وتقنيات التتبع", icon: "Eye", text: `نستخدم ملفات تعریف الارتباط (Cookies) لضمان استقرار الموقع، وتحليل الأداء، وتحسين تجربة المستخدم:\n\n• ملفات تعریف الارتباط الضرورية: إلزامية للأمان، والمصادقة، والوظائف الأساسية.\n• ملفات التحليل والأداء: تجمع إحصاءات مجهولة الهوية لتحسين السرعة والعرض.\n• ملفات تعریف الارتباط الوظيفية: تحفظ تفضيلات مثل اللغة والتصميم.\n\nيمكنك تعديل تفضيلات ملفات تعریف الارتباط في أي وقت.` },
          { num: "١٠", title: "١٠. التدابير الأمنية", icon: "Lock", text: `نطبق تدابير أمنية فنية وتنظيمية متقدمة:\n\n• التشفير: تُشفر البيانات أثناء النقل باستخدام TLS 1.3؛ وتُشفر البيانات المخزنة باستخدام معيار AES-256.\n• إدارة الوصول: بنية الأمان ذات المستوى الصفر (Zero-Trust) ومبدأ الحد الأدنى من الصلاحيات (PoLP).\n• حماية البنية التحتية: الفحص المستمر للثغرات، وأنظمة اكتشاف التسلل، والالتزام بمعايير ISO 27001.` },
          { num: "١١", title: "١١. معلومات الاتصال", icon: "Mail", text: `لأي استفسارات حول سياسة الخصوصية، يمكنك التواصل معنا عبر:\n\n• اسم الشركة: RoshaLink / Diara IT Infrastructure\n• البريد الإلكتروني للخصوصية: privacy@roshalink.com / hello@designlogic.agency\n• الموقع الإلكتروني: https://roshalink.com\n• العنوان البريدي: RoshaLink IT Operations, San Francisco, CA & Zurich, Switzerland` },
          { num: "۱۲", title: "۱۲. التغييرات في سياسة الخصوصية", icon: "RefreshCw", text: `نحتفظ بالحق في تحديث سياسة الخصوصية هذه لمواكبة التطورات الفنية، أو التحديثات القانونية. سيتم الإعلان عن أي تغييرات جوهرية عبر إشعارات بارزة على موقعنا.` }
        ]
      },
      servicesPage: {
        hero: {
          titlePrefix: "نبني ما تحتاجه ",
          titleGradient: "فعلاً وبدقة",
          titleSuffix: "",
          subtitle: "بلا قوالب جاهزة، بلا تعقيد. نفهم عملك أولاً، ثم نبني بالضبط ما يناسبك — ويب، تطبيق، أو ذكاء اصطناعي — بشكل صحيح وللمدى البعيد.",
          primaryCta: "تحدث معنا اليوم",
          secondaryCta: "اكتشف ما نقدمه",
          floatingPillTitle: "سحابي، سريع وجاهز للنمو",
          floatingPillSubtitle: "آمن، موثوق، ومبني ليدوم",
          metric1Value: "100/100",
          metric1Label: "Google Lighthouse والسيو",
          metric2Value: "< 20ms",
          metric2Label: "سرعة الاستجابة عالمياً",
          metric3Value: "ISO 27001",
          metric3Label: "آمن وموثوق",
          metric4Value: "5 خبراء",
          metric4Label: "تتحدث مباشرة مع من يبني لك"
        },
        servicesSection: {
          title: "٦ أشياء نتقنها فعلاً",
          subtitle: "سواء كنت شركة ناشئة أو عملاً راسخاً — لدينا الأدوات والخبرة لتوصيلك إلى ما تريد.",
          deliverablesLabel: "ما ستحصل عليه:",
          techTagsLabel: "التقنيات التي نستخدمها:"
        },
        servicesList: [
          {
            id: "discovery",
            category: "استراتيجية الأعمال",
            title: "التحليل المؤسسي وتخطيط المعمارية",
            desc: "نحلل نماذج الأعمال ومسارات المستخدمين والعقبات التقنية قبل كتابة أي سطر برمجي لضمان أقصى عائد استثماري وقيمة فعلية.",
            deliverables: [
              "تخطيط شامل لنموذج العمل وتدفقات البيانات",
              "دراسة الجدوى التقنية ومخطط المعمارية",
              "نمذجة قواعد البيانات ومواصفات واجهات API",
              "خارطة طريق استراتيجية وتوقيتات زمنية للمشروع"
            ],
            techTags: ["System Mapping", "Figma Tokens", "Data Modeling", "ROI Analysis"]
          },
          {
            id: "web-architecture",
            category: "الواجهات والويب",
            title: "معمارية الويب المخصصة وهندسة React",
            desc: "تطبيقات ويب وبوابات مؤسسية فائقة السرعة مبنية بكود React نظيف ومكونات قياسية معيارية وأداء مثالي بنسبة 100/100.",
            deliverables: [
              "تطبيقات الصفحة الواحدة (SPA) والبوابات",
              "نظام تصميم معتمد بالرموز UI/UX Tokens",
              "إمكانية الوصول الشاملة WCAG 2.1 AA والتجاوب",
              "توافق 100/100 مع Core Web Vitals ومحركات البحث"
            ],
            techTags: ["React 19", "Vite", "Tailwind / CSS Tokens", "Framer Motion"]
          },
          {
            id: "cloud-backend",
            category: "الخوادم والبنية السحابية",
            title: "الأنظمة الخلفية والخدمات المصغرة",
            desc: "بنية خوادم مرنة وقواعد بيانات موزعة وواجهات API متطورة بسرعة استجابة أقل من 20 مللي ثانية ونسبة تشغيل 99.99٪.",
            deliverables: [
              "خدمات مصغرة معتمدة على الأحداث وواجهات REST/GraphQL",
              "معمارية قواعد بيانات PostgreSQL و Redis و NoSQL",
              "أمان معتمد وفق ISO 27001 ومصادقة Zero-Trust",
              "خطوط تسليم ونشر برمجية مؤتمتة CI/CD مع Docker"
            ],
            techTags: ["Node.js", "PostgreSQL", "Redis", "Docker", "AWS / GCP"]
          },
          {
            id: "ai-automation",
            category: "الذكاء الاصطناعي والأتمتة",
            title: "أتمتة الذكاء الاصطناعي وتدفقات البيانات الذكية",
            desc: "دمج نماذج الذكاء الاصطناعي المخصصة والوكلاء المستقلين لتقليص مئات الساعات من العمل اليدوي في مؤسستك.",
            deliverables: [
              "أنظمة مخصصة لنماذج LLM و RAG (OpenAI، Gemini)",
              "مساعدون رقميون أذكياء ووكلاء مهام مستقلون",
              "خطوط مؤتمتة لمعالجة واستيعاب البيانات الضخمة",
              "لوحات تحكم ذكية للتحليلات التنبؤية واتخاذ القرار"
            ],
            techTags: ["OpenAI API", "Gemini", "RAG / Vector DB", "Python Automation"]
          },
          {
            id: "mobile-apps",
            category: "تطبيقات الموبايل",
            title: "تطبيقات الموبايل متعددة المنصات (iOS و Android)",
            desc: "تطبيقات هواتف ذكية بأداء أصيل وسلس، ومزامنة لحظية مع الخوادم، وأمان بيومتري، وتجربة مستخدم عصرية.",
            deliverables: [
              "تطبيقات شاملة لمنصتي iOS و Android",
              "مزامنة البيانات الحية عبر WebSockets",
              "أمان بيومتري ودعم العمل دون اتصال بالإنترنت",
              "إطلاق ونشر كامل في App Store و Google Play"
            ],
            techTags: ["React Native", "Expo", "WebSockets", "Push Notifications"]
          },
          {
            id: "seo-performance",
            category: "الأداء ومحركات البحث",
            title: "هندسة SEO والتوزيع السحابي Edge CDN",
            desc: "تصدر نتائج محركات البحث وتوزيع المحتوى عالمياً بأقل زمن استجابة بفضل الأكواد الدلالية والشبكة السحابية المتطورة.",
            deliverables: [
              "ترميز البيانات المنظمة JSON-LD و Rich Snippets",
              "شبكة توزيع عالمية Cloudflare Edge CDN وتخزين ذكي",
              "أرشفة فورية وخرائط مواقع آلية في Search Console",
              "تحسين معدلات التحويل واختبارات A/B المتقدمة"
            ],
            techTags: ["SEO Schema", "Cloudflare CDN", "Lighthouse 100", "Analytics"]
          }
        ],
        techMatrix: {
          title: "منظومة التقنيات المؤسسية لدينا",
          subtitle: "نختار بعناية فائقة أكثر الأدوات استقراراً وأحدث التقنيات لبناء منصات قادرة على النمو المستدام.",
          tabFrontend: "الواجهات والتصميم",
          tabBackend: "الأنظمة وقواعد البيانات",
          tabAi: "الذكاء الاصطناعي والأتمتة",
          tabCloud: "السحابة والأمان",
          frontend: [
            { title: "React 19 & Vite", desc: "معمارية مكونات الجيل القادم، رندرة فائقة السرعة وتحديث HMR فوري دون أي أعباء برمجية." },
            { title: "Framer Motion & WebGL", desc: "حركات دقيقة وانسيابية بمعدل 60 إطاراً في الثانية مع تسريع العتاد وتفاعلات فيزيائية رائعة." },
            { title: "أنظمة التصميم المرمزة", desc: "رموز تصميم صارمة مع دعم كامل للوضع الداكن والفاتح والتجاوب التلقائي على جميع الشاشات." },
            { title: "Vanilla CSS & Tailwind", desc: "انعدام الأعباء عند التشغيل، وهندسة CSS معيارية ونظيفة لتحقيق أقصى درجات الأداء." }
          ],
          backend: [
            { title: "Node.js والخدمات المصغرة", desc: "بيئة تشغيل غير متزامنة فائقة السرعة مصممة لخدمات مصغرة بزمن استجابة أقل من 20 مللي ثانية." },
            { title: "PostgreSQL & Prisma", desc: "نمذجة قوية لقواعد البيانات العلائقية المتوافقة مع ACID مع هجرات آلية وموثوقة النوع." },
            { title: "Redis & Upstash", desc: "تخزين مؤقت موزع في الذاكرة بزمن وصول أقل من جزء من الثانية، وتحديد معدل الطلبات وقنوات Pub/Sub." },
            { title: "WebSockets والقياس عن بُعد", desc: "مزامنة تفاعلية ثنائية الاتجاه مع مراقبة مستمرة وتغذية راجعة فورية للبيانات." }
          ],
          ai: [
            { title: "تكاملات مخصصة مع LLMs", desc: "دمج مباشر ومخصص مع نماذج OpenAI و Claude و Gemini للاستدلال الذكي في نطاق الأعمال." },
            { title: "أنظمة RAG وقواعد البيانات الشعاعية", desc: "بحث دلالي ذكي واسترجاع دقيق للمعارف المؤسسية دون أي هلوسة من نماذج الذكاء الاصطناعي." },
            { title: "وكلاء المهام المستقلون", desc: "سير عمل متعدد الوكلاء ينفذ العمليات المؤسسية المعقدة والمتسلسلة بشكل ذاتي وسلس." },
            { title: "خطوط معالجة البيانات بـ Python", desc: "أنابيب مؤتمتة لجمع وتطهير وهيكلة وتحويل البيانات الضخمة لأغراض التحليل واتخاذ القرار." }
          ],
          cloud: [
            { title: "Docker والحاويات السحابية", desc: "بيئات حاويات معزولة وقابلة لإعادة الإنتاج لتطوير ونشر البرمجيات بسلاسة وأمان تام." },
            { title: "AWS & Cloudflare Edge", desc: "تنفيذ سحابي عالمي بدون خوادم في أكثر من 300 مدينة مع حماية مؤسسية متقدمة من هجمات DDoS." },
            { title: "معايير الأمان ISO 27001", desc: "تشفير شامل AES-256 و TLS 1.3 مع تطبيق سياسات الأمان ذات المستوى الصفر Zero-Trust." },
            { title: "خطوط النشر المؤتمتة CI/CD", desc: "فحص واختبار مؤتمت بدون توقف للنظام ونشر فوري عبر GitHub Actions بنسبة تشغيل 99.99%." }
          ]
        },
        process: {
          title: "كيف نعمل — خطوة بخطوة",
          subtitle: "مسار واضح وموثوق — دائماً تعرف أين أنت والخطوة التالية.",
          stageBadge1: "الخطوة ١ — نستمع ونخطط",
          stageBadge2: "الخطوة ٢ — نصمم معاً",
          stageBadge3: "الخطوة ٣ — نبني بشكل صحيح",
          stageBadge4: "الخطوة ٤ — نطلق ونتابع",
          step1Num: "٠١",
          step1Title: "نفهم ما تحتاجه",
          step1Desc: "نجلس معك، نستمع باهتمام، ونحدد بالضبط ما تحتاجه — قبل أن نكتب سطراً واحداً من الكود.",
          step1Tags: ["تحليل الأعمال والأهداف", "التخطيط التقني", "تصميم البيانات وواجهات API"],
          step2Num: "٠٢",
          step2Title: "التصميم والنموذج الأولي",
          step2Desc: "سترى كيف سيبدو المنتج ويُستخدم قبل البناء — ويمكنك التأثير في كل تفصيلة.",
          step2Tags: ["نموذج تفاعلي في Figma", "تصميم يناسب علامتك التجارية", "اختبار بسيناريوهات حقيقية"],
          step3Num: "٠٣",
          step3Title: "نبني ما وافقت عليه",
          step3Desc: "شركاؤنا الخمسة يكتبون الكود مباشرة — نظيف، سريع، وبلا اختصارات على حساب الجودة.",
          step3Tags: ["كود React مخصص", "دمج ذكاء اصطناعي عند الحاجة", "بنية قابلة للتوسع"],
          step4Num: "٠٤",
          step4Title: "الإطلاق والنشر",
          step4Desc: "نختبر كل شيء بدقة وننشر على مستوى عالمي — دون توقف للموقع ولو للحظة.",
          step4Tags: ["100/100 Lighthouse", "مراجعة أمنية", "CDN عالمي واستقرار 99.99%"],
          nextStage: "الخطوة التالية",
          stageCounter: "الخطوة {{current}} من {{total}}"
        },
        comparison: {
          title: "لماذا روشالينك وليس وكالة عادية؟",
          subtitle: "لا نحكم على أحد، فقط نقول الحقيقة بصدق. هذا هو الفرق على أرض الواقع.",
          featureCol: "ما نقارنه",
          agencyCol: "الوكالة المعتادة",
          roshaCol: "روشالينك",
          f1: "من يقوم بالعمل؟",
          f1Agency: "مطورون مبتدئون مع وسيط",
          f1Rosha: "5 خبراء مؤسسين — يكتبون الكود مباشرة",
          f2: "كيف يُبنى؟",
          f2Agency: "قوالب ووردبريس وإضافات جاهزة",
          f2Rosha: "كود نظيف ومخصص بـ React و Node.js",
          f3: "ما مدى سرعته؟",
          f3Agency: "بطيء (2-5 ثوانٍ)، تقييمات متدنية",
          f3Rosha: "خاطف السرعة (< 20ms)، تقييم 100/100",
          f4: "لمن ينتمي الكود؟",
          f4Agency: "إضافات غير آمنة، ملكية غير واضحة",
          f4Rosha: "ملكك بالكامل — 100٪ من اليوم الأول",
          f5: "كيف يبدو السعر؟",
          f5Agency: "تكاليف خفية تتراكم بلا توقف",
          f5Rosha: "سعر ثابت، نطاق واضح، بلا مفاجآت"
        },
        faq: {
          title: "أسئلة شائعة — إجابات صريحة",
          subtitle: "بلا مصطلحات مبهمة، بلا كلام تسويقي. فقط إجابات مباشرة لما يدور في ذهنك فعلاً.",
          q1: "كم يستغرق البدء في المشروع؟",
          a1: "عادةً خلال 48 ساعة من مكالمتنا الأولى نبدأ التحليل والتخطيط. تتحدث مباشرة مع من يبني لك — بلا وسطاء.",
          q2: "هل تستخدمون قوالب جاهزة؟",
          a2: "أبداً. كل شيء يُبنى من الصفر، مصمم خصيصاً لك. النتيجة؟ موقع أسرع، أمان أفضل، ومرونة كاملة في المستقبل.",
          q3: "من يكتب الكود فعلاً؟",
          a3: "نحن الخمسة — مباشرةً وشخصياً. لا نفوّض لمبتدئين أو متعاقدين خارجيين.",
          q4: "لمن ينتمي الكود وبياناتي؟",
          a4: "لك من اليوم الأول — الكود المصدري، التصاميم، وكل الحقوق. 100٪ لك. ونلتزم بمعايير ISO 27001 و GDPR.",
          q5: "هل هناك دعم بعد الإطلاق؟",
          a5: "بالتأكيد. نقدم صيانة مستمرة، مراقبة على مدار الساعة، ونتابع تطوير منتجك مع نمو أعمالك."
        },
        cta: {
          title: "جاهز لاتخاذ الخطوة التالية؟",
          subtitle: "احجز مكالمة قصيرة معنا — بلا التزامات. سنستمع، نسأل الأسئلة الصحيحة، ونخبرك بصدق ما يمكننا فعله لك.",
          button: "احجز مكالمة اليوم"
        }
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'sv', // Default Language is Swedish (sv)
    fallbackLng: 'sv',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
