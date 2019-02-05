var eventNum = 0;
var timerSeconds = 0;
var timerMinutes = 0;
var timer; 
var labels = []; 
var data = []; 
var y = 30; 
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
  stop()
  timerSeconds = 0;
  timerMinutes = 0;
  labels = []; 
  display(timerSeconds, timerMinutes, labels)
  document.getElementById('start').disabled = false;
  chartEnter(labels, eventInfo())
}
function stop() {
  clearInterval(timer);
  document.getElementById('start').disabled = false;
}

function clock(secs, mins) {
  if (secs < 10) {
    clock = `${mins}:0${secs}`;
    labels.push(clock);
    return clock;
  } else {
    clock = `${mins}:${secs}`;
    labels.push(clock);
    return clock;
  }
}

function addEvent() {
  eventNum += 1;
  let input = document.createElement("input");
  input.id = `event${eventNum}`;
  clock = clock(timerSeconds, timerMinutes);
  var lap = `Event ${eventNum} - ${clock}\n`;
  document.getElementById('laps').innerText += lap;
  chartEnter(labels, eventInfo());
}

function eventInfo() {
  // time = clock(timerSeconds, timerMinutes);
  var time = timerMinutes + ":" + timerSeconds;
  yAxis = dataAdd();
  data.push({x: time, y: yAxis})
  return data;
}

function dataAdd() {
  y += 10;
  return y;
}



function display(secs, mins) {
  var clock = mins + ":" + secs;
  labels.push(clock);
  document.getElementById('timer').innerText = clock;
  chartEnter(labels, eventInfo());
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
  ratioSpan.innerHTML = `Ratio 1:${ratio}`;
  ratioAnchor.parentNode.replaceChild(ratioSpan, ratioAnchor);
    // Dose
  let doseAnchor = document.getElementById('dose');
  let doseSpan =  document.createElement("span");
  doseSpan.id = "dose"
  doseSpan.innerHTML = `Dose: ${dose}g`;
  doseAnchor.parentNode.replaceChild(doseSpan, doseAnchor);

    // Coffee
  let coffeeAnchor = document.getElementById('coffee');
  let coffeeSpan = document.createElement('span');
  coffeeSpan.id = "coffee"
  coffeeSpan.innerHTML = `Coffee: ${coffee}`;
  coffeeAnchor.parentNode.replaceChild(coffeeSpan, coffeeAnchor);

    // Brewing Device
  let deviceSpan = document.createElement('span');
  deviceSpan.id = "brewerType";
  let brewingDevice = document.getElementById("brewer");
  let index = brewingDevice.selectedIndex
  let brewer = document.createTextNode(`Brewing on: ${brewingDevice[index].innerText}`);
  deviceSpan.appendChild(brewer);
  cardParent.append(deviceSpan); 
  cardParent.append(brk); 

    // Target Volume
  let targetSpan = document.createElement('span');
  targetSpan.id = "targetVolume";
  totalVolume = document.createTextNode(`Target Volume: ${totalVolume}g`);
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
function chartEnter(labels, data) {
var ctx = document.getElementById('myChart');
// var chartButton = document.getElementById('chartButton');
// chartButton.remove();
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',
 
    // The data for our dataset
    data: {
        // labels: ["0:0", "0:15", "0:30", "0:45", "1:00", "1:15", "1:30", "1:45", "2:00", "2:15", "2:30", "2:45", "3:00", "3:15", "3:30", "3:45", "4:00", "4:15", "4:30"],
        labels,
        datasets: [{
            label: "Coffee Brewing",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            // data: [0, 50, 100, 150, 200, 250, 300, 350, 400, 450],
        //     data: [{
        //       x: "0:0",
        //       y: 0
        //   }, {
        //       x: "0:1",
        //       y: 10
        //   }, {
        //     x: '0:3',
        //     y: 20
        //   }, {
        //     x: '0:4',
        //     y: 30
        //   },
        // ],
        data,
        }]
    },

    // Configuration options go here
    options: {}
});

}