import 'dotenv/config'
import { conx } from './Repository/connecion.js';

import express from 'express';
import cors from 'cors'

import userController from './controller/userController.js'
import jogoController from './controller/jogoController.js'

const server = express();
server.use(cors());
server.use(express.json());


server.use('/tools/image', express.static('tools/image'));


server.use(userController);
server.use(jogoController);

server.listen(process.env.PORT, () => console.log(`API Game Sync 🎮 conectado! ${process.env.PORT}`));
