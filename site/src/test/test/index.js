import React, { useState } from 'react';
import './index.scss';

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
    </div>
  );
}
