var lame = require("lame");         //mp3 codec lib
var Speaker = require("speaker");   //speaker
var fs = require('fs');             //file system
const EventEmiter =  require('events'); //will be needed to create a player event emiter
/**
* play the mp3 file given
* mp3File path to mp3 file
*/

class Player extends EventEmiter {
    constructor(){
        super();
        this.audioStream = null;
        this.mp3Speaker = new lame.Decoder();    //mp3 decoder piped to a speaker
        this.speaker = new Speaker();
        this.mp3Speaker.pipe(this.speaker);
        
    }
    
    play(mp3File){
        var self = this;
        this.audioStream = fs.createReadStream(mp3File)
            .pipe(this.mp3Speaker);
        this.emit('play');
        this.audioStream.on('end', function(){
            self.emit('musicEnd');
        });
    }

    pause(){
        this.audioStream.pause();
        this.audioStream.unpipe(this.speaker);
        this.emit('paused')
    }

    resume(){
        this.audioStream.resume();
        this.audioStream.pipe(this.speaker);
        this.emit('resumed');
    }
    
}

module.exports = new Player();

