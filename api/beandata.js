'use strict'

// const uuidv4 = require('uuid/v4');
window.onload = () => {
  var submit = document.getElementById('infoSubmit');
  submit.addEventListener("click", infoSubmit, false);
}


function uuid(a){return a?(a^Math.random()*16>>a/4).toString(16):([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,uuid)}
var beanData = {'coffeeId': uuid()}
// const coffeeId = uuid();
// console.log(coffeeId);
console.log(beanData);



function infoSubmit() {
    var recipeInfo = ['country','roaster','producer/name', 'elevation', 'varietals', 'processing'];
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
    
    // let cardParent = document.getElementById("recipeCard");
    // let brk = document.createElement("br");
  
    // Remove Submit Button
    let recipeHeader = document.getElementById('recipeHeader');
    let submit = document.getElementById('infoSubmit');
    submit.remove();
    recipeHeader.innerText = `today's brew:`;
    console.log(beanData);

}



