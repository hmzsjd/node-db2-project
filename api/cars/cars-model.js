const db = require('../../data/db-config')


function getAll() {
  return db('cars');
}

function getById(id) {
  return db('cars').where('id', id).first(); 
}

const create = async (newCar) => {
  const id = await db('cars')
    .insert(newCar)
  
  return await getById(id)
}

module.exports = {
  getAll,
  getById,
  create,
};
