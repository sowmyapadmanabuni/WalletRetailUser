const isLogEnabled = true;

export default class logger{
    static async log(val){
        isLogEnabled?console.log(val):null;
    }

    static async logArgs(){
        isLogEnabled?console.log(arguments):null;
    }
    static async logToFile(){
        
    }
}