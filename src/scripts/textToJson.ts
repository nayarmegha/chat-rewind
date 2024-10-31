import type { Chat } from '../utils/types'

function convertToJson(splitData: string[], isAndroid: boolean) {
    const jsonData: Chat[] = []
    for (let i = 1; i < splitData.length; i++) {
        // initializing each JSON
        const eachjson: Chat = {
            date: new Date(),
            name: '',
            content: {
                text: '',
                attach: '',
                event: '',
                reacts: 0,
            },
        }

        let text = splitData[i]
        if (!isAndroid) {
            const datestring = text
                .substring(1, text.indexOf(']'))
                .replace(',', '')
            const simpleDate = new Date(datestring)

            text = text.substring(text.indexOf(']') + 2)
            const sender = text.substring(0, text.indexOf(':'))
            text = text.substring(text.indexOf(':') + 2)

            // Check for not video or voice call
            if (
                text.indexOf('Missed voice') != -1 ||
                text.indexOf('Missed group') != -1 ||
                text.indexOf('Missed video') != -1
            ) {
                eachjson['content']['event'] = text
            } // Check for attachments
            else if (text.indexOf('<attached:') != -1) {
                const end = text.indexOf('>')
                eachjson['content']['attach'] = text.substring(
                    text.indexOf('<attached:') + 11,
                    end
                )
            } // Last case : simple text
            else {
                eachjson['content']['text'] = text
            }

            eachjson['date'] = simpleDate
            eachjson['name'] = sender
        } else {
            const datestring = text
                .substring(0, text.indexOf('-') - 1)
                .replace(',', '')
            const simpleDate = new Date(datestring)
            text = text.substring(text.indexOf('-') + 2)
            const sender = text.substring(0, text.indexOf(':'))
            text = text.substring(text.indexOf(':') + 2)

            // Check for not video or voice call
            if (
                text.indexOf('Missed voice') != -1 ||
                text.indexOf('Missed video call') != -1
            ) {
                eachjson['content']['event'] = text
            } // Check for attachments
            else if (text.indexOf('(file attached)') != -1) {
                const end = text.indexOf('(file attached)')
                eachjson['content']['attach'] = text.substring(0, end - 1)
            } // Last case : simple text
            else {
                eachjson['content']['text'] = text
            }

            eachjson['date'] = simpleDate
            eachjson['name'] = sender
        }

        jsonData.push(eachjson)
    }
    return jsonData
}

async function textToJson(fileblob: Blob) {
    let jsonblob = new Blob([])

    try {
        const data = await fileblob.text()
        // removes [U+200E] and [U+202F] characters - default on whatsapp
        let otherdata = data.replace(/\u200E/g, '')
        otherdata = otherdata.replace(/\u202F/g, ' ')
        /* 
    Using RegEx to pattern match and split for :
    [mm/dd/yy, hh:mm:ss am/pm] <text>
    Data can either be of the format [10/16/21, 1:16:36 AM] or 26 Sep 2014 14:43
    */
        let jsonData: Chat[] = []

        let splitfile = otherdata.match(
            /\[\d{1,2}\/\d{1,2}\/\d{2,4}, \d{1,2}:\d{2}:\d{2}\s[AP]+M\] [^[]+/g
        )

        if (splitfile == null) {
            splitfile = otherdata.match(
                /\d{1,2}\/\d{1,2}\/\d{2,4}, \d{1,2}:\d{1,2} [AP]+M -[^0-9]+/gi
            )
            jsonData = convertToJson(splitfile, true)
        } else {
            jsonData = convertToJson(splitfile, false)
        }

        jsonblob = new Blob([JSON.stringify(jsonData)], {
            type: 'application/json',
        })
    } catch (error) {
        console.log('error reading blob', error)
    } 
    return jsonblob
}
