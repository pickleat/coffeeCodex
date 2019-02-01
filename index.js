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
var eventNum = 0;
function lap() {
  eventNum += 1;
  let input = document.createElement("input");
  input.id = `event${eventNum}`;
  var lap = `Event ${eventNum} - ${timerMinutes}:${timerSeconds}\n`;
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
  let recipeHeader = document.getElementById('recipeHeader');
  infoSubmit.remove();
  brewingDevice.remove();
  lable.remove();
  recipeHeader.remove();

}

// Planning on adding a chart that follows your brewing progress. That's 
// addEventListener
// var ctx = document.getElementById('myChart');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45],
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });
