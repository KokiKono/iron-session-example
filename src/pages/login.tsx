import { useRouter } from "next/router";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = useCallback(
    async (data: any) => {
      const response = await fetch("/api/login", {
        method: 'POST',
        body: JSON.stringify(data),
      });
      if (response.ok) {
        router.replace("/admin");
      }
    },
    [router]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} />
        <input type="password" {...register("password")} />
        <button type="submit">ログイン</button>
      </form>
      <div>{JSON.stringify(errors)}</div>
    </div>
  );
}
