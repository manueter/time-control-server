  import { Pool } from 'pg';

  const pool = new Pool(
    {
      connectionString: process.env.DATABASE_URL, 
      ssl: {
        rejectUnauthorized: false, // Required for Render's PostgreSQL or similar services
      },
    }
  );

  export default pool;
