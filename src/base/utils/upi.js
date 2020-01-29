
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import strings from './strings'

const upiTimeout = 5; //in minutes
const dateFormat = 'YYYY-MM-DDThh:mm:ss.sss'

export default class upi{

    static async getDBSUPIConfiguration(txnAmount, payeeUPI, senderId){

        let now = new Date();
        let initiatingTime = moment(now).format(dateFormat);
        let expiringTime = moment(moment(now).add(5, 'm').toDate()).format(dateFormat);
        let initiatedDate = moment(now).format("YYYY-MM-DD")

        let config = {
            header:{
                
                apiKey:'d0cc814c-c6c5-4f6a-b1d9-8e866c3a75cf',

                msgId:'20120129000001',//must be unique, Proposed format: <YYYYMMDD><sequence number>
                orgId:'INJAON01',
                timeStamp:initiatingTime,//Generated from app
            },
            
            txnInfo:{
            
                customerReference:"12345",//Transaction Remarks to be sent to beneficiary or payer to inform the reference number or purpose of payment or collection
                customerTxnId:"31345",//End to end ID that will be checked for duplicates
                refId:"12345678",//DBS recommends to populate the same value as in the field 6 for customerReference
                txnType:"PUPI",//Generated from app
                txnDate:initiatedDate,
                txnAmount:txnAmount,
                senderParty:{
                    name:"JABM PVT LTD", 
                    bankCtryCode : "IN",
                    vpa : strings.sandboxSenderUPI,//"OYESPACE@dbs",
                    expiry : expiringTime
                },
                receivingParty:{
                    bankCtryCode:"IN",
                    vpa:payeeUPI
                },
                rmtInf:{
                    clientReference:[
                        {
                            clientReference:""
                        }
                    ]
                }
                
            }

        }
        console.log(JSON.stringify(config))
        return config
    }

    static initiateDBSUPI(dbsConfig){
        let now = new Date();
        let initiatingTime = moment(now).format(dateFormat);
        let expiringTime = moment(moment(now).add(5, 'm').toDate()).format(dateFormat);

        let upiConfig = dbsConfig;
        upiConfig.header.timeStamp = initiatingTime
        upiConfig.txnInfo.senderParty.expiry = expiringTime
           
    }

}