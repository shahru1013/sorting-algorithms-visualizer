/* Author: shahru islam 
   date : 08-30-2021
 */
import * as types from './types';
const initialState = {
    running : false,
    algoName:''
}
const dataReducer = (state=initialState,action)=>{
    let newData = {...state};
    if(action.type==="running"){
        newData.running=action.payload.data;
    }
    if(action.type==="algoName"){
        newData.algoName=action.payload.data+" Sort";
    }
    return newData;
}
export default dataReducer;