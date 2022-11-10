import { choice, remove } from "./helpers";
import fruits from "./foods";

let sessionFruits = fruits;

let randomFruit = choice(sessionFruits);

console.log(`I'd like one ${randomFruit}, please.`);
console.log(`Here you go: ${randomFruit}`);
console.log("Delicious! May I have another?");
sessionFruits = remove(sessionFruits, randomFruit);
console.log(`I'm sorry, we're all out. We have ${sessionFruits} left.`);
