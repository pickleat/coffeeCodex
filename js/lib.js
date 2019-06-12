
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

function sortBy(data, sortKey){
    // console.log(data);
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
                const rate = makeElement('td');
                const rateCoffee = makeElement('a', 'coming soon')
                // rateCoffee.setAttribute('onclick', `rateCoffee('${returnData.id}')`)
                rate.appendChild(rateCoffee);
                row.appendChild(rate)
                return
            }
            if(listItem == 'remove'){
                const remove = document.createElement('td');
                const removeLink = makeElement('a', 'X')
                removeLink.setAttribute('onclick', `removeCoffeeFromCodex('${returnData.id}')`)
                remove.setAttribute('class', "cenText");
                remove.appendChild(removeLink);
                row.appendChild(remove)
                return
            }
            if(listItem == 'add'){
                const add = makeElement('td');
                const addCoffee = makeElement('a', '+');
                addCoffee.setAttribute('onclick', `addToMyCodex('${returnData.id}')`)
                add.setAttribute('class', "cenText");
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

  function getTable(table){
      var tableVal = `<thead>
      <tr>
      <td>Roaster</td>
      <td>Country</td>
      <td>Producer</td>
      <td>MASL</td>
      <td>Processing</td>`
    if(localStorage.isLoggedIn === 'true'){
        if(table == 'codex'){
            tableVal += `
            <td>Rate Coffee</td>
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