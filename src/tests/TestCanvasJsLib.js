import React from "react"
import { useEffect, useState } from "react"
import { fetchAllNumericalCtgsByDoctorID, fetchCtgNumericalsByDoctorID } from "../services/GraqphqlCtgNumericalService"
import { CtgNumericalService } from "../services/UserSessionService"
import CanvasJSReact from './../canvasjs/canvasjs.react'

const TestCanvasJSLib = () => {

    const numBucket = 10
    const bucketSize = 10 
    const [lostByBucket, setLostByBucket] = useState(new Array(numBucket).fill(10))
    const [lostCummulative, setLostCummunlative] = useState(new Array(numBucket).fill(100.0))
    const [lostCummulativePercentage, setLostCummunlativePercentage] = useState(new Array(numBucket).fill(100.0))
    var CanvasJS = CanvasJSReact.CanvasJS
    var CanvasJSChart = CanvasJSReact.CanvasJSChart

    const lostBuckets = [...Array(numBucket).keys()].map((value) => {
        return {"begin":value * bucketSize, "end":bucketSize * value + bucketSize}
    })


    const dataPoints = lostBuckets.map((value,index) => {
        return {label: value["begin"].toString() + "-" + value["end"].toString(), y: lostByBucket[index]}
    })

    const dataPointsCum = lostBuckets.map((value,index) => {
        return {label: value["begin"].toString() + "-" + value["end"].toString(), y: lostCummulative[index]}
    })

    const dataPointsCumPercentage = lostBuckets.map((value,index) => {
        return {label: value["begin"].toString() + "-" + value["end"].toString(), y: lostCummulativePercentage[index]}
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
        data: [
            {				
                type: "column",
                dataPoints: dataPoints
            },
        ]
     }

     const optionsCum = {
        title: {
          text: "Cummulative By FHR Lost"
        },
        axisY:{
            title: "Cummulative"
        },
        axisX:{
            title: "FHR lost (%)"
        }, 
        data: [
            {				
                type: "column",
                dataPoints: dataPointsCum
            },
            {
                type:"spline",
                dataPoints: dataPointsCum
            }
                
            ]
     }

     const optionsCumPercentage = {
        title: {
          text: "Cummulative By FHR Lost"
        },
        axisY:{
            title: "Cummulative"
        },
        axisX:{
            title: "FHR lost (%)"
        }, 
        data: [
            {				
                type: "column",
                dataPoints: dataPointsCumPercentage
            },
            {
                type:"spline",
                dataPoints: dataPointsCumPercentage
            }
                
            ]
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
            var cum = Array(numBucket).fill(0)
            var cumPercentage = Array(numBucket).fill(0)
            // loop through each bucket and count how many record in this bucket 
            for(var i =0; i < numBucket; i++){
                count = 0
                for(var j =0; j < lostArray.length; j++){
                    if ((lostArray[j] < lostBuckets[i]['end']) && (lostArray[j] > lostBuckets[i]['begin'])){
                        count = count + 1
                    }
                }
                buckets[i] = count
                cum[i] = buckets.reduce((a,b) => a+b,0)
                cumPercentage[i] = cum[i]/lostArray.length*100.0
                console.log("bucket ", i, " length ", count, " cum ", cum[i])
                // cummlative percentage 
            }
            setLostByBucket(buckets)
            setLostCummunlative(cum)
            setLostCummunlativePercentage(cumPercentage)
        }
        // calcluate 
    }

    useEffect(() => {
        
        fetchAllNumericalCtg()

    }, [])

    return (
       <div>
           <CanvasJSChart options = {optionsCumPercentage}/>
           <CanvasJSChart options = {optionsCum}/>
           <CanvasJSChart options = {options}/>
       </div>

    )
}

export {TestCanvasJSLib}