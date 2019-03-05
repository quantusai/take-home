const knex = require('knex');

exports.up = async function(knex, Promise) {
    const source = await knex.schema.createTable('source', table => {
        table.uuid('id').primary()
        table.string('name')
        table.string('environment')
        table.string('encoding')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at')
    })

    const message = await knex.schema.createTable('message', table => {
        table.uuid('id').primary()
        table.uuid('source_id')
        table.text('message')
        table.string('status')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
        table.timestamp('deleted_at')

        table.foreign('source_id').references('id').inTable('source')
        table.unique(['id', 'source_id'])
    })

    return await Promise.all([source, message])
 };
 

exports.down = async function(knex, Promise) {
    const qDrop = `
    DROP TABLE IF EXISTS source;
    DROP TABLE IF EXISTS message;
    `
    await knex.raw(qDrop);
};
