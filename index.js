var timerSeconds = 0;
var timerMinutes = 0;
var timer; 

function begin() {
  timer = setInterval(start, 1000);
}

function start() {
  document.getElementById('start').disabled = true;
  timerSeconds += 1;
  if (timerSeconds>59) {
   secondsReset() 
  }
  display(timerSeconds, timerMinutes);
  console.log(timerSeconds);
}
function secondsReset() {
  timerSeconds = 0;
  timerMinutes += 1; 
}
function reset() {
  timerSeconds = 0;
  timerMinutes = 0;
  display(timerSeconds, timerMinutes)
  console.log('reset button')
  document.getElementById('start').disabled = false;
}
function stop() {
  console.log('stop button')
  clearInterval(timer);
  document.getElementById('start').disabled = false;
}
function exit() {
  console.log('kill button')
  location.reload(true)
}
var lapNum = 0;
function lap() {
  lapNum += 1;
  console.log(timerMinutes+":"+timerSeconds);
  var lap = "Pour "+lapNum+" - "+timerMinutes + ":" + timerSeconds+"\n";
  document.getElementById('laps').innerText += lap;
}

function display(secs, mins) {
  var clock = mins + ":" + secs;
  document.getElementById('timer').innerText = clock;
}

function infoSubmit() {
  let ratio = document.getElementById("ratio").value;
  let dose = document.getElementById("dose").value;
  let coffee = document.getElementById("coffee").value;
  let totalVolume = ratio * dose;
  console.log(totalVolume);
  
  // this removes the <input> elements and <button> but not completely. Needs more work
  document.getElementById("ratio").style.visibility = "hidden";
  document.getElementById("dose").style.visibility = "hidden";
  document.getElementById("coffee").style.visibility = "hidden";
  document.getElementById("infoSubmit").style.visibility = "hidden";
  
  // shows brew recipe content on submit
  document.getElementById('coffeeYourBrewing').innerText = coffee;
  document.getElementById('volume').innerText = totalVolume;
  document.getElementById("ratio1").innerText = ratio;
}