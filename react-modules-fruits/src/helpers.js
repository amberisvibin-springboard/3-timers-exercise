function choice(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function remove(items, itemToRem) {
  if (items.includes(itemToRem)) {
    items = items.filter((item) => item !== itemToRem);
    return items;
  } else {
    return undefined;
  }
}

export { choice, remove };
