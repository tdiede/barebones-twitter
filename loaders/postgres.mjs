import pkg from 'pg';
const {
  Client
} = pkg;

// pg db config
const PGUSER = 'theresemariediede',
  PGHOST = 'localhost',
  PGPASSWORD = 'password',
  PGDATABASE = 'twitter',
  PGPORT = 5432;

const postgresLoader = async () => {
  const client = new Client({
    user: PGUSER,
    host: PGHOST,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: PGPORT,
  });

  await client.connect().catch((e) => console.log(e))
};

export default postgresLoader;
