"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import userSignInAction from "@/actions/user-signin-action";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { LOGIN_INPUTS } from "@/constants/loginJoin";
import useDebounce from "@/hooks/useDebounce";
import { LoginFormSchema } from "@/schemas/loginJoinSchema";

import {
  IRegisterWithValidation,
  TErrorMsg,
} from "../../join/_components/JoinForm";

export type TLoginForm = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    trigger,
    setError,
  } = useForm<TLoginForm>({
    resolver: zodResolver(LoginFormSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const [state, formAction] = useFormState(userSignInAction, null);

  useEffect(() => {
    if (state && !state.status) {
      const error: TErrorMsg = JSON.parse(state.error);

      if (error.code === "SERVER_ERROR") return alert(error.message);

      const errorField =
        error.code === "INVALID_CREDENTIALS" ? "password" : "email";

      setError(
        errorField,
        {
          type: "validate",
          message: error.message,
        },
        { shouldFocus: true },
      );
    } else if (state && state.status) {
      router.push("/");
    }
  }, [state, setError, router]);

  const onSubmit = handleSubmit(data => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    formAction(formData);
  });

  const registerWithValidation = (
    name: keyof TLoginForm,
  ): IRegisterWithValidation => {
    const baseRegister = register(name);

    return {
      ...baseRegister,
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        baseRegister.onBlur(e);
        trigger(name);
      },
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        baseRegister.onChange(e);
        debouncedValidation(name);
      },
    };
  };

  const debouncedValidation = useDebounce(fieldName => {
    trigger(fieldName);
  }, 1000);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {LOGIN_INPUTS.map(input => (
        <Input
          {...registerWithValidation(input.id)}
          key={input.id}
          id={input.id}
          type={input.type}
          label={input.label}
          disabled={false}
          placeholder={input.placeholder}
          errorMsg={errors[input.id]?.message}
        />
      ))}
      <Button
        variant={"purple"}
        type="submit"
        className="mb-6 mt-10 h-[40px] text-sm font-semibold md:text-base"
        aria-label="login-btn"
      >
        {isLoading ? <LoadingSpinner size="xs" /> : "로그인"}
      </Button>
    </form>
  );
};

export default LoginForm;
