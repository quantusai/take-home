
exports.seed = async function(knex, Promise) {
  await knex('source').del();
  await knex('source').insert([
        {id: '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48', name: 'Redox Memorial Hospital', environment: 'staging', encoding: 'utf8'},
        {id: 'f7516443-c498-4493-9acc-c854ca2e873a', name: `St. Lloyd Children's Hospital`, environment: 'development', encoding: 'latin1'},
        {id: '4e7cb748-9d37-4705-9d16-bd68a80afc39', name: `Chicago University Health System`, environment: 'production', encoding: 'latin1'},
        {id: 'f4f96516-c5ec-43bb-ba21-da1f35dacf8a', name: `The Hendrick Institute`, environment: 'development', encoding: 'utf8'},
        {id: '914d66ba-4368-450a-870b-d8fcd7fd34d6', name: `The Downum Center for Advanced Clinical Trials`, environment: 'production', encoding: 'utf8'},
  ]);

  await knex('message').del();
  await knex('message').insert([
        {id: '564c83b7-891e-4363-9e06-796264390d7b', source_id: '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48', message: 'Placeholder Msg', status: 'error'},
        {id: '2363d9f5-1e06-4eea-bf33-dec3ac4912c6', source_id: '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48', message: 'Placeholder Msg', status: 'enqueued'},
  ]);
};
