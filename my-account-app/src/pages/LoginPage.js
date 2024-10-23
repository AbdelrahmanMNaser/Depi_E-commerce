import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginUser } from '../redux/userSlice';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
    
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-5">Login</h1>
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default LoginPage;
