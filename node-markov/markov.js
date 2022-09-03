/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  chains = {};

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // This is almost certainly possible to do more efficiently
    for (let word in this.words) {
      let currWord = this.words[word].toLowerCase();
      let nextWord = this.words[Number(word) + 1]

      if (currWord in this.chains) {
        if (nextWord) {
          this.chains[currWord].push(nextWord.toLowerCase());
        } else {
          this.chains[currWord].push(null);
        }
      } else {
        if (nextWord) {
          this.chains[currWord] = [nextWord.toLowerCase()];
        } else {
          this.chains[currWord] = [null];
        }
        
      }
    }
    //console.log(this.chains);
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    let text = '';
    let keys = Object.keys(this.chains);
    let currWord = keys[Math.floor(Math.random() * keys.length)];
    let nextWords = [];
    let nextWord = '';
    text += currWord + ' ';
    for (let i=0; i < numWords; i++) {
      nextWords = this.chains[currWord];
      //console.log(nextWords)
      if (nextWords[0] == null) {
        nextWord = keys[Math.floor(Math.random() * keys.length)];
      } else {
        nextWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      }
      text += nextWord + ' ';
      currWord = nextWord;
      
    }
    return text;
  }
}

module.exports = MarkovMachine;