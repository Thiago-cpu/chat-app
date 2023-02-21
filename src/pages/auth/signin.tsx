import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerAuthSession } from "@/server/auth";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import Textfield from "@/components/ui/Textfield";
import Button from "@/components/ui/Button";
import { PROVIDERS } from "../../constants/providers";
import IconButton from "../../components/ui/IconButton";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(providers);

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-neutral-800">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-8 rounded-3xl border-[1px] border-neutral-400 px-14 py-11">
          <div className="flex flex-col gap-3.5">
            <p className="text-lg font-semibold text-neutral-200">Login</p>
            <Textfield leftIcon={EnvelopeIcon} placeholder="Email" />
            <Textfield leftIcon={LockClosedIcon} placeholder="Password" />
            <Button>Login</Button>
          </div>
          <div className="flex flex-col items-center gap-5 text-sm text-neutral-500">
            <p>or continue with these social profile</p>
            <div className="flex gap-5">
              {PROVIDERS.map((provider) => (
                <IconButton
                  key={provider.sign}
                  icon={provider.icon}
                  onClick={() => void signIn(provider.sign)}
                />
              ))}
            </div>
            <p>
              Don’t have an account yet?{" "}
              <span className="cursor-pointer text-blue-400">Register</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between text-sm tracking-tight text-neutral-500">
          <p>
            creaded by{" "}
            <span className="font-semibold underline underline-offset-1">
              TerjaN
            </span>
          </p>
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

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
