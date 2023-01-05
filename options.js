module.exports = {
    listOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Front end', callback_data: 'Front end' }, { text: 'Back end', callback_data: 'Back end' }],
                [{ text: 'Design', callback_data: 'Design' }, { text: 'QA', callback_data: 'QA' }],
                [{ text: 'SMM', callback_data: 'SMM' }],
            ]
        })
    },
    buttonSendInfo: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Send info', callback_data: 'Send info' },
                { text: 'Change info', callback_data: 'Change info' }],
            ]
        })
    },
    buttonYesOrNo: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Yes', callback_data: 'Yes' },
                { text: 'No', callback_data: 'No' }],
            ]
        })
    },
    buttonReturn: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Return', callback_data: 'Return' }]
            ]
        })
    },
    buttonChangeInfo: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Choose a service', callback_data: 'Choose a service' }],
                [{ text: 'Change Zip', callback_data: 'Change Zip' }],
                [{ text: 'Change Phone', callback_data: 'Change Phone' }],
                [{ text: 'Change Email', callback_data: 'Change Email' }]
            ]
        })
    }

}