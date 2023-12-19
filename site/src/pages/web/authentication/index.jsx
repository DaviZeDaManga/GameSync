import './index.scss';
import { Link } from 'react-router-dom';


import storage from 'local-storage';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function CadastroUser(){

  return(
    <div id='CadastroUser'>
        <main className='all'>
          
          <figure className='card'>
            <div id="cadastro">
              <form method="post" action="">
                <p>
                  <label htmlFor="nome_cad"><strong>Seu nome</strong></label>
                  <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="Luiz Augusto" />
                </p>
                <p>
                  <label htmlFor="email_cad"><strong>Seu e-mail</strong></label>
                  <input id="email_cad" name="email_cad" required="required" type="email" placeholder="contato@htmlecsspro.com" />
                </p>
                <p>
                  <label htmlFor="senha_cad"><strong>Sua senha</strong></label>
                  <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="1234" />
                </p>
                <p>
                  <label htmlFor="senha_cad"><strong>Repetir Senha</strong></label>
                  <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="1234" />
                </p>
                <p>
                  <label htmlFor="senha_cad"><strong>CPF</strong></label>
                  <input id="senha_cad" name="senha_cad" required="required" type="number" placeholder="123.123.123-12" />
                </p>
                <p>
                  <label htmlFor="senha_cad"><strong>Número</strong></label>
                  <input id="senha_cad" name="senha_cad" required="required" type="number" placeholder="(99) 12345-6789" />
                </p>
                <p>
                    <button value="Cadastrar">Cadastrar</button>
                </p>
                <p className="link">
                  <Link to='/login'>Ir para Login?</Link>
                </p>
              </form>
            </div>
          </figure>

        </main>
    </div>
  )
}