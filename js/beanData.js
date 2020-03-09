'use strict'

const url = 'https://pucxrtxpt9.execute-api.us-east-1.amazonaws.com/dev/'
const codexURL = `https://wonbho87aj.execute-api.us-east-1.amazonaws.com/dev/`
const coffeeInfoKeys = ['country','roaster','producer', 'name', 'masl', 'varietals', 'processing', 'notes'];
var beanData = {}

window.onload = () => {
  
  // Declare Buttons
  var submitcoffeeInfoButton = document.getElementById('beanDataButton');
  var getCoffeeInfoButton = document.getElementById('getCoffeeData');
  var seeAllCoffees = document.getElementById('seeAllCoffees');
  var oneCoffeeButton = document.getElementById('oneCoffeeButton');
  var coffeeFeedButton = document.getElementById('coffeeFeed');

  const homeButton = document.getElementById('btn-home-view');
  var submit = document.getElementById('infoSubmit');
  var searchByRoaster = document.getElementById('searchByRoaster');
  const hamburger = document.getElementById('hamburger')
  // Simple Listeners
  submit.addEventListener("click", infoSubmit, false);
  homeButton.addEventListener('click', () => {containerView(coffeeCodex); renderCodex();})
  searchByRoaster.addEventListener('click', findCoffeeInfo, false);
  // Opens and Closes Hamburger Menu
  hamburger.addEventListener('click', () => {document.getElementById('hamburger-items').classList.toggle('hidden')})
  
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
  coffeeFeedButton.addEventListener('click', () => {
    containerView(coffeeFeedCard);
  })
}



function containerView(clickedContainer) {
  var coffeeInfoCard = document.getElementById('coffeeInfoCard');
  var seeAllCoffeesCard = document.getElementById('seeAllCoffeesCard');
  var recipeCard = document.getElementById('recipeCard');
  var getCoffeeDataCard = document.getElementById('getCoffeeDataCard');
  var coffeeCodexCard = document.getElementById('coffeeCodex');
  var coffeeFeedCard = document.getElementById('coffeeFeedCard');
  var containers = [coffeeInfoCard, seeAllCoffeesCard, recipeCard, getCoffeeDataCard, coffeeCodexCard, coffeeFeedCard]
  // document.getElementById('welcomeScreen').classList.toggle('md:flex')

  containers.forEach(container => {
    if(clickedContainer == container){
      clickedContainer.style.display = 'block';
      if(localStorage.isLoggedIn || clickedContainer != coffeeCodexCard){
        document.getElementById('welcomeScreen').classList.toggle('hidden')
        document.getElementById('welcomeScreen').classList.toggle('md:flex')
      }
    }else {
      container.style.display = 'none';
    }
  })
}



async function listCoffees(sortKey){
    var returnData = await fetch(url, {method: "GET"})
    returnData = await returnData.json()
  // localStorage.setItem('coffeeList', returnData);
  console.log(returnData)
  var allCoffees = document.getElementById('allCoffees');
  allCoffees.innerHTML = getTable('list')
  returnData = sortBy(returnData, sortKey || 'roaster')

  returnData.forEach(item => {
    var returnKeys = ["roaster", "country", "producer", "masl", "processing", "add"];
    var row = rowBuilder(item, returnKeys);
    allCoffees.appendChild(row);
  })
}

async function findCoffeeInfo() {
  var input = document.getElementById('roasterSearch')
  var searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = getTable('search');
  var totalResultsNum = document.getElementById('totalResultsNum');
  var roaster = input.value;
  roaster = roaster.replace(/ /g, '_')
  console.log(roaster);
  const newURL = `${url}?roaster=${roaster}`
  console.log(newURL);

  var returnData = await fetch(newURL, {method: "GET"})
  returnData = await returnData.json()
  console.log(returnData);
  totalResultsNum.innerHTML = `Your Search Resulted in ${returnData.Count} coffees.`
  // returns the items found for each ROASTER needs to be formatted as shown to user.
  var keys = returnData.Items
  keys = sortBy(keys, 'country')
  
  keys.forEach(item => {
    console.log(item);
    var returnKeys = ["roaster", "country", "producer", "masl", "processing", "rate", "add"];
    var row = rowBuilder(item, returnKeys);
    searchResults.appendChild(row)
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
    var returnData = fetch(url, {
      method: "POST",
      body: beanData,
    }).then( (response) => {
      console.log(response)
    }).catch((err) => {
      console.error(err);
    })
    // returnData = await returnData.json()
    // console.log(returnData.id);
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
  <div class='mx-auto p-2 max-w-md bg-gray-300 rounded shadow-lg hover:shadow-xl'>
    <div class='flex justify-between'>
      <h1 class='max-w-sm truncate'>${returnData.name}</h1>
      <button class='h-12' id='editCoffee'>Edit</button>
    </div>
    <div class='text-left'>
      <ul>
        <li>Country: ${returnData.country} </liv>
        <li>Producer: ${returnData.producer}</li>
        <li>Roaster: ${returnData.roaster}</li>
        <li>Processing: ${returnData.processing}</li>
        <li>Flavor Notes: ${returnData.notes}</li>
        <li>Varietals: ${returnData.varietals}</li>
        <li>MASL: ${returnData.masl}</li>
        <li>ID: ${returnData.id}</li>
      </ul>
    </div>
  </div>`

  editCoffeeListener(returnData);
}

async function editCoffeeListener(coffeeInfo){
  var editCoffeeButton = document.getElementById('editCoffee');
  editCoffeeButton.addEventListener('click', () => {
    coffeeInfoCard.innerHTML = '';
    var keys = coffeeInfoKeys;
    keys.forEach(key => {
      if(key == 'createdAt' || key == 'updatedAt' || key == 'id'){
        return
      }
      var input = makeElement('input');
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
    })
    var coffee_id = coffeeInfo.id
    const newURL = `${url}${coffee_id}`
    console.log(newURL);
    coffeeInfo = JSON.stringify(coffeeInfo)
    console.log(coffeeInfo)

  var http = new XMLHttpRequest();
      http.onreadystatechange = function() {
        if (http.readyState == XMLHttpRequest.DONE) {
          console.log(http.responseText)
          console.log(http.responseType)
          // console.log(http.response);
          // var resp = JSON.parse(http.response);
          // console.log(resp);
          // var editedCoffee = resp.Attributes.id;
          showOneCoffee(coffee_id);
        }
      }
    
      http.open('PUT', newURL, true);
      http.send(coffeeInfo);
    
    })
})
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
  if(localStorage.isLoggedIn == 'true'){
    var codex = document.getElementById('coffeeCodex');
    codex.innerHTML = `
    <table id="codexTable">
    ${getTable('codex')}
    </table>`
    var returnData = await fetch(`${codexURL}${localStorage.user_id}`, {method: "GET"})
    returnData = await returnData.json();

    var codexTable = document.getElementById("codexTable");
    returnData.forEach(async(item) => {
      const coffee_rating = item.coffee_rating;
      console.log(coffee_rating);
      const coffee_id = item.coffee_id;
      const newURL = `${url}${coffee_id}`
      var returnData = await fetch(newURL, {method: "GET"})
      returnData = await returnData.json();
      // In order to use the sort, you'll need to append into a sortable list of coffees. After you've gotten them.
      // returnData = sortBy(returnData, 'roaster')
      returnData = returnData.Item;
      returnData['coffee_rating'] = coffee_rating;

      console.log(returnData);
      var returnKeys = ["roaster", "country", "producer", "masl", "processing", "rate", "remove"];
      var row = rowBuilder(returnData, returnKeys);
      codexTable.appendChild(row)
      
    })
  }
  else{
    console.log(`You're not logged in`)
  }
}

async function addToMyCodex(id, rating){
  if(localStorage.isLoggedIn == 'true'){
    var body = {
      user_id: localStorage.user_id,
      coffee_id: id, 
      rating: rating || 1
    }
    body = JSON.stringify(body);
    var returnData = await fetch(`${codexURL}`, {
      method: "POST",
      mode: 'cors',
      body: body
  })
  returnData = await returnData.json();
  console.log(returnData);
  renderCodex()
  }
  else{console.log('you must be logged in to add a coffee to your Codex.')}
}

async function editRating(id, rating){
  var editRating = document.getElementById(`rate-${id}`);
  editRating.removeAttribute('onclick')
  editRating.innerHTML = ''
  var input = makeElement('input');
  input.value = rating;
  editRating.appendChild(input);
  input.addEventListener('keyup', (e) => {
    var rating = Number(input.value);
    if(e.keyCode === 13) {
      addToMyCodex(id, rating)
    }
  })
}

async function removeCoffeeFromCodex(id){
  if(localStorage.isLoggedIn == 'true'){
    const deleteURL = `${codexURL}?user_id=${localStorage.user_id}&coffee_id=${id}`

    var returnData = await fetch(`${deleteURL}`, {
      method: "DELETE"
  })
  returnData = await returnData.json();
  renderCodex();
  }
  else{console.log('you must be logged in to remove a coffee to your Codex.')}
}