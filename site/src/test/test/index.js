import React, { useState, useEffect } from 'react';
import './index.scss';
import { FotoUsuario, DadosUser, FotoNova } from '../../connection/userAPI';
import { BuscarImagem } from '../../connection/productAPI';

import storage from 'local-storage';
import { toast } from 'react-toastify';
export default function AddProductTest() {
  // Parte do bot
  const [IQuestion, setIQuestion] = useState('');
  const [Resposta, setResposta] = useState('');

  async function GPTbro() {
    const OPENAI_API_KEY = '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';

    try {
      const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + OPENAI_API_KEY,
        },
        body: JSON.stringify({
          prompt: IQuestion,
          max_tokens: 2048,
          temperature: 0.5,
        })
      });

      const json = await response.json();

      if (json.error?.message) {
        setResposta(`Error: ${json.error.message}`);
      } else if (json.choices?.[0].text) {
        const text = json.choices[0].text || "Sem resposta";
        setResposta(text);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  function handleInputChange(event) {
    setIQuestion(event.target.value);
  }

  async function handleButtonClick() {
    await GPTbro();
  }

  function handleInputKeyPress(event) {
    if (event.key === "Enter") {
      GPTbro();
    }
  }

  const [dados, setdados] = useState([])
  const [erro, setErro] = useState('')
  const [imagem, setImagem] = useState(null);
  const [idUser, setIdUser] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      try {
        const idusuario = storage('user-logado');
        
        if (idusuario && idusuario.id) {
          setIdUser(idusuario.id);
  
          const resposta = await DadosUser(idUser);
          setdados(resposta.data);  // Altere aqui, use resposta.data em vez de resposta
        } else {
          // Lida com a situação em que idusuario ou idusuario.id não está definido
          console.error('Valor inválido para idusuario:', idusuario);
        }
      } catch (err) {
        toast.error('Erro ao carregar dados do usuário.');
      }
    }
  
    carregarDados();
  }, [idUser]);
  


  async function Imagem() {
    try {
      if (!imagem) {
        toast.error('Imagem não selecionada');
        return;
      }
  
      if (idUser === 0) {
        throw new Error('Usuario não logado');
      }
  
      // Verifique se o usuário já possui uma imagem
      const resposta = await DadosUser(idUser);
  
      if (resposta.data && resposta.data.length > 0 && resposta.data[0].img_cliente) {
        // Se já existe uma imagem, atualize-a usando a função FotoNova
        await FotoNova(idUser, imagem);
        toast.success('Imagem do usuário atualizada com SUCESSO!');
      } else {
        // Se não existe uma imagem, adicione uma nova usando a função FotoUsuario
        await FotoUsuario(idUser, imagem);
        toast.success('Imagem do usuário adicionada com SUCESSO!');
      }
    } catch (err) {
      toast.error(err.message);
  
      if (err.response && err.response.status === 400) {
        toast.error(err.message);
  
        if (err.response.status === 400) {
          setErro(err.response.data.erro);
        } else {
          toast.error('Usuario não logado, tente novamente');
        }
      }
    }
  }

  function EscolherImagemDIV() {
    document.getElementById('file').click();
  }

  function mostarImagem() {
    if (typeof imagem === 'object') {
      return URL.createObjectURL(imagem);
    } else {
      return BuscarImagem(imagem);
    }
  }
  console.log(idUser)
  console.log(dados)
  return (
    <div id='AddProductTest'>
      <div>
        <input
          type="text"
          value={IQuestion}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <button onClick={handleButtonClick}>Enviar</button>
      </div>
      <div>
        <p>Resposta: {Resposta}</p>
      </div>

      <div onClick={EscolherImagemDIV}>
      {!imagem && 
                  <img src="/assets/images/adm/upload-minimalistic-svgrepo-com.svg"  id='imagem-capa' alt="" />  
                }
                {
                imagem && 
                <img id='imagem-capa' src={mostarImagem()} alt="" />
                }
                <input type="file" id="file" onChange={e => setImagem(e.target.files[0])}/>
      </div>
      <button onClick={Imagem}>AQUI</button>  

            <div>
        {dados.map(item => {
          console.log('Item no array:', item);
          return (
            <div key={item.id}>
              <p>{item.nm_cliente}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
}
