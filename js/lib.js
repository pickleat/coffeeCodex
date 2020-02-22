
// Lib Functions in Alphabetical Order

//WIP-Not Implemented Considering Abstracting our fetch function away. 
async function fetcher(url, method){
    return await fetch(url, {
        method: method,
    })
    .then( (response => {return response.json()}))
    .catch(error => console.error('Error:', error));
}

function formatTimestamp(timestamp) {
    var timestamp = timestamp || Date.now()
    date = new Date(timestamp)
    datevalues = [
    date.getFullYear(),
    date.getMonth()+1,
    date.getDate(),
    ];
    formatedTime = `${datevalues[1]}/${datevalues[2]}/${datevalues[0]}`
    return formatedTime;
}

function getTable(table){
    var tableVal = `<thead>
    <tr>
    <td><a onclick=listCoffees("roaster")>Roaster</a></td>
    <td><a onclick=listCoffees("country")>Country   </a></td>
    <td><a onclick=listCoffees("producer")>Producer  </a></td>
    <td><a onclick=listCoffees("masl")>MASL      </a></td>
    <td><a onclick=listCoffees("processing")>Processing</a></td>`
  if(localStorage.isLoggedIn === 'true'){
      if(table == 'codex'){
          tableVal += `
          <td>Rating</td>
          <td>Remove</td>`
      }
      if(table == 'search'){
          tableVal += `
          <td>Rate Coffee</td>
          <td>Add To Codex</td>`
      }
      if(table === 'list'){
          tableVal += `<td>Add Coffee</td>`
      }
  }
  else {
      tableVal += `
      </tr>
      </thead>`
  }
  return tableVal  
}

function columnHeaders(){

}

// Helper function: Makes an HTML Element
function makeElement(type, text) {
    // Usage: 
    // const h1 = (text) => makeElement(`h1`, text);
    // document.body.appendChild(h1('hey h1 dude'));
    const element = document.createElement(type);
    if(text){
        const textNode = document.createTextNode(text);
        element.appendChild(textNode); 
    }
    return element;
}

function rowBuilder(returnData, list){
    row = makeElement('tr');
    list.forEach((listItem) => {
    if(listItem == 'producer'){
        const producer = makeElement('td');
        const producerLink = makeElement('a', returnData.producer);
        producerLink.setAttribute('onclick', `showOneCoffee('${returnData.id}')`)
        producer.appendChild(producerLink);
        row.appendChild(producer);
        return
    }
    if(listItem == 'createdAt'){
        const dateAdded = (text) => makeElement('td', text);
        row.appendChild(dateAdded(formatTimestamp(returnData.createdAt)))
        return
    }
    if(localStorage.isLoggedIn == 'true'){
        if(listItem == 'rate'){
            var rater = returnData.coffee_rating;
            if(returnData.coffee_rating == '1'){
                rater = 'Rate Me!'
            }
            console.log(returnData.coffee_rating);
            const rate = makeElement('td');
            const rateCoffee = makeElement('a', rater);
            rateCoffee.setAttribute('onclick', `editRating('${returnData.id}', ${returnData.coffee_rating})`)
            rateCoffee.setAttribute('id', `rate-${returnData.id}`)
            rate.appendChild(rateCoffee);
            row.appendChild(rate)
            return
        }
        if(listItem == 'remove'){
            const remove = document.createElement('td');
            const removeLink = makeElement('a')
            const svgRemove = makeElement('img')
            svgRemove.setAttribute('src', '../resources/close-outline.svg');
            svgRemove.setAttribute('class', 'svg')
            removeLink.setAttribute('onclick', `removeCoffeeFromCodex('${returnData.id}')`)
            // remove.setAttribute('class', "text-center");
            removeLink.appendChild(svgRemove);
            remove.appendChild(removeLink);
            row.appendChild(remove)
            return
        }
        if(listItem == 'add'){
            const add = makeElement('td');
            const addCoffee = makeElement('a');
            const svgPlus = makeElement('img');
            svgPlus.setAttribute('src', '../resources/add-outline.svg')
            svgPlus.setAttribute('class', 'svg align-center')
            addCoffee.setAttribute('onclick', `addToMyCodex('${returnData.id}')`)
            // add.setAttribute('class', "text-center");
            addCoffee.appendChild(svgPlus);
            add.appendChild(addCoffee)
            row.appendChild(add);
        }
        // Need to add "Add to Codex"
    }
    const thing = makeElement('td', returnData[listItem]);
    row.appendChild(thing);
    })
    return row
}

  function sortBy(data, sortKey){
    data.sort(function(a, b) {
        if(sortKey == 'masl'){        
            if(!a[sortKey]){ var nameA = 9999}
            if(!b[sortKey]){ var nameB = 9999}
            if(a[sortKey]){ var nameA = parseInt(a[sortKey])}
            if(b[sortKey]){ var nameB = parseInt(b[sortKey])}
        } else {
            if(!a[sortKey]){ var nameA = 'ZZZ'}
            if(!b[sortKey]){ var nameB = 'ZZZ'}
            if(a[sortKey]){ var nameA = a[sortKey].toUpperCase();}
            if(b[sortKey]){ var nameB = b[sortKey].toUpperCase();}
        }
        if (nameA < nameB) {return -1;}
        if (nameA > nameB) {return 1;}
        // If names are equal
        return 0;
        });
    return data
  }