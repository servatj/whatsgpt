import { Client } from 'whatsapp-web.js'; 
import qrcode from 'qrcode-terminal';
import openai from '../llms/openai.js';


const client = new Client();

export const start = () => {
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
