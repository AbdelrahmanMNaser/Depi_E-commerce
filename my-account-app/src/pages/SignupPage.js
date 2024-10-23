import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSignup = () => {
    const handleSignup = async () => {

      if (!email || !password || !name) {
        console.error('Please fill in all fields');
        return;
      }
    
      try {
        const response = await fetch('https://yourapi.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, email, password }),
        });
    
        if (!response.ok) {
          throw new Error('Signup failed');
        }
    
        const data = await response.json();
        console.log('Signup successful:', data);
        
      } catch (error) {
        console.error('Error during signup:', error);
      }
    };
    
    console.log('Signing up with', { email, password, name });
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
