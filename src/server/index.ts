import * as express from "express";
import * as Knex from "knex";
import * as bodyParser from "body-parser";
import * as uuid from "uuid/v4";

const knexcfg = require('./knexfile');

const knex = Knex(knexcfg);
const PORT = 8888;
const app: express.Application = express();

app.use(bodyParser.json());
app.get('/source', async (req: express.Request, res: express.Response) => {
  try{
    const result = await knex.select().from('source');
    res.status(200).send({data: result});
  } catch(e) {
    res.status(500).send({error: e.message});
  }
});

app.get('/source/:id', async (req: express.Request, res: express.Response) => {
  try{
    const sourceId = req.param('id');
    const result = await knex('source').where({id: sourceId}).first();
    if (!result){
      throw Error("Not Found");
    }
    res.status(200).send({data: result});
    return;
  } catch(e) {
    if (e.message === "Not Found"){
      res.status(404).send({status: 404, msg: e.message});
      return;
    }
    res.status(500).send({status: 500, error: e.message});
    return;
  }
})

app.get('/source/:id/message', async (req: express.Request, res: express.Response) => {
  try{
    const sourceId = req.param('id');
    const result = await knex.select().from('message').where({source_id: sourceId});
    res.status(200).send({data: result});
    return;
  } catch(e) {
    if (e.message === "Not Found"){
      res.status(404).send({status: 404, msg: e.message});
      return;
    }
    res.status(500).send({status: 500, error: e.message});
    return;
  }
})


app.post('/source', async (req: express.Request, res: express.Response) => {
  const source = req.body
  try{
    source.id = uuid();
    const result = await knex('source').insert(source);
    res.status(201).send({data: result});
    return;
  } catch(e) {
    res.status(500).send({error: e.message});
    return;
  }
});

app.put('/source/:id', async (req: express.Request, res: express.Response) => {
  try{
    const sourceId = req.param('id');
    const uSource = req.body;
    const result = await knex('source').where({id: sourceId}).update(uSource);
    if (!result){
      throw Error("Not Found");
    }
    res.status(200).send({data: result});
    return;
  } catch(e) {
    if (e.message === "Not Found"){
      res.status(404).send({status: 404, msg: e.message});
      return;
    }
    res.status(500).send({status: 500, error: e.message});
    return;
  }
})


app.get('/message', async (req: express.Request, res: express.Response) => {
  try{
    const result = await knex.select().from('message');
    res.status(200).send({data: result});
  } catch(e) {
    res.status(500).send({error: e.message});
    return;
  }
});

app.post('/message', async (req: express.Request, res: express.Response) => {
  const message = req.body
  try{
    message.id = uuid();
    const result = await knex('message').insert(message);
    res.status(201).send({data: result});
    return;
  } catch(e) {
    res.status(500).send({error: e.message});
    return;
  }
});

app.get('/message/:id', async (req: express.Request, res: express.Response) => {
  try{
    const messageId = req.param('id');
    const result = await knex('message').where({id: messageId}).first();
    if (!result){
      throw Error("Not Found");
    }
    res.status(200).send({data: result});
    return;
  } catch(e) {
    if (e.message === "Not Found"){
      res.status(404).send({status: 404, msg: e.message});
      return;
    }
    res.status(500).send({status: 500, error: e.message});
    return;
  }
})

app.put('/message/:id', async (req: express.Request, res: express.Response) => {
  try{
    const messageId = req.param('id');
    const uMessage = req.body;
    const result = await knex('source').where({id: messageId}).update(uMessage);
    if (!result){
      throw Error("Not Found");
    }
    res.status(200).send({data: result});
    return;
  } catch(e) {
    if (e.message === "Not Found"){
      res.status(404).send({status: 404, msg: e.message});
      return;
    }
    res.status(500).send({status: 500, error: e.message});
    return;
  }
})


app.listen(PORT, () => {
  console.log("Express server up and running on port: ", PORT);
});
