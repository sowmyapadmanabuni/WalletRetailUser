const isDev = true;

const isUat = true;
const isProd = true;

const isSecure = true;

const isMandatory = " is required";


const api = {
    oyeWalletDev:isDev?"devwalletapi.azurewebsites.net/wallet":"devwalletapi.azurewebsites.net/wallet",
    oyeWalletUat:isUat?"uatwalletapi.azurewebsites.net/wallet":"uatwalletapi.azurewebsites.net/wallet",
    oyeWalletProd:isProd?"apiwallet.azurewebsites.net/wallet":"apiwallet.azurewebsites.net/wallet",
    // protocol:isSecure?"https://":"http://",
    protocol:"https://",
    oyeWalletApiPath:"/api/v1/",
    //'https://devwalletapi.azurewebsites.net/wallet/api/v1/'
};

const strings = {
    appName:"OyeWallet",
    //oyeWalletUrl: 'https://devwalletapi.azurewebsites.net/wallet/api/v1/' ,
    oyeWalletUrl:'https://devapi.oyewallet.com/wallet/api/v1/',
    oyeWalletDevUrl:'https://devapi.oyewallet.com/wallet/api/v1/',
    oyeWalletUatUrl:'https://uatapi.oyewallet.com/wallet/api/v1/',
    oyeWalletProdUrl:'https://devapi.oyewallet.com/wallet/api/v1/',
    // oyeWalletUrl:api.protocol+api.oyeWalletDev+api.oyeWalletApiPath,
    //oyeWalletUrl:api.protocol+api.oyeWalletDev+api.oyeWalletApiPath,


    name : "First Name",
    resendOTPTxt1: "Resend in ",
    resendOTPTxt2: " sec",

    sandboxReceiverUPI:"xyz1234@dbs",
    sandboxSenderUPI:"OYESPACE@dbs",

    STATUS_BAR_HEIGHT:36

};

export default strings;
