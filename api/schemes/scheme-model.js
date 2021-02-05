// scheme-model
const db = require('../../data/db-config.js');

module.exports = {
    find, 
    findById, 
    findSteps, 
    add, 
    addStep,
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
    return db('steps as st')
      .join(
          'schemes as sch', 
          'st.scheme_id', 
          'sch.id'
          )
      .select(
          'st.id', 
          'st.step_number', 
          'st.instructions', 
          'sch.scheme_name'
          )
      .where('sch.id', id);
  }

async function add(schemesData) {
    const ids = await db('schemes').insert(schemesData);
    return newScheme = await findById(ids[0]);
}

async function addStep(step, id) {
    const ids = await db('steps').insert(step);
    return db('steps')
        .insert(step, id)
        .where({id: ids[0]})
}

async function update(changes, id) {
    await db('schemes').where({ id }).update(changes);
    return await findById(id);
}

async function remove(id) {
    return await db('schemes').del().where({ id });
}