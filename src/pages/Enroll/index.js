import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import dotenv from 'dotenv';

import AuthLayout from '../../layouts/Auth';

import Input from '../../components/Form/Input';
import Button from '../../components/Form/Button';
import { Row, Title, Label } from '../../components/Auth';
import Link from '../../components/Link';

import EventInfoContext from '../../contexts/EventInfoContext';

import useSignUp from '../../hooks/api/useSignUp';

import api from '../../services/api';

export default function Enroll() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { loadingSignUp, signUp } = useSignUp();

  const navigate = useNavigate();
  
  const { eventInfo } = useContext(EventInfoContext);

  async function submit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast('As senhas devem ser iguais!');
    } else {
      try {
        await signUp(email, password);
        toast('Inscrito com sucesso! Por favor, faça login.');
        navigate('/sign-in');
      } catch (error) {
        toast('Não foi possível fazer o cadastro!');
      }
    }
  }
 
  function githubLogin() {
    const GITHUB_URL = 'https://github.com/login/oauth/authorize';
    //const CLIENT_ID = process.env;
    const CLIENT_ID = 'd8892910e88f530e97df';
    //const CLIENT_ID = process.env.CLIENT_ID;
    const params = new URLSearchParams({ 
      response_type: 'code',
      scope: 'user',
      client_id: CLIENT_ID,
      redirect_uri: 'http://localhost:3000/enroll',
      state: 'Drivent'
    });
  
    const authURL = `${GITHUB_URL}?${params.toString()}`;
    window.location.href = authURL;
  }

  window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    console.log('FRONT code', code);
    if (code) {
      try {
        const response = await api.post('/authGitHub/login', { code });
        //console.log('resp do api', response);
        const { token } = response.data;
        localStorage.setItem('token', token);
        window.location.href = 'http://localhost:3000/dashboard'; 
      } catch (error) {
        alert('Algum erro ocorreu');
        //console.log(error);
      }
    }
  }; 

  return (
    <AuthLayout background={eventInfo.backgroundImageUrl}>
      <Row>
        <img src={eventInfo.logoImageUrl} alt="Event Logo" width="60px" />
        <Title>{eventInfo.title}</Title>
      </Row>
      <Row>
        <Label>Inscrição</Label>
        <form onSubmit={submit}>
          <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
          <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
          <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
          <Button type="submit" color="primary" fullWidth disabled={loadingSignUp}>Inscrever</Button>        </form>
      </Row>
      <Row>
        <Link to="/sign-in">Já está inscrito? Faça login</Link>
      </Row>
      <Row>
        <p>-- ou --</p>
        <Button color="primary" onClick={githubLogin} >Entrar com GitHub</Button>
      </Row>
    </AuthLayout>
  );
}
