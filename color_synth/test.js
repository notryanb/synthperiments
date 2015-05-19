"use strict";

// var synth = T("OscGen", {wave:"sin", freq:LFO, mul: 0.5}).play();
// var LFO = T("sin", {freq:"250ms",  mul:5, add:880}).kr();

// More Experimenting

var synth = T("SynthDef").play();

synth.def = function(opts) {
  var osc1, osc2, env;
  osc1 = T("saw", {freq:opts.freq         , mul:0.25});
  osc2 = T("square", {freq:opts.freq * 1.6818, mul:0.20});
  env  = T("linen", {s:450, r:250, lv:0.5}, osc1, osc2);
  return env.on("ended", opts.doneAction).bang();
};


var keydict = T("ndict.key");
var midicps = T("midicps");
T("keyboard").on("keydown", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxSelect(midi);
    var freq = midicps.at(midi);
    synth.noteOn(midi, 100);
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

