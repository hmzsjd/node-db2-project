// STRETCH
exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert([
      { vin: '2C1MR2295T6789740', make: "Tesla", model: "Model S", mileage: 11123, title: "CA", transmission: "AUTO" },
      { vin: 'JA3AP57J5SY000719', make: "Porsche", model: "911", mileage: 22234, title: "CA", transmission: "AUTO" }
    ]);
  };