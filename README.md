# arma3-pbo-read

Reads an Arma 3 mission file PBO, extracts the `mission.sqm` file, and converts it to a non-proprietary format

## Usage

    node . <format> <path>

This writes output to `stdout`, or `stderr` if there's an error.

You can direct the output to various places, e.g. to a file via [Pipelines](https://en.wikipedia.org/wiki/Pipeline_(Unix)):

    node . jsonp "D:\\SteamLibrary\\steamapps\\common\\Arma 3\\MPMissions\\test.VR.pbo" > test.json

## Valid `format`s:

* json - compact [JSON](https://en.wikipedia.org/wiki/JSON)
* jsonp - pretty [JSON](https://en.wikipedia.org/wiki/JSON)
* xml - compact [XML](https://en.wikipedia.org/wiki/XML)
* xmlp - pretty [XML](https://en.wikipedia.org/wiki/XML)
* yaml - [YALM](https://en.wikipedia.org/wiki/YAML)
