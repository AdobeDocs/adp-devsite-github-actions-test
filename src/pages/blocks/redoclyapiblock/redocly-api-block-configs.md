---
title: Redocly API Block - Custom Configurations
description: Examples of Redocly API Block with custom configuration options including typography, code styling, and behavior settings.
layout: none
---

<RedoclyAPIBlock
    src="../../assets/openapi.yaml"
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
