import { useState } from 'react';
import api from '../service/api';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/', { state: { success: '¡Se ha registrado exitosamente!' } });
    } catch (error) {
      console.error('Error en el registro:', error.response?.data || error.message);
      alert('Error al registrarse. Verifica los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 shadow rounded bg-white" style={{ maxWidth: 400, margin: 'auto' }}>
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
          disabled={loading}
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
          disabled={loading}
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
          disabled={loading}
        />
      </div>

      <div className="d-grid mb-3">
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Registrando...
            </>
          ) : (
            'Registrarse'
          )}
        </button>
      </div>

      <div className="text-center">
        <Link to="/" className="btn btn-outline-secondary" disabled={loading}>
          Volver al Login
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
