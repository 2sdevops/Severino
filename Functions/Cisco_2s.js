
module.exports = { consultar_pn, consultar_sn, ajuste_data }


var axios = require("axios")

async function geraToken(){
    var response = await axios.post('https://cloudsso.cisco.com/as/token.oauth2',{ 
        'grant_type':'client_credentials',
        'client_secret': 'MaunFXsjMVrnPFCsT2QrZFHw',
        'client_id': '6ycg4qccm7tstfj4xqfd2j2s'},{
        headers: 
        {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept-Charset': 'UTF-8'
        }
        
        })
        return response.data.access_token;


       
}

async function consultar_pn(pn_recebido){
    var tokenGerado = await geraToken();
    var response = await axios.get('https://api.cisco.com/supporttools/eox/rest/5/EOXByProductID/' + pn_recebido, {
        headers:
                {
                    Authorization: 'Bearer ' + tokenGerado,
                    'Content-Type': 'application/json'
                },
                json: true
        }   
)
    
    return response.data.EOXRecord[0]
        
}


async function consultar_sn(sn_recebido){
    var tokenGerado = await geraToken();
    var response = await axios.get('https://api.cisco.com/supporttools/eox/rest/5/EOXBySerialNumber/1/' + sn_recebido, {
        headers:
                {
                    Authorization: 'Bearer ' + tokenGerado,
                    'Content-Type': 'application/json'
                },
                json: true
        }   
) 

    return response.data.EOXRecord[0]
    
}

async function ajuste_data(data){
    const dateArray = data.split('-');
    const reversedArray = dateArray.reverse();
    const reversedDate = reversedArray.join('/');
    return reversedDate
}






