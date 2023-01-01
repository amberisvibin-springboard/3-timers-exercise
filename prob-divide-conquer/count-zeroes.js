function countZeroes(arr) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  let zero = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal == 1) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal == 0) {
      // if current idx is less than arr.length, save current idx
      if (middleIdx < zero) {
        zero = middleIdx;
      }
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    }
  }

  //if any zeroes are found, return num of elements after first 0.
  //if not, return 0.
  if (zero == arr.length - 1) {
    return 0;
  } else {
    return arr.length - zero;
  }
}

module.exports = countZeroes;
