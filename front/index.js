async function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const cardObject = document.getElementById('textCard');

    textCard = cardObject.value

    const data = JSON.stringify({
        text: textCard
      })

    const response = await fetch('http://localhost:3001/api/cards', {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const myJson = await response.json(); 
    
    pushCards(myJson, 'cards')

    cardObject.value = ''
    cardObject.focus()

    
    return false;
}

var form = document.getElementById('addCard');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}


async function reloadCards(){
    const response = await fetch('http://localhost:3001/api/cards');
    const cardsInformation = await response.json();
    pushCards(cardsInformation, 'cards')
    
}

async function pushCards(cardsInformation, container){
    cardsContainer = document.getElementById(container)
    cardsContainer.innerHTML = '';
    console.log(cardsInformation)

    cardsInformation.forEach(card => {
        console.log(card.text)
        cardsContainer.innerHTML += `<section>${card.text}</section>`
    });

}

reloadCards();