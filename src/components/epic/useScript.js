import {useEffect} from 'react';

const useScript = function (file){
    useEffect(() =>{
        console.log("load ", file)
        const script = document.createElement('script')
        script.src = file
        document.body.appendChild(script)
    }, [file])
}

export {useScript};