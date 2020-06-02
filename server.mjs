import express from 'express';
import loaders from './loaders';


async function startServer() {
  const app = express();

  await loaders({
    app: app
  }).catch((e) => console.log(e));

  app.listen(process.env.PORT, err => {
    console.log(`Your server is ready !`);
  });
}

startServer();
