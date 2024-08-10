"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CardBody, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Button, Input, Link } from "@nextui-org/react";
import PasswordInput from "@/components/inputs/PasswordInput";
import { useAuth } from "@/hooks/auth";

const LoginPage = () => {
	const route = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const { status } = useAuth({ redirect: true });

	const onSubmit = async (e: any) => {
		setIsLoading(true);
		e.preventDefault();
		const result = await signIn("credentials", {
				email,
				password,
				callbackUrl: "/",
				redirect: false
			}
		);

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
        <div className="flex justify-center items-center h-screen">
            <Card className="max-w-3xl flex-1">
                <CardHeader
                    className='
                        flex
                        flex-wrap
                        space-y-2
                        justify-between'>
                    <h1 className="text-2xl font-bold">Login</h1>
                    <Button
                        href="/auth/registrate"
                        as={Link}
                        showAnchorIcon
                        variant="solid"
                        className="!mt-0"
                    >
                        Registration
                    </Button>
                </CardHeader>
                <Divider/>
                <CardBody>
                    <form
                        onSubmit={onSubmit}
                        className='
                            flex
                            flex-wrap
                            space-y-2
                            justify-between'
                    >
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
                        {errorMessage && <p className="text-red-500 w-full">{errorMessage}</p>}
                        <Button
                            color="primary"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Login
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default LoginPage;
