# SimpleApiMailService

A very simple service providing an API to send emails. This was a one-off project to allow an Arduino to send emails to the owner.

_I am simply open sourcing this project in case someone finds it useful; I will not be supporting it._

Note: This project provides very little validation and might be used to send spam emails if not properly secured.

## Requirements

- Node
- Email Account with SMTP access (Gmail, SendGrid, etc.)

## Installation

1. Clone or download the repo.
2. Run `yarn` or `npm install`.
3. Copy `.env.example` to `.env` and configure as needed. Configuration options are documented below.
4. Run `node bin/www`.

## .env Options

`env`: Environment can be `development` or `production`.

`PORT`: Port number the service should listen on. If not specified, defaults to `3001`.

`EMAIL_HOST`: SMTP Host that email should be sent through.

`EMAIL_PORT`: SMTP Port number that SMTP Host listens on.

`EMAIL_SECURE`: Whether the SMTP Host is using a secure connection. `true` or `false`.

`EMAIL_USERNAME`: Username to use to login to SMTP Host.

`EMAIL_PASSWORD`: Password to use to login to SMTP Host.

`LOGIN_USERNAME`: Username used to authenticate a user connecting to this service.

`LOGIN_PASSWORD`: Password used to authenticate a user connecting to this service.

## Endpoint

`POST /api/mail` (See `controllers/api/mail.js`)

POST Body:

- `username` Username should match `LOGIN_USERNAME` to successfully login.
- `password` Password should match `LOGIN_PASSWORD` to successfully login.
- `from` Email From header
- `to` Email To header
- `subject` Email Subject
- `message` Email Message

## License

Copyright &copy; 2020 John Nahlen

MIT License (see `LICENSE.md`)
