"use client";

import { useMutation } from "react-query";
import { signIn } from "@/services/auth/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const mutation = useMutation(signIn, {
    onSuccess: () => {
      console.log("Login successful");
      setError(null);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Login failed:", error);
      if (error.message === "Failed to fetch") {
        setError("Erro de conexão com o servidor");
        return;
      }
      setError(error.message);
    },
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate({ email, password });
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen dark:bg-primary-title">
      <h1 className="text-4xl mx-auto my-10 dark:text-white">The Budget App</h1>
      <div className="w-1/5">
        <form onSubmit={handleSubmit} className="max-w mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-title hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-title dark:border-gray-300 dark:text-primary-title dark:bg-gray-200 sm:w-1/2"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <Link
            href="/signup"
            type="submit"
            className="w-full py-2 px-4 text-primary-title border border-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm sm:w-1/2 dark:bg-primary-title dark:text-white dark:hover:bg-gray-600 text-center"
          >
            Cadastre-se
          </Link>
        </div>
      </div>
    </main>
  );
}
