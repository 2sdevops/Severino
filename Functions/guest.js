module.exports = { guest_main }

const axios = require('axios');
var data = new Date();

var diaAMais = new Date();
diaAMais.setDate(diaAMais.getDate() + 1);
    
var strfromDate = (data.getMonth() + 1) + '/' + data.getDate() + '/' + data.getFullYear() + ' ' + data.getHours() + ':' + data.getMinutes();
var strtoDate = (data.getMonth() + 1) + '/' + (data.getDate() + 1) + '/' + data.getFullYear() + ' 23:00';   


async function verifica_usuario(username){
  let retorno;

  await axios.get('https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/' + username,{
        auth: {
        username: 'ise-api-sponsor',
        password: 'Brasil@2022'
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    })
    .then(response => {
        retorno = 'true'
        
    })
    .catch(error => {
        retorno = 'false'
        
    })
    return retorno
}




async function atualiza_guest(username){

  var dados = {
      "GuestUser": {
        "name": "Severino",
        "description": "Teste 2S ",
        "guestType": "Convidado_API",
        "sponsorUserName": "ise-api-sponsor",
        "guestInfo": {
          "userName": username,
          "emailAddress": username,
          "phoneNumber": "",
          "enabled": true,
          "smsServiceProvider": ""
          
        },
        "guestAccessInfo": {
          "validDays": 1,
          "fromDate": strfromDate,
          "toDate": strtoDate,
          "location": "Arizona"
        },
        "portalId": "b2fea183-da44-4cdb-923c-3abc1b854ff0"
        
      }
    }
  await axios.put(`https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/${username}`, dados,{
      auth: {
      username: 'ise-api-sponsor',
      password: 'Brasil@2022'
      },
  })
  .then(response => {
      
  })
  .catch(error => {
      console.log(error.response.data.ERSResponse)
      
      
  })
}


async function cria_guest(username){

    var dados = {
        "GuestUser": {
          "name": "Severino",
          "description": "Teste 2S ",
          "guestType": "Convidado_API",
          "sponsorUserName": "ise-api-sponsor",
          "guestInfo": {
            "userName": username,
            "emailAddress": username,
            "phoneNumber": "",
            "enabled": true,
            "smsServiceProvider": ""
            
          },
          "guestAccessInfo": {
            "validDays": 1,
            "fromDate": strfromDate,
            "toDate": strtoDate,
            "location": "Arizona"
          },
          "portalId": "b2fea183-da44-4cdb-923c-3abc1b854ff0"
          
        }
      }
    await axios.post('https://ise2s01.2s.com.br:9060/ers/config/guestuser', dados,{
        auth: {
        username: 'ise-api-sponsor',
        password: 'Brasil@2022'
        },
    })
    .then(response => {
        
        
    })
    .catch(error => {
        console.log(error.response.data.ERSResponse)
        
    })
}

async function password_guest(username) {
    let password
    try {
      const response = await axios.get(
        'https://ise2s01.2s.com.br:9060/ers/config/guestuser/name/' + username,
        {
          auth: {
            username: 'ise-api-sponsor',
            password: 'Brasil@2022',
          },
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      )
      password = response.data.GuestUser.guestInfo.password
    } catch (error) {
      password = 'erro'
    }
    return password
  }
  
async function guest_main(username){
    let v_usuario = await verifica_usuario(username)
    if (v_usuario == "true") {
      await atualiza_guest(username)
    } else {
      await cria_guest(username)
    }
    
    let senha = await password_guest(username)
    return senha
}












  
  