import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

import EventInfoContext from '../../contexts/EventInfoContext';

import NavigationBar from '../../components/Dashboard/NavigationBar';

import DashboardLayout from '../../layouts/Dashboard';

import api from '../../services/api';

export default function Dashboard() {
  const { eventInfo } = useContext(EventInfoContext);

  window.onload = async() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar autenticado pra ver esse conteúdo!');
      window.location.href = '/';
    } else {
      try {
        const response = await api.get('http://localhost:4000/first', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const user = response.data;
        console.log(user);
      } catch (error) {
        alert('Você precisa estar autenticado pra ver esse conteúdo!');
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    }
  };

  return (
    <DashboardLayout background={eventInfo.backgroundImageUrl}>
      <NavigationBar />

      <Container>
        <Outlet />
      </Container>
    </DashboardLayout>
  );
}

const Container = styled.div`
  padding: 30px;
  height: 100%;
  width: 100%;
  overflow-y: auto;

  @media (max-width: 600px) {
    height: calc(100vh - 80px);
    padding: 20px;
  }
`;
