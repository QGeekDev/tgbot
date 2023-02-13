module.exports = {
    buttonContinue: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Continue', callback_data: 'Continue' }],
            ]
        })
    },
    listBedrooms: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '1', callback_data: '1 bedroom' }, { text: '2', callback_data: '2 bedrooms' }],
                [{ text: '3', callback_data: '3 bedrooms' }, { text: '4', callback_data: '4 bedrooms' }],
                [{ text: '5', callback_data: '5 bedrooms' }],
            ]
        })
    },
    listBath: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '1', callback_data: '1 bath' }, { text: '2', callback_data: '2 baths' }],
                [{ text: '3', callback_data: '3 baths' }, { text: '4', callback_data: '4 baths' }],
            ]
        })
    },
    listHalfBath: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: '0', callback_data: '0 halfBath' }, { text: '1', callback_data: '1 halfBath' }],
                [{ text: '2', callback_data: '2 halfBaths' }, { text: '3', callback_data: '3 halfBaths' }],
                [{ text: '4', callback_data: '4 halfBaths' }],
            ]
        })
    },
    cleaningDetails: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'A Clean Start', callback_data: 'A Clean Start' }],
                [{ text: 'Residential Cleaning Service', callback_data: 'Residential Cleaning Service' }],
                [{ text: 'Commercial Cleaning Service', callback_data: 'Commercial Cleaning Service' }],
                [{ text: 'Janitorial Services', callback_data: 'Janitorial Services' }],
                [{ text: 'Laundry and Dry Cleaning', callback_data: 'Laundry and Dry Cleaning' }],
                [{ text: 'Sanitizing and Disinfecting Services', callback_data: 'Sanitizing and Disinfecting Services' }],
                [{ text: 'Pressure Washing Service', callback_data: 'Pressure Washing Service' }],
                [{ text: 'Green Cleaning Service', callback_data: 'Green Cleaning Service' }],
            ]
        })
    },
    frequencyOfCleaning: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Once a week', callback_data: 'Once a week' }],
                [{ text: 'Once every two weeks', callback_data: 'Once every two weeks' }],
                [{ text: 'Once a month', callback_data: 'Once a month' }],
                [{ text: 'Once every 3 months', callback_data: 'Once every 3 months' }],
                [{ text: 'Once every six months', callback_data: 'Once every six months' }],
            ]
        })
    },
    selectExtraArea: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Balcony', callback_data: 'Balcony' }],
                [{ text: 'Windows', callback_data: 'Windows' }],
                [{ text: 'Inside the oven', callback_data: 'Inside the oven' }],
                [{ text: 'Inside the fridge', callback_data: 'Inside the fridge' }],
                [{ text: 'Basement', callback_data: 'Basement' }],
                [{ text: 'Confirm options', callback_data: 'Confirm options' }, { text: 'Change options', callback_data: 'Change options' }],

            ]
        })
    },
    optionsCleaning: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Change amount bedrooms', callback_data: 'Change amount bedrooms' }],
                [{ text: 'Full Bath', callback_data: 'Full Bath' }],
                [{ text: 'Half Bath', callback_data: 'Half Bath' }],
                [{ text: 'Type of cleaning', callback_data: 'Type of cleaning' }],
                [{ text: 'Frequency of cleaning', callback_data: 'Frequency of cleaning' }],
                [{ text: 'Extra area', callback_data: 'Extra area' }],

            ]
        })
    },
    buttonContactInforamtion: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Provide contact information', callback_data: 'Provide contact information' }],
                [{ text: 'Change options', callback_data: 'Change options' }]
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
                [{ text: 'Change Zip', callback_data: 'Change Zip' }],
                [{ text: 'Change Phone', callback_data: 'Change Phone' }],
                [{ text: 'Change Email', callback_data: 'Change Email' }]
            ]
        })
    }

}