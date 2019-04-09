// this file for 
window.addEventListener('load', () => {
    // get buttons
    const beanDataButton = document.getElementById('coffeeData')

    // get containers
    var beanDataContainer = document.getElementsByClassName('beanDataContainer');
    var timerArea = document.getElementsByClassName('timerArea');
    var eventsArea = document.getElementsByClassName('eventsArea');
    var brewedCoffeeInfo = document.getElementsByClassName('brewedCoffeeInfo');

    beanDataButton.addEventListener('click', () => {
        timerArea[0].style.display = 'none';
        eventsArea[0].style.display = 'none';
        brewedCoffeeInfo[0].style.display = 'none';
        beanDataContainer[0].style.display = 'block';
        // var openingContainer = document.getElementsByClassName('openingContainer');
        // openingContainer[0].style.display = 'none';
        // var appContainer = document.getElementsByClassName('appContainer');
        // appContainer[0].style.display = 'block';
    })

    var coffeeCard = document.getElementById('coffeeCard');
    var children = coffeeCard.children
    console.log(children);
    var childArray = Array.from(children);
    childArray.forEach(item => {
        item.addEventListener('change', (e)=> {
            console.log(e.srcElement.value);
        })
    })

})