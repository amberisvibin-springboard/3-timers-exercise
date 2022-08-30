let base_url = "https://deckofcardsapi.com/api"

// Make a request to the Deck of Cards API (https://deckofcardsapi.com/) to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
{
    async function shufAndGetCard() {
        let shuffle_deck = await $.getJSON(`${base_url}/deck/new/shuffle/?deck_count=1`);
        let deck_id = shuffle_deck.deck_id;
        let get_card = await $.getJSON(`${base_url}/deck/${deck_id}/draw`);
      
        $("#p1").text(`${get_card.cards[0].value} of ${get_card.cards[0].suit}`)
    }
      
    shufAndGetCard();

}

// Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck.
//Once you have both cards, console.log the values and suits of both cards.

{
    async function shufAndGet2Cards() {
        let shuffle_deck = await $.getJSON(`${base_url}/deck/new/shuffle/?deck_count=1`);
        let deck_id = shuffle_deck.deck_id;
        let c1_promise = $.getJSON(`${base_url}/deck/${deck_id}/draw`);
        let c2_promise = $.getJSON(`${base_url}/deck/${deck_id}/draw`);

        let c1 = await c1_promise;
        let c2 = await c2_promise;
    
        $("#p2").append(`<li>${c1.cards[0].value} of ${c1.cards[0].suit}</li>`)
        $("#p2").append(`<li>${c2.cards[0].value} of ${c2.cards[0].suit}</li>`)
    }
    
    shufAndGet2Cards();
}
  
// Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
{
    let deck_id;
    async function shuffle() {
        let shuffle_deck = await $.getJSON(`${base_url}/deck/new/shuffle/?deck_count=1`);
        deck_id = shuffle_deck.deck_id;
        $("#3").append(document.createElement("button"))
        $("button").text("Draw card");
        $("button").click(draw_card)
    }

    async function draw_card() {
        let get_card = await $.getJSON(`${base_url}/deck/${deck_id}/draw`);
        if (get_card.cards[0]) {
            $("#card").text(`${get_card.cards[0].value} of ${get_card.cards[0].suit}`)
        }
    }
      
    shuffle();
}