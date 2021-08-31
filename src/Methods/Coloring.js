// selection sort
import {pauseTime} from '../Methods/PauseTime';
export const makeColor=(elem,color)=>{
   elem.style.backgroundColor = color;
}
export const swap=(start,min)=>{
    let startHeight = parseInt(start.style.height);
    let minHeight = parseInt(min.style.height);
    start.style.height=`${minHeight}px`;
    min.style.height=`${startHeight}px`;
}
export const colorAllSorted=(allElem,i)=>{
    for(let k=i;k>=0;k--){
        allElem[k].style.backgroundColor="green";
    }
}
export const reverseColor=async (allElem)=>{
    for(let k=allElem.length-1;k>=0;k--){
        allElem[k].style.backgroundColor="#b4f8b5";
        allElem[k].style.transform="scale(1.1)";
        await pauseTime(20);
        allElem[k].style.transform="scale(1)";
    }
   // allElem[0].style.transform="scale(1)";
}
export const frontColor=async (allElem)=>{
    for(let k=0;k<allElem.length;k++){
        allElem[k].style.backgroundColor="#b4f8b5";
        allElem[k].style.transform="scale(1.1)";
        await pauseTime(20);
        allElem[k].style.transform="scale(1)";
    }
   // allElem[0].style.transform="scale(1)";
}
