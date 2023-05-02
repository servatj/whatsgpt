const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const client = new Client();
const openai = require('../llms/openai');


const start = () => {
    client.on('qr', (qr) => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
    });
    
    client.on('message', message => {
        console.log(message.body);
    
        if(message.body.startsWith("#")) {
            openai.runComplention(message.body.substring(1)).then(result => message.reply(result));
        }
    });
    
    client.initialize();    
}

module.exports = {
    start
}
