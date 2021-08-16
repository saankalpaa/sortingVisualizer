export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    doBubbleSort(animations, auxiliaryArray);

    // for verifying the sorted array
    const items = doBubbleSort(animations, auxiliaryArray);
    const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
    console.log("jsSortedArray: " + javaScriptSortedArray)
    console.log("check: " + items)
    console.log("sorted:" + arraysAreEqual(javaScriptSortedArray, items))

    return animations;
  }
  
  function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  }

  export function doBubbleSort(animations, auxiliaryArray) {
    var swapped;
    do {
      swapped = false;
      for (var i = 0; i < auxiliaryArray.length - 1; i++) {
        if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
          var temp = auxiliaryArray[i];
          auxiliaryArray[i] = auxiliaryArray[i + 1];
          auxiliaryArray[i + 1] = temp;
          animations.push([i, i + 1]);
          swapped = true;
        }
      }
    } while (swapped);
    return auxiliaryArray;
  }

  