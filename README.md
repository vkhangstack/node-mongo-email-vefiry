# node-mongo-email-verify

## Execution environment

- Node.js - 14.x
- Docker - 20.10.7
- MongoDB - 4.4.x
- Docker Compose - 1.29.x
  - MailHog - latest

## Library used

- mongoose -
- crypto - 1.0.x
- dotenv - 10.0.x
- express - 4.17.x
- joi - 17.4.x
- mongoose - 6.0.x
- nodemailer - 6.6.x

## Operation check

### 1. Download sample

```bash
git clone git@github.com:vkhangstack/node-mongo-email-verify.git
```

### 2. Package installation

```bash
cd node-mongo-email-verify
npm install
```

### 3. Start mail server

```bash
docker-compose up -d
```

### 4. Launch sample

```bash
npm run start
```

## Sample source

### docker-compose.yml

```yml
version: '3'

services:
  mailhog:
    image: mailhog/mailhog:latest
    ports:
      - '8025:8025'
      - '1025:1025'
    environment:
      MH_STORAGE: maildir
      MH_MAILDIR_PATH: /tmp
    volumes:
      - maildir:/tmp
volumes:
  maildir: {}
```

### /utils/email.js

```js
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: '127.0.0.1',
      port: '1025',
      auth: {
        user: 'user',
        pass: 'password',
      },
    });

    await transporter.sendMail({
      from: 'mailhog@localhost.com',
      to: email,
      subject: subject,
      text: text,
    });
    transporter.close();
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Email not sent');
  }
};

module.exports = sendEmail;
```
