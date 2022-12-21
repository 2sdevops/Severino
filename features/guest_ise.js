
const { BotkitConversation } = require('botkit');

const f = require('../Functions/guest');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'guest_chat', controller );
    
    
    
    convo.ask('Por favor informe o email do novo usuario da rede guest', async(response) => {
        let resposta = await f.guest_main(response);
        await convo.say(`Segue as credenciais de acesso a rede guest da 2S \n\nUsuario: ${response} \n\nSenha: ${resposta}`);
        
    })

    controller.addDialog( convo );
    

    controller.hears( ['2', 'guest'], 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'guest_chat' );
    });

    controller.commandHelp.push( { command: '2 - Rede guest', text: ' criar usuario na rede guest' } );

    

}

