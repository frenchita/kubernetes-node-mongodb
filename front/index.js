const base_url = 'http://examen.dh/';

async function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    const cardObject = document.getElementById('textCard');

    textCard = cardObject.value

    const data = JSON.stringify({
        text: textCard
      })

    const response = await fetch(`${base_url}api/cards`, {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const cardsResponse = await response.json(); 
    
    pushCards(cardsResponse, 'cards')

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
    const response = await fetch(`${base_url}api/cards`);
    const cardsInformation = await response.json();
    pushCards(cardsInformation, 'cards')
    
}

async function pushCards(cardsInformation, container){
    cardsContainer = document.getElementById(container)
    cardsContainer.innerHTML = '';

    cardsInformation.forEach(card => {
        console.log(card.text)
        cardsContainer.innerHTML += `<section>${card.text}</section>`
    });

}

reloadCards();