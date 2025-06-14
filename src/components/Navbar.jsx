import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/tasks">
          MyTasks
        </Link>

        <div className="collapse navbar-collapse justify-content-end">
          {token ? (
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger"
              type="button"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/" className="btn btn-outline-primary me-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
