"use client"

import React, {useEffect, useState} from 'react';
import {redirect, RedirectType, useRouter} from 'next/navigation';
import {Button, Input, Link} from '@nextui-org/react';
import UserService from '@/service/UserService';
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {useSession} from "next-auth/react";

const RegisterPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {status} = useSession();

    useEffect(() => {
        if (status == "authenticated")
            redirect(
                '/',
                RedirectType.replace
            );

        if (status == "loading") setIsLoading(true);
        else setIsLoading(false);
    }, [status]);

    const handleSubmit = async (e: any) => {
        setIsLoading(true);
        e.preventDefault();
        if (password !== confirmPassword) {
            setShowError(true);
            return;
        }
        const result = await UserService.registerUser({email, password, userName: username, role: 'Admin'});
        if (result.status === 200) {
            setShowError(true);
        } else {
            router.push('/');
        }
        setIsLoading(false);
    };

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