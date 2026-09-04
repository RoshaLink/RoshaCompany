# Trust/content claims — needs your decision

Flagged by the SEO audit (2026-08-29). Not touched by the automated fix pass —
these are business/legal calls, not code bugs. Each item: what's there, where,
why it's a problem, and what "fixed" could look like once you decide.

## Highest risk (legal/compliance exposure)

1. **ISO 27001 claimed as established fact, 5 places, no evidence.**
   `src/i18n.js` — sv:250 (`features.bullet1`), sv:125 (`missionBento.card2Desc`),
   sv:742 (`servicesPage.hero.metric3Value`), sv:861 (`techMatrix.cloud`), sv:923
   (FAQ a4: "Vi följer ISO 27001 och GDPR"). Same claim repeated in en block.
   ISO 27001 is a specific, third-party-audited cert — claiming it without a
   cert number/registrar link is a false/unverifiable compliance claim, not
   puffery. **Options:** link a real certificate, soften to "ISO
   27001-inspired practices," or remove.

2. **Privacy policy names the wrong legal entity.**
   `src/i18n.js` en block ~1695-1705 (`privacyPolicy.fullSections` #1, #5, #11)
   and `contactPage.diaraPillTitle` ~1591/1920: the GDPR data controller is
   named "RoshaLink / Diara IT Infrastructure" and references a "Diara AI
   Assistant." The actual product is branded "Rosha"
   (`src/components/RoshaChatWidget/`, `chat.title` = "Rosha AI Assistant").
   "Diara" doesn't exist anywhere else on the site. This is inside the actual
   GDPR legal document — needs a real answer on which name/entity is correct,
   not just a copy edit.

## High (trust/E-E-A-T risk)

3. **Four fabricated-sounding awards.** `src/i18n.js` sv:170-204 / fa
   equivalent (`aboutPage.awards` a1-a4): "Global Cloud & Scalability Awards,"
   "Enterprise Scalability & Speed Honors," "Nordic Digital Experience &
   Product Awards," "Next-Gen Enterprise Web & Mobile Platform." No issuer, no
   link, no date. If real: add issuer name + link + year. If not: cut the
   section — this is exactly what search quality raters and spam policies
   penalize.

4. **"4M+ active business users" stat contradicts the actual client base.**
   `src/i18n.js` sv:516 (`ourWork.bullet1`), same figure in ar:3459 — and the
   ar version has a stray Farsi word (`کاربر`) inside otherwise-Arabic text.
   The real portfolio is small local businesses (a restaurant, a dental
   clinic, a café, two law firms). This number can't be true for that client
   list and sits right next to your genuinely good, specific testimonials —
   replace with something real (client count, years operating) or drop it.

5. **7 named testimonial orgs never appear as real case studies.**
   `src/i18n.js` sv/en `testimonials.orgs`/`reviews` r6-r20 (Saffron Deli,
   Golestan Import, Rahimi Fastighetsservice/Property Services, Diba
   Skönhetsklinik/Beauty Clinic, Persia Auto Service, Ekelund Design, Hosseini
   Catering). Only r1-r5 map to real, linked portfolio projects. Either
   surface these as real consenting clients (logo/link) or anonymize
   ("Restaurangägare, Stockholm") to stop implying a specific false
   endorsement.

6. **Named a real third party as a past client with no evidence.**
   `src/i18n.js` sv:31 (`aboutPage.teamPerspectives.mina.quote`) and sv:403
   (`whoWeAre.team`): "konsult för globala jättar som Ericsson." If accurate,
   strengthen with specifics (role, timeframe, LinkedIn); if it can't be
   substantiated, genericize ("ett globalt telekombolag") — naming a real
   company without consent is a reputational/legal risk.

## Medium

7. **Arabic testimonials/case studies are the Farsi (Iran-market) list
   re-spelled**, not a real Arabic-market client set — two case-study titles
   even contain literal Persian letters (پ, ی — پ doesn't exist in Arabic).
   `src/i18n.js` ar `testimonials.orgs` ~3482 vs fa ~2501, plus
   `shiraziProject`/`parsLawProject` ~3385-3404. Needs a real decision: is the
   ar locale targeting Scandinavian-diaspora Arabic speakers or a GCC/MENA
   audience? That decides what a "real" client set even looks like here.

8. **Same four proof stats (100/100 Lighthouse, <20ms, 99.99% uptime, ISO
   27001) repeated near-verbatim across every section** (en block, ~6
   locations) instead of varying evidence per section — reads as templated
   stat-stuffing on top of the verifiability problem above.

9. **Contact email is a free Gmail address**
   (`contactPage.emailValue`: `roshalinkcompany@gmail.com`, sv:615, reused as
   DPO contact in the privacy policy) — undercuts the "ISO 27001, dual
   Stockholm/San Francisco HQ, senior-partner-only" positioning used
   everywhere else. Low-cost fix once a branded `@roshalink.com` address
   exists.

10. **"Trusted by 80+ Industry Leaders" / "4.6-5.0 rating"** with no link to a
    real, checkable source (Google Business Profile, Trustpilot, Clutch).
    `testimonials.title`/`.rating`, sv:530-531, en equivalent. Link it or drop
    the number.

## Note

Your internal chat-assistant fact sheet
(`api/_lib/companyFacts.js`) already has an explicit "never state" list for
certifications, client names, performance numbers, and ratings — items 1, 3,
4, 5, 6, 8, and 10 above are the same categories of claim, just made directly
in page copy instead of by the chatbot. Worth reconciling the two so the site
and Rosha never contradict each other.
