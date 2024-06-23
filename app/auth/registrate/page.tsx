"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Popover, Link } from '@nextui-org/react';
import UserService from '@/service/UserService';

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setShowError(true);
      return;
    }
    const result = await UserService.registerUser({ email, password, userName: username, role: 'Admin' });
    if (result.status === 200) {
      setShowError(true);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-1">
      <div className="px-7 py-4 bg-white rounded-md flex flex-col gap-2 border-black border shadow-2xl h-1/3">
        <form onSubmit={handleSubmit} className='flex-col space-y-2 '>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div>
            <Link href={"/auth/login"} className='text-secondary' >
              Login
            </Link>
          </div>
          <Button type="submit" className='w-full'>Register</Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;