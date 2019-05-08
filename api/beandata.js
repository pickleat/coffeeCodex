'use strict'

const url = 'https://pucxrtxpt9.execute-api.us-east-1.amazonaws.com/dev/'

// const uuidv4 = require('uuid/v4');
window.onload = () => {
  var submit = document.getElementById('infoSubmit');
  submit.addEventListener("click", infoSubmit, false);
  var submitcoffeeInfoButton = document.getElementById('beanDataButton');
  var getCoffeeInfoButton = document.getElementById('getCoffeeData');
  var searchByRoaster = document.getElementById('searchByRoaster');
  var oneCoffeeButton = document.getElementById('oneCoffeeButton');
  searchByRoaster.addEventListener('click', findCoffeeInfo, false);
  getOneCoffeeInfo.addEventListener('click', showOneCoffee, false);
  var seeAllCoffees = document.getElementById('seeAllCoffees');
  
  getCoffeeInfoButton.addEventListener("click", () => {
    var getCoffeeDataCard = document.getElementById('getCoffeeDataCard');
    getCoffeeDataCard.style.display = 'block';
    })  
  
  submitcoffeeInfoButton.addEventListener("click", () => {
    var recipeCard = document.getElementById('recipeCard');
    recipeCard.style.display = 'block';
    // listCoffees();
    })  

  seeAllCoffees.addEventListener("click", () => {
    var seeAllCoffeesCard = document.getElementById('seeAllCoffeesCard');
    seeAllCoffeesCard.style.display = 'block';
    listCoffees();
  })  
  
  oneCoffeeButton.addEventListener('click', () => {
    var coffeeInfoCard = document.getElementById('coffeeInfoCard');
    coffeeInfoCard.style.display = 'block';
  })

}


function listCoffees(){
  var allCoffees = document.getElementById('allCoffees');
  const http = new XMLHttpRequest();

  http.onreadystatechange = () => {
    if (http.readyState == XMLHttpRequest.DONE) {
      var returnData = JSON.parse(http.responseText);
      returnData.forEach(item => {
        console.log(item);
        var tr = document.createElement('tr');
        var link = document.createElement('a');
        // link.setAttribute('onclick', `getCoffeeInfo(${item.id})`);
        var roaster = document.createElement('td');
        roaster.appendChild(document.createTextNode(item.roaster));
        roaster.appendChild(link);
        var country = document.createElement('td');
        country.appendChild(document.createTextNode(item.country));
        var producer = document.createElement('td');
        producer.appendChild(document.createTextNode(item.producer));
        var MASL = document.createElement('td');
        MASL.appendChild(document.createTextNode(item.masl));
        var processing = document.createElement('td');
        processing.appendChild(document.createTextNode(item.processing));
        tr.appendChild(roaster);
        tr.appendChild(country);
        tr.appendChild(producer);
        tr.appendChild(MASL);
        tr.appendChild(processing);
        allCoffees.appendChild(tr)
      })
    }}

  http.open('GET', url, true);
  http.send();
  
}


function findCoffeeInfo() {
  var input = document.getElementById('roasterSearch')
  var getReturn = document.getElementById('searchResults');
  var totalResultsNum = document.getElementById('totalResultsNum');
  var roaster = input.value;
  roaster = roaster.replace(/ /g, '_')
  console.log(roaster);
  const newURL = `${url}?roaster=${roaster}`
  console.log(newURL);

  const http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      console.log(http.responseText);
      const returnData = JSON.parse(http.responseText);
      totalResultsNum.innerHTML = `Search returned ${returnData.Count} results.`
      
      // returns the items found for each ROASTER needs to be formatted an shown to user.
      var recipeInfo = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing'];
      var keys = returnData.Items
      console.log(keys)
      keys.forEach(item => {
        var tr = document.createElement('tr');
        var link = document.createElement('a');
        // link.setAttribute('onclick', `getCoffeeInfo(${item.id})`);
        var roaster = document.createElement('td');
        roaster.appendChild(document.createTextNode(item.roaster));
        roaster.appendChild(link);
        var country = document.createElement('td');
        country.appendChild(document.createTextNode(item.country));
        var producer = document.createElement('td');
        var link = document.createElement('a');
        link.setAttribute('onclick', `showOneCoffee('${item.id}')`)
        link.innerText = item.producer;
        producer.appendChild(link);
        // producer.appendChild(document.createTextNode(`<a href='${item.id}>${item.producer}</a>`));
        var MASL = document.createElement('td');
        MASL.appendChild(document.createTextNode(item.masl));
        var processing = document.createElement('td');
        processing.appendChild(document.createTextNode(item.processing));
        tr.appendChild(roaster);
        tr.appendChild(country);
        tr.appendChild(producer);
        tr.appendChild(MASL);
        tr.appendChild(processing);
        getReturn.appendChild(tr)
        console.log(`${item.producer} coffee id is ${item.id}`)
      })
    }}

  http.open('GET', newURL, true);
  http.send();
}

function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}
// var beanData = {'coffeeId': uuid()}
var beanData = {}
// const coffeeId = uuid();
// console.log(coffeeId);
console.log(beanData);



function infoSubmit() {
    var recipeInfo = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing', 'notes'];
    recipeInfo.forEach(element => {
      let anchor = document.getElementById(`${element}`);
      let value = anchor.value;
      if (!anchor.value) {
        anchor.remove();
        return;
      }
      if (element === 'varietals' || element === 'notes') {
        value = anchor.value.split(', ');
      }
      beanData[`${element}`] = value; 
      let span = document.createElement('span');
      span.id = `'${element}'`;
      span.innerHTML = `${element}: ${value}`;
      anchor.parentNode.replaceChild(span, anchor);
  })
    
  //   // Remove Submit Button
    let recipeHeader = document.getElementById('recipeHeader');
    let submit = document.getElementById('infoSubmit');
    submit.remove();
    recipeHeader.innerText = `today's brew:`;
    beanData = JSON.stringify(beanData);
    console.log(beanData);
    var xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
      if (http.readyState == XMLHttpRequest.DONE){
      console.log(xhr.response);
      var oneCoffeeInfo = JSON.parse(xhr.responseText);
      console.log(oneCoffeeInfo);
      coffeeInfoCard.innerHTML = `<h1>${oneCoffeeInfo.country} ${oneCoffeeInfo.name}</h1>
      <li>Producer: ${oneCoffeeInfo.producer}</li>
      <li>Roaster: ${oneCoffeeInfo.roaster}</li>
      <li>Processing: ${oneCoffeeInfo.processing}</li>
      <li>Flavor Notes: ${oneCoffeeInfo.notes}</li>
      <li>Varietals: ${oneCoffeeInfo.varietals}</li>
      <li>MASL: ${oneCoffeeInfo.masl}</li>
      <li>ID: ${oneCoffeeInfo.id}</li>`

      }
    xhr.open("POST", url, true);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(beanData);
    }
}


function showOneCoffee(e) {
  var coffee_id = e || document.getElementById('coffee_id').value;
  var coffeeInfoCard = document.getElementById('coffeeInfoCard');
  console.log(coffee_id);
  const newURL = `${url}/${coffee_id}`
  console.log(newURL);

  var http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      var oneCoffeeInfo = JSON.parse(http.responseText)
      oneCoffeeInfo = oneCoffeeInfo.Item;
      console.log(oneCoffeeInfo); 
      var keys = Object.keys(oneCoffeeInfo);

      // keys.forEach(key => {
      //   var keyElem = document.createElement('ul');
      //   var value = oneCoffeeInfo[key];
      //   console.log(value);
      //   keyElem.innerHTML = `${key}: ${value}`;
      //   coffeeInfoCard.appendChild(keyElem);
      // })
      // coffeeInfoCard.innerText = keys;
      coffeeInfoCard.innerHTML = `<h1>${oneCoffeeInfo.country} ${oneCoffeeInfo.name}</h1>
      <button>Edit</button>
      <li>Producer: ${oneCoffeeInfo.producer}</li>
      <li>Roaster: ${oneCoffeeInfo.roaster}</li>
      <li>Processing: ${oneCoffeeInfo.processing}</li>
      <li>Flavor Notes: ${oneCoffeeInfo.notes}</li>
      <li>Varietals: ${oneCoffeeInfo.varietals}</li>
      <li>MASL: ${oneCoffeeInfo.masl}</li>
      <li>ID: ${oneCoffeeInfo.id}</li>`

    }
  }

  http.open('GET', newURL, true);
  http.send();
}