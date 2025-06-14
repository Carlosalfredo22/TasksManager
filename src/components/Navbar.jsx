import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // elimina token
    navigate('/'); // redirige a login
  };

  const token = localStorage.getItem('token');

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div>
        <Link to="/tasks" style={{ marginRight: '15px' }}>Tareas</Link>
      </div>

      {token ? (
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
