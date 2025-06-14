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
    <form onSubmit={handleRegister} className="p-4 shadow rounded bg-white">
      <h2 className="text-center mb-4">Registro</h2>

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Correo electrónico</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ingresa tu email"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Crea una contraseña"
          required
        />
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-success">
          Registrarse
        </button>
      </div>

      <div className="text-center">
        <Link to="/" className="btn btn-outline-secondary">
          Volver al Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
