  import { Pool } from 'pg';

  // Determine the correct configuration based on the environment
  const isProduction = true;
  
  const pool = new Pool(
    isProduction
      ? {
          connectionString: process.env.DATABASE_URL, // For Render or other hosted DBs
          ssl: {
            rejectUnauthorized: false, // Required for Render's PostgreSQL or similar services
          },
        }
      : {
          user: process.env.DB_USER,     
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          password: process.env.DB_PASSWORD,
          port: parseInt(process.env.DB_PORT ?? '5432'),
        }
  );

  export default pool;
