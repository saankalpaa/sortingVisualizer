import React, { useEffect, useState } from 'react';
import {getMergeSortAnimations} from '../Algorithms/MergeSortAlgo.js';
import { getQuickSortAnimations } from "../Algorithms/QuickSortAlgo";
import { doQuickSort } from "../Algorithms/QuickSortAlgo";
import { quickSortPartition } from "../Algorithms/QuickSortAlgo";
import { getBubbleSortAnimations } from "../Algorithms/BubbleSortAlgo";
import './SortingVisualizer.css';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png'

const useStyles1 = makeStyles({
  root1: {
      width: 250,
  },
  input: {
      width: 42,
  },
});


const SortingVisualizer = () => {
  
  const [speed, setSpeed] = useState(100);

  const [currentAlgo,setCurrentAlgo] = useState('');

  const [value, setValue] = useState(30);

  const [width, setWidth] = useState(80 / 30);

  const classes1 = useStyles1();

  const [array,setArray] = useState([]);

  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    resetArray()
  },[])

  const  resetBars = () => {
    console.log("Reset Bars");
    const arrayBars = document.getElementsByClassName("array-bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = "#248277";
    }
  }

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < value; i++) {
      array.push(randomIntfromInterval(100, 600));
    }
    resetBars();
    setArray(array);
  }
  
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    setWidth(80 / value);
    resetArray();
  };

  const  makeAllBarsTurquoise = () => {
    console.log("Sorted");
    const arrayBars = document.getElementsByClassName("array-bar");
    var arrayLength = arrayBars.length;
    for (let j = 0; j < arrayLength; j++) {
      var jBarStyle = arrayBars[j].style;
      jBarStyle.backgroundColor = "#248277";
    }
  }

  const mergeSort = () => {
    const animations = getMergeSortAnimations(array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [oldPosition, newPosition] = animations[i];
        const oldBarStyle = arrayBars[oldPosition].style;
        const newBarStyle = arrayBars[newPosition].style;
        const color = i % 3 === 0 ? "#ed1c24" : "turquoise";
        setTimeout(() => {
          oldBarStyle.backgroundColor = color;
          newBarStyle.backgroundColor = color;
        }, i * speed);
      } else {
        setTimeout(() => {
          const [oldPosition, newHeight] = animations[i];
          const oldBarStyle = arrayBars[oldPosition].style;
          oldBarStyle.height = `${newHeight}px`;
          if (i === animations.length - 1) {
            makeAllBarsTurquoise();
            setIsRunning(true)
          }
        }, i * speed);
      }
    }
  }


  const quickSort = () => {
    setIsRunning(!isRunning);
    const animations = getQuickSortAnimations(array);
    console.log(animations);
    const arrayBars = document.getElementsByClassName("array-bar");

    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        var [oldPosition, newPosition] = animations[i];

        var oldBarStyle = arrayBars[oldPosition].style;
        var newBarStyle = arrayBars[newPosition].style;
        var index;
        const dummyAnimations = [];
        if (array.length > 1) {
          index = quickSortPartition(
            array,
            0,
            array.length - 1,
            dummyAnimations
          ); 
          if (0 < index - 1) {
            doQuickSort(dummyAnimations, array, 0, index - 1);
          }
          if (index < array.length) {
            doQuickSort(dummyAnimations, array, 0, array.length - 1);
          }
        }

        oldBarStyle.height = `${array[oldPosition]}px`;
        newBarStyle.height = `${array[newPosition]}px`;

        oldBarStyle.backgroundColor = "turquoise";
        newBarStyle.backgroundColor = "#ed1c24";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "turquoise";
        }
        if (i === animations.length - 1) {
          makeAllBarsTurquoise();
          setIsRunning(true)
        }
      }, i*speed);
    }     
  }

  const bubbleSort = () => {
    setIsRunning(!isRunning);
    const animations = getBubbleSortAnimations(array);
    const arrayBars = document.getElementsByClassName("array-bar");
    console.log("arrayBars: " + arrayBars)
    for (let i = 0; i < animations.length; i++) {
      setTimeout(() => {
        var [oldPosition, newPosition] = animations[i];

        var oldBarStyle = arrayBars[oldPosition].style;
        var newBarStyle = arrayBars[newPosition].style;

        var temp = array[oldPosition];
        array[oldPosition] = array[newPosition];
        array[newPosition] = temp;

        oldBarStyle.height = `${array[oldPosition]}px`;
        newBarStyle.height = `${array[newPosition]}px`;

        oldBarStyle.backgroundColor = "#ed1c24";
        newBarStyle.backgroundColor = "turquoise";

        var currentPosition = oldPosition;
        for (let j = 0; j < currentPosition; j++) {
          var jBarStyle = arrayBars[j].style;
          jBarStyle.backgroundColor = "#ed1c24";
        }
        if (i === animations.length - 1) {
          makeAllBarsTurquoise();
          setIsRunning(true)
        }
      }, i * speed);
    }
  }

  const handleAlgo = (event) => {
    console.log('before:' + event.target.id)
    setCurrentAlgo(event.target.id)
    console.log('after:' + currentAlgo)

  }

  const sort = (algo) => {
    if (algo == ""){
      alert('choose an algorithm first!!')
    }
    else if(algo == "Merge"){
      mergeSort()
    }
    else if(algo == "Quick"){
      quickSort()
    }
    else if(algo == "Bubble"){
      bubbleSort()
    }
  }

  const handleSpeed = (changedSpeed) => {
    setSpeed(changedSpeed)
    console.log('speed :' + speed)
  }

    return (
      <div className="container">
        <nav>
          <div className="logo">
            <img src={logo} alt="logo"/>
          </div>
          <div className="nav-right">
            <div className="reset-btn">
              <button 
                onClick={isRunning ? () => resetArray() : null}
                style = {{ color: isRunning? "white": "#ed1c24", pointerEvents: isRunning ? "auto" : "none"}}
                >
                Generate New Array
              </button>
            </div>
            <div className="dropdown">
              <button style = {{ color: isRunning? "white": "#ed1c24", pointerEvents: isRunning ? "auto" : "none"}} className="dropbtn">Speed</button>  
              <div className="dropdown-content">
                <a href="#" onClick={isRunning ? () => handleSpeed(500) : null}>1x</a>
                <a href="#" onClick={isRunning ? () => handleSpeed(50)  : null}>2x</a>
                <a href="#" onClick={isRunning ? () => handleSpeed(25)  : null}>4x</a>
              </div>
            </div>
            <div className="dropdown">
              <button style = {{ color: isRunning? "white": "#ed1c24", pointerEvents: isRunning ? "auto" : "none"}} className="dropbtn">Algorithms</button>
              <div className="dropdown-content">
                <a id="Merge" href="#" onClick={handleAlgo}>Merge Sort</a>
                <a id="Quick" href="#" onClick={handleAlgo}>Quick Sort</a>
                <a id="Bubble" href="#" onClick={handleAlgo}>Bubble Sort</a>
              </div>
            </div>
            <div className="range-slider">
              <div className={classes1.root1}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Typography className="slider-title" style={{ color: isRunning? "white" : "#ed1c24", fontSize: "18px", fontFamily: "Bebas Neue"}}>Adjust Array Size</Typography>
                    </Grid>
                    <Grid item xs>
                        <Slider
                          value={typeof value === 'number' ? value : 0}
                          onChange={handleSliderChange}
                          aria-labelledby="input-slider"
                          color="secondary"
                          min={10}
                          max={80}
                          style={{color: isRunning ? "#248277" :"#ed1c24"}}
                          disabled={isRunning ? null : "disabled"}
                        />
                    </Grid>
                  </Grid>
              </div>
            </div>
            <button   
            className = "sortBtn" 
            onClick={isRunning ? () => sort(currentAlgo) : null}
            style = {{ background: isRunning? "#248277": "#ed1c24", pointerEvents: isRunning ? "auto" : "none"}}
            >
              {currentAlgo} Sort
            </button>
          </div>
        </nav>
        <div className="array-container">
          <div className="array-holder">
              {
                array.map((value, idx) => (
                  <div className="array-bar" key={idx} style={{ height: `${value}px`, width: `${width}%`, fontSize: `${width * 20}%`}}></div>
                ))
              }
          </div>
        </div>
               
      </div>
    );
}

export default SortingVisualizer;


function randomIntfromInterval(start, end) {
  return Math.floor(Math.random() * (start - end + 1) + end);
}