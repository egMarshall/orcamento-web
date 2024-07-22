import Link from "next/link";
import { ReactNode } from "react";

export default function layout({children} : {children: ReactNode}) {
  return (
    <div className="flex h-screen">
        <div className="flex flex-col p-4 border items-center bg-menu-bg text-white border-gray-400 absolute h-screen">
        <h1 className="text-3xl">Menu</h1>
        <div className="flex flex-col h-full relative">
          <h2>Nome do usuário</h2>
          <h2>Email do usuário</h2>
          <button>Editar dados</button>
          <div className="flex absolute bottom-0 w-full justify-center">
            <Link href="/login">Logout</Link>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}