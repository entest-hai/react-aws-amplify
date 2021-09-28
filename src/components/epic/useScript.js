//=====================================================================================================================
// Purpose: Load fhir-script.js which is a lib for doing things with FHIR
// Author: TRAN MINH HAI
// Date: 28 SEP 2021
//********************************************************************************************************************/
// Update |  Date             | Author             | Content
//********************************************************************************************************************/
// 001.   |  23 AUG 2021.     | TRAN MINH HAI      | - Refactor and add header
// 28 SEP 2021 add MyChartAuth to do oauth2 with EPIC MyChart
// need to load fhir-script.js and it will get username, pass from screen
// it also get the return token or code from redirected url.
//=====================================================================================================================

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