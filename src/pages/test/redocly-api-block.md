---
layout: none
---

<RedoclyAPIBlock
    src="/github-actions-test/openapi.yaml"
    width="600px"
    typography="fontFamily: `serif`, fontSize: '16px'"
    codeBlock="tokens: { punctuation: { color: 'red ' }}"
    disableSidebar={false}
    disableSearch={true}
    hideTryItPanel
    scrollYOffset={64}
    sortOperationsAlphabetically
    sortTagsAlphabetically
    jsonSampleExpandLevel="all"
    generateCodeSamples="languages: [{ lang: 'curl' }, { lang: 'Node.js' }, { lang: 'JavaScript' }, {lang: 'Python'}]"
    requestInterceptor="
        function(req, operation) {
            console.log('Args:', req, operation);
            return req;
        }
    "
/>
