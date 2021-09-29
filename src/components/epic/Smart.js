// 29 SEP 2021 TRAN MINH HAI
// Check ready
window.FHIR.oauth2.ready().then(function (client) {
    console.log(client)
})
// Get patient information
window.FHIR.oauth2.ready().then(function (client) {
    client.patient.read().then(
        function (pt) {
            console.log(JSON.stringify(pt, null, 4))
        },
        function (error) {
           console.log(error.stack)
        }
    )
})

