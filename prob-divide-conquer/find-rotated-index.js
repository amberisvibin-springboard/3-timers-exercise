function findRotatedIndex(arr, val) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  // find the middle value
  let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
  let middleVal = arr[middleIdx];

  // choose left or right by checking rightmost value
  if (val == arr[middleIdx]) {
    return middleIdx;
  }
  if (val > arr[rightIdx]) {
    rightIdx = middleIdx - 1;
  } else {
    leftIdx = middleIdx + 1;
  }

  while (leftIdx <= rightIdx) {
    // find the middle value
    middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    middleVal = arr[middleIdx];

    // console.log([leftIdx, rightIdx], arr);

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // we found our value!
      return middleIdx;
    }
  }

  // left and right pointers crossed, val isn't in arr
  return -1;
}

module.exports = findRotatedIndex;
