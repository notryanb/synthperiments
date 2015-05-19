"use strict";

var synth = T("OscGen", {wave:"saw", mul:0.25}).play();


var keydict = T("ndict.key");
var midicps = T("midicps");
T("keyboard").on("keydown", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
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
    var freq = midicps.at(midi);
    synth.noteOnWithFreq(freq, 100);

  }
}).on("keyup", function(e) {
  var midi = keydict.at(e.keyCode);
  if (midi) {
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
    synth.noteOff(midi, 100);
  }
}).start();

function randomDiv() {
  return Math.floor(Math.random() * 6);
}