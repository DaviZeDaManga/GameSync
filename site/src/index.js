import './index.scss'

import React from 'react';
import ReactDOM from 'react-dom/client';

import Routess from './Routes.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'react-confirm-alert/src/react-confirm-alert.css';
import 'animate.css';

import 'atropos/css'

<link rel="stylesheet" href="path/to/atropos.css" />

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Routess />
  </React.StrictMode>
);



