'use strict';

// Models
var sequences = require('../models/sequences');
var users = require('../models/users');

module.exports = {getNextSequenceValue: getNextSequenceValue,
                  getSuccessResponse:getSuccessResponse,
                  getErrorResponse:getErrorResponse,
                  checkToken:checkToken};

function getNextSequenceValue(sequenceName){
    return sequences.findOneAndUpdate({ "_id" : sequenceName }, {$inc:{sequence_value:1}},{returnOriginal: false});
}

function checkToken(token){

    return users.aggregate([
        {
            $lookup:
                {
                    from: "tokens",
                    localField: "userId",
                    foreignField: "userId",
                    as: "connections"
                }
        },
        {$match: {
            $or: [ { "connections.token": token}]}},
        { $project: {
            "_id": 0,
            "userId": 1
        }
        }
    ]).exec(function(err, resp){
        if (err) {
            console.error('@Error: ', err);
        }else{
            if (resp.length === 0){
                console.log('@Info: token not found');
            }else{
                console.log('@Info: idUSer = ', resp[0].userId);
            }
        }
    });
}

function getSuccessResponse(object){

    return {"success": true, "response": object, "errors": []};
}

function getErrorResponse(errors){

    return {"success": false, "response": {}, "errors": errors};
}
