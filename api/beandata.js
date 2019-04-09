'use strict'
const http = new XMLHttpRequest();
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
  
}

function findCoffeeInfo() {
  var input = document.getElementById('coffeeID')
  var id = input.value;
  console.log(id);
  const newURL = url+id
  console.log(newURL);
  http.open('GET', newURL, true);
  http.send();
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      console.log(http.responseText);
    }}
}

function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}
// var beanData = {'coffeeId': uuid()}
var beanData = {}
// const coffeeId = uuid();
// console.log(coffeeId);
console.log(beanData);



function infoSubmit() {
    var recipeInfo = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing'];
    recipeInfo.forEach(element => {
      let anchor = document.getElementById(`${element}`);
      let value = anchor.value;
      if (!anchor.value) {
        anchor.remove();
        return;
      }
      if (element === 'varietals') {
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
  
  // http.onreadystatechange = function() {
  //   if (http.readyState == XMLHttpRequest.DONE) {
  //       alert(http.responseText);
  //   }}
  http.open("POST", url, true);
  http.send(beanData);
  http.onreadystatechange = function() {
    if (http.readyState == XMLHttpRequest.DONE) {
      console.log(http.responseText);
    }}
}