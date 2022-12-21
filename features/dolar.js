
const { BotkitConversation } = require('botkit');

const f = require('../Functions/dolar');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'dolar_chat', controller );
 

    controller.addDialog( convo );
    

    controller.hears( ['3', 'dolar'], 'message,direct_message', async ( bot, message ) => {
        let dolar = await f.dolar();
        await bot.say(`O valor atual do dólar hoje:\n\n R$ ${dolar}`);
      });
      

    controller.commandHelp.push( { command: '3 - Consultar Dolar', text: ' Verificar valor atual do dolar' } );

    

}

