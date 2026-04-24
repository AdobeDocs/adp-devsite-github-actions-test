# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.js >> visual diff: /experience-cloud/cloud-manager/reference/events/
- Location: test/visual.spec.js:65:3

# Error details

```
Error: /experience-cloud/cloud-manager/reference/events/ differs by 20.53% (threshold: 20%)

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 20
Received:    20.53
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
        - link "Cloud Manager" [ref=e12] [cursor=pointer]:
          - /url: /experience-cloud/cloud-manager/
      - listitem [ref=e13]:
        - link "Guides" [ref=e14] [cursor=pointer]:
          - /url: /experience-cloud/cloud-manager/guides/
      - listitem [ref=e15]:
        - link "Tutorial" [ref=e16] [cursor=pointer]:
          - /url: /experience-cloud/cloud-manager/tutorial/
      - listitem [ref=e17]:
        - button "API Reference" [ref=e18] [cursor=pointer]:
          - text: API Reference
          - img
      - listitem [ref=e19]:
        - link "CLI and SDKs" [ref=e20] [cursor=pointer]:
          - /url: /experience-cloud/cloud-manager/cli-and-sdks/
    - generic [ref=e21]:
      - button "search" [ref=e23]:
        - img
      - link "Console" [ref=e25] [cursor=pointer]:
        - /url: https://developer.adobe.com/console/
        - generic [ref=e26]: Console
      - button "Sign in" [ref=e28] [cursor=pointer]:
        - generic [ref=e29]: Sign in
  - main [ref=e30]:
    - navigation "Primary" [ref=e32]
    - generic [ref=e34]:
      - generic [ref=e35]:
        - navigation "Breadcrumb" [ref=e39]:
          - list [ref=e40]:
            - listitem [ref=e41]:
              - link "Products" [ref=e42] [cursor=pointer]:
                - /url: /apis/
              - img
            - listitem [ref=e43]:
              - link "Cloud Manager" [ref=e44] [cursor=pointer]:
                - /url: https://developer-stage.adobe.com/experience-cloud/cloud-manager/
              - img
            - listitem
        - generic [ref=e46]:
          - button "Edit in GitHub" [ref=e47] [cursor=pointer]:
            - generic [ref=e48]:
              - img
            - generic [ref=e49]: Edit in GitHub
          - button "Log an issue" [ref=e50] [cursor=pointer]:
            - generic [ref=e51]:
              - img
            - generic [ref=e52]: Log an issue
          - button "Copy as Markdown" [ref=e53] [cursor=pointer]:
            - img [ref=e55]
            - generic [ref=e78]: Copy as Markdown
      - generic [ref=e82]:
        - generic [ref=e83]:
          - button "Search" [ref=e84]:
            - text: Search
            - img [ref=e86]
          - navigation [ref=e91]:
            - listitem [ref=e92]:
              - menuitem "Event Pipeline Execution Start Event" [ref=e93] [cursor=pointer]:
                - generic [ref=e94]: Event
                - generic [ref=e95]: Pipeline Execution Start Event
            - listitem [ref=e96]:
              - menuitem "Event Pipeline Execution Step Start Event" [ref=e97] [cursor=pointer]:
                - generic [ref=e98]: Event
                - generic [ref=e99]: Pipeline Execution Step Start Event
            - listitem [ref=e100]:
              - menuitem "Event Pipeline Execution Step Waiting Event" [ref=e101] [cursor=pointer]:
                - generic [ref=e102]: Event
                - generic [ref=e103]: Pipeline Execution Step Waiting Event
            - listitem [ref=e104]:
              - menuitem "Event Pipeline Execution Step End Event" [ref=e105] [cursor=pointer]:
                - generic [ref=e106]: Event
                - generic [ref=e107]: Pipeline Execution Step End Event
            - listitem [ref=e108]:
              - menuitem "Event Pipeline Execution End Event" [ref=e109] [cursor=pointer]:
                - generic [ref=e110]: Event
                - generic [ref=e111]: Pipeline Execution End Event
        - generic [ref=e112]:
          - generic [ref=e115]:
            - heading "Cloud Manager Event Definitions (1.0.0)" [level=1] [ref=e116]:
              - text: Cloud Manager Event Definitions
              - generic [ref=e117]: (1.0.0)
            - paragraph [ref=e118]:
              - text: "Download OpenAPI specification:"
              - link "Download" [ref=e119] [cursor=pointer]:
                - /url: https://raw.githubusercontent.com/AdobeDocs/cloudmanager-api-docs/eds-migration/static/events.yaml
          - generic [ref=e121]:
            - generic [ref=e122]:
              - heading "/paths/PipelineExecutionStartEvent/post Pipeline Execution Start Event Webhook" [level=2] [ref=e123]:
                - link "/paths/PipelineExecutionStartEvent/post" [ref=e124] [cursor=pointer]:
                  - /url: "#/paths/PipelineExecutionStartEvent/post"
                - text: Pipeline Execution Start Event
                - generic [ref=e125]: Webhook
              - generic [ref=e126]:
                - generic [ref=e128] [cursor=pointer]:
                  - generic [ref=e129]: Request
                  - img [ref=e130]
                - generic [ref=e133]:
                  - 'heading "Request Body schema: application/json" [level=5] [ref=e135]'
                  - table [ref=e137]:
                    - rowgroup [ref=e138]:
                      - row "event_id string Unique identifier for the event." [ref=e139]:
                        - cell "event_id" [ref=e140]:
                          - generic [ref=e141]:
                            - link [ref=e142] [cursor=pointer]:
                              - /url: "#/paths/PipelineExecutionStartEvent/post!path=event_id&t=request"
                            - text: event_id
                        - cell "string Unique identifier for the event." [ref=e143]:
                          - generic [ref=e144]:
                            - generic [ref=e145]: string
                            - paragraph [ref=e148]: Unique identifier for the event.
                      - row "expand properties object" [ref=e149]:
                        - cell "expand properties" [ref=e150]:
                          - button "expand properties" [ref=e151] [cursor=pointer]:
                            - generic [ref=e152]:
                              - link [ref=e153]:
                                - /url: "#/paths/PipelineExecutionStartEvent/post!path=event&t=request"
                              - text: event
                            - img [ref=e154]
                        - cell "object" [ref=e157]:
                          - generic [ref=e159]: object
              - generic [ref=e160]:
                - generic [ref=e162] [cursor=pointer]:
                  - generic [ref=e163]: Responses
                  - img [ref=e164]
                - generic [ref=e169]:
                  - generic:
                    - generic:
                      - generic:
                        - text: "200"
                        - generic:
                          - paragraph: Event received
            - generic [ref=e171]:
              - generic [ref=e173] [cursor=pointer]:
                - generic [ref=e174]: Request samples
                - img [ref=e175]
              - generic [ref=e180]:
                - tablist [ref=e181]:
                  - tab "Payload" [selected] [ref=e182] [cursor=pointer]
                - tabpanel "Payload" [ref=e183]:
                  - generic [ref=e186]: application/json
                  - generic [ref=e188]:
                    - generic [ref=e189]:
                      - button "Copy" [ref=e191] [cursor=pointer]
                      - button "Expand all" [ref=e192] [cursor=pointer]
                      - button "Collapse all" [ref=e193] [cursor=pointer]
                    - code [ref=e196]:
                      - text: "- { …"
                      - list [ref=e197]:
                        - listitem [ref=e198]:
                          - generic [ref=e199]: "\"event_id\": \"string\","
                        - listitem [ref=e200]:
                          - generic [ref=e201]:
                            - text: "\"event\":"
                            - button "collapse" [ref=e202]: "-"
                            - text: "{ …"
                            - list [ref=e203]:
                              - listitem [ref=e204]:
                                - generic [ref=e205]: "\"@id\": \"string\","
                              - listitem [ref=e206]:
                                - generic [ref=e207]:
                                  - text: "\"@type\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/event/started" [ref=e208] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/event/started
                                  - text: "\","
                              - listitem [ref=e209]:
                                - generic [ref=e210]:
                                  - text: "\"xdmEventEnvelope:objectType\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/pipeline-execution" [ref=e211] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/pipeline-execution
                                  - text: "\","
                              - listitem [ref=e212]:
                                - generic [ref=e213]: "\"activitystreams:published\": \"2019-08-24T14:15:22Z\","
                              - listitem [ref=e214]:
                                - generic [ref=e215]:
                                  - text: "\"activitystreams:to\":"
                                  - button "expand" [ref=e216]: +
                                  - text: "{"
                                  - generic [ref=e217]: …
                                  - text: "},"
                              - listitem [ref=e218]:
                                - generic [ref=e219]:
                                  - text: "\"activitystreams:actor\":"
                                  - button "expand" [ref=e220]: +
                                  - text: "{"
                                  - generic [ref=e221]: …
                                  - text: "},"
                              - listitem [ref=e222]:
                                - generic [ref=e223]:
                                  - text: "\"activitystreams:object\":"
                                  - button "expand" [ref=e224]: +
                                  - text: "{"
                                  - generic [ref=e225]: …
                                  - text: "}"
                            - text: "}"
                      - text: "}"
          - generic [ref=e227]:
            - generic [ref=e228]:
              - heading "/paths/PipelineExecutionStepStartEvent/post Pipeline Execution Step Start Event Webhook" [level=2] [ref=e229]:
                - link "/paths/PipelineExecutionStepStartEvent/post" [ref=e230] [cursor=pointer]:
                  - /url: "#/paths/PipelineExecutionStepStartEvent/post"
                - text: Pipeline Execution Step Start Event
                - generic [ref=e231]: Webhook
              - generic [ref=e232]:
                - generic [ref=e234] [cursor=pointer]:
                  - generic [ref=e235]: Request
                  - img [ref=e236]
                - generic [ref=e239]:
                  - 'heading "Request Body schema: application/json" [level=5] [ref=e241]'
                  - table [ref=e243]:
                    - rowgroup [ref=e244]:
                      - row "event_id string Unique identifier for the event." [ref=e245]:
                        - cell "event_id" [ref=e246]:
                          - generic [ref=e247]:
                            - link [ref=e248] [cursor=pointer]:
                              - /url: "#/paths/PipelineExecutionStepStartEvent/post!path=event_id&t=request"
                            - text: event_id
                        - cell "string Unique identifier for the event." [ref=e249]:
                          - generic [ref=e250]:
                            - generic [ref=e251]: string
                            - paragraph [ref=e254]: Unique identifier for the event.
                      - row "expand properties object" [ref=e255]:
                        - cell "expand properties" [ref=e256]:
                          - button "expand properties" [ref=e257] [cursor=pointer]:
                            - generic [ref=e258]:
                              - link [ref=e259]:
                                - /url: "#/paths/PipelineExecutionStepStartEvent/post!path=event&t=request"
                              - text: event
                            - img [ref=e260]
                        - cell "object" [ref=e263]:
                          - generic [ref=e265]: object
              - generic [ref=e266]:
                - generic [ref=e268] [cursor=pointer]:
                  - generic [ref=e269]: Responses
                  - img [ref=e270]
                - generic [ref=e275]:
                  - generic:
                    - generic:
                      - generic:
                        - text: "200"
                        - generic:
                          - paragraph: Event received
            - generic [ref=e277]:
              - generic [ref=e279] [cursor=pointer]:
                - generic [ref=e280]: Request samples
                - img [ref=e281]
              - generic [ref=e286]:
                - tablist [ref=e287]:
                  - tab "Payload" [selected] [ref=e288] [cursor=pointer]
                - tabpanel "Payload" [ref=e289]:
                  - generic [ref=e292]: application/json
                  - generic [ref=e294]:
                    - generic [ref=e295]:
                      - button "Copy" [ref=e297] [cursor=pointer]
                      - button "Expand all" [ref=e298] [cursor=pointer]
                      - button "Collapse all" [ref=e299] [cursor=pointer]
                    - code [ref=e302]:
                      - text: "- { …"
                      - list [ref=e303]:
                        - listitem [ref=e304]:
                          - generic [ref=e305]: "\"event_id\": \"string\","
                        - listitem [ref=e306]:
                          - generic [ref=e307]:
                            - text: "\"event\":"
                            - button "collapse" [ref=e308]: "-"
                            - text: "{ …"
                            - list [ref=e309]:
                              - listitem [ref=e310]:
                                - generic [ref=e311]: "\"@id\": \"string\","
                              - listitem [ref=e312]:
                                - generic [ref=e313]:
                                  - text: "\"@type\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/event/started" [ref=e314] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/event/started
                                  - text: "\","
                              - listitem [ref=e315]:
                                - generic [ref=e316]:
                                  - text: "\"xdmEventEnvelope:objectType\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/execution-step-state" [ref=e317] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/execution-step-state
                                  - text: "\","
                              - listitem [ref=e318]:
                                - generic [ref=e319]: "\"activitystreams:published\": \"2019-08-24T14:15:22Z\","
                              - listitem [ref=e320]:
                                - generic [ref=e321]:
                                  - text: "\"activitystreams:to\":"
                                  - button "expand" [ref=e322]: +
                                  - text: "{"
                                  - generic [ref=e323]: …
                                  - text: "},"
                              - listitem [ref=e324]:
                                - generic [ref=e325]:
                                  - text: "\"activitystreams:object\":"
                                  - button "expand" [ref=e326]: +
                                  - text: "{"
                                  - generic [ref=e327]: …
                                  - text: "}"
                            - text: "}"
                      - text: "}"
          - generic [ref=e329]:
            - generic [ref=e330]:
              - heading "/paths/PipelineExecutionStepWaitingEvent/post Pipeline Execution Step Waiting Event Webhook" [level=2] [ref=e331]:
                - link "/paths/PipelineExecutionStepWaitingEvent/post" [ref=e332] [cursor=pointer]:
                  - /url: "#/paths/PipelineExecutionStepWaitingEvent/post"
                - text: Pipeline Execution Step Waiting Event
                - generic [ref=e333]: Webhook
              - generic [ref=e334]:
                - generic [ref=e336] [cursor=pointer]:
                  - generic [ref=e337]: Request
                  - img [ref=e338]
                - generic [ref=e341]:
                  - 'heading "Request Body schema: application/json" [level=5] [ref=e343]'
                  - table [ref=e345]:
                    - rowgroup [ref=e346]:
                      - row "event_id string Unique identifier for the event." [ref=e347]:
                        - cell "event_id" [ref=e348]:
                          - generic [ref=e349]:
                            - link [ref=e350] [cursor=pointer]:
                              - /url: "#/paths/PipelineExecutionStepWaitingEvent/post!path=event_id&t=request"
                            - text: event_id
                        - cell "string Unique identifier for the event." [ref=e351]:
                          - generic [ref=e352]:
                            - generic [ref=e353]: string
                            - paragraph [ref=e356]: Unique identifier for the event.
                      - row "expand properties object" [ref=e357]:
                        - cell "expand properties" [ref=e358]:
                          - button "expand properties" [ref=e359] [cursor=pointer]:
                            - generic [ref=e360]:
                              - link [ref=e361]:
                                - /url: "#/paths/PipelineExecutionStepWaitingEvent/post!path=event&t=request"
                              - text: event
                            - img [ref=e362]
                        - cell "object" [ref=e365]:
                          - generic [ref=e367]: object
              - generic [ref=e368]:
                - generic [ref=e370] [cursor=pointer]:
                  - generic [ref=e371]: Responses
                  - img [ref=e372]
                - generic [ref=e377]:
                  - generic:
                    - generic:
                      - generic:
                        - text: "200"
                        - generic:
                          - paragraph: Event received
            - generic [ref=e379]:
              - generic [ref=e381] [cursor=pointer]:
                - generic [ref=e382]: Request samples
                - img [ref=e383]
              - generic [ref=e388]:
                - tablist [ref=e389]:
                  - tab "Payload" [selected] [ref=e390] [cursor=pointer]
                - tabpanel "Payload" [ref=e391]:
                  - generic [ref=e394]: application/json
                  - generic [ref=e396]:
                    - generic [ref=e397]:
                      - button "Copy" [ref=e399] [cursor=pointer]
                      - button "Expand all" [ref=e400] [cursor=pointer]
                      - button "Collapse all" [ref=e401] [cursor=pointer]
                    - code [ref=e404]:
                      - text: "- { …"
                      - list [ref=e405]:
                        - listitem [ref=e406]:
                          - generic [ref=e407]: "\"event_id\": \"string\","
                        - listitem [ref=e408]:
                          - generic [ref=e409]:
                            - text: "\"event\":"
                            - button "collapse" [ref=e410]: "-"
                            - text: "{ …"
                            - list [ref=e411]:
                              - listitem [ref=e412]:
                                - generic [ref=e413]: "\"@id\": \"string\","
                              - listitem [ref=e414]:
                                - generic [ref=e415]:
                                  - text: "\"@type\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/event/waiting" [ref=e416] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/event/waiting
                                  - text: "\","
                              - listitem [ref=e417]:
                                - generic [ref=e418]:
                                  - text: "\"xdmEventEnvelope:objectType\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/execution-step-state" [ref=e419] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/execution-step-state
                                  - text: "\","
                              - listitem [ref=e420]:
                                - generic [ref=e421]: "\"activitystreams:published\": \"2019-08-24T14:15:22Z\","
                              - listitem [ref=e422]:
                                - generic [ref=e423]:
                                  - text: "\"activitystreams:to\":"
                                  - button "expand" [ref=e424]: +
                                  - text: "{"
                                  - generic [ref=e425]: …
                                  - text: "},"
                              - listitem [ref=e426]:
                                - generic [ref=e427]:
                                  - text: "\"activitystreams:object\":"
                                  - button "expand" [ref=e428]: +
                                  - text: "{"
                                  - generic [ref=e429]: …
                                  - text: "}"
                            - text: "}"
                      - text: "}"
          - generic [ref=e431]:
            - generic [ref=e432]:
              - heading "/paths/PipelineExecutionStepEndEvent/post Pipeline Execution Step End Event Webhook" [level=2] [ref=e433]:
                - link "/paths/PipelineExecutionStepEndEvent/post" [ref=e434] [cursor=pointer]:
                  - /url: "#/paths/PipelineExecutionStepEndEvent/post"
                - text: Pipeline Execution Step End Event
                - generic [ref=e435]: Webhook
              - generic [ref=e436]:
                - generic [ref=e438] [cursor=pointer]:
                  - generic [ref=e439]: Request
                  - img [ref=e440]
                - generic [ref=e443]:
                  - 'heading "Request Body schema: application/json" [level=5] [ref=e445]'
                  - table [ref=e447]:
                    - rowgroup [ref=e448]:
                      - row "event_id string Unique identifier for the event." [ref=e449]:
                        - cell "event_id" [ref=e450]:
                          - generic [ref=e451]:
                            - link [ref=e452] [cursor=pointer]:
                              - /url: "#/paths/PipelineExecutionStepEndEvent/post!path=event_id&t=request"
                            - text: event_id
                        - cell "string Unique identifier for the event." [ref=e453]:
                          - generic [ref=e454]:
                            - generic [ref=e455]: string
                            - paragraph [ref=e458]: Unique identifier for the event.
                      - row "expand properties object" [ref=e459]:
                        - cell "expand properties" [ref=e460]:
                          - button "expand properties" [ref=e461] [cursor=pointer]:
                            - generic [ref=e462]:
                              - link [ref=e463]:
                                - /url: "#/paths/PipelineExecutionStepEndEvent/post!path=event&t=request"
                              - text: event
                            - img [ref=e464]
                        - cell "object" [ref=e467]:
                          - generic [ref=e469]: object
              - generic [ref=e470]:
                - generic [ref=e472] [cursor=pointer]:
                  - generic [ref=e473]: Responses
                  - img [ref=e474]
                - generic [ref=e479]:
                  - generic:
                    - generic:
                      - generic:
                        - text: "200"
                        - generic:
                          - paragraph: Event received
            - generic [ref=e481]:
              - generic [ref=e483] [cursor=pointer]:
                - generic [ref=e484]: Request samples
                - img [ref=e485]
              - generic [ref=e490]:
                - tablist [ref=e491]:
                  - tab "Payload" [selected] [ref=e492] [cursor=pointer]
                - tabpanel "Payload" [ref=e493]:
                  - generic [ref=e496]: application/json
                  - generic [ref=e498]:
                    - generic [ref=e499]:
                      - button "Copy" [ref=e501] [cursor=pointer]
                      - button "Expand all" [ref=e502] [cursor=pointer]
                      - button "Collapse all" [ref=e503] [cursor=pointer]
                    - code [ref=e506]:
                      - text: "- { …"
                      - list [ref=e507]:
                        - listitem [ref=e508]:
                          - generic [ref=e509]: "\"event_id\": \"string\","
                        - listitem [ref=e510]:
                          - generic [ref=e511]:
                            - text: "\"event\":"
                            - button "collapse" [ref=e512]: "-"
                            - text: "{ …"
                            - list [ref=e513]:
                              - listitem [ref=e514]:
                                - generic [ref=e515]: "\"@id\": \"string\","
                              - listitem [ref=e516]:
                                - generic [ref=e517]:
                                  - text: "\"@type\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/event/ended" [ref=e518] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/event/ended
                                  - text: "\","
                              - listitem [ref=e519]:
                                - generic [ref=e520]:
                                  - text: "\"xdmEventEnvelope:objectType\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/execution-step-state" [ref=e521] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/execution-step-state
                                  - text: "\","
                              - listitem [ref=e522]:
                                - generic [ref=e523]: "\"activitystreams:published\": \"2019-08-24T14:15:22Z\","
                              - listitem [ref=e524]:
                                - generic [ref=e525]:
                                  - text: "\"activitystreams:to\":"
                                  - button "expand" [ref=e526]: +
                                  - text: "{"
                                  - generic [ref=e527]: …
                                  - text: "},"
                              - listitem [ref=e528]:
                                - generic [ref=e529]:
                                  - text: "\"activitystreams:object\":"
                                  - button "expand" [ref=e530]: +
                                  - text: "{"
                                  - generic [ref=e531]: …
                                  - text: "}"
                            - text: "}"
                      - text: "}"
          - generic [ref=e533]:
            - generic [ref=e534]:
              - heading "/paths/PipelineExecutionEndEvent/post Pipeline Execution End Event Webhook" [level=2] [ref=e535]:
                - link "/paths/PipelineExecutionEndEvent/post" [ref=e536] [cursor=pointer]:
                  - /url: "#/paths/PipelineExecutionEndEvent/post"
                - text: Pipeline Execution End Event
                - generic [ref=e537]: Webhook
              - generic [ref=e538]:
                - generic [ref=e540] [cursor=pointer]:
                  - generic [ref=e541]: Request
                  - img [ref=e542]
                - generic [ref=e545]:
                  - 'heading "Request Body schema: application/json" [level=5] [ref=e547]'
                  - table [ref=e549]:
                    - rowgroup [ref=e550]:
                      - row "event_id string Unique identifier for the event." [ref=e551]:
                        - cell "event_id" [ref=e552]:
                          - generic [ref=e553]:
                            - link [ref=e554] [cursor=pointer]:
                              - /url: "#/paths/PipelineExecutionEndEvent/post!path=event_id&t=request"
                            - text: event_id
                        - cell "string Unique identifier for the event." [ref=e555]:
                          - generic [ref=e556]:
                            - generic [ref=e557]: string
                            - paragraph [ref=e560]: Unique identifier for the event.
                      - row "expand properties object" [ref=e561]:
                        - cell "expand properties" [ref=e562]:
                          - button "expand properties" [ref=e563] [cursor=pointer]:
                            - generic [ref=e564]:
                              - link [ref=e565]:
                                - /url: "#/paths/PipelineExecutionEndEvent/post!path=event&t=request"
                              - text: event
                            - img [ref=e566]
                        - cell "object" [ref=e569]:
                          - generic [ref=e571]: object
              - generic [ref=e572]:
                - generic [ref=e574] [cursor=pointer]:
                  - generic [ref=e575]: Responses
                  - img [ref=e576]
                - generic [ref=e581]:
                  - generic:
                    - generic:
                      - generic:
                        - text: "200"
                        - generic:
                          - paragraph: Event received
            - generic [ref=e583]:
              - generic [ref=e585] [cursor=pointer]:
                - generic [ref=e586]: Request samples
                - img [ref=e587]
              - generic [ref=e592]:
                - tablist [ref=e593]:
                  - tab "Payload" [selected] [ref=e594] [cursor=pointer]
                - tabpanel "Payload" [ref=e595]:
                  - generic [ref=e598]: application/json
                  - generic [ref=e600]:
                    - generic [ref=e601]:
                      - button "Copy" [ref=e603] [cursor=pointer]
                      - button "Expand all" [ref=e604] [cursor=pointer]
                      - button "Collapse all" [ref=e605] [cursor=pointer]
                    - code [ref=e608]:
                      - text: "- { …"
                      - list [ref=e609]:
                        - listitem [ref=e610]:
                          - generic [ref=e611]: "\"event_id\": \"string\","
                        - listitem [ref=e612]:
                          - generic [ref=e613]:
                            - text: "\"event\":"
                            - button "collapse" [ref=e614]: "-"
                            - text: "{ …"
                            - list [ref=e615]:
                              - listitem [ref=e616]:
                                - generic [ref=e617]: "\"@id\": \"string\","
                              - listitem [ref=e618]:
                                - generic [ref=e619]:
                                  - text: "\"@type\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/event/ended" [ref=e620] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/event/ended
                                  - text: "\","
                              - listitem [ref=e621]:
                                - generic [ref=e622]:
                                  - text: "\"xdmEventEnvelope:objectType\": \""
                                  - link "https://ns.adobe.com/experience/cloudmanager/pipeline-execution" [ref=e623] [cursor=pointer]:
                                    - /url: https://ns.adobe.com/experience/cloudmanager/pipeline-execution
                                  - text: "\","
                              - listitem [ref=e624]:
                                - generic [ref=e625]: "\"activitystreams:published\": \"2019-08-24T14:15:22Z\","
                              - listitem [ref=e626]:
                                - generic [ref=e627]:
                                  - text: "\"activitystreams:to\":"
                                  - button "expand" [ref=e628]: +
                                  - text: "{"
                                  - generic [ref=e629]: …
                                  - text: "},"
                              - listitem [ref=e630]:
                                - generic [ref=e631]:
                                  - text: "\"activitystreams:object\":"
                                  - button "expand" [ref=e632]: +
                                  - text: "{"
                                  - generic [ref=e633]: …
                                  - text: "}"
                            - text: "}"
                      - text: "}"
        - generic [ref=e634]:
          - img [ref=e637] [cursor=pointer]
          - img [ref=e643] [cursor=pointer]
      - link "/experience-cloud/cloud-manager/guides/getting-started/understanding-the-api" [ref=e648] [cursor=pointer]:
        - /url: /experience-cloud/cloud-manager/guides/getting-started/understanding-the-api
        - img
        - generic [ref=e649]: Understanding the API
      - generic [ref=e653]:
        - link "Last updated 10/21/2021" [ref=e655] [cursor=pointer]:
          - /url: https://github.com/AdobeDocs/cloudmanager-api-docs/commits/eds-migration/src/pages/reference/events.md
          - img [ref=e658]
          - generic [ref=e659]: Last updated 10/21/2021
        - generic [ref=e661]:
          - generic [ref=e662]: Was this helpful?
          - generic [ref=e663]:
            - button "Yes" [ref=e664] [cursor=pointer]
            - button "No" [ref=e665] [cursor=pointer]
        - button "Dismiss" [ref=e666] [cursor=pointer]: ✕
    - generic [ref=e669]:
      - generic [ref=e670]:
        - generic [ref=e672]:
          - heading "APIs and Services" [level=3] [ref=e673]
          - list [ref=e674]:
            - listitem [ref=e675]:
              - link "Adobe AI Registry" [ref=e676] [cursor=pointer]:
                - /url: https://developer-stage.adobe.com/ai-registry/
            - listitem [ref=e677]:
              - link "Adobe Creative Cloud" [ref=e678] [cursor=pointer]:
                - /url: https://developer.adobe.com/creative-cloud/
            - listitem [ref=e679]:
              - link "Adobe Experience Platform" [ref=e680] [cursor=pointer]:
                - /url: https://developer.adobe.com/experience-platform-apis/
            - listitem [ref=e681]:
              - link "Adobe Document Cloud" [ref=e682] [cursor=pointer]:
                - /url: https://developer.adobe.com/document-services/homepage
            - listitem [ref=e683]:
              - link "Adobe Cloud Manager" [ref=e684] [cursor=pointer]:
                - /url: https://developer.adobe.com/experience-cloud/cloud-manager/
            - listitem [ref=e685]:
              - link "Adobe Analytics" [ref=e686] [cursor=pointer]:
                - /url: https://developer.adobe.com/analytics-apis/docs/2.0/
            - listitem [ref=e687]:
              - strong [ref=e688]:
                - link "View all" [ref=e689] [cursor=pointer]:
                  - /url: https://developer.adobe.com/apis/
        - generic [ref=e693]:
          - heading "Community" [level=3] [ref=e694]
          - list [ref=e695]:
            - listitem [ref=e696]:
              - link "Adobe Developers Blog" [ref=e697] [cursor=pointer]:
                - /url: https://blog.developer.adobe.com
            - listitem [ref=e698]:
              - link "Adobe on GitHub" [ref=e699] [cursor=pointer]:
                - /url: https://github.com/adobe
            - listitem [ref=e700]:
              - link "Adobe Developer on YouTube" [ref=e701] [cursor=pointer]:
                - /url: https://youtube.com/channel/UCDtYqOjS9Eq9gacLcbMwhhQ
            - listitem [ref=e702]:
              - link "Adobe Developer on X" [ref=e703] [cursor=pointer]:
                - /url: https://twitter.com/adobedevs
            - listitem [ref=e704]:
              - link "Community Forums" [ref=e705] [cursor=pointer]:
                - /url: https://community.adobe.com/
        - generic [ref=e709]:
          - heading "Support" [level=3] [ref=e710]
          - list [ref=e711]:
            - listitem [ref=e712]:
              - link "Adobe Developer Support" [ref=e713] [cursor=pointer]:
                - /url: https://developer.adobe.com/developer-support/
            - listitem [ref=e714]:
              - link "Adobe Product Support" [ref=e715] [cursor=pointer]:
                - /url: https://helpx.adobe.com/contact/enterprise-support.html
        - generic [ref=e719]:
          - heading "Adobe Developer" [level=3] [ref=e720]
          - list [ref=e721]:
            - listitem [ref=e722]:
              - link "Adobe Developer Console" [ref=e723] [cursor=pointer]:
                - /url: https://developer.adobe.com/developer-console
            - listitem [ref=e724]:
              - link "Developer Distribution" [ref=e725] [cursor=pointer]:
                - /url: https://developer.adobe.com/developer-distribution/
            - listitem [ref=e726]:
              - link "Open source at Adobe" [ref=e727] [cursor=pointer]:
                - /url: https://developer.adobe.com/open
            - listitem [ref=e728]:
              - link "Download SDKs" [ref=e729] [cursor=pointer]:
                - /url: https://developer.adobe.com/console/downloads
            - listitem [ref=e730]:
              - link "Authentication" [ref=e731] [cursor=pointer]:
                - /url: https://developer.adobe.com/developer-console/docs/guides/authentication/
            - listitem [ref=e732]:
              - link "Careers" [ref=e733] [cursor=pointer]:
                - /url: https://adobe.com/careers.html
            - listitem [ref=e734]:
              - link "Compliance" [ref=e735] [cursor=pointer]:
                - /url: https://developer.adobe.com/compliance/
      - generic [ref=e737]:
        - list [ref=e739]:
          - listitem [ref=e740]:
            - link "Terms of use" [ref=e741] [cursor=pointer]:
              - /url: https://adobe.com/legal/terms.html
          - listitem [ref=e742]:
            - link "Privacy policy" [ref=e743] [cursor=pointer]:
              - /url: https://adobe.com/privacy.html
          - listitem [ref=e744]:
            - link "Cookie preferences" [ref=e745] [cursor=pointer]:
              - /url: https://developer-stage.adobe.com/experience-cloud/cloud-manager/reference/events#/
          - listitem [ref=e746]:
            - link "Cookies" [ref=e747] [cursor=pointer]:
              - /url: https://adobe.com/privacy/cookies.html
          - listitem [ref=e748]:
            - link "AdChoices" [ref=e749] [cursor=pointer]:
              - /url: https://adobe.com/privacy/opt-out.html#interest-based-ads
        - paragraph [ref=e751]: Copyright © 2025 Adobe. All rights reserved.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { PNG } from 'pngjs';
  3  | import pixelmatch from 'pixelmatch';
  4  | import { readFileSync } from 'fs';
  5  | 
  6  | const PROD_BASE = 'https://developer.adobe.com';
  7  | const STAGE_BASE = 'https://developer-stage.adobe.com';
  8  | 
  9  | const paths = JSON.parse(readFileSync('.playwright-paths.json', 'utf-8'));
  10 | 
  11 | function buildDiff(imgA, imgB) {
  12 |   const a = PNG.sync.read(imgA);
  13 |   const b = PNG.sync.read(imgB);
  14 |   const width = Math.min(a.width, b.width);
  15 |   const height = Math.min(a.height, b.height);
  16 | 
  17 |   const cropData = (src) => {
  18 |     const out = new PNG({ width, height });
  19 |     PNG.bitblt(src, out, 0, 0, width, height, 0, 0);
  20 |     return out;
  21 |   };
  22 | 
  23 |   const croppedA = cropData(a);
  24 |   const croppedB = cropData(b);
  25 |   const diff = new PNG({ width, height });
  26 |   const diffPixels = pixelmatch(croppedA.data, croppedB.data, diff.data, width, height, { threshold: 0.1 });
  27 | 
  28 |   return { diffPixels, diffBuffer: PNG.sync.write(diff), totalPixels: width * height };
  29 | }
  30 | 
  31 | async function waitForNav(page) {
  32 |   const isDevBiz = await page.evaluate(() => document.querySelector('main')?.classList.contains('dev-biz') ?? false);
  33 |   if (isDevBiz) return;
  34 |   try {
  35 |     await page.waitForSelector('nav, aside, [class*="sidenav"], [class*="side-nav"], [class*="sidebar"]', {
  36 |       state: 'visible',
  37 |       timeout: 15000,
  38 |     });
  39 |   } catch {
  40 |     // nav selector didn't match, continue anyway
  41 |   }
  42 | }
  43 | 
  44 | async function scrollFully(page) {
  45 |   await page.evaluate(async () => {
  46 |     await new Promise((resolve) => {
  47 |       let lastHeight = 0;
  48 |       const interval = setInterval(() => {
  49 |         window.scrollBy(0, window.innerHeight);
  50 |         if (document.body.scrollHeight === lastHeight) {
  51 |           clearInterval(interval);
  52 |           window.scrollTo(0, 0);
  53 |           resolve();
  54 |         }
  55 |         lastHeight = document.body.scrollHeight;
  56 |       }, 300);
  57 |     });
  58 |   });
  59 |   await page.waitForLoadState('networkidle');
  60 | }
  61 | 
  62 | test.skip(({ browserName }) => browserName !== 'chromium', 'Visual diff runs on Chromium only');
  63 | 
  64 | for (const path of paths) {
  65 |   test(`visual diff: ${path}`, async ({ page }, testInfo) => {
  66 |     await page.setViewportSize({ width: 1600, height: 900 });
  67 |     await page.goto(`${PROD_BASE}${path}`);
  68 |     await page.waitForLoadState('networkidle');
  69 |     await waitForNav(page);
  70 |     await scrollFully(page);
  71 |     const prodScreenshot = await page.screenshot({ fullPage: true });
  72 | 
  73 |     await page.goto(`${STAGE_BASE}${path}`);
  74 |     await page.waitForLoadState('networkidle');
  75 |     await waitForNav(page);
  76 |     await scrollFully(page);
  77 |     const stageScreenshot = await page.screenshot({ fullPage: true });
  78 | 
  79 |     const { diffPixels, diffBuffer, totalPixels } = buildDiff(prodScreenshot, stageScreenshot);
  80 |     const diffPercent = (diffPixels / totalPixels * 100).toFixed(2);
  81 |     const threshold = parseFloat(process.env.DIFF_THRESHOLD ?? '5');
  82 | 
  83 |     const slug = path.replace(/\//g, '-').replace(/^-|-$/g, '') || 'home';
  84 |     await testInfo.attach(`prod-${slug}`, { body: prodScreenshot, contentType: 'image/png' });
  85 |     await testInfo.attach(`stage-${slug}`, { body: stageScreenshot, contentType: 'image/png' });
  86 |     await testInfo.attach(`diff-${slug}`, { body: diffBuffer, contentType: 'image/png' });
  87 |     await testInfo.attach('diff-summary', {
  88 |       body: `Diff: ${diffPercent}% (${diffPixels} / ${totalPixels} pixels) — threshold: ${threshold}%`,
  89 |       contentType: 'text/plain',
  90 |     });
  91 | 
> 92 |     expect(parseFloat(diffPercent), `${path} differs by ${diffPercent}% (threshold: ${threshold}%)`).toBeLessThanOrEqual(threshold);
     |                                                                                                      ^ Error: /experience-cloud/cloud-manager/reference/events/ differs by 20.53% (threshold: 20%)
  93 |   });
  94 | }
  95 | 
```