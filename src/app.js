const platformClient = require("purecloud-platform-client-v2");
const {clientId, clientSecret} = require('./config')

const express = require('express')
const app = express()
const port = process.env.PORT || 80

let userId = ''
let skillChecked =''

const client = platformClient.ApiClient.instance;
client.setEnvironment(platformClient.PureCloudRegionHosts.us_east_1);

app.get('/skillChecked', function(req, res){
    client.loginClientCredentialsGrant(clientId,clientSecret)
    .then((data)=> {
        console.log(data.accessToken)
        client.setAccessToken(data.accessToken)
        userId = req.query.id
            skillChecked = req.query.skill
            console.log(userId)
            console.log(skillChecked)
            if(skillChecked=="true"){
                let apiInstance = new platformClient.UsersApi();
                let body = {
                    "id": "cb8856d4-7647-43bf-9d32-c055af95dd70",
                    "proficiency": 0
                }; // Object | Skill

                // Add routing skill to user
                console.log("if block"+skillChecked+" "+userId)
                apiInstance.postUserRoutingskills(userId, body)
                .then((out) => {
                    res.send({
                        output: "Success"
                    })
                })
                .catch((err) => {
                    res.send({
                        output: "Failure"
                    })
                });
            }
            else{
                let apiInstance = new platformClient.UsersApi();
                let skillId = "cb8856d4-7647-43bf-9d32-c055af95dd70"; // String | skillId
                console.log("else block"+skillChecked+" "+userId)
                // Remove routing skill from user
                apiInstance.deleteUserRoutingskill(userId, skillId)
                .then((out) => {
                    res.send({
                        output: "Success"
                    })
                })
                .catch((err) => {
                    res.send({
                        output: "Success"
                    })
                });
            }
        })
})
// function loginClient(){
//     client.loginClientCredentialsGrant(clientId,clientSecret)
//     .then((data)=> {
//         client.setAccessToken(data.accessToken)
//         app.get('/skillChecked', function(req, res){
            
//         })
//     })
//     .catch((err) => {
//         refreshCode()
//     });
// } 


// function refreshCode() {
//     client.loginClientCredentialsGrant(clientId,clientSecret)
//     .then((data)=> {
//         client.setAccessToken(data.accessToken)
//             if(skillChecked=="true"){
//                 let apiInstance = new platformClient.UsersApi();
//                 let body = {
//                     "id": "cb8856d4-7647-43bf-9d32-c055af95dd70",
//                     "proficiency": 0
//                 }; // Object | Skill

//                 // Add routing skill to user
//                 console.log("if block"+skillChecked+" "+userId)
//                 apiInstance.postUserRoutingskills(userId, body)
//                 .then((data1) => {
//                     console.log(data1)
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 });
//             }
//             else{
//                 let apiInstance = new platformClient.UsersApi();
//                 let skillId = "cb8856d4-7647-43bf-9d32-c055af95dd70"; // String | skillId
//                 console.log("else block"+skillChecked+" "+userId)
//                 // Remove routing skill from user
//                 apiInstance.deleteUserRoutingskill(userId, skillId)
//                 .then((data1) => {
//                     console.log(data1)
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 });
//             }
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
//     }

// function skillOperation(){
//     console.log("skillOperation")
// }
// client.loginClientCredentialsGrant(clientId,clientSecret)
// .then((data)=> {
//     client.setAccessToken(data.accessToken)
//     app.get('/skillChecked', function(req, res){
//         const userId = req.query.id
//         const skillChecked = req.query.skill
//         console.log(userId)
//         console.log(skillChecked)
//         if(skillChecked=="true"){
//             let apiInstance = new platformClient.UsersApi();
//             let body = {
//                 "id": "cb8856d4-7647-43bf-9d32-c055af95dd70",
//                 "proficiency": 0
//             }; // Object | Skill

//             // Add routing skill to user
//             console.log("if block"+skillChecked+" "+userId)
//             apiInstance.postUserRoutingskills(userId, body)
//             .then((data1) => {
//                 res.send({
//                     output:"Success"
//                 })
//                 console.log(data1)
//             })
//             .catch((err) => {
//                 res.send({
//                     output:"Failure"
//                 })
//                 console.log(err)
//             });
//         }
//         else{
//             let apiInstance = new platformClient.UsersApi();
//             let skillId = "cb8856d4-7647-43bf-9d32-c055af95dd70"; // String | skillId
//             console.log("else block"+skillChecked+" "+userId)
//             // Remove routing skill from user
//             apiInstance.deleteUserRoutingskill(userId, skillId)
//             .then((data1) => {
//                 res.send({
//                     output:"Success"
//                 })
//                 console.log(data1)
//             })
//             .catch((err) => {
//                 res.send({
//                     output:"Failure"
//                 })
//                 console.log(err)
//             });
//         }
//   })
// })
// .catch((err) => {
//  console.log(err);
// });

// app.get('/transferAnotherQueue', function(req, res){
//     const interactionID = req.query.interactionID
//     const queueName = req.query.queueName
//     getParticipantID(interactionID, platformClient, function(error, data){
//         try{
//             let participantID = data.participantID
//             getQueueID(queueName, platformClient, function(error, data){
//                 try{
//                     const queueID = data.queueID
//                     let body = {
//                         "userId": "",
//                         "address": "",
//                         "userName": "",
//                         "queueId": queueID,
//                         "voicemail": false
//                     };
//                     postReplaceInteraction(interactionID, participantID, body, platformClient, function(error, data){
//                         try{
//                             res.send({
//                                 "output": data.output
//                             })
//                         }catch(e){
//                             res.send({
//                                 error:error
//                             })
//                         }
//                     })
//                 }catch(e){
//                     res.send({
//                         error : error
//                     })
//                 }
//             })
            
//         }
//         catch(e){
//             res.send({
//                 error : error
//             })
//         }
//     })
// })

app.listen(port,function(){
    console.log('server is running on port '+port)
})