import type { GetServerSidePropsContext } from "next";
import { type ChangeEventHandler, useState } from "react";
import { signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import Textfield from "@/components/ui/Textfield";
import Button from "@/components/ui/Button";
import { PROVIDERS } from "../../constants/providers";
import IconButton from "../../components/ui/IconButton";
import SigninError from "../../components/SignInError";
import Link from "next/link";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { FaEnvelope } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

export default function SignUp() {
  const {
    mutate: registerMutate,
    error,
    data: registerData,
    isLoading,
  } = api.user.register.useMutation();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleChange =
    (key: "email" | "password"): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSign = (id: string) => () => {
    void signIn(id);
  };

  const handleRegister = () => {
    registerMutate(data);
  };

  const errors = error?.data?.code ? [error?.data?.code] : [];

  if (registerData?.id) {
    void router.push("/auth/signin");
  }
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-800">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8 rounded-3xl px-14 py-11 sm:border-[1px] sm:border-neutral-400">
          <div className="flex flex-col gap-3">
            {errors.map((error, i) => (
              <SigninError key={`${error}-${i}`} error={error} />
            ))}
          </div>
          <div className="flex flex-col">
            <p className="mb-3.5 text-lg font-semibold text-neutral-200">
              Register
            </p>
            <Textfield
              onChange={handleChange("email")}
              leftIcon={FaEnvelope}
              iconProps={{
                size: 20,
              }}
              placeholder="Email"
              className="min-w-96 border border-neutral-400"
              type="text"
              autoFocus
            />
            <Textfield
              onChange={handleChange("password")}
              leftIcon={IoMdLock}
              iconProps={{
                size: 20,
              }}
              type="password"
              placeholder="Password"
              className="min-w-96 border border-neutral-400"
            />
            <Button
              disabled={isLoading}
              className="mt-3"
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
          <div className="flex flex-col items-center gap-5 text-sm text-neutral-500">
            <p>or continue with these social profile</p>
            <div className="flex gap-5">
              {PROVIDERS.map((provider) => (
                <IconButton
                  key={provider.sign}
                  icon={provider.icon}
                  onClick={handleSign(provider.sign)}
                  className="h-10 w-10 rounded-full border border-neutral-500"
                />
              ))}
            </div>
            <p>
              Adready a member?&nbsp;
              <Link
                href="/auth/signin"
                className="cursor-pointer text-blue-400"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (session) {
    return { redirect: { destination: "/" } };
  }
  return {
    props: {},
  };
}
