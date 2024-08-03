"use client"

import React, {useEffect, useState} from 'react';
import {redirect, RedirectType, useRouter} from 'next/navigation';
import {Button, Input, Link} from '@nextui-org/react';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {signIn, useSession} from "next-auth/react";
import PasswordInput from "@/components/inputs/PasswordInput";
import axios from "axios";

const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {status} = useSession();

    // Errors
    const [error, setError] = useState('');
    const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);

    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        if (password !== confirmPassword) {
            setShowConfirmPasswordError(true);
            setIsLoading(false);
            return;
        }
        try {
            const result = await axios.post('/api/registrate', {
                email,
                password,
                username,
                role: 'Admin'
            });
            if (result.status !== 200) {
                setError('Failed to register');
            } else {
                const signInResult = await signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/',
                    redirect: true
                });
                if (signInResult?.error) {
                    setError('Failed to login');
                } else {
                    router.push('/');
                }
            }
        } catch (e) {
            const error = e as Error;
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (status == "authenticated")
            redirect(
                '/',
                RedirectType.replace
            );

        if (status == "loading") setIsLoading(true);
        else setIsLoading(false);
    }, [status]);

    return (
        <div className="flex justify-center items-center h-screen">
            <Card className="max-w-3xl flex-1">
                <CardHeader
                    className='
                        flex
                        flex-wrap
                        space-y-2
                        justify-between'>
                    <h1 className="text-2xl font-bold">Registration</h1>
                    <Button
                        href="/auth/login"
                        as={Link}
                        showAnchorIcon
                        variant="solid"
                        className="!mt-0"
                    >
                        Login
                    </Button>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <form
                        onSubmit={handleSubmit}
                        className='
                            flex
                            flex-wrap
                            space-y-2
                            justify-between'
                    >
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
                        <PasswordInput
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <PasswordInput
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            isInvalid={showConfirmPasswordError}
                            errorMessage="Passwords do not match"
                        />
                        {error && <p className="text-red-500 w-full">{error}</p>}
                        <Button
                            color="primary"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default RegisterPage;