import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {setRunning} from '../../Redux/Distribution/action';
import {connect} from 'react-redux';
import {pauseTime,onAudio,offAudio} from '../../Methods/PauseTime';
import {makeColor,swap,colorAllSorted,reverseColor} from '../../Methods/Coloring';
function SelectionSort({isRunning,setRunning, delay,temp}) {
    let history = useHistory();
    let speedDelay = useRef(1000-(delay*10));
    useEffect(()=>{
       speedDelay.current = 1000-(delay*10);
    },[delay]);
    useEffect(()=>{
          startSorting();
          
    },[temp]);
    const startSorting=async ()=>{
        let allElem = document.querySelectorAll('.rod');
        if(!isRunning){
            history.push('/');
        }
        for(let i=0;i<allElem.length;i++){
            if(!isRunning){
                break;
            }
             makeColor(allElem[i],"red");
             let min = i;
             let prev = i;
             let startElemHeight = parseInt(allElem[i].style.height);
             for(let j=i+1;j<allElem.length;j++){
               let currentElemHeight = parseInt(allElem[j].style.height)
               makeColor(allElem[j],"tomato");
               if(j>i+1 && allElem[j-1].style.backgroundColor!=="green"){
                makeColor(allElem[j-1],"#b4f8b5");
               
               }
               if(startElemHeight > currentElemHeight){
                  startElemHeight =  currentElemHeight;
                  makeColor(allElem[j],"green");
                  prev = min;
                  min=j;
                  if(prev !=i){
                    makeColor(allElem[prev],"#b4f8b5");
                  }
               }
               await pauseTime(speedDelay.current)
            }
            await onAudio();
            await pauseTime(speedDelay.current)
            swap(allElem[i],allElem[min]);
            makeColor(allElem[allElem.length-1],"#b4f8b5");
            makeColor(allElem[min],"#b4f8b5");
            colorAllSorted(allElem,i);
            await offAudio();
            
        }
        reverseColor(allElem);
        setRunning(false);
    }
    return (
        <>
        </>
    );
}
const mapStateToProps = (state) => {
    return {
      isRunning: state.dataReducer.running,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      setRunning: (data) => dispatch(setRunning(data)),
    };
  };
export default connect(mapStateToProps,mapDispatchToProps)(SelectionSort);