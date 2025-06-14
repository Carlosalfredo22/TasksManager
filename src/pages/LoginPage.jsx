import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
