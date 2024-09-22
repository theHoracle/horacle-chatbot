import { defineConfig } from 'drizzle-kit';

   export default defineConfig({
    dialect: 'sqlite',
     schema: './server/database/schema.ts',
     out: './server/database/migrations',
     driver: 'd1-http',
        // https://horacle-football-trivia.princemjames2.workers.dev
   });