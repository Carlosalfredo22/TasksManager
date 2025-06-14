import { useState } from 'react';
import api from '../service/api';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.access_token);
      navigate('/tasks');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-white">
      <h2 className="text-center mb-4">Iniciar Sesión</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

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
          placeholder="Ingresa tu contraseña"
          required
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Entrar
        </button>
      </div>

      <p className="text-center mt-3">
        ¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </form>
  );
};

export default LoginForm;
