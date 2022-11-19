'use strict';

const Database = require('../database');

const printMessage=message => console.log(message);
const printStatement= statement => printMessage(`${statement}`);

const printError = message =>
printMessage(`${'#' .repeat(20)} Error ${'#' .repeat(20)}\n${message}\n${'#'.repeat(47)}\n`);


let createStatementFile = './Naik_Shubhangi_cat_createStatements.json';

if(process.argv.length>2){
    createStatementFile=`./${process.argv[2]}`;
}

try{
    createDb(require(createStatementFile));
}
catch(err){
    printError(err);
}

async function createDb(createStatements){
    
    const options={
        host:createStatements.host,
        port:createStatements.port,
        user:createStatements.admin,
        password:createStatements.adminpassword,
    };
    const DEBUG = createStatements.debug;
     
    const db =new Database(options);
    
    const user=`'${createStatements.user}'@'${createStatements.host}'`
    const dropDatabaseSql=`drop database if exists ${createStatements.database}`;
    const createDatabaseSql=`create database ${createStatements.database}`;
    const dropUserSql=`drop user if exists ${user}`;
    const createUserSql=`create user if not exists ${user} `+ 
                        `identified by '${createStatements.userpassword}'`;
    const grantPrivilegesSql=
    `grant all privileges on ${createStatements.database}.* to ${user}`;

    try {
        await db.doQuery(dropDatabaseSql);
        if(DEBUG) printStatement(dropDatabaseSql);
        await db.doQuery(createDatabaseSql);
        if(DEBUG) printStatement(createDatabaseSql);
        if(createStatements.dropUser){
            await db.doQuery(dropUserSql);
            if(DEBUG) printStatement(dropUserSql);
        }
        await db.doQuery(createUserSql);
        if(DEBUG) printStatement(createUserSql);
        await db.doQuery(grantPrivilegesSql);
        if(DEBUG) printStatement(grantPrivilegesSql);

        for(let table of createStatements.tables){
            if(table.columns && table.columns.length>0){
                const createtableSql=
                `create table ${createStatements.database}.${table.tableName}(`+
                `\n\t${table.columns.join(',\n\t')}`+
                ')';

                await db.doQuery(createtableSql);
                printStatement(createtableSql);

                if(table.data && table.data.length>0){
                    const rows =[];
                    for(let data of table.data){
                        const insertSql=
                        `insert into ${createStatements.database}.${table.tableName} `+
                        `values(${Array(data.length).fill('?').join(',')})`;
                        rows.push(db.doQuery(insertSql,data));
                    }
                    await Promise.all(rows);
                    if(DEBUG) printStatement("data added"); 
                    
                }
                else{
                    if(DEBUG) printStatement('data missing');
                }
            }
            else{
                if(DEBUG)printStatement('Table columns missing. Table was not created');
            }

        }

    }
    catch(err){
        printError(err);
    }
        
}