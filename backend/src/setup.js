import 'dotenv/config';
import pg from 'pg';

const { Client } = pg;

async function main() {
  const admin = new Client({ connectionString: process.env.DATABASE_URL.replace('/carrito_productos', '/postgres') });
  await admin.connect();
  await admin.query(`CREATE DATABASE carrito_productos`);
  await admin.end();
  console.log('Base de datos carrito creada.');

  const db = new Client({ connectionString: process.env.DATABASE_URL });
  await db.connect();
  await db.query(`
    CREATE TABLE if not exists productos (
   id serial PRIMARY KEY,
   nombre varchar(60) not null,
   precio DECIMAL(10,2) not null,
   stock INTEGER not null
)
  `);
  await db.end();
  console.log('Tabla productos creada.');
}

main().catch((error) => {
  console.error('Error en setup:', error.message);
  process.exit(1);
});