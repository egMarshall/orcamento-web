'use client';

import Link from "next/link";

export default function LoginPage() {

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
  }

  return (
    <main className="flex flex-col justify-center items-center w-full min-h-screen dark:bg-primary-title">
      <h1 className="text-4xl mx-auto my-10 dark:text-white">The Budget App</h1>
      <div className="w-1/5">
        <form onSubmit={handleSubmit} className="max-w mx-auto">
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              E-mail
            </label>
            <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none" placeholder="boogiejones@email.com" required />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Senha
            </label>
            <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-gray-300 focus:outline-none" required />
          </div>
          <div className="flex flex-col items-center">
            <Link href="/dashboard" type="submit" className="dark:text-primary-title text-white bg-primary-title hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 px-5 py-2.5 text-center dark:bg-gray-200 dark:hover:bg-primary-background">
              Entrar
            </Link>
            <Link href="/signup" className="text-primary-title border border-gray-600 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 py-2.5 text-center dark:bg-primary-title dark:text-white dark:hover:bg-gray-600 mt-4">
              Cadastrar
            </Link>
          </div>
        </form>
      </div>

    </main>
  );
}