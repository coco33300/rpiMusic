var Player = require("./player");


Player.on('play', () => console.log('music started'))
    .on('paused', () => console.log('music paused'))
    .on('resumed', () => console.log('music resumed'))
    .on('musicEnd', () => console.log('music ended'))
    .play(process.argv[2]);

setTimeout(function(){
    Player.pause();
}, 10000);

setTimeout(function(){
    Player.resume();
}, 20000);

