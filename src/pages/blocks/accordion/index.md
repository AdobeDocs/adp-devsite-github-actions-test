---
title: Accordion Block Example
description: Learn how to use the Accordion block to create collapsible content sections for organizing information in your documentation.
---

# Accordion Block Example

Each timeline action shown in the previous table is described in detail below. Each description includes the payload that is sent as part of a Media Edge API request.

## Accordion Heading

<AccordionItem slots="heading, table, text, code"/>

### 1. Start play Test 

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 1 | The auto-play function occurs, or play button is pressed, and the video starts loading | 0 | 0 | `/sessionStart?configId=<datastreamID>` |

This call signals the intention of the user to play a video. The player state is not yet `playing`, but is instead `starting`. This call returns a Session ID which is referenced in the following examples with `{SID}`. The `{SID}`, is returned to the client and is used to identify all subsequent tracking calls within the session.  This call also generates a reporting event that is pushed to AEP and/or Analytics, depending on datastream configuration. Mandatory parameters must be included.

```json
{
 "eventType": "media.sessionStart",
  "timestamp": "YYYY-MM-DDT02:00:00.000Z",
  "mediaCollection": {
    "playhead": 0,
    "sessionDetails": {
      "name": "VA API Sample Player",
      "friendlyName": "ClickMe",
      "length": 60,
      "contentType": "VOD",
      "playerName": "sample-html5-api-player",
      "channel": "sample-channel",
      "appVersion": "va-api-0.0.0"
    }
  }
}
```

<AccordionItem slots="heading, table, text"/>

### 2. Ping event timer

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 2 | The ping event timer starts | 0 | 0 | `/ping?configId=<datastreamID>` |

The application starts the [ping timer](https://experienceleague.adobe.com/docs/media-analytics/using/implementation/analytics-only/streaming-media-apis/mc-api-impl/mc-api-sed-pings.html). A call is not sent for this event, but the first ping call should be fired 10 seconds later.


<AccordionItem slots="heading, table, text, code" />

### 3. Track buffer start

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 3 | Tracks the buffer start | 1 | 1 | `/bufferStart?configId=<datastreamID>` |

Player enters the `buffering` state. Because content is not being played the playhead is not advancing.

```json
{
  "eventType": "media.bufferStart",
  "timestamp": "YYYY-MM-DDT02:00:01.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 0
  }
}
```

<AccordionItem slots="heading, table, text, code"/>

### 4. Track buffer end

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 4 | Tracks the end of the buffer and a play event is sent | 4 | 1 | `/play?configId=<datastreamID>` |

Player buffering ends after 3 seconds so a `play` call is sent to put the player into the `playing` state. Sending a `play` call after the `bufferStart` call has been sent automatically ends the `buffering` state.

```json
{
  "eventType": "media.play",
  "timestamp": "YYYY-MM-DDT02:00:04.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 1
  }
}
```

<AccordionItem slots="heading, table, text, code"/>

### 5. Ping

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 5 | Sends a ping | 10 | 7 | `/ping?configId=<datastreamID>` |

A ping call is sent to the backend every 10 seconds.

```json
{
  "eventType": "media.ping",
  "timestamp": "YYYY-MM-DDT02:00:10.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 7
  }
}
```

<AccordionItem slots="heading, table, text, code"/>

### 6. User pauses

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 6 | User presses `pause` | 15 | 12 | `/pauseStart?configId=<datastreamID>` |

The user pauses the video. This moves the play state to `paused`.

```json
{
  "eventType": "media.pauseStart",
  "timestamp": "YYYY-MM-DDT02:00:15.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 12
  }
}
```


<AccordionItem slots="heading, table, text, code"/>

### 7. Ping

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 7 | Sends a ping | 20 | 12 | `/ping?configId=<datastreamID>` |

A ping call is sent to the backend every 10 seconds. The player remains in a `paused` state.

```json
{
  "eventType": "media.ping",
  "timestamp": "YYYY-MM-DDT02:00:20.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 12
  }
}
```

<AccordionItem slots="heading, table, text, code"/>

### 8. User presses play

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 8 | User presses `play` to resume the main content | 24 | 12 | `/play?configId=<datastreamID>` |

The user presses `play`. This moves the play state to `playing`. There is no need for a separate `resume` event.

```json
{
  "eventType": "media.play",
  "timestamp": "YYYY-MM-DDT02:00:24.000Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 12
  }
}
```

<AccordionItem slots="heading, table, text, code"/>

### 9. User closes player

| Number | Action | Elapsed Real-Time (from beginning) | Playhead Position | Client Request |
| --- | --- | --- | --- | --- |
| 9 | User closes the app without watching the content to the end | 29 | 17 | `/sessionEnd?configId=<datastreamID>` |

The user closes the app. `sessionEnd` is sent to the Media Edge API to signal that the session should be closed immediately, with no further processing.

```json
{
  "eventType": "media.sessionEnd",
  "timestamp": "YYYY-MM-DDT02:00:29Z",
  "mediaCollection": {
    "sessionID": "{SID}",
    "playhead": 17
  }
}
```

