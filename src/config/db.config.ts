// import 'dotenv/config';

// export const config = {
//   HOST: process.env.DB_HOST || '127.0.0.1',
//   USER: process.env.DB_USER,
//   PASSWORD: process.env.DB_PASS,
//   DB: process.env.DB_NAME,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };

// export const dialect = "postgres";

export const config = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "123",
  DB: "testdb",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const dialect = "postgres";