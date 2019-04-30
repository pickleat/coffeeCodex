'use strict'

const url = 'https://pucxrtxpt9.execute-api.us-east-1.amazonaws.com/dev/'
// const url = 'https://pucxrtxpt9.execute-api.us-east-1.amazonaws.com/dev/5df12f10-58ab-11e9-8a7e-0dfa6f4b1d56'
// const uuidv4 = require('uuid/v4');
window.onload = () => {
  var submit = document.getElementById('infoSubmit');
  submit.addEventListener("click", infoSubmit, false);
  var submitcoffeeInfoButton = document.getElementById('beanDataButton');
  var getCoffeeInfoButton = document.getElementById('getCoffeeData');
  var getCoffeeInfoIDSubmit = document.getElementById('getCoffeeInfoIDSubmit');
  getCoffeeInfoIDSubmit.addEventListener('click', findCoffeeInfo, false);
  var seeAllCoffees = document.getElementById('seeAllCoffees');
  
  getCoffeeInfoButton.addEventListener("click", () => {
    var getCoffeeDataCard = document.getElementById('getCoffeeDataCard');
    getCoffeeDataCard.style.display = 'block';
    // listCoffees();
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
        link.setAttribute('onclick', `getCoffeeInfo(${item.id})`);
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
  var input = document.getElementById('countrySearch')
  var getReturn = document.getElementById('searchResults');
  var country = input.value;
  console.log(country);
  const newURL = `${url}${country}`
  console.log(newURL);
  
  const http = new XMLHttpRequest();

  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      console.log(http.responseText);
      var returnData = JSON.parse(http.responseText);
      // returns the items found for each ROASTER needs to be formatted an shown to user.
      var recipeInfo = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing'];
      var keys = Object.keys(returnData)
      recipeInfo.forEach(key => {
        getReturn.innerHTML += `<ul>${key}: ${returnData[key]}</ul>`
        
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
    
    xhr.open("POST", url, true);
    // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhr.send(beanData);
    xhr.onreadystatechange = () => { 
      console.log(xhr.readyState)
      console.log(xhr)
        console.log(xhr.response);
        alert(xhr.responseText)
        
      }
    
  
  // http.onreadystatechange = function() {
  //   if (http.readyState == XMLHttpRequest.DONE) {
  //       alert(http.responseText);
  //   }}
  // the post request WORKS, but the reponse doesn't


  
  // http.open("POST", url, true);
  // http.send(beanData);
  // http.onreadystatechange = function() {
  //   if (http.readyState == XMLHttpRequest.DONE) {
  //     console.log(http.responseText);
  //   }}
}


