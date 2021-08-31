import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {setRunning} from '../../Redux/Distribution/action';
import {connect} from 'react-redux';
import {pauseTime,onAudio,offAudio} from '../../Methods/PauseTime';
import {makeColor,swap,colorAllSorted,frontColor} from '../../Methods/Coloring';
function InsertionSort({isRunning,setRunning, delay,temp}) {
    let history = useHistory();
    let speedDelay = useRef(1000-(delay*10));
    useEffect(()=>{
       speedDelay.current = 1000-(delay*10);
    },[delay]);
    useEffect(()=>{
          startSorting();
          console.log(temp)
    },[temp]);
    const startSorting=async ()=>{
        let allElem = document.querySelectorAll('.rod');
        if(!isRunning){
            history.push('/');
        }
        // main algo
        for(let i=1;i<allElem.length;i++){
            let commonClr = "#b4f8b5";
            makeColor(allElem[i],"red");
            await pauseTime(speedDelay.current);
            let startElemHeight = parseInt(allElem[i].style.height);
            let j = i-1;
            let key = allElem[i].style.height;
            let prev  = i;
            while(j>=0){
                let currentElemHeight = parseInt(allElem[j].style.height)
                if(currentElemHeight > startElemHeight ){
                    await onAudio();
                     prev = j+1;
                     makeColor(allElem[j+1],"green");
                     swap(allElem[j+1],allElem[j]);
                     makeColor(allElem[j],"red")
                     await offAudio();
                     await pauseTime(speedDelay.current);
                 }
                 j--;
            }
            colorAllSorted(allElem,i);

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
export default connect(mapStateToProps,mapDispatchToProps)( InsertionSort);