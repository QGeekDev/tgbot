module.exports = {
    listOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Front end', callback_data: 'Front end' }, { text: 'Back end', callback_data: 'Back end' }],
                [{ text: 'Design', callback_data: 'Design' }, { text: 'QA', callback_data: 'QA' }],
                [{ text: 'SMM', callback_data: 'SMM' }],
            ]
        })
    }
}