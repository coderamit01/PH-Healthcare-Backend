import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";

const app:Application = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/v1', IndexRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Wooo Server is running!');
});



export default app;