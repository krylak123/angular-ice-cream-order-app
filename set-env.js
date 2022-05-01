const dotenv = require('dotenv');
const fs = require('fs');

fs.readFile('.env', err => {
  if (err) {
    throw new Error('There is no .env file.');
  }

  dotenv.config();

  const content = `
export const environment = {
  production: ${process.env.PRODUCTION},
  firebaseConfig: {
    apiKey: "${process.env.API_KEY}",
    authDomain: "${process.env.AUTH_DOMAIN}",
    projectId: "${process.env.PROJECT_ID}",
    storageBucket: "${process.env.STORAGE_BUCKET}",
    messagingSenderId: "${process.env.MESSAGING_SENDER_ID}",
    appId: "${process.env.APP_ID}",
  }
}`;

  fs.writeFile('./src/environments/environment.ts', content, err => {
    if (err) {
      console.log(err);
      return;
    }

    console.log('** environment.ts added');
    console.log('** file connent:');
    console.log(content);
    console.log('** file end:');
  });
});
