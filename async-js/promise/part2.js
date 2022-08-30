let base_url = "https://deckofcardsapi.com/api"

// Make a request to the Deck of Cards API (https://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
{
    let shuffle_deck_promise = axios.get(`${base_url}/deck/new/shuffle/?deck_count=1`);

    shuffle_deck_promise
    .then(data => {
        let deck_id = data.data.deck_id;
        return axios.get(`${base_url}/deck/${deck_id}/draw`);
    })
    .then(data => $("#p1").text(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`))
    .catch(err => console.log(err));

}

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
//Once you have both cards, console.log the values and suits of both cards.

{
    let deck_id;
    let shuffle_deck_promise = axios.get(`${base_url}/deck/new/shuffle/?deck_count=1`);

    shuffle_deck_promise
    .then(data => {
        deck_id = data.data.deck_id;
        return axios.get(`${base_url}/deck/${deck_id}/draw`);
    })
    .then(data => {
        $("#p2").append(`<li>${data.data.cards[0].value} of ${data.data.cards[0].suit}</li>`)
        return axios.get(`${base_url}/deck/${deck_id}/draw`);
    })
    .then(data => {
        $("#p2").append(`<li>${data.data.cards[0].value} of ${data.data.cards[0].suit}</li>`)
    })
    .catch(err => console.log(err));
}
  
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
{
    let deck_id;
    let shuffle_deck_promise = axios.get(`${base_url}/deck/new/shuffle/?deck_count=1`);

    shuffle_deck_promise
    .then(data => {
        deck_id = data.data.deck_id;
        $("#3").append(document.createElement("button"))
        $("button").text("Draw card");
        $("button").click(draw_card)
    })
    .catch(err => console.log(err));

    function draw_card() {
        let draw_card_promise = axios.get(`${base_url}/deck/${deck_id}/draw`);

        draw_card_promise
        .then(data => {
            if (data.data.cards[0]) {
                $("#card").text(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`)
            }
        })
        .catch(err => console.log(err));
    }
}