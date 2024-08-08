"use client";

import { useMutation } from "react-query";
import { signUp } from "@/services/auth/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEmpty, setIsEmpty] = useState(false);
  const [isDifferent, setIsDifferent] = useState(false);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation(signUp, {
    onSuccess: () => {
      toast.success("Cadastro realizado com sucesso");
      setSignUpError(null);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Sign up failed:", error);
      setSignUpError(error.message);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setIsEmpty(true);
      return;
    }
    if (password !== confirmPassword) {
      setIsDifferent(true);
      return;
    }
    setIsEmpty(false);
    setIsDifferent(false);
    setSignUpError(null);
    mutation.mutate({ name, email, password });
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen dark:bg-primary-title">
      <h1 className="text-4xl mx-auto my-10 dark:text-white">The Budget App</h1>
      <div className="w-1/5">
        <form onSubmit={handleSubmit} className="max-w mx-auto">
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              placeholder="Boogie Jones"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              E-mail
            </label>
            <input
              type="email"
              id="email"
              placeholder="boogiejones@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="ConfirmPassword"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
            <div className="flex flex-col">
              {isEmpty && (
                <p className="text-red-500 text-sm mt-2">
                  Todos os campos são obrigatórios
                </p>
              )}
              {signUpError && (
                <p className="text-red-500 text-sm mt-2">{signUpError}</p>
              )}
              {isDifferent && (
                <p className="text-red-500 text-sm my-1">
                  As senhas não coincidem.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" dark:text-primary-title text-white bg-primary-title hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-primary-background"
            >
              Cadastrar
            </button>
          </div>
        </form>
        <div className="flex flex-col items-center">
          <Link
            href="/login"
            className="text-primary-title border border-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 py-2.5 text-center dark:bg-primary-title dark:text-white dark:hover:bg-gray-600 mt-4"
          >
            Voltar ao Login
          </Link>
        </div>
      </div>
    </main>
  );
}
