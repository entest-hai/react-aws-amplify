import React from "react"
import { useEffect, useState } from "react"
import { fetchAllNumericalCtgsByDoctorID, fetchCtgNumericalsByDoctorID } from "../services/GraqphqlCtgNumericalService"
import { CtgNumericalService } from "../services/UserSessionService"
import CanvasJSReact from './../canvasjs/canvasjs.react'

const TestCanvasJSLib = () => {

    const numBucket = 10
    const bucketSize = 10 
    const [lostByBucket, setLostByBucket] = useState(new Array(numBucket).fill(10))
    var CanvasJS = CanvasJSReact.CanvasJS
    var CanvasJSChart = CanvasJSReact.CanvasJSChart

    const lostBuckets = [...Array(numBucket).keys()].map((value) => {
        return {"begin":value * bucketSize, "end":bucketSize * value + bucketSize}
    })


    const dataPoints = lostBuckets.map((value,index) => {
        return {label: value["begin"].toString() + "-" + value["end"].toString(), y: lostByBucket[index]}
    })


    const options = {
        title: {
          text: "Count By FHR Lost"
        },
        axisY:{
            title: "numer of record"
        },
        axisX:{
            title: "FHR lost (%)"
        }, 
        data: [{				
                  type: "column",
                  dataPoints: dataPoints
         }]
     }

    const fetchAllNumericalCtg = async () => {
        let records = CtgNumericalService.getCtgNumericals()
        if (records == null){
            console.log("need to fech from db now")   
            records = await fetchAllNumericalCtgsByDoctorID(200)
        } else {
            // get array of lost
            const lostArray = records.map((record) => {
                return record['lost'] ? parseFloat(record['lost']) : 100.0
            })
            console.log(lostArray)
            // device array lost into buckets and count 
            var count = 0 
            // init bins 
            var buckets = Array(numBucket).fill(0)
            for(var i =0; i < numBucket; i++){
                for(var j =0; j < lostArray.length; j++){
                    if ((lostArray[j] < lostBuckets[i]['end']) && (lostArray[j] > lostBuckets[i]['begin'])){
                        count = count + 1
                    }
                }
                console.log("bucket ", i, " length ", count)
                buckets[i] = count
            }
            setLostByBucket(buckets)
        }
        // calcluate 
    }

    useEffect(() => {
        
        fetchAllNumericalCtg()

    }, [])

    return (
        <CanvasJSChart options = {options}/>
    )
}

export {TestCanvasJSLib}