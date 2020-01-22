import React from 'react'
//import { RSA } from 'react-native-rsa-native';
import RNRsaEncryption from '@akeo/react-native-rsa-encryption';

export default class payment{

    


    // Bhf6dqbrF507vMmQ0W/0xU1CptFjjAATT0Jj5uXCT+7QyxZuN3aTeofMPuhiscDAp0qodNq59Mx7
    // 7EuaEW0FAZqZfPY7K5GjDUzm6QZerfyNgySyEvn8gxsAeOVzlmji9aCf0EWh0eZYc2j7anNhnAYR
    // FZLtSHPJoFVD/U6yvgCsoIsgaG3g5oeYXdoGpk+TZ4y8ZIM1ydL+Qca9PQJDMz8zQXOH+XkFZORy
    // fq3/sHJ2QTkauJ/SCmr9kmZYyBFr/r1i7Lef90liOc+jCANy/CTNNhwjqRECMAgZHnunGu1uT6BB
    // mAkW6MsJr8YPTum8LDp3aBszMIF5QnfgtFeH6Q==


    static  decrypt(){
        var _key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAltCJNfK/cFz4cykxUO0720lT6KUY1Q1t"+
    "+cCDzuSkxGW8eFsHSai7W8exSHSH68sGVUq5Nw7zl+4QK6bRI1qT79b6YE4cfteb7y3LEaeBAqks"+
    "pcU1z4jY3TGLSVDH+e6BvO1QdDFVglRYurqZmFjjzLOkNk400eYtNmIN6vHmLnrkxUI1CatlVqmj"+
    "IxLzhoW1HyGGit0//bMSTd9QbS37F5VabCEnn2oAxPj39M08ZlAEknSsK+kBMeg1aapMLJVxJI63"+
    "dGnrLAASpW/SckjJmrNErKKfap+7ev3I8YrMEDt5KPFcWi+PpJbZAJpdE0IULHKQ0t6v5tyXo1U3"+
    "bYYteQIDAQAB";
    var _msg = "cvv_number=&amount=1.00&currency=INR&card_number=1112&customer_identifier=stg&expiry_year=2027&expiry_month=07&"
   // console.log(RSA)
        // RSA.decrypt(_msg, _key)
        // .then(decryptedMessage => {
        //     console.log(`The original message was ${decryptedMessage}`);
        //     return decryptedMessage;
        // })
        // .catch((e)=>{console.log(e);return e;});
        RNRsaEncryption.encryptString(_msg, _key,(response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
    }
}