---
layout: none
---

<RedoclyAPIBlock 
    src="/adp-devsite-github-actions-test/openapi.yaml" 
    width="600px" 
    typography="fontFamily: `serif`, fontSize: '16px'"  
    codeBlock="tokens: { punctuation: { color: 'red ' }}"
    disableSidebar
    disableSearch
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