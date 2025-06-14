import { useState } from 'react';
import api from '../service/api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/');
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre" />
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />

      <button type="submit">Registrarse</button>

      <Link to="/" style={{ textAlign: 'center', marginTop: '10px' }}>
        <button type="button" style={{ padding: '0.5rem 1rem' }}>
          Volver al Login
        </button>
      </Link>
    </form>
  );
};

export default RegisterForm;
