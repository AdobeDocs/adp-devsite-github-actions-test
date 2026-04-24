# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: content.spec.js >> content: /acrobat-sign/docs/
- Location: test/content.spec.js:92:3

# Error details

```
Error: Content issues on stage for /acrobat-sign/docs/

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "BLOCKS: 6 empty block(s) — info background-color-white spectrum--light, info background-color-white",
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - paragraph [ref=e3]:
      - link "adobe icon" [ref=e4] [cursor=pointer]:
        - /url: https://developer.adobe.com/
        - img "adobe icon" [ref=e5]
      - link "Adobe Developer" [ref=e6] [cursor=pointer]:
        - /url: https://developer.adobe.com/
        - strong [ref=e7]: Adobe Developer
    - list [ref=e8]:
      - listitem [ref=e9]:
        - link "Products" [ref=e10] [cursor=pointer]:
          - /url: https://developer.adobe.com/apis
      - listitem [ref=e11]:
        - link "Adobe Acrobat Sign" [ref=e12] [cursor=pointer]:
          - /url: https://developer.adobe.com/acrobat-sign/
      - listitem [ref=e13]:
        - button "Resources" [ref=e14] [cursor=pointer]:
          - generic [ref=e15]: Resources
          - img
      - listitem [ref=e16]:
        - button "Documentation" [ref=e17] [cursor=pointer]:
          - generic [ref=e18]: Documentation
          - img
      - listitem [ref=e19]:
        - link "Solutions for Government" [ref=e20] [cursor=pointer]:
          - /url: https://developer.adobe.com/acrobat-sign/docs/overview/signgov/
      - listitem [ref=e21]:
        - link "Postman workspace" [ref=e22] [cursor=pointer]:
          - /url: https://www.adobe.com/go/acrobatsignpostman
      - listitem
    - generic [ref=e23]:
      - button "search" [ref=e25]:
        - img
      - link "Console" [ref=e27] [cursor=pointer]:
        - /url: https://developer.adobe.com/console/
        - generic [ref=e28]: Console
      - button "Sign in" [ref=e30] [cursor=pointer]:
        - generic [ref=e31]: Sign in
  - main [ref=e32]:
    - generic [ref=e33]:
      - heading "Adobe Sign Developer" [level=1] [ref=e38]:
        - strong [ref=e39]: Adobe Sign Developer
      - generic [ref=e48]:
        - heading [level=2] [ref=e49]
        - separator [ref=e50]
      - heading "Getting Started" [level=1] [ref=e55]:
        - strong [ref=e56]: Getting Started
      - generic [ref=e58]:
        - generic [ref=e62]:
          - heading "Developer Guide" [level=3] [ref=e63]
          - paragraph [ref=e64]:
            - link "Learn more" [ref=e65] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/developer_guide/
              - generic [ref=e66]: Learn more
        - generic [ref=e70]:
          - heading "Application Quickstart" [level=3] [ref=e71]
          - paragraph [ref=e72]:
            - link "Learn more" [ref=e73] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/developer_guide/gstarted
              - generic [ref=e74]: Learn more
        - generic [ref=e77]:
          - heading "Create Dev Account" [level=3] [ref=e78]
          - paragraph [ref=e79]:
            - link "Learn more" [ref=e80] [cursor=pointer]:
              - /url: https://www.adobe.com/acrobat/business/developer-form.html
              - generic [ref=e81]: Learn more
        - generic [ref=e85]:
          - heading "Rest API Reference" [level=3] [ref=e86]
          - paragraph [ref=e87]:
            - link "Learn more" [ref=e88] [cursor=pointer]:
              - /url: https://secure.na1.adobesign.com/public/docs/restapi/v6?aio_external
              - generic [ref=e89]: Learn more
        - generic [ref=e93]:
          - heading "Security and Compliance" [level=3] [ref=e94]
          - paragraph [ref=e95]:
            - link "Learn more" [ref=e96] [cursor=pointer]:
              - /url: https://www.adobe.com/trust/resources.html
              - generic [ref=e97]: Learn more
      - generic [ref=e99]:
        - generic [ref=e103]:
          - heading "API Release Notes" [level=3] [ref=e104]
          - paragraph [ref=e105]:
            - link "Learn more" [ref=e106] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/releasenotes/
              - generic [ref=e107]: Learn more
        - generic [ref=e111]:
          - 'heading "Web App: End User Help" [level=3] [ref=e112]'
          - paragraph [ref=e113]:
            - link "Learn more" [ref=e114] [cursor=pointer]:
              - /url: https://helpx.adobe.com/support/sign.html
              - generic [ref=e115]: Learn more
        - generic [ref=e119]:
          - heading "Webhook and Event Reference" [level=3] [ref=e120]
          - paragraph [ref=e121]:
            - link "Learn more" [ref=e122] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/acrobat_sign_events/
              - generic [ref=e123]: Learn more
    - generic [ref=e124]:
      - generic [ref=e128]:
        - heading [level=2] [ref=e129]
        - separator [ref=e130]
      - heading "Sign Embed" [level=1] [ref=e135]:
        - strong [ref=e136]: Sign Embed
      - generic [ref=e138]:
        - generic [ref=e142]:
          - heading "Developer Guide" [level=3] [ref=e143]
          - paragraph [ref=e144]:
            - link "Learn more" [ref=e145] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/embedpartner/
              - generic [ref=e146]: Learn more
        - generic [ref=e150]:
          - heading "Quickstart" [level=3] [ref=e151]
          - paragraph [ref=e152]:
            - link "Learn more" [ref=e153] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/embedpartner/gstarted
              - generic [ref=e154]: Learn more
        - generic [ref=e158]:
          - heading "Brief Solution" [level=3] [ref=e159]
          - paragraph [ref=e160]:
            - link "Learn more" [ref=e161] [cursor=pointer]:
              - /url: https://opensource.adobe.com/acrobat-sign/embedpartner/solutionbrief.pdf
              - generic [ref=e162]: Learn more
        - generic [ref=e166]:
          - heading "Provisioning FAQ" [level=3] [ref=e167]
          - paragraph [ref=e168]:
            - link "Learn more" [ref=e169] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/embedpartner/provisioningfaq
              - generic [ref=e170]: Learn more
        - generic [ref=e174]:
          - heading "App Certification" [level=3] [ref=e175]
          - paragraph [ref=e176]:
            - link "Learn more" [ref=e177] [cursor=pointer]:
              - /url: https://adobe.na1.documents.adobe.com/public/esignWidget?wid=CBFCIBAA3AAABLblqZhC6C5oHcS7JEZRkhhFwlvbQ9BEo2-MNiYCNvGtJqdBnD-BkDf8YeeykaXrJ9mePk38*
              - generic [ref=e178]: Learn more
      - generic [ref=e180]:
        - generic [ref=e184]:
          - heading "Contact us" [level=3] [ref=e185]
          - paragraph [ref=e186]:
            - link "Learn more" [ref=e187] [cursor=pointer]:
              - /url: mailto:signembed@adobe.com
              - generic [ref=e188]: Learn more
        - generic [ref=e192]:
          - heading "Partner Program Sign-up" [level=3] [ref=e193]
          - paragraph [ref=e194]:
            - link "Learn more" [ref=e195] [cursor=pointer]:
              - /url: https://www.adobe.com/acrobat/business/integrations/isv-partner-program.html
              - generic [ref=e196]: Learn more
    - generic [ref=e197]:
      - generic [ref=e201]:
        - heading [level=2] [ref=e202]
        - separator [ref=e203]
      - heading "Sign for Government" [level=1] [ref=e208]:
        - strong [ref=e209]: Sign for Government
      - generic [ref=e211]:
        - generic [ref=e215]:
          - heading "Developer Guide" [level=3] [ref=e216]
          - paragraph [ref=e217]:
            - link "Learn more" [ref=e218] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/signgov/
              - generic [ref=e219]: Learn more
        - generic [ref=e223]:
          - heading "QuickStart" [level=3] [ref=e224]
          - paragraph [ref=e225]:
            - link "Learn more" [ref=e226] [cursor=pointer]:
              - /url: https://developer.adobe.com/acrobat-sign/docs/overview/signgov/gstarted
              - generic [ref=e227]: Learn more
        - generic [ref=e231]:
          - heading "Sign Security Overview" [level=3] [ref=e232]
          - paragraph [ref=e233]:
            - link "Learn more" [ref=e234] [cursor=pointer]:
              - /url: https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/doc-cloud/acrobat-sign-security-overview.pdf
              - generic [ref=e235]: Learn more
        - generic [ref=e239]:
          - heading "FedRAMP Compliance" [level=3] [ref=e240]
          - paragraph [ref=e241]:
            - link "Learn more" [ref=e242] [cursor=pointer]:
              - /url: https://www.adobe.com/content/dam/cc/en/trust-center/ungated/whitepapers/doc-cloud/acrobat-sign-security-overview.pdf
              - generic [ref=e243]: Learn more
    - generic [ref=e244]:
      - generic [ref=e248]:
        - heading [level=2] [ref=e249]
        - separator [ref=e250]
      - heading "Postman" [level=1] [ref=e255]:
        - strong [ref=e256]: Postman
      - generic [ref=e258]:
        - generic [ref=e262]:
          - heading "Acrobat Sign Postman Collections" [level=3] [ref=e263]
          - paragraph [ref=e264]:
            - link "Learn More" [ref=e265] [cursor=pointer]:
              - /url: https://www.postman.com/adobe/adobe-acrobat-sign/overview
              - generic [ref=e266]: Learn More
        - generic [ref=e270]:
          - heading "How to use Postman" [level=3] [ref=e271]
          - paragraph [ref=e272]:
            - link "Learn more" [ref=e273] [cursor=pointer]:
              - /url: https://learning.postman.com/docs/introduction/overview/
              - generic [ref=e274]: Learn more
    - generic [ref=e275]:
      - generic [ref=e279]:
        - heading [level=2] [ref=e280]
        - separator [ref=e281]
      - heading "Sign SDK’s" [level=1] [ref=e286]:
        - strong [ref=e287]: Sign SDK’s
      - generic [ref=e293]:
        - heading "SDK Downloads and Docs" [level=3] [ref=e294]
        - paragraph [ref=e295]:
          - link "Learn more" [ref=e296] [cursor=pointer]:
            - /url: https://developer.adobe.com/acrobat-sign/docs/overview/sdks/
            - generic [ref=e297]: Learn more
    - generic [ref=e302]:
      - heading [level=2] [ref=e303]
      - separator [ref=e304]
  - contentinfo [ref=e305]
```

# Test source

```ts
  25  |     const h1s = [...document.querySelectorAll('main h1')];
  26  |     if (h1s.length === 0) hints.push('H1: No H1 heading — recommended for LLM/search readability');
  27  |     if (h1s.length > 1) hints.push(`H1: Multiple H1s (${h1s.length}) — may confuse search/LLM indexers`);
  28  | 
  29  |     // --- Empty headings ---
  30  |     const emptyHeadings = [...document.querySelectorAll('main h1,main h2,main h3,main h4,main h5,main h6')]
  31  |       .filter(h => inMain(h) && !h.textContent?.trim());
  32  |     if (emptyHeadings.length)
  33  |       problems.push(`STRUCTURE: ${emptyHeadings.length} empty heading(s) — ${emptyHeadings.map(h => h.tagName).join(', ')}`);
  34  | 
  35  |     // --- Images missing alt (skip for dev-biz — no way to set alt in Google Drive authoring) ---
  36  |     const isDevBiz = document.querySelector('main')?.classList.contains('dev-biz') ?? false;
  37  |     if (!isDevBiz) {
  38  |       const imgsNoAlt = [...document.querySelectorAll('main img')]
  39  |         .filter(img => inMain(img) && !img.closest('.contributors') && !img.closest('.site-wide-banner') && img.getAttribute('alt') === null);
  40  |       if (imgsNoAlt.length)
  41  |         problems.push(`IMAGES: ${imgsNoAlt.length} img(s) missing alt attribute`);
  42  |     }
  43  | 
  44  |     // --- Empty EDS block containers (stage-only check, prod is Gatsby so no .block elements) ---
  45  |     const excludedBlocks = ['site-wide-banner', 'contributors', 'discover', 'redoclyapiblock', 'side-nav', 'breadcrumbs', 'embed', 'next-prev'];
  46  |     const emptyBlocks = [...document.querySelectorAll('main .block')]
  47  |       .filter(b => inMain(b) && !b.textContent?.trim() && !b.querySelector('img, video, iframe'))
  48  |       .filter(b => !excludedBlocks.some(name => [...b.classList].some(c => c.includes(name))));
  49  |     if (emptyBlocks.length)
  50  |       problems.push(`BLOCKS: ${emptyBlocks.length} empty block(s) — ${[...new Set(emptyBlocks.map(b => b.className.replace(' block', '')))].join(', ')}`);
  51  | 
  52  |     // --- Tables with inconsistent column counts ---
  53  |     for (const table of document.querySelectorAll('main table')) {
  54  |       if (!inMain(table)) continue;
  55  |       const rows = [...table.querySelectorAll('tr')];
  56  |       if (rows.length < 2) continue;
  57  |       const counts = rows.map(r => r.querySelectorAll('td, th').length).filter(n => n > 0);
  58  |       const expected = counts[0];
  59  |       if (counts.some(n => n !== expected))
  60  |         problems.push(`BLOCKS: Table with inconsistent columns [${counts.join(', ')}]`);
  61  |     }
  62  | 
  63  |     // --- Broken on-page anchor links ---
  64  |     const brokenAnchors = [...document.querySelectorAll('main a[href^="#"]')]
  65  |       .filter(a => inMain(a) && !a.closest('.redoclyapiblock'))
  66  |       .map(a => a.getAttribute('href'))
  67  |       .filter(href => href && href.length > 1)
  68  |       .filter(href => {
  69  |         const id = href.slice(1);
  70  |         return !document.getElementById(id) && !document.querySelector(`[name="${id}"]`);
  71  |       });
  72  |     if (brokenAnchors.length)
  73  |       problems.push(`LINKS: ${brokenAnchors.length} broken anchor(s) — ${brokenAnchors.slice(0, 5).join(', ')}`);
  74  | 
  75  |     // --- Unrendered markdown leaking into page (block/render failure) ---
  76  |     const walker = document.createTreeWalker(document.querySelector('main') || document.body, NodeFilter.SHOW_TEXT);
  77  |     let node;
  78  |     const mdLeaks = [];
  79  |     while ((node = walker.nextNode())) {
  80  |       const t = node.textContent;
  81  |       if (/^\s*(#{1,6} \S|^\*\*\S.*\*\*$|\|\s*[-:]+\s*\|)/.test(t.trim()))
  82  |         mdLeaks.push(t.trim().slice(0, 60));
  83  |     }
  84  |     if (mdLeaks.length)
  85  |       problems.push(`RENDER: Unrendered markdown in page — ${mdLeaks.slice(0, 3).join(' | ')}`);
  86  | 
  87  |     return { issues: problems, warnings: hints };
  88  |   });
  89  | }
  90  | 
  91  | for (const path of paths) {
  92  |   test(`content: ${path}`, async ({ page }, testInfo) => {
  93  |     await page.setViewportSize({ width: 1600, height: 900 });
  94  | 
  95  |     const stageRes = await page.goto(`${STAGE_BASE}${path}`);
  96  |     if (stageRes?.status() === 404) return; // covered by links check
  97  |     await page.waitForLoadState('load');
  98  |     const { issues: stageIssues, warnings } = await extractIssues(page);
  99  | 
  100 |     // Load prod to filter out pre-existing issues (prod is Gatsby — only compare
  101 |     // checks that are meaningful across both frameworks: title, description, anchors)
  102 |     const prodRes = await page.goto(`${PROD_BASE}${path}`);
  103 |     let prodIssues = new Set();
  104 |     if (prodRes?.status() === 200) {
  105 |       await page.waitForLoadState('load');
  106 |       const { issues: pi } = await extractIssues(page);
  107 |       // Only carry over non-block issues from prod (blocks are EDS-specific)
  108 |       prodIssues = new Set(pi.filter(i => !i.startsWith('BLOCKS:')));
  109 |     }
  110 | 
  111 |     // Only flag issues that are new on stage (not already broken on prod)
  112 |     const issues = stageIssues.filter(i => i.startsWith('BLOCKS:') || !prodIssues.has(i));
  113 | 
  114 |     if (issues.length || warnings.length) {
  115 |       const lines = [`PAGE: ${path}`, ''];
  116 |       if (issues.length) lines.push(...issues.map(i => `  ❌  ${i}`));
  117 |       if (warnings.length) lines.push('', ...warnings.map(w => `  💡  ${w}`));
  118 |       await testInfo.attach('content-report', { body: lines.join('\n'), contentType: 'text/plain' });
  119 |     }
  120 | 
  121 |     for (const w of warnings) {
  122 |       testInfo.annotations.push({ type: 'warning', description: w });
  123 |     }
  124 | 
> 125 |     expect(issues, `Content issues on stage for ${path}`).toEqual([]);
      |                                                           ^ Error: Content issues on stage for /acrobat-sign/docs/
  126 |   });
  127 | }
  128 | 
```