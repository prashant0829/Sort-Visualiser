import "./App.css";
import MenuAppBar from "./components/Appbar";
import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import enums from "./enum";
import constants from "./constants";
import ReplayIcon from "@mui/icons-material/Replay";
import { Button } from "@mui/material";

function App() {
  //useStates
  const [arraySize, setArraySize] = useState(5);
  const [sortingArray, setSortingArray] = useState([]);
  const [sortingSpeed, setSortingSpeed] = useState(80);
  const [sortingType, setSortingType] = useState(enums.sortingTypes.bubbleSort);

  //useEffects
  useEffect(() => {
    makeRandomArray(arraySize);
  }, [arraySize]);

  useEffect(() => {
    refreshBars();
  }, [sortingArray]);

  //method to get a random integer in a given range
  const getRandomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //method to make a random array for given size
  const makeRandomArray = (size) => {
    let max = 25;
    let min = 5;
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push({
        value: getRandomNumberInRange(min, max),
        id: `itembar-${i}`,
      });
    }
    setSortingArray(array);
  };

  //method to perform sorting
  const performSort = async () => {
    switch (sortingType) {
      case 1:
        performBubbleSort();
        break;
      case 2:
        performSelectionSort();
        break;
      case 3:
        performInsertionSort();
        break;

      default:
        break;
    }
  };

  const performBubbleSort = async () => {
    let tempArray = sortingArray;

    for (let i = 0; i < tempArray.length - 1; i++) {
      console.log("Iteration", i);
      for (let j = 1; j < tempArray.length - i; j++) {
        const box1 = document.getElementById(tempArray[j - 1].id);
        const box2 = document.getElementById(tempArray[j].id);
        if (!(tempArray[j - 1].value > tempArray[j].value)) {
          box1.childNodes[1].style.backgroundColor = "#1fbf84";
          box2.childNodes[1].style.backgroundColor = "#1fbf84";
        } else {
          box1.childNodes[1].style.backgroundColor = "#f32b2b";
          box2.childNodes[1].style.backgroundColor = "#f32b2b";
        }

        await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
        if (tempArray[j - 1].value > tempArray[j].value) {
          let swap = tempArray[j - 1].value;
          tempArray[j - 1].value = tempArray[j].value;
          tempArray[j].value = swap;

          swap = box1.childNodes[1].style.height;
          box1.childNodes[1].style.height = box2.childNodes[1].style.height;
          box2.childNodes[1].style.height = swap;

          swap = box1.childNodes[0].innerText;
          box1.childNodes[0].innerText = box2.childNodes[0].innerText;
          box2.childNodes[0].innerText = swap;
        }
        console.log(tempArray);
        box1.childNodes[1].style.backgroundColor = "#4cbaff";
        box2.childNodes[1].style.backgroundColor = "#4cbaff";
        await new Promise((resolve) => setTimeout(resolve, 20 * sortingSpeed));
      }
    }
  };

  const performSelectionSort = async () => {
    let tempArray = sortingArray;
    let min = 0;
    let swap;
    let box1;
    let box2;

    for (let i = 0; i < tempArray.length; i++) {
      box1 = document.getElementById(tempArray[i].id);

      console.log("Iteration", i);
      min = i;
      for (let j = i + 1; j < tempArray.length; j++) {
        await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));

        box2 = document.getElementById(tempArray[j].id);
        box2.childNodes[1].style.backgroundColor = "#f32b2b";
        if (tempArray[j].value < tempArray[min].value) {
          min = j;
        }
        await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
        box2.childNodes[1].style.backgroundColor = "#4cbaff";
      }

      await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
      box2 = document.getElementById(tempArray[min].id);
      box2.childNodes[1].style.backgroundColor = "#fbf834";

      await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
      box2.childNodes[1].style.backgroundColor = "#4cbaff";

      swap = tempArray[min].value;
      tempArray[min].value = tempArray[i].value;
      tempArray[i].value = swap;

      swap = box1.childNodes[1].style.height;
      box1.childNodes[1].style.height = box2.childNodes[1].style.height;
      box2.childNodes[1].style.height = swap;

      swap = box1.childNodes[0].innerText;
      box1.childNodes[0].innerText = box2.childNodes[0].innerText;
      box2.childNodes[0].innerText = swap;

      console.log(tempArray);
      box1.childNodes[1].style.backgroundColor = "#1fbf84";
    }
  };

  const performInsertionSort = async () => {
    let tempArray = sortingArray;
    let min = 0;
    let swap;
    let box1;
    let box2;
    let box3;

    for (let i = 1; i < tempArray.length; i++) {
      console.log("Iteration", i);
      let j = i - 1;
      let current = tempArray[i].value;
      box3 = document.getElementById(tempArray[i].id);
      let a = box3.childNodes[1].style.height;
      let b = box3.childNodes[0].innerText;
      box3.childNodes[1].style.backgroundColor = "#fbf834";
      await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
      box3.childNodes[1].style.backgroundColor = "#4cbaff";
      while (j >= 0 && current < tempArray[j].value) {
        box1 = document.getElementById(tempArray[j + 1].id);
        box2 = document.getElementById(tempArray[j].id);

        box1.childNodes[1].style.backgroundColor = "#f32b2b";
        box2.childNodes[1].style.backgroundColor = "#f32b2b";

        tempArray[j + 1].value = tempArray[j].value;
        await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));

        box1.childNodes[1].style.height = box2.childNodes[1].style.height;
        box1.childNodes[0].innerText = box2.childNodes[0].innerText;
        box1.childNodes[1].style.backgroundColor = "#4cbaff";
        box2.childNodes[1].style.backgroundColor = "#4cbaff";
        j = j - 1;
      }
      await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));

      tempArray[j + 1].value = current;
      box1 = document.getElementById(tempArray[j + 1].id);
      box1.childNodes[1].style.height = a;
      box1.childNodes[0].innerText = b;
      // box1.childNodes[1].style.backgroundColor = "#1fbf84";
      for (let k = 0; k <= i; k++) {
        box1 = document.getElementById(tempArray[k].id);
        box1.childNodes[1].style.backgroundColor = "#1fbf84";
      }
      console.log(tempArray.map((item) => item.value));
      await new Promise((resolve) => setTimeout(resolve, 10 * sortingSpeed));
    }
  };

  const refreshBars = () => {
    let box;
    sortingArray.map((item) => {
      box = document.getElementById(item.id);
      box.childNodes[1].style.backgroundColor = "#4cbaff";
      return item;
    });
  };

  return (
    <div className="App bg-dark text-white">
      <MenuAppBar />
      {/* controls */}
      <div className=" m-2 border p-2 rounded">
        <div className="row">
          <div className="col col-2">
            <div className="">
              <select
                id="array-size-selector"
                className="form-select bg-dark text-white"
                aria-label="Array Size"
                value={arraySize}
                onChange={(e) => setArraySize(parseInt(e.target.value, 10))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          <div className="col col-2">
            <div className="">
              <select
                id="array-size-selector"
                className="form-select bg-dark text-white"
                aria-label="Array Size"
                value={sortingType}
                onChange={(e) => setSortingType(parseInt(e.target.value, 10))}
              >
                {constants.sortingTypes.map((item) => (
                  <>
                    <option value={item.value}>{item.sortName}</option>
                  </>
                ))}
              </select>
            </div>
          </div>

          <div className="col col-2">
            <div className="d-flex justify-content-center align-items-center h-100">
              <Slider
                size="small"
                defaultValue={sortingSpeed}
                aria-label="Small"
                valueLabelDisplay="auto"
                value={sortingSpeed}
                onChange={(e) => setSortingSpeed(e.target.value)}
              />
            </div>
          </div>
          <div className="col col-2">
            <Button
              component="label"
              variant="contained"
              startIcon={<ReplayIcon />}
              onClick={() => makeRandomArray(arraySize)}
              fullWidth={true}
            >
              New Array
            </Button>
          </div>
          <div className="col col-1">
            <Button
              component="label"
              variant="contained"
              onClick={(e) => performSort(e)}
              fullWidth={true}
            >
              Sort
            </Button>
          </div>
        </div>
      </div>

      <div className="d-flex flex-center justify-content-center mt-4">
        {sortingArray?.length > 0 &&
          sortingArray.map((item, index) => (
            <div className="m-2" key={index} id={item.id}>
              <div className="item-value text-center">{item.value}</div>
              <div
                className="item-bar"
                style={{ height: `${item.value * 8}px` }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
