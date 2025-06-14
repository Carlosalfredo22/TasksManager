import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1 style={{ textAlign: 'center' }}>Registrarse</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
