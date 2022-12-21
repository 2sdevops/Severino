process.env.NODE_TLS_REJECT_UNAUTHORIZED = "1";
module.exports = { dolar }
var axios = require("axios")



async function dolar(){
    var response = await axios.get('https://economia.awesomeapi.com.br/last/USD-BRL')
    return response.data['USDBRL']['ask']
        
}