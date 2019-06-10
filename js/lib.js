

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
    const textNode = document.createTextNode(text);
    element.appendChild(textNode); 
    return element;
}

//WIP-Not Implemented Considering Abstracting our fetch function away. 
async function fetcher(url, method){
    return await fetch(url, {
        method: method,
    })
    .then( (response => {return response.json()}))
    .catch(error => console.error('Error:', error));
}