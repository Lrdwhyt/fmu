# Forum Mafia Utilities

Forum Mafia Utilities is a client-side script/extension written for the Forums of Loathing. It adds an interface to each forum thread and offers various features to make playing, hosting, or following mafia games more streamlined. It is written in TypeScript and uses Vue.js.

## Installation

### Firefox

Forum Mafia Utilities for Firefox requires the Violetmonkey (or other userscript) add-on, which can be downloaded [here](https://addons.mozilla.org/en/firefox/addon/violentmonkey/). With Violentmonkey, you can install Forum Mafia Utilities from [this link](https://gist.github.com/Lrdwhyt/fd4134fe014ca936e4afaec02db0d3d5/raw/forum-mafia-utilities.user.js).

### Chrome

Forum Mafia Utilities is available as a Chrome extension, which can be downloaded from the Chrome Web Store [here](https://chrome.google.com/webstore/detail/forum-mafia-utilities/medflogpihpikljkkpjpeoijooblipgg?authuser=0).

## Features

* Generates tallies for the daily elimination, which can be copied in BBCode format
* Track players in the game, including their affiliations and time of death
* Manage player nicknames and match votes to the closest player
* Generate coloured tallies with customisable colours


## Usage

Forum Mafia Utilities currently only works for the Forums of Loathing, located at [http://forums.kingdomofloathing.com/vb/index.php](http://forums.kingdomofloathing.com/vb/index.php). Specifically, it'll only run on URLs that are prefixed with `http://forums.kingdomofloathing.com/vb/showthread.php?`.

The main interface for the utility is located at the bottom of each page, under the Quick Reply box. To enable it for a particular thread, click the button labeled "Start game". It can be disabled again by clicking the (same) button now labeled "Stop game". A more detailed guide can be found on the [wiki](https://github.com/Lrdwhyt/fmu/wiki).

## Troubleshooting

If updating from an earlier version, it may be necessary to reset the script. If the script interface won't load at all, you can do this by opening the developer console (<kbd>ctrl</kbd><kbd>shift</kbd>+<kbd>i</kbd>), going to the console tab and entering `localStorage.clear()` (case sensitive) 
