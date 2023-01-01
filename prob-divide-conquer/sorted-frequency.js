function sortedFrequency(arr, val) {
  let valLeftIdx = arr.length - 1;
  let leftIdx = 0;
  let rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // if current idx is less than arr.length, save current idx
      if (middleIdx < valLeftIdx) {
        valLeftIdx = middleIdx;
      }
      // middleVal may be too large, look at the left half
      rightIdx = middleIdx - 1;
    }
  }

  let valRightIdx = arr.length - 1;
  leftIdx = 0;
  rightIdx = arr.length - 1;

  while (leftIdx <= rightIdx) {
    // find the middle value
    let middleIdx = Math.floor((leftIdx + rightIdx) / 2);
    // console.log(middleIdx);
    let middleVal = arr[middleIdx];

    if (middleVal < val) {
      // middleVal is too small, look at the right half
      leftIdx = middleIdx + 1;
    } else if (middleVal > val) {
      // middleVal is too large, look at the left half
      rightIdx = middleIdx - 1;
    } else {
      // if current idx is less than arr.length, save current idx
      if (middleIdx < arr.length - 1) {
        valRightIdx = middleIdx;
      }
      // middleVal may be too small, look at the right half
      leftIdx = middleIdx + 1;
    }
  }
  //both no val found and val at the very end produce the same result, 0.
  //this checks if the end value is less than the value searched for.
  if (arr[valRightIdx] < val) {
    return -1;
  }
  return valRightIdx - valLeftIdx + 1;
}

module.exports = sortedFrequency;
