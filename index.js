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
  let totalVolume = (ratio * dose).toFixed(1);
  let cardParent = document.getElementById("recipeCard");
  let brk = document.createElement("br");
  // Make "Card" for Brew Details
    // Ratio
  let ratioAnchor = document.getElementById("ratio");
  let ratioSpan = document.createElement("span");
  ratioSpan.id = "ratio"
  ratioSpan.innerHTML = "Ratio 1:"+ratio;
  ratioAnchor.parentNode.replaceChild(ratioSpan, ratioAnchor);
    // Dose
  let doseAnchor = document.getElementById('dose');
  let doseSpan =  document.createElement("span");
  doseSpan.id = "dose"
  doseSpan.innerHTML = "Dose: "+dose;
  doseAnchor.parentNode.replaceChild(doseSpan, doseAnchor);

    // Coffee
  let coffeeAnchor = document.getElementById('coffee');
  let coffeeSpan = document.createElement('span');
  coffeeSpan.id = "coffee"
  coffeeSpan.innerHTML = "Coffee: "+coffee;
  coffeeAnchor.parentNode.replaceChild(coffeeSpan, coffeeAnchor);

    // Brewing Device
  let deviceSpan = document.createElement('span');
  deviceSpan.id = "brewerType";
  let brewingDevice = document.getElementById("brewer");
  let index = brewingDevice.selectedIndex
  let brewer = document.createTextNode("Brewing on: "+brewingDevice[index].innerText);
  deviceSpan.appendChild(brewer);
  cardParent.append(deviceSpan); 
  cardParent.append(brk); 

    // Target Volume
  let targetSpan = document.createElement('span');
  targetSpan.id = "targetVolume";
  totalVolume = document.createTextNode("Target Volume: "+totalVolume+"g");
  targetSpan.appendChild(totalVolume);
  cardParent.append(targetSpan);
  // cardParent.append(brk);

    


    // Remove Submit Button
  let infoSubmit = document.getElementById('infoSubmit');
  let lable = document.getElementById("brewerLabel");
  infoSubmit.remove();
  brewingDevice.remove();
  lable.remove();
}