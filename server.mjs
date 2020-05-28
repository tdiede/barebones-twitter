import express from 'express';
import loaders from './loaders';


// process.env
const PORT = 5000;


async function startServer() {
  const app = express();

  await loaders({
    app: app
  }).catch((e) => console.log(e));

  app.listen(PORT, err => {
    console.log(`Your server is ready !`);
  });
}

startServer();
