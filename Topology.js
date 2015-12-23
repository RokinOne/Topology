var i, j, k;
var mouseDown = 0;
var toolIndex = 0;
var character;
var sizeX, sizeY;
var noCells;
var value;
var map = [];

var overlay;
var loading;
var selectable;
var close;
var load;
var elements;
var mapEl;
var tools;

function init (size) {
  overlay = document.getElementById("overlay");
  loading = document.getElementById("loading");
  selectable = document.getElementById("selectable");
  close = document.getElementById("close");
  load = document.getElementById("load");
  tools = document.getElementById("tools");
  mapEl = document.getElementById("map");
  mapEl.innerHTML = "";

  elements = document.getElementById("set1").children;
  for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () { select(this); }); }

  elements = document.getElementById("set2").children;
  for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () { select(this); }); }

  elements = document.getElementById("set3").children;
  for (i = 0; i < elements.length; i++) {
    elements[i].addEventListener("click", function () { select(this); }); }

  document.getElementById("set1").style.display = "inline-block";

  document.body.onmousedown = function() { mouseDown++; }
  document.body.onmouseup = function() { mouseDown--; }

  switch (size) {
    case 1: sizeX = 10; sizeY = 10; break;
    case 2: sizeX = 20; sizeY = 15; break;
    case 3: sizeX = 30; sizeY = 20; break; }

  noCells = sizeX * sizeY + sizeY;
  for (j = 0; j < sizeY; j++) {
    map[j] = [];
    for (k = 0; k < sizeX; k++) {
      map[j][k] = "&nbsp;"; } }

  for (j = 0; j < sizeY; j++) {
    for (k = 0; k < sizeX; k++) {
      mapEl.innerHTML +=
        "<span onclick='change1(this)' onmousemove='change2(this)'>"
        +map[j][k]+"</span>"; }
    mapEl.innerHTML += "<br>"; }

  fontColor(); bagColor(); fontSize(); padding(); lineHeight(); grid();
  selectTool(tools.children[0]);
  overlay.style.display = "none"; }


function change1 (span) { span.innerHTML = character; }
function change2 (span) { if (mouseDown==1) { span.innerHTML = character; } }

function select (selected) {
  tools.children[toolIndex].innerHTML = selected.innerHTML;
  character = selected.innerHTML; }
function selectTool (tool) {
  for (i = 0; i < tools.children.length; i++) {
    tools.children[i].style.border = "double 3px";
    if (tool == tools.children[i]) { toolIndex =  i; } }
  character = tool.innerHTML;
  tool.style.border = "solid 5px"; }

function changeSet(setID) {
  for (i = 1; i <= 3; i++) {
    document.getElementById("set"+i).style.display = "none"; }
  document.getElementById("set"+setID).style.display = "inline-block"; }

function fontColor () {
  var hex;
  var bodyEl = document.getElementById("body");
  value = document.getElementById("settingFontColor").value;
  value = parseInt(value,10);
  hex = value.toString(16);
  bodyEl.style.color = "#" + hex + hex + hex;
  bodyEl.style.borderColor = "#" + hex + hex + hex; }

function bagColor () {
  var hex;
  var bodyEl = document.getElementById("body");
  value = document.getElementById("settingBgColor").value;
  value = parseInt(value,10);
  hex = value.toString(16);
  bodyEl.style.backgroundColor = "#" + hex + hex + hex; }

function fontSize () {
  value = document.getElementById("settingFontSize").value;
  for (j = 0; j < noCells; j++) {
    mapEl.children[j].style.fontSize = value + "px"; } }

function padding () {
  value = document.getElementById("settingPadding").value;
  for (j = 0; j < noCells; j++) {
    mapEl.children[j].style.padding = value + "px"; } }

function lineHeight () {
  value = document.getElementById("settingLineHeight").value;
  for (j = 0; j < noCells; j++) {
    mapEl.children[j].style.lineHeight = value + "px"; } }

function grid () {
  value = document.getElementById("settingGrid");
  if (value.checked) {
    for (j = 0; j < noCells; j++) { 
      mapEl.children[j].style.border = "solid 1px #222"; } }
  else {
    for (j = 0; j < noCells; j++) {
      mapEl.children[j].style.border = "none"; } } }


function newMap (size) {
  loading.style.display = "block";
  overlay.style.display = "block";
  init(size); }

function closeOverlay () {
  selectable.style.display = "none";
  load.style.display = "none";
  close.style.display = "none";
  overlay.style.display = "none"; }


function exportMap () {
  var completeString = "";

  loading.style.display = "none";
  close.style.display = "inline-block";
  selectable.style.display = "block";
  selectable.value = "";

  for (j = 0; j < noCells; j++) {
    if (mapEl.children[j].tagName == "BR") {
      completeString += "\n"; }
    else if (mapEl.children[j].innerHTML == "&nbsp;") {
      completeString += " "; }
    else { completeString += mapEl.children[j].innerHTML; } }

  selectable.value = completeString;
  overlay.style.display = "block"; }

function importMap () {
  loading.style.display = "none";
  selectable.style.display = "block";
  selectable.value = "";
  load.style.display = "inline-block";
  close.style.display = "inline-block";
  overlay.style.display = "block"; }

function loadMap () {
  var completeString = "";
  var textArray = selectable.value.split("");
  i = j = k = 0;

  while (textArray[i]) {
    if (textArray[i] == "\n") {
      j++; k = 0; }
    else {
      map[j][k] = textArray[i];
      k++; }
    i++; }

    mapEl.innerHTML = "";
    for (j = 0; j < sizeY; j++) {
      for (k = 0; k < sizeX; k++) {
        mapEl.innerHTML +=
          "<span onclick='change1(this)' onmousemove='change2(this)'>"+
          map[j][k]+"</span>"; }
      mapEl.innerHTML += "<br>"; }
  closeOverlay(); }
