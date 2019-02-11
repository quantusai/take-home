import * as express from "express";

const PORT = 3000;

const app: express.Application = express();

app.listen(PORT, () => {
  console.log("Express server up and running on port: ", PORT);
});
