import 'dotenv/config'

import express from 'express';
import cors from 'cors'


import userController from './controller/userController.js'
import jogosController from './controller/jogosController.js'
import produtosController from './controller/produtosController.js'
import noticiasController from './controller/noticiasController.js'
import admController from './controller/admController.js'


const server = express();
server.use(cors());
server.use(express.json());

server.use('/tools/image', express.static('tools/image'));
server.use('/tools/profile_images', express.static('tools/profile_images'));
server.use('/tools/now', express.static('tools/now'));

server.use(userController);
server.use(jogosController);
server.use(produtosController);
server.use(noticiasController);
server.use(admController);

server.listen(process.env.PORT, () => console.log(`API Game Sync 🎮 conectado! ${process.env.PORT}`));
