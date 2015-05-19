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

$('#other-btn').click(function(){
    // synth.set({wave:"square"});
    pulser = "sin";
    famiwhami = "saw";
  });


});

var synth2 = T("SynthDef").play();

var pulser = "pulse";
var famiwhami = "fami";

synth2.def = function(opts) {
  var osc1, osc2, env;
  osc1 = T(pulser, {freq:opts.freq         , mul:0.25});
  osc2 = T(famiwhami, {freq:opts.freq*2, mul:0.20});
  env  = T("linen", {s:40, r:150, lv:0.5}, osc1, osc2);
  return env.on("asdr", opts.doneAction).bang();
};

var synth = T("OscGen", {wave:"fami", mul:1}).play();


var keydict = T("ndict.key");
var midicps = T("midicps");
T("keyboard").on("keydown", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxSelect(midi);
    console.log(midi);
    var freq = midicps.at(midi);
    synth.noteOnWithFreq(freq, 50);
    // synth2.noteOn(midi, 50);
  }
}).on("keyup", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxUnselect(midi);
    synth.noteOff(midi, 100);
  }
}).start();

function boxSelect(midi) {
  $('#_'+midi).css('opacity', '0.5');
};

function boxUnselect(midi) {
   $('#_'+midi).css('opacity', '1.0');
};