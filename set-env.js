const dotenv = require('dotenv');
const fs = require('fs');

fs.readFile('.env', err => {
  if (err) {
    throw new Error('There is no .env file.');
  }

  dotenv.config();

  const content = `
export const environment = {
  API_URL: "${process.env.API_URL}",
  production: ${process.env.PRODUCTION}
};
`;

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
