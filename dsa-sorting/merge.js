function merge(arr1, arr2) {
  const out = [];
  let arr1Idx = 0;
  let arr2Idx = 0;
  while (arr1Idx < arr1.length && arr2Idx < arr2.length) {
    if (arr1[arr1Idx] < arr2[arr2Idx]) {
      out.push(arr1[arr1Idx]);
      arr1Idx++;
    } else {
      out.push(arr2[arr2Idx]);
      arr2Idx++;
    }
  }

  while (arr1Idx < arr1.length) {
    out.push(arr1[arr1Idx]);
    arr1Idx++;
  }

  while (arr2Idx < arr2.length) {
    out.push(arr2[arr2Idx]);
    arr2Idx++;
  }

  return out;
}

function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  //round down
  const midIdx = Math.floor(arr.length / 2);
  const leftArr = mergeSort(arr.slice(0, midIdx));
  const rightArr = mergeSort(arr.slice(midIdx));
  return merge(leftArr, rightArr);
}

module.exports = { merge, mergeSort };
