"use strict";const{Yargs:Yargs,processArgv:processArgv}=require("./build/index.cjs");function Argv(e,r){const s=Yargs(e,r,require);return singletonify(s),s}function singletonify(e){Object.keys(e).forEach((r=>{"argv"===r?Argv.__defineGetter__(r,e.__lookupGetter__(r)):"function"===typeof e[r]?Argv[r]=e[r].bind(e):(Argv.__defineGetter__("$0",(()=>e.$0)),Argv.__defineGetter__("parsed",(()=>e.parsed)))}))}Argv(processArgv.hideBin(process.argv)),module.exports=Argv;