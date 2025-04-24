// import { TFunction } from "i18next";

export const getPasswordRequirements = () => {
  // export const getPasswordRequirements = (t: TFunction) => {
  return [
    {
      re: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!?@#$%^&*_+()[\]{}><|"'.,:;/\\]+$/,
      label: "буквы английского алфавита верхнего и нижнего регистра",
    },
    { re: /[0-9]/, label: "цифры от 0 до 9" },
    {
      re: /[$&+,:;=?@#|'<>.^*()%!-]/,
      label: "хотя бы один символ",
    },
  ];
};
export function getStrength(password: string) {
  // export function getStrength(password: string, t: TFunction) {
  let multiplier = password.length > 5 ? 0 : 1;
  const passwordRequirements = getPasswordRequirements();
  // const passwordRequirements = getPasswordRequirements(t);
  passwordRequirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(
    100 - (100 / (passwordRequirements.length + 1)) * multiplier,
    0
  );
}
