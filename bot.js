require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { listOptions, buttonYesOrNo, buttonReturn, buttonSendInfo, buttonChangeInfo } = require('./options');

// const express = require('express');
// const bodyParser = require('body-parser');
// const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });
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


const locationStorage = {
	info: []
};
const isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/
const regexPhone = /^\+?([0-9]{4})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

const privateID = 556744792;

const localData = {
	id: '',
	name: '',
	prof: '',
	zipCode: '',
	phone: '',
	email: '',
};


const start = () => {
	bot.on('message', async (msg) => {


		console.log(msg);
		let date = new Date(msg.date * 1000);
		let timestamp = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + "@" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

		const text = msg.text;
		const chatId = msg.chat.id;
		const name = msg.from.first_name;
		const data = { data: text };

		localData['id'] = chatId;
		localData['name'] = name;

		if (text === '/start') {
			await bot.sendMessage(chatId, `${name}, glad to see you got into the telegram bot.`);
			return await bot.sendMessage(chatId, 'List of ours suggestions.', listOptions);
		}

		if (text === '/list') {
			return bot.sendMessage(chatId, `List of suggestions`, listOptions);
		}
		console.log(localData);

		if (isValidZip.test(text)) {
			const zipCode = msg.text;
			localData['zipCode'] = zipCode;

			if (localData['phone'] == '') {
				return bot.sendMessage(chatId, `Enter your phone`);
			} else {
				bot.sendMessage(chatId, `Check the correctness of the data \n${name}
				\n${localData['prof']}
				\n${localData['zipCode']}
				\n${localData['phone']}
				\n${localData['email']}`, buttonSendInfo);
			}
		}

		if (regexPhone.test(text)) {
			const phone = msg.text;
			localData['phone'] = phone;
			if (localData['email'] == '') {
				await bot.sendMessage(chatId, `Enter your email`);
			} else {
				bot.sendMessage(chatId, `Check the correctness of the data \n${name}
				\n${localData['prof']}
				\n${localData['zipCode']}
				\n${localData['phone']}
				\n${localData['email']}`, buttonSendInfo);
			}
		}

		if (validateEmail(text)) {
			const email = msg.text;
			localData['email'] = email;
			console.log(localData);

			return await bot.sendMessage(chatId, `Check the correctness of the data \n${name}
			\n${localData['prof']}
			\n${localData['zipCode']}
			\n${localData['phone']}
			\n${localData['email']}`, buttonSendInfo);
		} else {
			if (localData['zipCode'] !== ''
				&& localData['phone'] !== ''
				&& localData['email'] !== '') {
				bot.sendMessage(chatId, `${name}. Do you want to go back to the selection ${data}?`, buttonYesOrNo);
			}
			const zip = localData['zipCode'];
			function checkZip(zip) {
				return zip.length !== 7 && zip == '' ? false : true;
			}
			if (!isValidZip.test(text) && checkZip(text) && localData['prof'] !== '') {
				bot.sendMessage(chatId, `${name}, Example ZIP 81700`);
			}
			if (!regexPhone.test(text) && localData['zipCode'] !== '' && localData['email'] == '') {
				bot.sendMessage(chatId, `${name}, Enter your phone example +380938070439`);
			}
			if (!validateEmail(text) &&
				localData['phone'] !== ''
				&& localData['zipCode'] !== ''
				&& localData['email'] == '') {
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
		//console.log(resp);
		// send back the matched "whatever" to the chat
		bot.sendMessage(chatId, resp);
	});

	bot.on('callback_query', msg => {
		//console.log(msg.data);
		const data = msg.data;
		const chatId = msg.message.chat.id;
		const name = msg.from.first_name;

		if (data == 'Front end'
			|| data == 'Back end'
			|| data == 'Design'
			|| data == 'QA'
			|| data == 'SMM'
			&& data != 'Yes'
			&& data !== 'No'
			&& data !== 'Return') {
			var prof = msg.data;

			bot.sendMessage(chatId, `${name}. Do you want to go back to the selection ${data}?`, buttonYesOrNo);

		}
		if (data == 'Change info') {
			bot.sendMessage(chatId, `${name}. Do you want to go back to the selection?`, buttonChangeInfo);
		}
		if (data == 'Send info') {
			bot.sendMessage(chatId, `Check the correctness of the data \n${name}
			\n${localData['prof']}
			\n${localData['zipCode']}
			\n${localData['phone']}
			\n${localData['email']}`);
		}
		if (data == 'Yes') {
			localData['prof'] = prof;
			// checkYes(data);
			if (localData['zipCode'] == '') {
				bot.sendMessage(chatId, `${name}, Enter your ZIP`);
			} else {
				bot.sendMessage(chatId, `Check the correctness of the data \n${name}
				\n${localData['prof']}
				\n${localData['zipCode']}
				\n${localData['phone']}
				\n${localData['email']}`, buttonSendInfo);
			}
		}
		if (data == 'No') {
			bot.sendMessage(chatId, `${name}, хочете повернутись до вибору?`, buttonReturn);
		}
		if (data == 'Change Zip') {
			bot.sendMessage(chatId, `${name}, Enter your ZIP`);
		}
		if (data == 'Change Phone') {
			bot.sendMessage(chatId, `${name}, Enter your phone`);
		}
		if (data == 'Change Email') {
			bot.sendMessage(chatId, `${name}, Enter your email`);
		}
		if (data == 'Return' || data == 'Choose a service') {
			bot.sendMessage(chatId, `List of suggestions`, listOptions);
		}
		else {
			bot.sendMessage(chatId, `${name}, ${text}`);
		}

	});
}

start();