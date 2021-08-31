/* Author: shahru islam 
   date : 08-30-2021
 */
import React, { useState } from "react";
import {Switch,Route,useHistory} from 'react-router-dom';
import {connect} from 'react-redux';
import style from "./body.module.css";
import '../Algos/style.css';
import SelectionSort from "../Algos/SelectionSort";
import QuickSort from "../Algos/QuickSort";
import {generateRandArra} from '../../Methods/GenetateArra';
import InsertionSort from "../Algos/InsertionSort";
import {setRunning,setAlgoName} from '../../Redux/Distribution/action';
import BubbleSort from "../Algos/BubbleSort";
import CocktailSort from "../Algos/CocktailSort";
function Body({isRunning,name,setRunning,setAlgoName}) {
  const history = useHistory();
  const [ctrlStatus, setCtrlStatus] = useState(false);
  const [originalArra, setOAr] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [tempCount,setTempCount] = useState(0);
  useState(()=>{
    let initialSize = 50;
    generateRandArra(initialSize).then((newArr)=>{
        let tempAr = [...newArr];
        setOAr(tempAr);
        setRunning(false);
    });
  },[]);
  //generate random arra
  const generateArra=(e)=>{
    generateRandArra(e.target.value).then((newArr)=>{
        let tempAr = [...newArr];
        setOAr(tempAr);
    });
  }  
  //controll speed of animation
  const controlSpeed=(e)=>{
     setSpeed(e.target.value)
  }       
 // handle link click  
 const handleClick=(e,name)=>{
    if(isRunning) e.preventDefault();
    else{
        setRunning(true);
        setAlgoName(name);
        setTempCount(tempCount+1);
        history.push(`${name}-sort`)

    }
 }


  return (
    <div className={style.bd_0}>
      <div className={style.bd_1}>
        <div className={style.nav_0}>
          <div className={(style.arra_ctrl, style.ctrl)}>
            <span className={style.s_tx}>Size: </span>
            <input
              className={style.controller}
              type="range"
              min={10}
              max={80}
              disabled={ctrlStatus}
              onChange={(e)=>generateArra(e)}
              disabled={isRunning}
            />
          </div>
          <div className={style.logo}>
            <h1>SORTVIz</h1>
          </div>
          <div className={(style.speeed_ctrl, style.ctrl)}>
            <span className={style.s_tx}>Speed: </span>{" "}
            <input
              className={style.controller}
              type="range"
              min={10}
              max={100}
              value={speed}
              disabled={ctrlStatus}
              onChange={(e)=>controlSpeed(e)}
            />
          </div>
        </div>
        <div className={style.main_sec_0}>
          <div className={style.main_left}>
              <div className={style.algo_list}>
                  <ul>
                      <li><button onClick={(e)=>handleClick(e,"Selection")} className={style.btn}>Selection Sort</button></li>
                      <li><button onClick={(e)=>handleClick(e,"Insertion")} className={style.btn} >Insertion Sort</button></li>
                      <li><button onClick={(e)=>handleClick(e,"Quick")} className={style.btn}>Quick Sort</button></li>
                      <li><button onClick={(e)=>handleClick(e,"Cocktail")} className={style.btn}>Cocktail Sort</button></li>
                      <li><button onClick={(e)=>handleClick(e,"Bubble")} className={style.btn}>Bubble Sort</button></li>
                  </ul>
              </div>
          </div>
          <div className={style.responsive_list}>
               <select onChange={(e)=>{handleClick(e,e.target.value)}} disabled={isRunning}>
                   <option>Select Algorithm</option>
                   <option value="Selection"> Selection Sort </option>
                   <option value="Insertion"> Insertion Sort </option>
                   <option value="Cocktail"> Cocktail Sort </option> 
                   <option value="Quick"> Quick Sort </option>
                    <option value="Bubble">bubble Sort </option>
               </select>
          </div>
          <div className={style.main_right}>
             {/* <SelectionSort array={originalArra} delay={speed} start={isStart}/> */}
              <Switch>
                  <Route exact path="/selection-sort">
                    <SelectionSort delay={speed} temp={tempCount}/>
                  </Route>
                  <Route exact path="/insertion-sort">
                    <InsertionSort delay={speed} temp={tempCount}/>
                  </Route>
                  <Route exact path="/quick-sort">
                    <QuickSort delay={speed} temp={tempCount}/>
                  </Route>
                  <Route exact path="/bubble-sort">
                    <BubbleSort delay={speed} temp={tempCount}/>
                  </Route>
                  <Route exact path="/cocktail-sort">
                    <CocktailSort delay={speed} temp={tempCount}/>
                  </Route>
              </Switch>
              <div className="items-0">
               <div className="items">
               {
               originalArra.map((val)=>{
                   return(
                    <div className="rod" style={{height:`${((window.innerHeight-250)/100)*val}px`,width:`${window.innerWidth>900?(window.innerWidth/2.2)/originalArra.length:(window.innerWidth/1.3)/originalArra.length}px`}}></div>
                   );
               })
              }
            </div>            
        </div>
        <h1 className="title">{name}</h1> 
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      isRunning: state.dataReducer.running,
      name:state.dataReducer.algoName
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setRunning: (data) => dispatch(setRunning(data)),
      setAlgoName:(data)=>dispatch(setAlgoName(data)),
    };
  };

export default connect(mapStateToProps,mapDispatchToProps)(Body);