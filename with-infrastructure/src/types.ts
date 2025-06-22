export type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

export type ValidationFunction = (input: string) => boolean;