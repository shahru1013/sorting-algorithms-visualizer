import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {setRunning} from '../../Redux/Distribution/action';
import {connect} from 'react-redux';
import {pauseTime,onAudio,offAudio} from '../../Methods/PauseTime';
import {makeColor,swap,colorAllSorted,frontColor} from '../../Methods/Coloring';
function BubbleSort({isRunning,setRunning, delay,temp}) {
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
        // main algo
        for(let i=0;i<allElem.length-1;i++){
            let commonClr = "#b4f8b5";
            for(let j=0;j<allElem.length-i-1;j++){
                makeColor(allElem[j],"tomato");
                makeColor(allElem[j+1],"green");
                await pauseTime(speedDelay.current);
                let startElemHeight = parseInt(allElem[j].style.height),
                    currentElemHeight = parseInt(allElem[j+1].style.height);
                if(startElemHeight > currentElemHeight){
                    await onAudio();
                    swap(allElem[j],allElem[j+1]);
                }
                await pauseTime(speedDelay.current);
                await offAudio();
                makeColor(allElem[j],commonClr);
            }
            

        }
        frontColor(allElem);
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
export default connect(mapStateToProps,mapDispatchToProps)(BubbleSort);