import React,{useState,useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {setRunning} from '../../Redux/Distribution/action';
import {connect} from 'react-redux';
import {pauseTime,onAudio,offAudio} from '../../Methods/PauseTime';
import {makeColor,swap,colorAllSorted,frontColor} from '../../Methods/Coloring';
function CocktailSort({isRunning,setRunning, delay,temp}) {
    let history = useHistory();
    let speedDelay = useRef(1000-(delay*10));
    useEffect(()=>{
       speedDelay.current = 1000-(delay*10);
    },[delay]);
    useEffect(()=>{
          startSorting();
    },[temp]);


    //main algo
    const startCocktail=async (elems,length)=>{
        let swaped = true,
            start = 0,
            end = length-1,
            commonClr = "#b4f8b5";
        
         while(swaped){
             swaped=false;
             
             for(let i=start;i<end;i++){
                makeColor(elems[i],"tomato");
                makeColor(elems[i+1],"green");
                await pauseTime(speedDelay.current);
                let startElemHeight = parseInt(elems[i].style.height),
                    nextElemHeight = parseInt(elems[i+1].style.height);
                if(startElemHeight>nextElemHeight){
                    await onAudio();
                    swap(elems[i],elems[i+1]);
                    swaped = true;
                }
                await pauseTime(speedDelay.current);
                await offAudio();
                makeColor(elems[i],commonClr);
             }
             end--;
             if(!swaped) return;
               
             swaped = false;
             for(let i=end-1;i>=start;i--){
                makeColor(elems[i],"tomato");
                makeColor(elems[i+1],"green");
                await pauseTime(speedDelay.current);
                let startElemHeight = parseInt(elems[i].style.height),
                    nextElemHeight = parseInt(elems[i+1].style.height);
                if(startElemHeight>nextElemHeight){
                    await onAudio();
                    swap(elems[i],elems[i+1]);
                    swaped = true;
                }
                await pauseTime(speedDelay.current);
                await onAudio();
                makeColor(elems[i+1],commonClr);

             }
             start++;


         }

    }

    const startSorting=async ()=>{
        let allElem = document.querySelectorAll('.rod');
        if(!isRunning){
            history.push('/');
        }

       await startCocktail(allElem,allElem.length);
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
export default connect(mapStateToProps,mapDispatchToProps)(CocktailSort);