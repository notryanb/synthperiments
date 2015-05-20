"use strict";

$().ready(function(){ 
// var LFO = T("sin", {freq:"250ms",  mul:5, add:880}).kr();



// More Experimenting
$('#sin1-btn').click(function(){
    osc1Wave = "sin";
  });

$('#sin2-btn').click(function(){
    osc2Wave = "sin";
  });

$('#pulse1-btn').click(function(){
    osc1Wave = "pulse";
  });

$('#pulse2-btn').click(function(){
    osc2Wave = "pulse";
  });

$('#saw1-btn').click(function(){
    osc1Wave = "saw";
  });

$('#saw2-btn').click(function(){
    osc2Wave = "saw";
  });

$('#fami1-btn').click(function(){
    osc1Wave = "fami";
  });

$('#fami2-btn').click(function(){
    osc2Wave = "fami";
  });


});




// SYNTH 2-----------
var osc1Wave = "pulse";
var osc2Wave = "fami";


var synth2 = T("SynthDef").play();

synth2.def = function(opts) {
  var osc1, osc2, lfo, env;

  lfo = T("sin", {freq: "250ms", mul:3, add:opts.freq}).kr();

  
  osc1 = T(osc1Wave, {freq:opts.freq       , mul:0.25});
  osc2 = T(osc2Wave, {freq:opts.freq * 10, mul:0.20});
  env  = T("linen", {s:40, r:1050, lv:0.5}, osc1, osc2);
  return env.on("ended", opts.doneAction).bang();
};

// -------------------




var keydict = T("ndict.key");
var midicps = T("midicps");
T("keyboard").on("keydown", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxSelect(midi);
    // console.log(midi);
    // var freq = midicps.at(midi);

    synth2.noteOn(midi, 50);
  }
}).on("keyup", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
    boxUnselect(midi);
  }
}).start();


function boxSelect(midi) {
  $('#_'+midi).css('opacity', '0.5');
};

function boxUnselect(midi) {
   $('#_'+midi).css('opacity', '1.0');
};