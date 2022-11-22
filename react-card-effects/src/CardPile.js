import React, { useState, useEffect } from "react";
import axios from "axios";

import AddCard from "./AddCard";
import Card from "./Card";
import ShuffleDeck from "./ShuffleDeck";

function CardPile() {
  const BASE_URL = "https://deckofcardsapi.com/api/deck/";
  const INITIAL_CARD_STATE =
    "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png?20091205084734";

  const [deck_id, setDeck_id] = useState();
  //jank way to make it invisible i know
  const [topCardImg, setTopCardImg] = useState(INITIAL_CARD_STATE);
  const [alert, setAlert] = useState("Loading...");
  const [allowDraw, setAllowDraw] = useState(false);

  // this is called *after* component first added to DOM
  useEffect(function getDeckWhenMounted() {
    async function getDeck() {
      const result = await axios.get(`${BASE_URL}new/shuffle/?deck_count=1`);
      setDeck_id(result.data.deck_id);
      setAlert(`${result.data.remaining} cards left!`);
      setAllowDraw(true);
    }
    getDeck();
  }, []);

  function GetCard() {
    //console.log("okay2");
    if (allowDraw) {
      async function getCard() {
        const result = await axios.get(`${BASE_URL}${deck_id}/draw/?count=1`);
        if (result.data.success) {
          setTopCardImg(result.data.cards[0].image);
          setAlert(`${result.data.remaining} cards left!`);
        } else if (
          result.data.error ===
          "Not enough cards remaining to draw 1 additional"
        ) {
          setAlert("No more cards left to draw!");
        }
      }
      getCard();
    }
  }

  function doShuffleDeck() {
    console.log("ok");
    async function shuffle() {
      setAlert(`Shuffling deck!`);
      setAllowDraw(false);
      const result = await axios.get(`${BASE_URL}${deck_id}/shuffle`);
      setAlert(`${result.data.remaining} cards left!`);
      setTopCardImg(INITIAL_CARD_STATE);
      setAllowDraw(true);
    }
    shuffle();
  }

  return (
    <div className="CardPile">
      <h1>{alert}</h1>
      <AddCard GetCard={GetCard}></AddCard>
      <Card img={topCardImg}></Card>
      <ShuffleDeck doShuffleDeck={doShuffleDeck}></ShuffleDeck>
    </div>
  );
}

export default CardPile;
