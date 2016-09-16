const repl = require('repl');
const Player = require('./player');

function play(file){
    Player.play(file);
    return file + " playing";
}
function pause(){
    Player.pause();
    return "paused";
}
function resume(){
    Player.resume();
    return "resumed";
}
function add(file){

}
function next(){

}

//eval function given to repl server
//cmd is a string
//callback (null, to output)
function myEval(cmd, context, filename, callback){
    args = cmd.replace(/\n$/, "").split(" ");
    var output = "";
    if (args[0] === "play"){
        if (typeof args[1] == 'undefined'){
            output = resume();
        } else {
            output = play(args[1]);
        }
    } else if (args[0] === "pause"){
            output = pause();
    } else if (args[0] === "resume"){
            output = resume();
    } else if (args[0] === "add"){
    } else if (args[0] === "next"){
    } else {
        output = "invalid command";
    }
    callback(null, output); //second parameter is sent to writer
}

repl.start({
    prompt: 'player:>',
    eval: myEval
});
