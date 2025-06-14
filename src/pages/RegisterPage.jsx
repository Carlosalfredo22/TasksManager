import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="w-100" style={{ maxWidth: '500px' }}>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
