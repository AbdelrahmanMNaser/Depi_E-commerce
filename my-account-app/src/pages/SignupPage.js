import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from '../components/Input';
import Button from '../components/Button';
import { signupUser } from '../redux/userSlice';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    dispatch(signupUser({ email, password, name }));
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl mb-5">Sign Up</h1>
      <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSignup}>Sign Up</Button>
    </div>
  );
};

export default SignupPage;
