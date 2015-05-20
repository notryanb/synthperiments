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

$('#square1-btn').click(function(){
    osc1Wave = "square";
  });

$('#square2-btn').click(function(){
    osc2Wave = "square";
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

$('#off1-btn').click(function(){
    osc1Wave = "";
  });

$('#off2-btn').click(function(){
    osc2Wave = "";
  });

$('#lfo1on-btn').click(function(){
    lfo1Switch = true;
  });

$('#lfo1off-btn').click(function(){
    lfo1Switch = false;
  });

$('#lfo2on-btn').click(function(){
    lfo2Switch = true;
  });

$('#lfo2off-btn').click(function(){
    lfo2Switch = false;
  });
});




// SYNTH 2-----------
var osc1Wave = "sin";
var osc2Wave = "sin";
var lfo1Switch = false;
var lfo2Switch = false;


// Returns FX with freq or just freq.
var fx = function (opts) {
  if (lfo1Switch) { return lfoModule(opts);  }
  else if (lfo2Switch) { return lfoModule(opts);  }
  else { return opts.freq; } 
};

var lfoModule = function(opts) {
    var lfo = T("sin", {freq: "250ms", mul:3, add:opts.freq}).kr();
    return lfo;
};

var synth2 = T("SynthDef").play();

synth2.def = function(opts) {
  var osc1, osc2, env;
  
  osc1 = T(osc1Wave, {freq: fx(opts), mul:0.25});
  osc2 = T(osc2Wave, {freq: fx(opts), mul:0.20});
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