import type { newChat, oldChat } from '../utils/types'
import * as whatsapp from 'whatsapp-chat-parser';

function convertFormat(messages: oldChat[]) {
    let convertedJSON: newChat[] = []

    for (let oldMsg of messages) {
        
        // ignore system message
        if(oldMsg.author == null)
            continue

        // basic conversion
        const newMsg: newChat = {
            date: oldMsg.date,
            name: oldMsg.author,
            content: {
                text: oldMsg.message,
                attach: oldMsg?.attachment?.fileName,
            },
        }

        // Check for missed video/voice calls
        if (oldMsg.message.includes('\u200EMissed voice') || 
            oldMsg.message.includes('\u200EMissed group') || 
            oldMsg.message.includes('\u200EMissed video') ||
            oldMsg.message.includes('\u200EMissed video call')) {       
                newMsg.content.text = ''
                newMsg.content.event = oldMsg.message
        }
    
        convertedJSON.push(newMsg)
    }

    return convertedJSON
}

export async function textToJson(textBlob: Blob) {

    // Convert from text blob to json object with whatsapp-chat-parser
    const data = await textBlob.text()
    const messages = whatsapp.parseString(data, {
        parseAttachments: true
    });

    //  Convert Messages from this
    // {
    //     date: new Date(),
    //     author: '',
    //     message: '',
    //     attachment: {
    //         fileName: '',
    //     },
    // },

    // To this...
    // {
    //     date: new Date(),
    //     name: '',
    //     content: {
    //         text: '',
    //         attach: '',
    //         event: '',
    //         reacts: 0,
    //     },
    // }

    const convertedMessages = convertFormat(messages);

    // Convert back into a blob for parsing
    const jsonBlob = new Blob([JSON.stringify(convertedMessages)], {
        type: 'application/json',
    })

    return jsonBlob
}
