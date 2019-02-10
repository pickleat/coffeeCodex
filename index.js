var eventNum = 0;
var timerSeconds = 0;
var timerMinutes = 0;
var timer; 
var labels = []; 
var data = []; 
var y = 0; 

function begin() {
  timer = setInterval(start, 1000);
  addEvent();
}

function start() {
  document.getElementById('start').disabled = true;
  timerSeconds += 1;
  if (timerSeconds>59) {
   timerMinutes += 1;
   timerSeconds = 0;
  }
  display(timerSeconds, timerMinutes);
}

function reset() {
  stop()
  timerSeconds = 0;
  timerMinutes = 0;
  labels = []; 
  // display(timerSeconds, timerMinutes, labels)
  chartEnter(labels, eventInfo())
}
function stop() {
  clearInterval(timer);
  document.getElementById('start').disabled = false;
}

function display(secs, mins) {
  var clock = clockFormat(secs,mins);
  document.getElementById('timer').innerText = clock;
  labels.push(clock);
  // chartEnter(labels);
  return eventUpdate(labels);
}

function clockFormat(secs, mins) {
  if (secs >= 10) {
    clock = `${mins}:${secs}`;
  } else {
    clock = `${mins}:0${secs}`;
  }
  return clock
}

// let coffeeAnchor = document.getElementById('coffee');
// let coffeeSpan = document.createElement('span');
// coffeeSpan.id = "coffee"
// coffeeSpan.innerHTML = `Coffee: ${coffee}`;
// coffeeAnchor.parentNode.replaceChild(coffeeSpan, coffeeAnchor);
function addEvent() {
  var eventAnchor = document.getElementById('events');
  eventNum += 1;
  let eventSpan = document.createElement('span');
  eventSpan.id = `event${eventNum}`;
  eventAnchor.append(eventSpan);
  let eventName = document.createElement("input");
  eventName.id = `event${eventNum}Title`;
  let grams = document.createElement("input");
  grams.id = `event${eventNum}Mass`
  if (eventNum === 1) {
    eventName.value = `Start`;
    grams.value = `0`
  } else {
    eventName.value = `event ${eventNum}`;
    grams.placeholder = `enter the mass`;
    // adds fake value
    grams.value = dataAdd();
  }
  // input.id = `event${eventNum}`;
  clock = clockFormat(timerSeconds, timerMinutes);
  eventSpan.innerText = clock;
  eventSpan.append(eventName); 
  eventSpan.append(grams);
  let brk = document.createElement("br");
  eventSpan.append(brk);
  // chartEnter(labels, eventUpdate());
  // chartEnter(labels);
}


// WIP chart will watch and enter the changes in data, but appends it to the number of event and not the time of the event. 
function eventUpdate(labels) {
  events = document.getElementById('events').children
  console.log(events.length);

  for (i=1; i<(events.length+1); i++) {
    eventTime = document.getElementById(`event${i}`);
    time = (eventTime.innerText).toString();
    eventName = document.getElementById(`event${[i]}Title`);
    eventMass = document.getElementById(`event${[i]}Mass`);
    name = eventName.value;
    mass = Number(eventMass.value);
    // console.log({label: name, x: time, y: mass });
    data[i-1] = {x: time, y: mass};

  };
  console.log(data)
  chartEnter(labels, data);
  }





function eventInfo(num) {
  time = clockFormat(timerSeconds, timerMinutes);
  // var time = clockFormat(timerSeconds, timerMinutes);
  // yAxis = dataAdd();
  yAxis = document.getElementById(`event${num}Mass`).value;
  
  data.push({x: time, y: yAxis})
  return data;
}

function dataAdd() {
  y += 30;
  return y;
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
            // xAxisID: "Time",
            // yAxisID: "Mass",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            // Data is an array of objects, each containing an x and y value, like so:
        //         data: [{
        //       x: "0:00",
        //       y: 0
        //   }, {
        //       x: "0:10",
        //       y: 10
        //   }, {
        //     x: '0:13',
        //     y: 20
        //   }, {
        //     x: '0:40',
        //     y: 30
        //   },
        // ],
        data,
        }]
    },

    // Configuration options go here
    options: {
      animation: {
          duration: 0, // general animation time
      },
      hover: {
          animationDuration: 0, // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0, // animation duration after a resize
  }
    
});
// Uncomment to show the data in the object containing the events
console.log(chart.chart.data.labels)
console.log(chart.chart.data.datasets[0].data);
}


// 0: {x: "0:00", y: 0}
// 1: {x: "0:10", y: 10}
// 2: {x: "0:13", y: 20}
// 3: {x: "0:40", y: 30}

// 0: {x: "0:00↵", y: 0}
// 1: {x: "0:12↵", y: 30}
// 2: {x: "0:22↵", y: 60}
// 3: {x: "0:32↵", y: 90}
// 4: {x: "0:41↵", y: 120}