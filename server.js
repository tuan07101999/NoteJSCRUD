const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
let AWS = require('aws-sdk');
const {query} = require('express');
const { IdentityStore } = require('aws-sdk');
AWS.config.update({
    "region": "ap-southeast-1",
    "accessKeyId": "AKIARSTLBTLWORENMR3H",
    "secretAccessKey":"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"
});

let docClient = new AWS.DynamoDB.DocumentClient();
let table = "demoGK";

function getAll(callback){
    var params = {
        TableName: table
    };
    docClient.scan(params, onScan);

    function onScan(err,data){
        if(err){
            callback({ message:err });
        }
        else{
            callback(data);
        }
    }
}

function CreateNEW(param,callback){
    var params = {
        TableName: table,
        Item:param
    }
    docClient.put(params, function(err,data){
        if(err){
            callback({message :err});
        }else{
            callback(data);
        }
    });
}

function DeleteSV(param, callback) {
    var params = {
        TableName: table,
        Key: {
            "id": param.id
        }
    };
    docClient.delete(params, function(err, data) {
        if (err) {
            callback({ message: err })
        } else {
            callback({ message: "Delete success user: " });
        }
    });
}

function getItem(param, callback) {
    var params = {
        TableName: table,
        Key: {
            "id": param.id
        }
    }
    docClient.get(params, function(err, data) {
        if (err) {
            callback({ message: err });
        } else {
            callback(data.Item);
        }
    })
}

module.exports = {
    getAll,
    CreateNEW,
    DeleteSV,
    getItem
}
