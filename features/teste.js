
const { BotkitConversation } = require( 'botkit' );
const f = require('../Functions/Cisco_2s');




module.exports = function (controller) {

    const convo = new BotkitConversation( 'teste_chat', controller );
    

    

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

    
    // var part_number = ''
    convo.addQuestion( "Por favor informe o part number completo do equipamento, para pesquisar vários pns de uma vez, separe-os por vírgulas sem deixar espaços. Ex. ATA190,WS-C2960-24PC-L", async function(pn){
        
        let response = await f.consultar_pn(pn)
        // console.log(`Modelo: ${response.EOLProductID} \nLink: ${response.LinkToProductBulletinURL} \nData Final: ${response.EndOfSaleDate.value}`)
        convo.addMessage(`Modelo: ${response.EOLProductID} \n\nLink: ${response.LinkToProductBulletinURL} \n\nData Final: ${response.EndOfSaleDate.value}`,'ask_end_of_sale' )
    } , 'stated_end_of_sale', 'ask_end_of_sale' );
    
    
    
    
    convo.addQuestion( 'Por favor informe o **serial number** do equipamento, para pesquisar vários seriais de uma vez, separe-os por vírgulas sem deixar espaços. Ex. FCH2226VA2J,FXS1643Q25Q', async function(sn) {
        let response = await f.consultar_sn(sn)
        convo.addMessage(`Produto: ${response.EOLProductID}`)
        console.log(`Produto: ${response.EOLProductID}`)

    }, 'stated_end_of_support', 'ask_end_of_support' );

    

    controller.addDialog( convo );

    controller.hears( ['2', 'cisco'], 'message,direct_message', async ( bot, message ) => {

        await bot.beginDialog( 'teste_chat' );
    });

    controller.commandHelp.push( { command: '2 - Consulta Cisco', text: 'teste Lucas' } );

    
    
    

}

