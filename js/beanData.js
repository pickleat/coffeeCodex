'use strict'

const url = 'https://pucxrtxpt9.execute-api.us-east-1.amazonaws.com/dev/'
const codexURL = `https://wonbho87aj.execute-api.us-east-1.amazonaws.com/dev/`
const coffeeInfoKeys = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing', 'notes'];
var beanData = {}

window.onload = () => {
  // Declare Buttons
  var homeButton = document.getElementById('btn-home-view');
  var submit = document.getElementById('infoSubmit');
  var submitcoffeeInfoButton = document.getElementById('beanDataButton');
  var getCoffeeInfoButton = document.getElementById('getCoffeeData');
  var searchByRoaster = document.getElementById('searchByRoaster');
  var oneCoffeeButton = document.getElementById('oneCoffeeButton');
  var seeAllCoffees = document.getElementById('seeAllCoffees');
  // Simple Listeners
  submit.addEventListener("click", infoSubmit, false);
  homeButton.addEventListener('click', () => {containerView(coffeeCodex); renderCodex();})
  searchByRoaster.addEventListener('click', findCoffeeInfo, false);
  
  // Complex Listeners
  getOneCoffeeInfo.addEventListener('click', () => {
    var coffee_id = document.getElementById('coffee_id').value;
    if(coffee_id){return showOneCoffee(coffee_id);}
    alert('you need a value for this to work')
  });
  getCoffeeInfoButton.addEventListener("click", () => {
    containerView(getCoffeeDataCard);
    })  
  submitcoffeeInfoButton.addEventListener("click", () => {
    containerView(recipeCard);
    })  
  seeAllCoffees.addEventListener("click", () => {
    containerView(seeAllCoffeesCard);
    listCoffees();
  })  
  oneCoffeeButton.addEventListener('click', () => {
    containerView(coffeeInfoCard);
  })
}

function containerView(clickedContainer) {
  var coffeeInfoCard = document.getElementById('coffeeInfoCard');
  var seeAllCoffeesCard = document.getElementById('seeAllCoffeesCard');
  var recipeCard = document.getElementById('recipeCard');
  var getCoffeeDataCard = document.getElementById('getCoffeeDataCard');
  var coffeeCodexCard = document.getElementById('coffeeCodex');
  var containers = [coffeeInfoCard, seeAllCoffeesCard, recipeCard, getCoffeeDataCard, coffeeCodexCard]
  containers.forEach(container => {
    if(clickedContainer == container){
      clickedContainer.style.display = 'block';
    }else {
      container.style.display = 'none';
    }
  })
}

async function listCoffees(returnData){
  var returnData = await fetch(url, {method: "GET"})
  returnData = await returnData.json()
  console.log(returnData);
  var allCoffees = document.getElementById('allCoffees');
  allCoffees.innerHTML = `
  <thead style="background-color: indianred">
  <tr>
    <td>Roaster</td>
    <td>Country</td>
    <td>Producer</td>
    <td>MASL</td>
    <td>Processing</td>
    <td>Add Coffee</td>
  </tr>
</thead>`
  returnData = sortBy(returnData, 'roaster')

  returnData.forEach(item => {
    var row = document.createElement('tr');

    const roaster = (text) => makeElement('td', text);
    const country = (text) => makeElement('td', text);
    const MASL = (text) => makeElement('td', text);
    const processing = (text) => makeElement('td', text);
    const producer = document.createElement('td');
    const producerLink = makeElement('a', item.producer);
    producerLink.setAttribute('onclick', `showOneCoffee('${item.id}')`)
    producer.appendChild(producerLink);
    const addButton = makeElement('a', '+')
    addButton.setAttribute('onclick', `addToMyCodex('${item.id}')`)
    
    row.appendChild(roaster(item.roaster));
    row.appendChild(country(item.country));
    row.appendChild(producer);
    row.appendChild(MASL(item.masl));
    row.appendChild(processing(item.processing));
    row.appendChild(addButton)
    allCoffees.appendChild(row)
  })
}

async function findCoffeeInfo() {
  var input = document.getElementById('roasterSearch')
  var searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = ` 
  <thead style="background-color: indianred">
  <tr>
    <td>Roaster</td>
    <td>Country</td>
    <td>Producer</td>
    <td>MASL</td>
    <td>Processing</td>
  </tr>
</thead>`
  var totalResultsNum = document.getElementById('totalResultsNum');
  var roaster = input.value;
  roaster = roaster.replace(/ /g, '_')
  console.log(roaster);
  const newURL = `${url}?roaster=${roaster}`
  console.log(newURL);

  var returnData = await fetch(newURL, {method: "GET"})
  returnData = await returnData.json()
  console.log(returnData);
  // returns the items found for each ROASTER needs to be formatted as shown to user.
  var keys = returnData.Items
  keys = sortBy(keys, 'country')
  
  // console.log(keys)
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
    var MASL = document.createElement('td');
    MASL.appendChild(document.createTextNode(item.masl));
    var processing = document.createElement('td');
    processing.appendChild(document.createTextNode(item.processing));
    tr.appendChild(roaster);
    tr.appendChild(country);
    tr.appendChild(producer);
    tr.appendChild(MASL);
    tr.appendChild(processing);
    searchResults.appendChild(tr)
    console.log(`${item.producer} coffee id is ${item.id}`)
  })
}


async function infoSubmit() {
  coffeeInfoKeys.forEach(element => {
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
    
    // Remove Submit Button
    let recipeHeader = document.getElementById('recipeHeader');
    let submit = document.getElementById('infoSubmit');
    submit.remove();
    recipeHeader.innerText = `today's brew:`;
    beanData = JSON.stringify(beanData);
    // console.log(beanData);

    // Send Data
    var returnData = await fetch(url, {
      method: "POST",
      body: beanData,
    })
    returnData = await returnData.json()
    console.log(returnData);
}


async function showOneCoffee(coffee_id) {
  console.log('showOneCoffee')
  console.log(coffee_id);
  
  // var coffee_id = document.getElementById('getOneCoffeeInfo').value || document.getElementById('coffee_id').value;
  // var coffeeInfoCard = document.getElementById('coffeeInfoCard');
  containerView(coffeeInfoCard);
  // console.log(coffee_id);
  const newURL = `${url}${coffee_id}`
  var returnData = await fetch(newURL, {method: "GET"})
  returnData = await returnData.json();
  returnData = returnData.Item;
  console.log(returnData);
  var keys = Object.keys(returnData);

  coffeeInfoCard.innerHTML = `
  <h1>${returnData.country} ${returnData.name}</h1>
  <button id='editCoffee'>Edit</button>
  <li>Producer: ${returnData.producer}</li>
  <li>Roaster: ${returnData.roaster}</li>
  <li>Processing: ${returnData.processing}</li>
  <li>Flavor Notes: ${returnData.notes}</li>
  <li>Varietals: ${returnData.varietals}</li>
  <li>MASL: ${returnData.masl}</li>
  <li>ID: ${returnData.id}</li>`
  editCoffeeListener(returnData);
}

async function editCoffeeListener(coffeeInfo){
  console.log('you made it to editcoffeelistener')
  console.log(coffeeInfo);
  var editCoffeeButton = document.getElementById('editCoffee');
  editCoffeeButton.addEventListener('click', () => {
    console.log(coffeeInfo);
    coffeeInfoCard.innerHTML = '';
    // var keys = Object.keys(coffeeInfo);
    var keys = coffeeInfoKeys;
    console.log(keys);
    keys.forEach(key => {
      if(key == 'createdAt' || key == 'updatedAt' || key == 'id'){
        return
      }
      var input = document.createElement('input');
      var br = document.createElement('br')
      input.value = coffeeInfo[key];
      input.placeholder = key;
      input.id = `edit${key}`;
      coffeeInfoCard.appendChild(input);
      coffeeInfoCard.appendChild(br);
    })

    var submitEdits = document.createElement('button');
    submitEdits.id = 'submitEdits';
    submitEdits.innerText = 'Sumbit Your Edits';
    coffeeInfoCard.appendChild(submitEdits);
    submitEdits.addEventListener('click', () => {
    var inputs = coffeeInfoCard.querySelectorAll('input');


    inputs.forEach(input => {
      // console.log(input.value);
      var val = input.value;
      var id = input.id;
      id = id.substring(4);
      if(id == 'varietals' || id == 'notes'){
        val = val.split(',');
      }
      if(id == 'masl'){
        val = parseInt(val);
      }
      if(coffeeInfo[id] == val){return}
      coffeeInfo[id] = val;
      // console.log(`id: ${id}
      // val: ${val}
      // coffeeInfo: ${coffeeInfo[id]}`)
    })
    var coffee_id = coffeeInfo.id
    const newURL = `${url}${coffee_id}`
    console.log(newURL);
    coffeeInfo = JSON.stringify(coffeeInfo)
    console.log(coffeeInfo)

    // putReq(url, coffeeInfo).promise()
    // .then( (res) => {
    //   console.log('you made it back from putReq');
    //   console.log(res);
    // });

    // var keys = Object.keys(returnData);
  

  var http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
          console.log('you made it back');
          console.log(typeof(http.response));
          console.log(JSON.parse(http.response));
          var resp = JSON.parse(http.response.Attributes);
          var respKeys = Object.keys(resp);
          console.log(respKeys);
          console.log(JSON.parse(http.response));

          var editedCoffee = JSON.parse(http.response);
          showOneCoffee(editedCoffee);
          console.log(http.response);
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
          <button id='editCoffee'>Edit</button>
          <li>Producer: ${oneCoffeeInfo.producer}</li>
          <li>Roaster: ${oneCoffeeInfo.roaster}</li>
          <li>Processing: ${oneCoffeeInfo.processing}</li>
          <li>Flavor Notes: ${oneCoffeeInfo.notes}</li>
          <li>Varietals: ${oneCoffeeInfo.varietals}</li>
          <li>MASL: ${oneCoffeeInfo.masl}</li>
          <li>ID: ${oneCoffeeInfo.id}</li>`
          editCoffeeListener(oneCoffeeInfo);
        }
      }
    
      http.open('PUT', newURL, true);
      http.send(coffeeInfo);
    
    })
})
}

function sortBy(data, sortKey){
  data.sort(function(a, b) {
      var nameA = a[sortKey].toUpperCase(); // ignore upper and lowercase
      var nameB = b[sortKey].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {return -1;}
      if (nameA > nameB) {return 1;}
      // If names are equal
      return 0;
      });
  // console.log(data);
  return data
}

function putReq(url, data){
  fetch(url, {
  method: "PUT",
  body: JSON.stringify(data), 
  headers:{
    'Content-Type': 'application/json'
  }
}).then(res => res.json())
.then(response => console.log('Success:', JSON.stringify(response)))
.catch(error => console.error('Error:', error));
}

async function renderCodex(){
  var codex = document.getElementById('coffeeCodex');
  codex.innerHTML = `
  <table id="codexTable" style="background:rgb(51, 50, 54); outline: none;">
    <thead style="background-color: indianred">
    <tr>
      <td>Roaster</td>
      <td>Country</td>
      <td>Producer</td>
      <td>MASL</td>
      <td>Processing</td>
      <td>Date Added</td>
      <td>Rate Coffee</td>
    </tr>
    </thead>
  </table>`
  var returnData = await fetch(`${codexURL}${localStorage.user_id}`, {method: "GET"})
  returnData = await returnData.json();
  // returnData = sortBy(returnData, 'roaster')
  var codexTable = document.getElementById("codexTable");
  returnData.forEach(async(item) => {
    const coffee_id = item.coffee_id;
    const newURL = `${url}${coffee_id}`
    var returnData = await fetch(newURL, {method: "GET"})
    returnData = await returnData.json();
    returnData = returnData.Item;
    // console.log(returnData);  
    console.log(returnData);
    var returnKeys = Object.keys(returnData);
    console.log(returnKeys);

      var row = document.createElement('tr');

      const roaster = (text) => makeElement('td', text);
      const country = (text) => makeElement('td', text);
      const MASL = (text) => makeElement('td', text);
      const processing = (text) => makeElement('td', text);
      const dateAdded = (text) => makeElement('td', text);
      const producer = document.createElement('td');
      const producerLink = makeElement('a', returnData.producer);
      producerLink.setAttribute('onclick', `showOneCoffee('${returnData.id}')`)
      producer.appendChild(producerLink);
      const addButton = makeElement('a', '+')
      addButton.setAttribute('onclick', `addToMyCodex('${returnData.id}')`)
      
      row.appendChild(roaster(returnData.roaster));
      row.appendChild(country(returnData.country));
      row.appendChild(producer);
      row.appendChild(MASL(returnData.masl));
      row.appendChild(processing(returnData.processing));
      row.appendChild(dateAdded(formatTimestamp(item.createdAt)))
      row.appendChild(addButton)
      codexTable.appendChild(row)

})
}

async function addToMyCodex(id){
  if(localStorage.isLoggedIn == 'true'){
    var body = {
      user_id: localStorage.user_id,
      coffee_id: id
    }
    body = JSON.stringify(body);
    var returnData = await fetch(`${codexURL}`, {
      method: "POST",
      mode: 'cors',
      body: body
  })
  returnData = await returnData.json();
  console.log(returnData);
  // console.log(`coffee_id: ${id}`);
  // console.log(`user_id: ${localStorage.user_id}`);
  }
  else{console.log('you must be logged in to add a coffee to your Codex.')}
}

function makeElement(type, text) {
  // Usage: 
  // const h1 = (text) => makeElement(`h1`, text);
  // document.body.appendChild(h1('hey h1 dude'));
  const element = document.createElement(type);
  const textNode = document.createTextNode(text);
  
  element.appendChild(textNode);
  
  return element;
}