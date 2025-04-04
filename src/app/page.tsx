'use client';

import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [pergunta, setPergunta] = useState('');
  const [resposta, setResposta] = useState('');

  const lidarComMudancaPergunta = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPergunta(event.target.value);
  };

  const fazerPergunta = async () => {
    try {
      const response = await axios.post('http://localhost:8000/ask', new URLSearchParams({ question: pergunta }));
      setResposta(response.data.answer);
    } catch (error: any) {
      setResposta(`Erro ao enviar a pergunta: ${error.message}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Informe sobre Vendas</h1>

      <div className="mb-6 w-full max-w-md">
        <label htmlFor="pergunta" className="block text-gray-700 text-sm font-bold mb-2">
          Pergunte sobre as vendas:
        </label>
        <input
          type="text"
          id="pergunta"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={pergunta}
          onChange={lidarComMudancaPergunta}
        />
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
          onClick={fazerPergunta}
        >
          Perguntar
        </button>
      </div>

      {resposta && (
        <div className="mt-6 w-full max-w-md">
          <label className="block text-gray-700 text-sm font-bold mb-2">Resposta:</label>
          <div className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight">
            {resposta}
          </div>
        </div>
      )}
    </main>
  );
} 
