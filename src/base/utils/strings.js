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
};

const strings = {
    appName:"OyeWallet",
    //https://devwalletapi.azurewebsites.net/wallet/api/v1/
    // oyeWalletUrl:api.protocol+api.oyeWalletDev+api.oyeWalletApiPath,
    oyeWalletUrl:'https://devapi.oyewallet.com/wallet/api/v1/'
    //oyeWalletUrl:api.protocol+api.oyeWalletDev+api.oyeWalletApiPath,
    
};


export default strings;