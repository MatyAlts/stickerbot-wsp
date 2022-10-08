const qrcode = require('qrcode-terminal');
const fs = require("fs")
const { Client, LegacySessionAuth, LocalAuth } = require('whatsapp-web.js');
const { MessageMedia, Message } = require('whatsapp-web.js/src/structures');
const mime = require('mime-types');
const axios = require('axios');


// Path donde la sesión va a estar guardada
//NO ES NECESARIO
//const SESSION_FILE_PATH = './session.json';

// Cargar sesión en caso de que exista una ya guardada
//NO ES NECESARIO
//let sessionData;
//if(fs.existsSync(SESSION_FILE_PATH)) {
//    sessionData = require(SESSION_FILE_PATH);
//}

// Uso de valores guardados
// ¡LINEA MODIFICADA!
//const client = new Client({
//    authStrategy: new LegacySessionAuth({
//        session: sessionData
//    })
//});
const client = new Client({
     authStrategy: new LocalAuth({
          clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
     })
})

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    //NO ES NECESARIO PERO SI QUIERES AGREGAS UN console.log
    //sessionData = session;
    //fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    //    if (err) {
    //        console.error(err);
    //    }
    //});
});
 

client.initialize();
client.on("qr", qr => {
    qrcode.generate(qr, {small: true} );
})


const send_message = [
    "54123456789",
    "54123456789"
]

client.on("ready", () => {
    console.log("Listo")

    send_message.map(value => {
        const chatId = value +"@c.us"
        message = "Prueba 1"
        client.sendMessage(chatId,message);
})})

client.on('message', msg => {
    if (msg.body == 'tonga'){
        var t_value = Math.floor(Math.random() * 7);
        if(t_value === 0){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga.jpg'))
    }
    else if (t_value === 1){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga2.jpg'))
    }
    else if (t_value === 2){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga3.jpeg'))
    }
    else if (t_value === 3){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga4.jpeg'))
    }
    else if (t_value === 4){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga5.jpeg'))
    }
    else if (t_value === 5){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga6.jpeg'))
    }
    else if (t_value === 6){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga7.jpeg'))
    }
    else if (t_value === 7){
        msg.reply(MessageMedia.fromFilePath(filePath = './tonga8.jpeg'))
    }
    }
    
    else if (msg.hasMedia){
        if (msg.body == '!sticker'){
        msg.downloadMedia().then(media =>{
            if(media){
                const mediaPath = './downloaded-media/';
                if(!fs.existsSync(mediaPath)){
                    fs.mkdirSync(mediaPath)
                }
                const extension = mime.extension(media.mimetype)
                const filename = new Date().getTime();
                const fullFileName = mediaPath + filename + '.' + extension;
                // Save File
                try{
                    fs.writeFileSync(fullFileName, media.data,{encoding: 'base64'});
                    console.log('File Downloaded Successfully',fullFileName);
                    console.log(fullFileName);
                    MessageMedia.fromFilePath(filePath = fullFileName)
                    client.sendMessage(msg.from,new MessageMedia(media.mimetype,media.data,filename),{sendMediaAsSticker:true,stickerAuthor:"By MatyAlts's Bot",stickerName:"@maty.torres_"})
                    fs.unlinkSync(fullFileName)
                    console.log(`File Deleted Successfully`);
                }catch(err){
                    console.log('Failed to Save the File',err);
                    console.log(`File Deleted Successfully`);
                }
            }
        })
    }
}
});