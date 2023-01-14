function bubbleSort(arr) {
  let swapped = true;
  for (let i = 0; i < arr.length && swapped; i++) {
    swapped = false;
    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }
  }
  return arr;
}

module.exports = bubbleSort;
