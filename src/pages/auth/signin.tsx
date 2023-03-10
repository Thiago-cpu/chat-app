import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import Textfield from "@/components/ui/Textfield";
import Button from "@/components/ui/Button";
import { PROVIDERS } from "../../constants/providers";
import IconButton from "../../components/ui/IconButton";
import SigninError from "@/components/SignInError";
import Link from "next/link";
import { type ChangeEventHandler, useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

export default function SignIn({
  errors,
  options,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange =
    (key: "email" | "password"): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setData((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSign = (id: string) => () => {
    if (id === "credentials") {
      void signIn(id, {
        ...data,
        options,
      });
    } else {
      void signIn(id, options);
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-800">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8 rounded-3xl px-14  py-11 sm:border-[1px] sm:border-neutral-400">
          <div className="flex flex-col gap-3">
            {errors.map((error, i) => (
              <SigninError key={`${error}-${i}`} error={error} />
            ))}
          </div>
          <div className="flex flex-col">
            <p className="mb-3.5 text-lg font-semibold text-neutral-200">
              Login
            </p>
            <Textfield
              onChange={handleChange("email")}
              leftIcon={FaEnvelope}
              placeholder="Email"
              className="min-w-96 border border-neutral-400"
              type="text"
              autoFocus
            />
            <Textfield
              onChange={handleChange("password")}
              leftIcon={IoMdLock}
              type="password"
              placeholder="Password"
              className="min-w-96 border border-neutral-400"
            />
            <Button onClick={handleSign("credentials")} className="mt-3">
              Login
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
              Don&apos;t have an account yet? &nbsp;
              <Link
                href="/auth/signup"
                className="cursor-pointer text-blue-400"
              >
                Register
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
  const { error, callbackUrl } = context.query;

  if (session) {
    return { redirect: { destination: "/" } };
  }
  const errors = Array.isArray(error) ? error : [];
  const callback = Array.isArray(callbackUrl) ? callbackUrl[0] : callbackUrl;
  if (typeof error === "string") errors.push(error);
  return {
    props: {
      errors,
      options: {
        callbackUrl: callback ?? "/",
      },
    },
  };
}
