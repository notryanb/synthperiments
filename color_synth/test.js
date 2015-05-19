"use strict";

$().ready(function(){ 
// var LFO = T("sin", {freq:"250ms",  mul:5, add:880}).kr();



// More Experimenting
$('#sin-btn').click(function(){
    synth.set({wave:"sin", mul:1});
  });

$('#pulse-btn').click(function(){
    // synth.set({wave:"square"});
    synth.set({wave:"pulse", mul:0.25});
  });

$('#saw-btn').click(function(){
    // synth.set({wave:"square"});
    synth.set({wave:"saw", mul:0.25});
  });

$('#fami-btn').click(function(){
    // synth.set({wave:"square"});
    synth.set({wave:"fami", mul:0.50});
  });


});
// var synth = T("SynthDef").play();

// synth.def = function(opts) {
//   var osc1, osc2, env;
//   osc1 = T("saw", {freq:opts.freq         , mul:0.25});
//   osc2 = T("square", {freq:opts.freq*2, mul:0.20});
//   env  = T("linen", {a:1300, s:40, r:150, lv:0.5}, osc1);
//   return env.on("asdr", opts.doneAction).bang();
// };

var synth = T("OscGen", {wave:"fami", mul:1}).play();

var keydict = T("ndict.key");
var midicps = T("midicps");
T("keyboard").on("keydown", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxSelect(midi);
    var freq = midicps.at(midi);
    synth.noteOnWithFreq(freq, 50);
  }
}).on("keyup", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxUnselect(midi);
    synth.noteOff(midi, 100);
  }
}).start();

function boxSelect(midi) {
  if (midi % 1 == 1){
    $('#one').css('opacity', '0.5');
  } else if (midi % 2 == 1){
    $('#two').css('opacity', '0.5');
  } else if (midi % 3 == 1){
    $('#three').css('opacity', '0.5');
  } else if (midi % 4 == 1){
    $('#four').css('opacity', '0.5');
  } else if (midi % 5 == 1){
    $('#five').css('opacity', '0.5');
  } else {
    $('#six').css('opacity', '0.5');
  }
};

function boxUnselect(midi) {
  if (midi % 1 == 1){
    $('#one').css('opacity', '1.0');
  } else if (midi % 2 == 1){
    $('#two').css('opacity', '1.0');
  } else if (midi % 3 == 1){
    $('#three').css('opacity', '1.0');
  } else if (midi % 4 == 1){
    $('#four').css('opacity', '1.0');
  } else if (midi % 5 == 1){
    $('#five').css('opacity', '1.0');
  } else {
    $('#six').css('opacity', '1.0');
  }
};
