'use strict';

const CODES ={
    PROGRAM_ERROR:0,
    NOT_FOUND:1,
    INSERT_OK:2,
    NOT_INSERTED:3,
    ALREADY_IN_USE:4,
    DELETE_OK:5,
    NOT_DELETED:6,
    UPDATE_OK:7,
    NOT_UPDATED:8,
    KEYS_DO_NOT_MATCH:9
};

const TYPE ={
    ERROR:'error',
    INFO:'info'
}

const MESSAGES = {
    PROGRAM_ERROR: ()=>({
        message:'Sorry! Error in the wrong program',
        code:CODES.PROGRAM_ERROR,
        type:TYPE.ERROR
    }),
    NOT_FOUND: (key,value)=>({
        message:`No resource found with ${key} ${value}`,
        code:CODES.NOT_FOUND,
        type:TYPE.INFO
    }),
    INSERT_OK: (key,value)=>({
        message:`Resource with  ${key} ${value} was inserted`,
        code:CODES.INSERT_OK,
        type:TYPE.INFO
    }),
    NOT_INSERTED: ()=>({
        message:'Resource was not inserted',
        code:CODES.NOT_INSERTED,
        type:TYPE.ERROR
    }),
    ALREADY_IN_USE: (key, value) =>({
        message:`Resource with ${key} ${value} was already in use`,
        code:CODES.ALREADY_IN_USE,
        type:TYPE.ERROR
    }),
    DELETE_OK: (key,value) =>({
        message:`Resource with ${key} ${value} is removed`,
        code:CODES.DELETE_OK,
        type:TYPE.INFO
    }),
    NOT_DELETED: (key, value) =>({
        message:`No resource found with ${key} ${value} . Nothing removed`,
        code:CODES.NOT_DELETED,
        type:TYPE.INFO
    }),
    UPDATE_OK: (key,value) =>({
        message:`Resource with ${key} ${value} is updated`,
        code:CODES.UPDATE_OK,
        type:TYPE.INFO
    }),
    NOT_UPDATED: () =>({
        message: `Resources was not updated`,
        code:CODES.NOT_UPDATED,
        type:TYPE.ERROR
    }),
    KEYS_DO_NOT_MATCH: (keyValue, keyValueInResource) =>({
        message:`The key ${keyValueInResource} of given resource is not same as the given key ${keyValue}`,
        code:CODES.KEYS_DO_NOT_MATCH,
        type:TYPE.ERROR
    })

};
module.exports={CODES,TYPE,MESSAGES}
