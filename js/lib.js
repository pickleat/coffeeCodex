
// Lib Functions in Alphabetical Order

function countryLookup(country){
    countries = {
        "Afghanistan": "AF",
        "Albania": "AL",
        "Algeria": "DZ",
        "American Samoa": "AS",
        "Andorra": "AD",
        "Angola": "AO",
        "Anguilla": "AI",
        "Antarctica": "AQ",
        "Antigua and Barbuda": "AG",
        "Argentina": "AR",
        "Armenia": "AM",
        "Aruba": "AW",
        "Australia": "AU",
        "Austria": "AT",
        "Azerbaijan": "AZ",
        "Bahamas": "BS",
        "Bahrain": "BH",
        "Bangladesh": "BD",
        "Barbados": "BB",
        "Belarus": "BY",
        "Belgium": "BE",
        "Belize": "BZ",
        "Benin": "BJ",
        "Bermuda": "BM",
        "Bhutan": "BT",
        "Bolivia": "BO",
        "Bosnia and Herzegovina": "BA",
        "Botswana": "BW",
        "Bouvet Island": "BV",
        "Brazil": "BR",
        "British Indian Ocean Territory": "IO",
        "Brunei Darussalam": "BN",
        "Bulgaria": "BG",
        "Burkina Faso": "BF",
        "Burundi": "BI",
        "Cambodia": "KH",
        "Cameroon": "CM",
        "Canada": "CA",
        "Cape Verde": "CV",
        "Cayman Islands": "KY",
        "Central African Republic": "CF",
        "Chad": "TD",
        "Chile": "CL",
        "China": "CN",
        "Christmas Island": "CX",
        "Cocos (Keeling) Islands": "CC",
        "Colombia": "CO",
        "Comoros": "KM",
        "Congo": "CG",
        "Congo, the Democratic Republic of the": "CD",
        "Cook Islands": "CK",
        "Costa Rica": "CR",
        "Cote D'Ivoire": "CI",
        "Croatia": "HR",
        "Cuba": "CU",
        "Cyprus": "CY",
        "Czech Republic": "CZ",
        "Denmark": "DK",
        "Djibouti": "DJ",
        "Dominica": "DM",
        "Dominican Republic": "DO",
        "Ecuador": "EC",
        "Egypt": "EG",
        "El Salvador": "SV",
        "Equatorial Guinea": "GQ",
        "Eritrea": "ER",
        "Estonia": "EE",
        "Ethiopia": "ET",
        "Falkland Islands (Malvinas)": "FK",
        "Faroe Islands": "FO",
        "Fiji": "FJ",
        "Finland": "FI",
        "France": "FR",
        "French Guiana": "GF",
        "French Polynesia": "PF",
        "French Southern Territories": "TF",
        "Gabon": "GA",
        "Gambia": "GM",
        "Georgia": "GE",
        "Germany": "DE",
        "Ghana": "GH",
        "Gibraltar": "GI",
        "Greece": "GR",
        "Greenland": "GL",
        "Grenada": "GD",
        "Guadeloupe": "GP",
        "Guam": "GU",
        "Guatemala": "GT",
        "Guinea": "GN",
        "Guinea-Bissau": "GW",
        "Guyana": "GY",
        "Haiti": "HT",
        "Heard Island and Mcdonald Islands": "HM",
        "Holy See (Vatican City State)": "VA",
        "Honduras": "HN",
        "Hong Kong": "HK",
        "Hungary": "HU",
        "Iceland": "IS",
        "India": "IN",
        "Indonesia": "ID",
        "Iran, Islamic Republic of": "IR",
        "Iraq": "IQ",
        "Ireland": "IE",
        "Israel": "IL",
        "Italy": "IT",
        "Jamaica": "JM",
        "Japan": "JP",
        "Jordan": "JO",
        "Kazakhstan": "KZ",
        "Kenya": "KE",
        "Kiribati": "KI",
        "Korea, Democratic People's Republic of": "KP",
        "Korea, Republic of": "KR",
        "Kuwait": "KW",
        "Kyrgyzstan": "KG",
        "Lao People's Democratic Republic": "LA",
        "Latvia": "LV",
        "Lebanon": "LB",
        "Lesotho": "LS",
        "Liberia": "LR",
        "Libyan Arab Jamahiriya": "LY",
        "Liechtenstein": "LI",
        "Lithuania": "LT",
        "Luxembourg": "LU",
        "Macao": "MO",
        "Macedonia, the Former Yugoslav Republic of": "MK",
        "Madagascar": "MG",
        "Malawi": "MW",
        "Malaysia": "MY",
        "Maldives": "MV",
        "Mali": "ML",
        "Malta": "MT",
        "Marshall Islands": "MH",
        "Martinique": "MQ",
        "Mauritania": "MR",
        "Mauritius": "MU",
        "Mayotte": "YT",
        "Mexico": "MX",
        "Micronesia, Federated States of": "FM",
        "Moldova, Republic of": "MD",
        "Monaco": "MC",
        "Mongolia": "MN",
        "Montserrat": "MS",
        "Morocco": "MA",
        "Mozambique": "MZ",
        "Myanmar": "MM",
        "Namibia": "NA",
        "Nauru": "NR",
        "Nepal": "NP",
        "Netherlands": "NL",
        "Netherlands Antilles": "AN",
        "New Caledonia": "NC",
        "New Zealand": "NZ",
        "Nicaragua": "NI",
        "Niger": "NE",
        "Nigeria": "NG",
        "Niue": "NU",
        "Norfolk Island": "NF",
        "Northern Mariana Islands": "MP",
        "Norway": "NO",
        "Oman": "OM",
        "Pakistan": "PK",
        "Palau": "PW",
        "Palestinian Territory, Occupied": "PS",
        "Panama": "PA",
        "Papua New Guinea": "PG",
        "Paraguay": "PY",
        "Peru": "PE",
        "Philippines": "PH",
        "Pitcairn": "PN",
        "Poland": "PL",
        "Portugal": "PT",
        "Puerto Rico": "PR",
        "Qatar": "QA",
        "Reunion": "RE",
        "Romania": "RO",
        "Russian Federation": "RU",
        "Rwanda": "RW",
        "Saint Helena": "SH",
        "Saint Kitts and Nevis": "KN",
        "Saint Lucia": "LC",
        "Saint Pierre and Miquelon": "PM",
        "Saint Vincent and the Grenadines": "VC",
        "Samoa": "WS",
        "San Marino": "SM",
        "Sao Tome and Principe": "ST",
        "Saudi Arabia": "SA",
        "Senegal": "SN",
        "Serbia and Montenegro": "CS",
        "Seychelles": "SC",
        "Sierra Leone": "SL",
        "Singapore": "SG",
        "Slovakia": "SK",
        "Slovenia": "SI",
        "Solomon Islands": "SB",
        "Somalia": "SO",
        "South Africa": "ZA",
        "South Georgia and the South Sandwich Islands": "GS",
        "Spain": "ES",
        "Sri Lanka": "LK",
        "Sudan": "SD",
        "Suriname": "SR",
        "Svalbard and Jan Mayen": "SJ",
        "Swaziland": "SZ",
        "Sweden": "SE",
        "Switzerland": "CH",
        "Syrian Arab Republic": "SY",
        "Taiwan, Province of China": "TW",
        "Tajikistan": "TJ",
        "Tanzania, United Republic of": "TZ",
        "Thailand": "TH",
        "Timor-Leste": "TL",
        "Togo": "TG",
        "Tokelau": "TK",
        "Tonga": "TO",
        "Trinidad and Tobago": "TT",
        "Tunisia": "TN",
        "Turkey": "TR",
        "Turkmenistan": "TM",
        "Turks and Caicos Islands": "TC",
        "Tuvalu": "TV",
        "Uganda": "UG",
        "Ukraine": "UA",
        "United Arab Emirates": "AE",
        "United Kingdom": "GB",
        "United States": "US",
        "United States Minor Outlying Islands": "UM",
        "Uruguay": "UY",
        "Uzbekistan": "UZ",
        "Vanuatu": "VU",
        "Venezuela": "VE",
        "Viet Nam": "VN",
        "Virgin Islands, British": "VG",
        "Virgin Islands, U.s.": "VI",
        "Wallis and Futuna": "WF",
        "Western Sahara": "EH",
        "Yemen": "YE",
        "Zambia": "ZM",
        "Zimbabwe": "ZW"
    }

    return countries[country] ? `resources/countries/all/${countries[country].toLowerCase()}/vector.svg` : 'resources/earth.svg'
    
}


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
        producer.className = 'max-w-xs truncate'
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
            // console.log(returnData.coffee_rating);
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

async function sortBy(data, sortKey){
      console.log('sortby data')
    data.sort(function(a, b) {
        if(sortKey == 'masl' || sortKey == 'coffee_rating'){        
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