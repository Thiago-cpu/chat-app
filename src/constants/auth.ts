export const SIGN_IN_ERRORS = [
  {
    code: "OAuthAccountNotLinked",
    msg: "The email on the account is already linked, but not with this OAuth account",
  },
  {
    code: "CONFLICT",
    msg: "Email is already in use",
  },
];

export const SIGN_IN_DEFAULT_ERROR = {
  code: "ERROR",
  msg: "Something went wrong",
};

export const getSignInError = (error: string) =>
  SIGN_IN_ERRORS.find((err) => err.code === error) ?? SIGN_IN_DEFAULT_ERROR;

export const AuthPages = {
  signIn: "/auth/signin",
  error: "/auth/signin",
};
