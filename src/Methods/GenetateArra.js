export let generateRandArra=(sz)=>{
     return new Promise((resolve)=>{
        let temp = new Set();
        for(let i=1;i<=2000;i++){
            let val = Math.floor(Math.random() * (100 - 5 + 1)) + 5;
            temp.add(val);
           // console.log(i+' i '+sz+' '+temp.size)
            if(temp.size == sz){
                resolve(temp);
                return;
            }
        }
     })
}