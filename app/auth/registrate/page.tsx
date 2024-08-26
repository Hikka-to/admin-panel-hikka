"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Link } from "@nextui-org/react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { signIn } from "next-auth/react";
import PasswordInput from "@/components/inputs/PasswordInput";
import axios from "axios";
import { useAuth } from "@/hooks/auth";
import TransparentInput from "@/components/inputs/TransparentInput";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { status } = useAuth({ redirect: true });

  // Errors
  const [error, setError] = useState("");
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
      const result = await axios.post("/api/registrate", {
        email,
        password,
        username,
        role: "Admin"
      });
      if (result.status !== 200) {
        setError("Failed to register");
      } else {
        const signInResult = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false
        });
        if (signInResult?.error) {
          setError("Failed to login");
        } else {
          router.push("/");
        }
      }
    } catch (e) {
      const error = e as Error;
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (status == "loading") setIsLoading(true);
    else setIsLoading(false);
  }, [status]);

  return (
    <>
      <CardHeader
        className="
          	flex
          	flex-wrap
          	space-y-2
          	justify-between">
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
      <Divider />
      <CardBody>
        <form
          onSubmit={handleSubmit}
          className="
            	flex
            	flex-wrap
            	space-y-2
            	justify-between"
        >
          <TransparentInput
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TransparentInput
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TransparentInput
            as={PasswordInput}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TransparentInput
            as={PasswordInput}
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
    </>
  );
};

export default RegisterPage;