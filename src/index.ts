import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import initializer  from './routes/initializer';
import splitter from './routes/splitter';
import merger from './routes/merger';
import vertex from './routes/vertex';
import graph from './routes/graph';
import edge from './routes/edge';
import dotenv from 'dotenv';
import { expand } from 'dotenv-expand';
import cors from 'cors';
import mongoose from 'mongoose';

const dotenvConfig = dotenv.config();
expand(dotenvConfig);

const app: Express = express()
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

app.use('/graph', initializer, splitter, merger, graph, edge, vertex);
app.get('/', (req: Request, res: Response) => {
    res.send('Hello from graph-solver!')
})

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGODB_URI || '');
}

app.listen(port, () => {
    console.log(`graph-solver application listening on port: ${port}`)
})