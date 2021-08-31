export const pauseTime = (ms) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    });
}

export const onAudio=async ()=>{
    await new Audio('/Audio/beep.mp3').play();
}
export const offAudio=async ()=>{
    await new Audio('/Audio/beep.mp3').pause();
}