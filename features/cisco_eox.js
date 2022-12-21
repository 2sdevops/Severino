
const { BotkitConversation } = require( 'botkit' );
const f = require('../Functions/Cisco_2s');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'eox_chat', controller );
    

    

    convo.ask( "Escolha o número correspondente ao que deseja verificar: \n\n1 - End-of-Sale e End-of-Support\n\n2 - Informações e cobertura via serial number", [
        {
            pattern: '1',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'ask_end_of_sale' );
            }
        },
        {
            pattern: '2',
            handler: async ( response, convo ) => {

                await convo.gotoThread( 'ask_end_of_support' );
            }
        },
        
        {
            default: true,
            handler: async ( response, convo ) => {
                await convo.gotoThread( 'bad_response' );
            }
        }
    ])


    convo.addMessage( {
        text: 'Não Entendemos sua resposta!\nTip: Tente "1" ou "2"',
        action: 'default'
    }, 'bad_response' );

    convo.addQuestion( "Por favor informe o part number completo do equipamento, para pesquisar vários pns de uma vez, separe-os por vírgulas sem deixar espaços. Ex. ATA190,WS-C2960-24PC-L", async function(pn){  
        let response = await f.consultar_pn(pn)
        let data_end_of_sale = await f.ajuste_data(response.EndOfSaleDate.value)
        let data_end_of_support = await f.ajuste_data(response.LastDateOfSupport.value)
        convo.addMessage(`Modelo: ${response.EOLProductID} \n\nEnd of sale: ${data_end_of_sale} \n\nEnd of support: ${data_end_of_support} \n\nLink: ${response.LinkToProductBulletinURL}`,'ask_end_of_sale' )
    } , 'stated_end_of_sale', 'ask_end_of_sale' );
    
    
    
    
    convo.addQuestion( 'Por favor informe o serial number do equipamento, para pesquisar vários seriais de uma vez, separe-os por vírgulas sem deixar espaços. Ex. FCH2226VA2J,FXS1643Q25Q', async function(sn) {
        let response = await f.consultar_sn(sn)
        
        convo.addMessage(`Produto: ${response.EOLProductID} \n\nLink: ${response.LinkToProductBulletinURL} \n\nEnd of sale: ${f.ajuste_data(response.EndOfSaleDate.value)} `, 'ask_end_of_support')
        

    }, 'stated_end_of_support', 'ask_end_of_support' );

    

    controller.addDialog( convo );

    controller.hears( ['1', 'eox'], 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'eox_chat' );
    });

    controller.commandHelp.push( { command: '1 - Consulta Cisco', text: ' consultar SN ou PN Cisco' } );

    
    
    

}

