import "./App.css";
import MenuAppBar from "./components/Appbar";
import { useEffect, useState } from "react";

function App() {
  //useStates
  const [arraySize, setArraySize] = useState(5);
  const [sortingArray, setSortingArray] = useState([]);

  //useEffects
  useEffect(() => {
    makeRandomArray(arraySize);
  }, [arraySize]);

  //method to handle the size of the sorting array
  const handleArraySizeInput = (event) => {
    let value = event.target.value;
    setArraySize(value);
  };

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

        await new Promise((resolve) => setTimeout(resolve, 1000));
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
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
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
                onChange={(e) => handleArraySizeInput(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>
          <div className="col col-2">
            <button
              className="btn btn-outline-light w-100"
              onClick={(e) => performSort(e)}
            >
              Sort
            </button>
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
