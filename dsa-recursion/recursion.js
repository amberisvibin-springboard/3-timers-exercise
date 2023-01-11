/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length === 0) return 1;

  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, longestWord = 0) {
  if (words.length === 0) return longestWord;

  if (longestWord < words[0].length) {
    longestWord = words[0].length;
  }

  return longest(words.slice(1), longestWord);
}

/** everyOther: return a string with every other letter. */

function everyOther(str) {
  let strArr = str.split("");
  let out = [];

  function _everyOther(strArr, i) {
    if (strArr.length === i) return;
    if (i % 2 === 0) out.push(strArr[i]);
    _everyOther(strArr, i + 1);
  }

  _everyOther(strArr, 0);
  return out.join("");
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str) {
  let fullStrArr = str.split("");

  function _isPalindrome(strArr, i = 0) {
    // console.log(strArr[0], fullStrArr[fullStrArr.length - i - 1]);
    if (strArr.length === 0) return true;
    if (strArr[0] !== fullStrArr[fullStrArr.length - i - 1]) return false;
    return _isPalindrome(strArr.slice(1), i + 1);
  }

  return _isPalindrome(fullStrArr);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val) {
  function _findIndex(arr, i = 0) {
    // console.log(arr[0], i);
    if (arr.length === 0) return -1;
    if (arr[0] === val) return i;
    i++;
    // console.log(i);
    return _findIndex(arr.slice(1), i);
  }
  return _findIndex(arr);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str) {
  let strArr = str.split("");
  let out = [];

  function _revString(strArr, i) {
    if (strArr.length === i) return;
    out.unshift(strArr[i]);
    _revString(strArr, i + 1);
  }

  _revString(strArr, 0);
  return out.join("");
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arr = Object.values(obj);
  let out = [];

  function _gatherStrings(arr) {
    if (Array.isArray(arr[0])) {
      out.push(_gatherStrings(arr[0]));
    } else {
      if (arr.length === 0) return;
      if (typeof arr[0] === "string") out.push(arr[0]);
    }
    return _gatherStrings(arr.slice(1));
  }

  _gatherStrings(arr);
  return out;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val) {}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
