import {consola} from 'consola'
import { migrate } from 'drizzle-orm/d1/migrator'


export default defineNitroPlugin(async() => {
    if(!import.meta.dev) {
        return
    }
    onHubReady(async () => {
        consola.info('NuxtHub bindings are ready!')
          
        // migrate the database
        await migrate(useDrizzle(), {
            migrationsFolder: 'server/database/migrations',
        })
        .then(() => {
            consola.success('Database migrated successfully')
        })
        .catch((error) => {
            consola.error('Database migration failed', error)
        })
    })
})