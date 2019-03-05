
const uuid = require('uuid/v4');
exports.seed = async function(knex, Promise) {

  const sourceMeta = [
        {id: '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48', msgCount: 6000, errorRate: 10},
        {id: 'f7516443-c498-4493-9acc-c854ca2e873a', msgCount: 300, errorRate: 1},
        {id: '4e7cb748-9d37-4705-9d16-bd68a80afc39', msgCount: 10000, errorRate: 3.5},
        {id: 'f4f96516-c5ec-43bb-ba21-da1f35dacf8a', msgCount: 100, errorRate: 47},
        {id: '914d66ba-4368-450a-870b-d8fcd7fd34d6', msgCount: 1000, errorRate: 5},
  ];

  const dummyMsgs = [];
  const statusStates = ['enqueued', 'processing', 'finished']
  
  sourceMeta.map(sm => {

    Array(sm.msgCount).fill().map(_ =>{
      dummyMsgs.push({
            id: uuid(),
            source_id: sm.id, 
            message: "Placeholder Message",
            status: sm.errorRate >= Math.floor(Math.random() * 100) ? 'error' : statusStates[Math.floor(Math.random() * statusStates.length)], 
      });
    })
  })

 // SELECT source_id, status, count(*) from message GROUP BY status, source_id;
  await Promise.all([
    knex('source').del(),
    knex('source').insert([
          {id: '80fe6e1e-6f1b-4b3c-957c-275d12bb3e48', name: 'Redox Memorial Hospital', environment: 'staging', encoding: 'utf8'},
          {id: 'f7516443-c498-4493-9acc-c854ca2e873a', name: `St. Lloyd Children's Hospital`, environment: 'development', encoding: 'latin1'},
          {id: '4e7cb748-9d37-4705-9d16-bd68a80afc39', name: `Chicago University Health System`, environment: 'production', encoding: 'latin1'},
          {id: 'f4f96516-c5ec-43bb-ba21-da1f35dacf8a', name: `The Hendrick Institute`, environment: 'development', encoding: 'utf8'},
          {id: '914d66ba-4368-450a-870b-d8fcd7fd34d6', name: `The Downum Center for Advanced Clinical Trials`, environment: 'production', encoding: 'utf8'},
    ]),
    knex('message').del(),
    knex.batchInsert('message', dummyMsgs, 200),
  ]);

};
