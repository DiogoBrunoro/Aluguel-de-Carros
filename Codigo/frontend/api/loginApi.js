async function Login(cpf, senha) {
  const loginData = {
    cpf: cpf,
    senha: senha,
  };

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (response.ok) { 
      console.log('Login bem-sucedido!', data);
      localStorage.setItem('authToken', data.token);
      return data.token; 
    } else {
      console.error('Erro no login:', data.error);
      throw new Error(data.error || 'Falha no login');
    }
  } catch (error) {
    console.error('Erro ao conectar com o servidor de login:', error.message);
    throw new Error('Não foi possível conectar com o servidor. Tente novamente mais tarde.');
  }
}
