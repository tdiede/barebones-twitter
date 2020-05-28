import expressLoader from './express';
import postgresLoader from './postgres';

const loaders = async ({app}) => {
  await expressLoader({expressApp: app}).catch((e) => console.log(e));
  console.log('Express app intialized .');

  await postgresLoader().catch((e) => console.log(e));
  console.log('Postgres db connected .')
};

export default loaders;
