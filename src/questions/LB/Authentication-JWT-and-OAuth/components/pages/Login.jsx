import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch {
      setError('Login failed');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={submit} className='login-form'>
        <h2>Login</h2>
        {error && <p className='error-message'>{error}</p>}
        <input
          placeholder='Email'
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
