export const USERNAME = {
  require: "Username is required!",
  min: (count: number) => `Username should be at least ${count} characters`,
  max: (count: number) => `Too much characters. Needs to be less than ${count}`,
};

export const EMAIL = {
  require: "Email is required!",
  errorMessage: "Email is invalid",
};
export const PASSWORD = {
  required: "Password is required",
  min: (count: number) => `Password should be at least ${count} characters`,
  max: (count: number) => `Too much characters. Needs to be less than ${count}`,
};
export const CONFIRM_PASSWORD = {
  required: "Confirm Password is required",
  errorMessage: "Passwords must match",
};
export const ACCEPT_TERM = {
  errorMessage: "Accept Ts & Cs is required",
};
export const IMAGE = {
  errorMessage: "Invalid image direct url address!",
};
