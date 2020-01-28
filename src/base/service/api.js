import axios from 'axios';
import strings from '../utils/strings'
import apputils from '../utils/storage'

axios.defaults.baseURL = strings.oyeWalletUrl
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.timeout = 30000;

axios.interceptors.request.use(async function (config) {
    var token = ""
    //var token = await apputils.getasyncstorage('TOKEN');

    if (token != null) {
        token = token.replace('"', "");
        token = token.replace('"', "");
        //config.headers.Authorization = token;
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});

let instance = axios.create({
    baseURL: strings.oyeWalletUrl,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(async function (config) {
    var token = ""//await apputils.getasyncstorage('TOKEN');

    if (token != null) {
        token = token.replace('"', "")
        token = token.replace('"', "")
        console.log('Header exist: ', token)
        //config.headers.Authorization = "token " + token;
        console.log(config.headers)
    } else {
        config.headers['Content-Type'] = 'application/json'
        console.log("No Header", config.headers)
    }

    return config;
}, function (err) {
    return Promise.reject(err);
});

instance.interceptors.response.use((response) => {
    console.log("RAW", response)
    try {
        if (response.data !== undefined && response.data.errorCode !== undefined) {

        }

        if (response.request.responseURL !== undefined) {
            return response.data != undefined ? response.data : response
        } else {
            return response.data != undefined ? response.data : response
        }
    } catch (e) {
        console.log("EEEE", e);
        return response
    }
}, (error) => {
    console.log("Error:", error);
    return null;
});

export default class api {
    static async getMerchant(merchantId) {
        return await instance.get('GetMerchantPayeeDetails/'+ merchantId);
    }
}