import { useState, useEffect } from "react";
import "./visual-sorting-project.css";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

// Define helper functions before they are used
const generateNums = (n) => {
  let arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
};

const generateColors = (n) => {
  let arr = [];
  let randomArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let x = randomArray.length;
  for (let i = 0; i < n; i++) {
    let str = "#";
    for (let i = 0; i < 6; i++) {
      str += randomArray[Math.floor(Math.random() * x)];
    }
    arr.push(str);
  }
  return arr;
};

const SortingVisualizer = () => {
  const navigate = useNavigate();
  const [nums, setNums] = useState(generateNums(10));
  const [colors, setColors] = useState(generateColors(10));
  console.log(setColors, setNums);
  const bubbleSort = async (arr, callback, prefix) => {
    const timer = getTimer(prefix);
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n - 1 - i; j++) {
        await sleep(250);
        if (arr[j] > arr[j + 1]) {
          swap(j, j + 1, arr);
          callback(j, j + 1, prefix);
        }
      }
    }
    clearInterval(timer);
  };

  const selectionSort = async (arr, callback, prefix) => {
    const timer = getTimer(prefix);
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let temp = i;
      for (let j = i + 1; j < n; j++) {
        await sleep(250);
        if (arr[j] < arr[temp]) {
          temp = j;
        }
      }
      swap(i, temp, arr);
      callback(i, temp, prefix);
    }
    clearInterval(timer);
  };

  const insertionSort = async (arr, callback, prefix) => {
    const timer = getTimer(prefix);
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      let j = i + 1;
      while (j > 0 && arr[j] < arr[j - 1]) {
        await sleep(250);
        swap(j, j - 1, arr);
        callback(j, j - 1, prefix);
        j--;
      }
    }
    clearInterval(timer);
  };

  const quickSort = async (arr, callback, prefix) => {
    const timer = getTimer(prefix);
    await quickSortRecursion(arr, callback, 0, arr.length - 1, prefix);
    clearInterval(timer);
  };

  const mergeSort = async (arr, callback, prefix) => {
    const timer = getTimer(prefix);
    await mergeSortRecursion(arr, callback, 0, arr.length - 1, prefix);
    clearInterval(timer);
  };

  const [sortingAlgos, setSortingAlgos] = useState([
    { prefix: "bubble", callback: bubbleSort, nums: [...nums] },
    { prefix: "insertion", callback: insertionSort, nums: [...nums] },
    { prefix: "selection", callback: selectionSort, nums: [...nums] },
    { prefix: "quick", callback: quickSort, nums: [...nums] },
    { prefix: "merge", callback: mergeSort, nums: [...nums] },
  ]);

  useEffect(() => {
    setSortingAlgos((prevAlgos) =>
      prevAlgos.map((algo) => ({ ...algo, nums: [...nums] }))
    );
  }, [nums]);

  const swapHeights = (i, j, prefix) => {
    const bari = document.getElementById(prefix + i);
    const barj = document.getElementById(prefix + j);

    const heighti = bari.style.height;
    const heightj = barj.style.height;

    const colori = bari.style.backgroundColor;
    const colorj = barj.style.backgroundColor;

    bari.style.height = heightj;
    barj.style.height = heighti;
    bari.style.backgroundColor = colorj;
    barj.style.backgroundColor = colori;
  };

  const getHeightandColor = (index, prefix) => {
    const bar = document.getElementById(prefix + index);
    return {
      height: bar.style.height,
      color: bar.style.backgroundColor,
    };
  };

  const setHeightandColor = (index, height, color, prefix) => {
    const bar = document.getElementById(prefix + index);
    bar.style.height = height;
    bar.style.backgroundColor = color;
  };

  const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time));
  };

  const swap = (i, j, arr) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const partition = async (arr, callback, low, high, prefix) => {
    let pivotItem = arr[low];
    let left = low;
    let right = high;

    while (left < right) {
      while (arr[left] <= pivotItem) left++;
      while (arr[right] > pivotItem) right--;

      if (left < right) {
        await sleep(250);
        swap(left, right, arr);
        callback(left, right, prefix);
      }
    }

    await sleep(250);
    arr[low] = arr[right];
    arr[right] = pivotItem;
    callback(low, right, prefix);

    return right;
  };

  const quickSortRecursion = async (arr, callback, low, high, prefix) => {
    if (high <= low) {
      return;
    }

    let pivot = await partition(arr, callback, low, high, prefix);

    await quickSortRecursion(arr, callback, low, pivot - 1, prefix);
    await quickSortRecursion(arr, callback, pivot + 1, high, prefix);
  };

  const merge = async (arr, callback, low, high, mid, prefix) => {
    let temp = [];
    let ptr1 = low;
    let ptr2 = mid + 1;

    while (ptr1 <= mid && ptr2 <= high) {
      if (arr[ptr1] <= arr[ptr2]) {
        temp.push({
          val: arr[ptr1],
          index: ptr1,
          style: getHeightandColor(ptr1, prefix),
        });
        ptr1++;
      } else {
        temp.push({
          val: arr[ptr2],
          index: ptr2,
          style: getHeightandColor(ptr2, prefix),
        });
        ptr2++;
      }
    }

    while (ptr1 <= mid) {
      temp.push({
        val: arr[ptr1],
        index: ptr1,
        style: getHeightandColor(ptr1, prefix),
      });
      ptr1++;
    }

    while (ptr2 <= high) {
      temp.push({
        val: arr[ptr2],
        index: ptr2,
        style: getHeightandColor(ptr2, prefix),
      });
      ptr2++;
    }

    for (let i = 0; i < temp.length; i++) {
      await sleep(250);
      arr[low + i] = temp[i].val;
      setHeightandColor(
        low + i,
        temp[i].style.height,
        temp[i].style.color,
        prefix
      );
    }
  };

  const mergeSortRecursion = async (arr, callback, low, high, prefix) => {
    if (high <= low) return;

    let mid = Math.floor((low + high) / 2);
    await mergeSortRecursion(arr, callback, low, mid, prefix);
    await mergeSortRecursion(arr, callback, mid + 1, high, prefix);

    await merge(arr, callback, low, high, mid, prefix);
  };

  const getTimer = (prefix) => {
    return setInterval(() => {
      const timerLabel = document.getElementById(prefix + "-timer");
      timerLabel.innerHTML = parseInt(timerLabel.innerHTML) + 1;
    }, 1000);
  };

  const handleStart = () => {
    sortingAlgos.forEach((elem) => {
      elem.callback(elem.nums, swapHeights, elem.prefix);
    });
  };

  const handleBack = () => {
    navigate("/home");
  };

  return (
    <div>
      <Button
        className={{ justifyContent: "start" }}
        variant="contained"
        color="info"
        onClick={handleBack}
        sx={{ fontSize: "1.25rem", padding: "12px 24px" }}
      >
        Go Back
      </Button>
      <div id="mainDiv">
        {sortingAlgos.map((elem) => (
          <div
            key={elem.prefix}
            style={{
              width: "30%",
              height: "500px",
              border: "solid black 1px",
              alignSelf: "center",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
              alignItems: "baseline",
              margin: "5px 10px 15px 10px",
            }}
          >
            <div
              style={{
                width: "100%",
                borderBottom: "solid black 1px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "5px",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              <p>{elem.prefix.toUpperCase()} SORT</p>
              <p id={`${elem.prefix}-timer`}>0</p>
            </div>
            {elem.nums.map((num, index) => (
              <div
                key={index}
                id={`${elem.prefix}${index}`}
                style={{
                  width: "40px",
                  height: `${num * 4}px`,
                  border: "solid black 1px",
                  backgroundColor: colors[index],
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
      <button id="startBtn" onClick={handleStart}>
        CLICK ME TO START SORTING
      </button>
    </div>
  );
};

export default SortingVisualizer;
