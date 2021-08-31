import * as types from './types';

export const setRunning = (val)=>{
    return{
        type:"running",
        payload:{
            data:val
        },
    };
}

export const setAlgoName=(name)=>{
    return{
        type:"algoName",
        payload:{
            data:name
        },
    };
}
