import pgPromise from 'pg-promise';

const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL || 'postgres://username:password@localhost:5432/wallet_db');

export default db;