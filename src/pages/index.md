# needs 'index.md'
[](/)
[](./)
[](Guides/)
[](/Guides/)
[](./Guides/)

# needs '.md'
[](with.dot)
[](/with.dot)
[](./with.dot)
[](SCREAMING_SNAKE_CASE)

# needs '.json'
[](Guides/SentenceCase)
[](/Guides/SentenceCase)
[](./Guides/SentenceCase)
[](Guides/SCREAMING_SNAKE_CASE)

# script cant handle because could be .md or .json - user will have to manually fix
[](Guides/same-name-same-dir)

# needs simpler relative path
[](Guides/../Guides/../index.md)
[](/../../src/pages/with.dot.md)
[](./../pages/Guides/SentenceCase.json)

# normalized
[](with.dot.md)
[](/with.dot.md)
[](./with.dot.md)
[](Guides/index.md)
[](/Guides/index.md)
[](./Guides/index.md)
[](Guides/SentenceCase.json)
[](/Guides/SentenceCase.json)
[](./Guides/SentenceCase.json)
[](SCREAMING_SNAKE_CASE.md)
[](Guides/same-name-diff-dir.json)
[](Guides/same-name-same-dir.json)
[](Guides/same-name-same-dir.md)

# absolute
[Adobe I/O Console](https://console.adobe.io)
