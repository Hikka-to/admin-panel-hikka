"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button, Link } from "@nextui-org/react";
import { useTranslations } from "use-intl";

import PasswordInput from "@/components/inputs/PasswordInput";
import { useAuth } from "@/hooks/auth";
import TransparentInput from "@/components/inputs/TransparentInput";

const LoginPage = () => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { status } = useAuth({ redirect: true });
  const t = useTranslations();

  const onSubmit = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });

    if (result?.status != 200) {
      console.log(result?.error);
      setErrorMessage("Invalid credentials. Please try again.");
    } else {
      route.push("/");
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
        <h1 className="text-2xl font-bold">{t("Auth.Login")}</h1>
        <Button
          showAnchorIcon
          as={Link}
          className="!mt-0"
          href="/auth/registrate"
          variant="solid"
        >
          {t("Auth.Registration")}
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
          onSubmit={onSubmit}
        >
          <TransparentInput
            required
            placeholder={t("Auth.Email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TransparentInput<typeof PasswordInput>
            required
            as={PasswordInput}
            placeholder={t("Auth.Password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-500 w-full">{t(errorMessage)}</p>
          )}
          <Button color="primary" isLoading={isLoading} type="submit">
            {t("Auth.Login")}
          </Button>
        </form>
      </CardBody>
    </>
  );
};

export default LoginPage;
