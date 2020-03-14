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
    if(clickedContainer === container){
      clickedContainer.style.display = 'block';
      if(localStorage.isLoggedIn || clickedContainer !== coffeeCodexCard){
        document.getElementById('welcomeScreen').classList = 'hidden'
      }
      if(clickedContainer === coffeeCodexCard){
      document.getElementById('welcomeScreen').classList = 'md:flex'
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
  document.getElementById('sortedBy').innerHTML = sortKey || 'roaster';
  returnData.forEach(item => {
    var returnKeys = ["roaster", "country", "producer", "masl", "processing", "add"];
    var row = rowBuilder(item, returnKeys);
    allCoffees.appendChild(row);
  })
}

async function findCoffeeInfo() {
  var input = document.getElementById('roasterSearch')
  // var searchResults = document.getElementById('searchResults');
  // searchResults.innerHTML = getTable('search');
  var searchResults2 = document.getElementById('searchResults2');
  var totalResultsNum = document.getElementById('totalResultsNum');
  var roaster = input.value;
  roaster = roaster.replace(/ /g, '_')
  console.log(roaster);
  const newURL = `${url}?roaster=${roaster}`
  // console.log(newURL);

  var returnData = await fetch(newURL, {method: "GET"})
  returnData = await returnData.json()
  // console.log(returnData);
  totalResultsNum.innerHTML = `
    <div class='text-4xl text-gray-800 font-bold tracking-tighter'>${returnData.Items[0]['roaster']}</div>
     <div class='text-xl uppercase tracking-wide text-gray-600 font-semibold'>Your search resulted in ${returnData.Count} coffees.</div>
  `
  // returns the items found for each ROASTER needs to be formatted as shown to user.
  var keys = returnData.Items
  keys = sortBy(keys, 'country')
  
  keys.forEach(item => {
    // console.log(item);

    var NewDiv = document.createElement('div')
    NewDiv.classList = `p-2`
    
    NewDiv.innerHTML = `
    <div class="mx-auto bg-white rounded-lg m-2 min-w-sm max-w-sm">
              <div class='flex justify-center items-center p-2'>
                <object id='${item['id']}+${item['country']}' class='h-20 w-auto object-center fill-current text-purple-500' data='${countryLookup(item['country'])}' type="image/svg+xml"></object> 
              <div class="flex flex-col content-center items-center pl-2 flex-wrap" >
                <h5 class="text-xl text-gray-800 font-bold tracking-tighter">${item['country']} </h5>
                <div class="uppercase tracking-wide text-gray-600 text-sm font-semibold">${item['producer'] || 'Unknown'}</div>
              </div>
              </div>
              <div class="px-6 pb-6">
                <ul class="py-2">
                  <li>Elevation: ${item['masl'] || 'Unknown'}</li>
                  <li>Processing: ${item['processing'] || 'Unknown'}</li>
                  <li class='truncate'>Varietals: ${item['varietals'] || 'Unknown'}</li>
                  <li>Flavor Notes: ${item['notes'] || 'Unknown'}</li>
                  </ul>
                  <button class='inline-flex items-center' id='addSingleCoffeeToCodex'>
                    <svg class='fill-current w-4 h-4' viewBox="0 0 20 20"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
                    </svg>
                    <span class='pl-2'>Add</span>     
                </button>
                <button class='inline-flex items-center' id='' onclick='showOneCoffee("${item['id']}")'>
                <svg class='fill-current w-4 h-4' viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg>
                <span class='pl-2'>More Info</span>
                </button> 
              </div>
      `


    searchResults2.appendChild(NewDiv)
    var SVGObject = document.getElementById(`${item['id']}+${item['country']}`)
    // var returnKeys = ["roaster", "country", "producer", "masl", "processing", "rate", "add"];
    // var row = rowBuilder(item, returnKeys);
    // searchResults.appendChild(row)
    // console.log(`${item.producer} coffee id is ${item.id}`)
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
  <div class='mx-auto p-2 max-w-md bg-white rounded-lg shadow-lg hover:shadow-xl'>
  <div class='flex justify-between items-center'>
    <div class='flex flex-col justify-center p-2'>
      <object id='${returnData['id']}+${returnData['country']}' class='h-20 w-auto object-center' data='${countryLookup(returnData['country'])}' type="image/svg+xml"></object> 
      <h5 class="uppercase tracking-wide text-gray-600 text-sm font-semibold">${returnData['country']} </h5>
    </div>  
    <div class="flex flex-col content-start items-start px-2 flex-wrap" >
      <h3 class='mx-auto text-2xl text-center text-gray-800 font-bold tracking-tighter'>${returnData.name}</h3>
      <div class="uppercase tracking-wide text-gray-600 text-sm font-semibold">${returnData['producer']}</div>
    </div>
    <div class='flex flex-col items-center'>
    <button class='inline-flex items-center mb-2' id='editCoffee'>
      <svg class='fill-current w-4 h-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"/>
      </svg>
      <span class='pl-2'>Edit</span>
    </button>
    <button class='inline-flex items-center' id='addSingleCoffeeToCodex'>
      <svg class='fill-current w-4 h-4' viewBox="0 0 20 20"><path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
      </svg>
      <span class='pl-2'>Add</span>
    </button>
    </div>
  </div>

  
  
    <div class='text-left'>
      <ul>
        <li><span class="font-bold">Roaster: </span>${returnData.roaster}</li>
        <li><span class="font-bold">Processing: </span>${returnData.processing}</li>
        <li><span class="font-bold">Flavor Notes: </span>${returnData.notes || 'Unknown'}</li>
        <li><span class="font-bold">Varietals: </span>${returnData.varietals || 'Unknown'}</li>
        <li><span class="font-bold">MASL: </span>${returnData.masl || 'Unknown'}</li>
        <li><span class="font-bold">ID: </span>${returnData.id}</li>
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