import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
