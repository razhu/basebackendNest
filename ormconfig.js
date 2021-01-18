module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'agetic',
    password: 'agetic',
    database: 'borrar',
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
    cli: {
        migrationsDir: 'src/migrations'
    }
}