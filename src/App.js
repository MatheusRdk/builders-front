import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TelaPrincipal from './components/TelaPrincipal';

const App = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Stored Token:', storedToken);

    const checkStoredToken = () => {
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true);
      } else {
        setToken(null);
        setIsLoggedIn(false);
      }
    };

    checkStoredToken();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://ec2-52-91-90-91.compute-1.amazonaws.com:80/auth/login',
        { login, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
      const newToken = response.data.token;
      localStorage.setItem('token', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      setLoginError(false);
      setToken(newToken);
      setIsLoggedIn(true);
    } catch (error) {
      setLoginError(true);
      console.error('Erro ao fazer login:', error);
      console.log('Resposta de erro da API:', error.response);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="bg-white p-8 rounded-md shadow-md w-96 mx-auto">
          <h1 className="text-2xl font-semibold mb-4">Tela de Login</h1>
          {loginError && <p className="mt-4 text-red-500">Usuário ou senha inválidos.</p>}
          <br />
          <label htmlFor="username" className="block text-sm font-medium text-gray-600">
            Usuário:
            <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
          </label>
          <br />
          <label>
            Senha:
            <input className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <br />
          <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 transition duration-300" onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <TelaPrincipal token={token} />
      )}
      <header className="ml-auto mt-4">
        {isLoggedIn && <button className="bg-red-300 text-white px-4 py-2 rounded-md ml-8 hover:bg-red-700 transition duration-300" onClick={handleLogout}>Logout</button>}
    </header>
    </div>
  );
};
export default App;