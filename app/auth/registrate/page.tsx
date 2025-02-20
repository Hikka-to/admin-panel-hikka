"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Link } from "@heroui/react";
import { CardBody, CardHeader } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { signIn } from "next-auth/react";
import axios from "axios";

import PasswordInput from "@/components/inputs/PasswordInput";
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
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState(false);

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
        role: "Admin",
      });

      if (result.status !== 200) {
        setError("Failed to register");
      } else {
        const signInResult = await signIn("credentials", {
          email,
          password,
          callbackUrl: "/",
          redirect: false,
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
          	justify-between"
      >
        <h1 className="text-2xl font-bold">{"Registration"}</h1>
        <Button
          showAnchorIcon
          as={Link}
          className="!mt-0"
          href="/auth/login"
          variant="solid"
        >
          {"Login"}
        </Button>
      </CardHeader>
      <Divider />
      <CardBody>
        <form
          className="
            	flex
            	flex-wrap
            	space-y-2
            	justify-between"
          onSubmit={handleSubmit}
        >
          <TransparentInput
            required
            placeholder={"Username"}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TransparentInput
            required
            placeholder={"Email"}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TransparentInput
            required
            as={PasswordInput}
            placeholder={"Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TransparentInput
            required
            as={PasswordInput}
            errorMessage={"Passwords do not match"}
            isInvalid={showConfirmPasswordError}
            placeholder={"Confirm Password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p className="text-red-500 w-full">{error}</p>}
          <Button color="primary" isLoading={isLoading} type="submit">
            {"Register"}
          </Button>
        </form>
      </CardBody>
    </>
  );
};

export default RegisterPage;
