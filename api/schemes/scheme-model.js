// scheme-model
const db = require('../../data/db-config.js');

module.exports = {
    find, 
    findById, 
    findSteps, 
    add, 
    update, 
    remove
}

function find() {
    return db('schemes')
}

function findById(id) {
    return db('schemes').where({ id }).first();
}

function findSteps(id) {
    return db('steps as s')
        .join('schemes as sc', 'sc.id', 's.step_id')
        .where({ step_id: id })
        .select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions');
}

async function add(schemesData) {
    const ids = await db('schemes').insert(schemesData);
    return newScheme = await findById(ids[0]);
}

async function update(id, changes) {
    await db('schemes').where({ id }).update(changes);
    return await findById(id);
}

async function update(id, changes) {
    await db('users').where({ id }).update(changes);
    return await findById(id);
}

async function remove(id) {
    return await db('schemes').del().where({ id });
}