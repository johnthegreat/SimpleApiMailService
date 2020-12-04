"use strict";
const _ = require('lodash');
const nodemailer = require("nodemailer");
require('dotenv').config();

const express = require('express');
const router = express.Router();

const UsernamePasswordKeyPair = require('../../UsernamePasswordKeyPair');

const logins = [];
logins.push(new UsernamePasswordKeyPair(process.env.LOGIN_USERNAME,process.env.LOGIN_PASSWORD));

router.post('/api/mail', async function(req, res) {
	try {
		const username = req.body['username'];
		const password = req.body['password'];

		let foundLogin = false;
		for (let i = 0; i < logins.length; i++) {
			let usernamePasswordKeyPair = logins[i];

			if (usernamePasswordKeyPair.username === username && usernamePasswordKeyPair.password === password) {
				foundLogin = true;
				break;
			}
		}

		if (!foundLogin) {
			res.status(401).send({status: "Not Authorized"});
			return;
		}

		const from = req.body['from'];
		const to = req.body['to'];
		const subject = req.body['subject'];
		const message = req.body['message'];

		if (_.isEmpty(from)) {
			res.status(400).send({ status: "error", errors: ["From is empty."]});
			return;
		}

		if (_.isEmpty(to)) {
			res.status(400).send({status: "error", errors: ["To is empty."]});
			return;
		}

		// if (_.isEmpty(subject)) {
		// 	res.status(400).send({status: "error", errors: ["Subject is empty."]});
		// 	return;
		// }

		if (_.isEmpty(message)) {
			res.status(400).send({status: "error", errors: ["Message is empty."]});
		}

		let transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			secure: process.env.EMAIL_SECURE === "true",
			auth: {
				user: process.env.EMAIL_USERNAME,
				pass: process.env.EMAIL_PASSWORD
			}
		});

		// send mail with defined transport object
		const info = await transporter.sendMail({
			from: from,
			to: to,
			subject: subject,
			html: message
		});

		console.log("Message sent: %s", info.messageId);
		res.status(204).send();
	} catch (e) {
		console.error(e);
		res.status(500).send(e);
	}
});
module.exports = router;
