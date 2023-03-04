import { getSignInError } from "../constants/auth";
export default function SigninError(props: { error: string }) {
  const error = getSignInError(props.error);

  return (
    <div className=" rounded-md bg-red-300 px-2 py-1 text-white">
      {error.msg}
    </div>
  );
}
