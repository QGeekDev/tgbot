require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { listBedrooms, listBath, listHalfBath, cleaningDetails, frequencyOfCleaning, selectExtraArea, optionsCleaning, buttonContactInforamtion } = require('./options');
const { listOptions, buttonContinue, buttonSendInfo, buttonChangeInfo } = require('./options');

const token = process.env.TELEGRAM_TOKEN;

const bot = new TelegramBot(token, { polling: true });
// const { TELEGRAM_TOKEN, SERVER_URL } = process.env;
// const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
// const URI = `webhook/${TELEGRAM_TOKEN}`;
// const WEBOOK_URL = SERVER_URL + URI;
// ---------- LOGGIN FEATURES ----------

var fs = require('fs');
var util = require('util');
const e = require('express');
var log_file = fs.createWriteStream(__dirname + '/debug.log', { flags: 'a' });
var log_stdout = process.stdout;

console.log = function (d) { //
	log_file.write(util.format(d) + '\n');
	log_stdout.write(util.format(d) + '\n');
};

// ---------- LOGGIN FEATURES END ----------

// ---------- FAST ANSWERS ----------

var fastAnswers = JSON.parse(fs.readFileSync('./answers.json', 'utf8'));
// ---------- FAST ANSWERS END ----------

console.log("[DEBUG] Bot is starting...");

const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

const regexPhone = /^\+?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

const validateEmail = (email) => {
	return String(email).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

function checkZip(zip) {
	return zip.length !== 7 && zip == '' ? false : true;
}

const privateID = 556744792;

const localData = {
	id: '',
	name: '',
	zipCode: '',
	phone: '',
	email: '',
};

const optionCleaning = {
	amountBedrooms: '',
	amountBath: '',
	amountHalfBath: '',
	typeCleaning: '',
	frequencyOfCleaning: '',
	extraArea: [],
}

let checkProdiveInfo = '';

function clearOptionCleaning() {
	optionCleaning['amountBedrooms'] = '';
	optionCleaning['amountBath'] = '';
	optionCleaning['amountHalfBath'] = '';
	optionCleaning['typeCleaning'] = '';
	optionCleaning['frequencyOfCleaning'] = '';
	optionCleaning['extraArea'] = [];
	checkProdiveInfo = '';
};

const amountBedrooms = ['1 bedroom', '2 bedrooms', '3 bedrooms', '4 bedrooms', '5 bedrooms'];
function checkAmountBedrooms(data) {
	for (let i = 0; i < amountBedrooms.length; i++) {
		if (amountBedrooms[i] == data) {
			return data;
		}
	}
}

const amountBath = ['1 bath', '2 baths', '3 baths', '4 baths'];
function checkAmountBath(data) {
	for (let i = 0; i < amountBath.length; i++) {
		if (amountBath[i] == data) {
			return data;
		}
	}
}

const amountHalfBath = ['0 halfBath', '1 halfBath', '2 halfBaths', '3 halfBaths', '4 halfBaths'];
function checkAmountHalfBath(data) {
	for (let i = 0; i < amountHalfBath.length; i++) {
		if (amountHalfBath[i] == data) {
			return data;
		}
	}
}

const arrayCleaningDetails = ['A Clean Start', 'Residential Cleaning Service', 'Commercial Cleaning Service', 'Janitorial Services', 'Laundry and Dry Cleaning', 'Sanitizing and Disinfecting Services', 'Pressure Washing Service', 'Green Cleaning Service'];
function checkCleaningDetails(data) {
	for (let i = 0; i < arrayCleaningDetails.length; i++) {
		if (arrayCleaningDetails[i] == data) {
			return data;
		}
	}
}

const arrayFrequency = ['Once a week', 'Once every two weeks', 'Once a month', 'Once every 3 months', 'Once every six months'];
function checkFrequency(data) {
	for (let i = 0; i < arrayFrequency.length; i++) {
		if (arrayFrequency[i] == data) {
			return data;
		}
	}
}

const arrayExtraArea = ['Balcony', 'Windows', 'Inside the oven', 'Inside the fridge', 'Basement'];
function checkExtraArea(data) {
	for (let i = 0; i < arrayExtraArea.length; i++) {
		if (arrayExtraArea[i] == data) {
			return data;
		}
	}
}

const isEmpty = !Object.values(optionCleaning).some(x => (x !== null && x !== ''));

function sendConfirmInfo(chatId, name) {
	bot.sendMessage(chatId, `${name} you choose:
	\n Bedroom: ${optionCleaning['amountBedrooms']}
	\n Bath: ${optionCleaning['amountBath']}
	\n Half bath: ${optionCleaning['amountHalfBath']}
	\n Type cleaning: ${optionCleaning['typeCleaning']}
	\n Frequency of cleaning: ${optionCleaning['frequencyOfCleaning']}
	\n Extra area: ${optionCleaning['extraArea']}
	`,
		buttonContactInforamtion);
}

const start = () => {
	bot.on('message', async (msg) => {
		let date = new Date(msg.date * 1000);
		let timestamp = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "@" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		const text = msg.text;
		const chatId = msg.chat.id;
		const name = msg.from.first_name;

		localData['id'] = chatId;
		localData['name'] = name;

		if (text === '/start') {
			clearOptionCleaning();
			await bot.sendMessage(chatId, `${name}, glad to see you got into the telegram bot.`);
			return await bot.sendMessage(chatId, 'Describe your home Please choose all the bedrooms in your home even if you do not need some bathrooms cleaned. You can call if you need a particle cleaning. Any extra room, bonus room, office room, ect is considered as an additional bedroom',
				buttonContinue);
		}

		if (isValidZip.test(text)) {
			const zipCode = msg.text;
			localData['zipCode'] = zipCode;

			if (localData['phone'] == '') {
				return bot.sendMessage(chatId, `Enter your phone`);
			}
		}

		if (regexPhone.test(text)) {
			const phone = msg.text;
			localData['phone'] = phone;
		}

		if (validateEmail(text)) {
			const email = msg.text;
			localData['email'] = email;

			return await bot.sendMessage(chatId, `Check the correctness of the data: \n${name}
			\n${localData['zipCode']}
			\n${localData['phone']}
			\n${localData['email']}`,
				buttonSendInfo);
		} else {
			if (localData['zipCode'] !== ''
				&& localData['phone'] !== ''
				&& localData['email'] !== '') {
				return await bot.sendMessage(chatId, `Check the correctness of the data: \n${name}
					\n${localData['zipCode']}
					\n${localData['phone']}
					\n${localData['email']}`,
					buttonSendInfo);
			}

			if (!isValidZip.test(text) &&
				checkZip(text) &&
				localData['zipCode'] == ''
				&& checkProdiveInfo != ''
			) {
				bot.sendMessage(chatId, `${name}, Example ZIP 81700`);
			}

			if (!regexPhone.test(text) &&
				localData['zipCode'] !== '' &&
				localData['phone'] == ''

			) {
				bot.sendMessage(chatId, `${name}, Enter your phone example +380938070439`);
			}
			if (!validateEmail(text) &&
				localData['zipCode'] !== '' &&
				localData['phone'] !== ''
				&& localData['email'] == ''
			) {
				bot.sendMessage(chatId, `${name}, Enter your email example la@gmail.com`);
			}
		}
	});

	bot.onText(/\/echo (.+)/, (msg, match) => {
		// 'msg' is the received Message from Telegram
		// 'match' is the result of executing the regexp above on the text content
		// of the message
		const chatId = msg.chat.id;
		const resp = match[1]; // the captured "whatever"
		bot.sendMessage(chatId, resp);
	});

	bot.on('callback_query', msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
		const name = msg.from.first_name;

		const amountBedroomsValue = msg.data;
		const amountBathValue = msg.data;
		const amountHalfBathValue = msg.data;
		const typeCleaning = msg.data;
		const frequencyOfCleaningValue = msg.data;
		const extraArea = msg.data;

		if (data == 'Continue') {
			clearOptionCleaning;
			bot.sendMessage(chatId, `${name}. \nAny extra room, bonus room, office room, ect is considered as an additional bedroom`,
				listBedrooms);
		}

		if (checkAmountBedrooms(data)) {
			optionCleaning['amountBedrooms'] = amountBedroomsValue.split(' ')[0];
			if (!isEmpty && optionCleaning['amountBath'] == '') {
				bot.sendMessage(chatId, `${name}. \nFull Bath.`,
					listBath);
			} else {
				sendConfirmInfo(chatId, name);
			}
		}

		if (checkAmountBath(data)) {
			optionCleaning['amountBath'] = amountBathValue.split(' ')[0];
			if (!isEmpty && optionCleaning['amountHalfBath'] == '') {
				bot.sendMessage(chatId, `${name}. \nHalf Bath. Any extra room, bonus room, office room, ect is considered as an additional bedroom`,
					listHalfBath);
			} else {
				sendConfirmInfo(chatId, name);
			}
		}

		if (checkAmountHalfBath(data)) {
			optionCleaning['amountHalfBath'] = amountHalfBathValue.split(' ')[0];
			if (!isEmpty && optionCleaning['typeCleaning'] == '') {
				bot.sendMessage(chatId, `${name}. \nType of cleaning`,
					cleaningDetails);
			} else {
				sendConfirmInfo(chatId, name);
			}
		}

		if (checkCleaningDetails(data)) {
			optionCleaning['typeCleaning'] = typeCleaning;
			if (!isEmpty && optionCleaning['frequencyOfCleaning'] == '') {
				bot.sendMessage(chatId, `${name}. \nFrequency of cleaning`,
					frequencyOfCleaning);
			} else {
				sendConfirmInfo(chatId, name);
			}
		}

		if (checkFrequency(data)) {
			optionCleaning['frequencyOfCleaning'] = frequencyOfCleaningValue;
			if (!isEmpty && optionCleaning['extraArea'] == '') {
				bot.sendMessage(chatId, `${name}. \nSelect extra area`,
					selectExtraArea);
			} else {
				sendConfirmInfo(chatId, name);
			}
		}

		if (checkExtraArea(data)) {
			const checkItem = optionCleaning['extraArea'].includes('\n' + '✅ ' + extraArea);
			if (checkItem != true) {
				optionCleaning['extraArea'].push('\n' + '✅ ' + extraArea);
			} else {
				for (let i = 0; i < optionCleaning['extraArea'].length; i++) {
					if ((optionCleaning['extraArea'][i]) == ('\n' + '✅ ' + extraArea)) {
						optionCleaning['extraArea'].splice(i, 1);
					}
				}
			}
			bot.sendMessage(chatId, `${name} you choose: \n ${optionCleaning['extraArea']} \nSomething else?`,
				selectExtraArea);
		}

		if (data == 'Confirm options') {
			sendConfirmInfo(chatId, name);
		}

		if (data == 'Change options') {
			bot.sendMessage(chatId, `${name}`,
				optionsCleaning);
		}

		if (data == 'Change info') {
			bot.sendMessage(chatId, `${name}. Do you want to go back to the selection ? `,
				buttonChangeInfo);
		}
		if (data == 'Send info') {
			bot.sendMessage(chatId, `Check the correctness of the data:
			\n Bedroom: ${optionCleaning['amountBedrooms']}
			\n Bath: ${optionCleaning['amountBath']}
			\n Half bath: ${optionCleaning['amountHalfBath']}
			\n Type cleaning: ${optionCleaning['typeCleaning']}
			\n Frequency of cleaning: ${optionCleaning['frequencyOfCleaning']}
			\n Extra area: ${optionCleaning['extraArea']}
			\n${name}
			\n${localData['zipCode']}
			\n${localData['phone']}
			\n${localData['email']} `);
		}

		if (data == 'Provide contact information') {
			checkProdiveInfo = data;
			if (localData['zipCode'] == '') {
				bot.sendMessage(chatId, `${name}, Enter your ZIP`);
			} else {
				bot.sendMessage(chatId, `Check the correctness of the data: \n${name}
				\n${localData['zipCode']}
				\n${localData['phone']}
				\n${localData['email']} `,
					buttonSendInfo);
			}
		}

		if (data == 'Change amount bedrooms') {
			bot.sendMessage(chatId, `${name}. \nAny extra room, bonus room, office room, ect is considered as an additional bedroom`,
				listBedrooms);
		}

		if (data == 'Full Bath') {
			bot.sendMessage(chatId, `${name}. \nFull Bath`,
				listBath);
		}

		if (data == 'Half Bath') {
			bot.sendMessage(chatId, `${name}. \nHalf Bath. Any extra room, bonus room, office room, ect is considered as an additional bedroom`,
				listHalfBath);
		}

		if (data == 'Type of cleaning') {
			bot.sendMessage(chatId, `${name}. \nType of cleaning`,
				cleaningDetails);
		}

		if (data == 'Frequency of cleaning') {
			bot.sendMessage(chatId, `${name}. \nFrequency of cleaning`,
				frequencyOfCleaning);
		}

		if (data == 'Extra area') {
			bot.sendMessage(chatId, `${name}. \nExtra area`,
				selectExtraArea);
		}

		if (data == 'Change Zip') {
			localData['zipCode'] = '';
			bot.sendMessage(chatId, `${name}, Enter your ZIP`);
		}

		if (data == 'Change Phone') {
			localData['phone'] = '';
			bot.sendMessage(chatId, `${name}, Enter your phone`);
		}

		if (data == 'Change Email') {
			localData['email'] = '';
			bot.sendMessage(chatId, `${name}, Enter your email`);
		}
		else {
			bot.sendMessage(chatId, `${name}, ${text} `);
		}
	});
}

start();