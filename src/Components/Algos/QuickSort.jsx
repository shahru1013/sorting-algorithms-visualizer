import React,{useEffect,useRef} from 'react';
import {useHistory} from 'react-router-dom';
import {setRunning} from '../../Redux/Distribution/action';
import {connect} from 'react-redux';
import {pauseTime,onAudio,offAudio} from '../../Methods/PauseTime';
import {makeColor,swap,colorAllSorted, reverseColor} from '../../Methods/Coloring';
function QuickSort({isRunning,setRunning, delay,temp}) {
    let history = useHistory();
    let speedDelay = useRef(1000-(delay*10));
    useEffect(()=>{
       speedDelay.current = 1000-(delay*10);
    },[delay]);
    useEffect(()=>{
          startSorting();
    },[temp]);

    // partition 
    let partition=async (elems,low,high)=>{
     return new Promise(async (resolve)=>{
       console.log(low,high," haha ")
       let commonClr = "#b4f8b5";
        let ind = low;
        makeColor(elems[high],"red");
        makeColor(elems[low],"red");
        for(let i=low;i<=high-1;i++){
            // iteration color
            if(i!=ind && i!=low) makeColor(elems[i],"green");
            pauseTime(speedDelay.current);
            if(i-1 >=0 && elems[i-1].style.backgroundColor=="green") makeColor(elems[i-1],commonClr);
            if(elems[high-1].style.backgroundColor=="green") makeColor(elems[high-1],commonClr);     
            let lowHeight = parseInt(elems[i].style.height),
                highHeight = parseInt(elems[high].style.height);
            if(lowHeight>highHeight){
                await onAudio();
                if(low !=ind) makeColor(elems[ind],commonClr);
                swap(elems[ind],elems[i]);
                ind++;
                pauseTime(speedDelay.current);
                if(low !=ind)makeColor(elems[ind],"tomato");
                await offAudio();
            }
            await pauseTime(speedDelay.current)
        }
        makeColor(elems[ind],commonClr)
        makeColor(elems[high],commonClr);
        makeColor(elems[low],commonClr);
        swap(elems[high],elems[ind]);
        resolve(ind);
    })
    }
    
    //quick sort
    let quickSort= async (elems,low,high)=>{
        if(low<high){
           
            await partition(elems,low,high).then(async (pivot)=>{
            await quickSort(elems,low,pivot-1);
            //await pauseTime(speedDelay.current)
            await quickSort(elems,pivot+1,high);
           });
        }
    }

    const startSorting=async ()=>{
        let allElem = document.querySelectorAll('.rod');
        if(!isRunning){
            history.push('/');
        }
        // main algo
        await quickSort(allElem,0,allElem.length-1);
        await setRunning(false);
        await colorAllSorted(allElem,allElem.length-1);
        await reverseColor(allElem);
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
export default connect(mapStateToProps,mapDispatchToProps)(QuickSort);