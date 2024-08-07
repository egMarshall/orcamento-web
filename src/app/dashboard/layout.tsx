"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { getSession, updateUser, UpdateDataSubmit } from "@/services/auth/auth";
import EditProfileModal from "./components/editProfileModal";

export default function Layout({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string }>(
    {} as { name: string; email: string }
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }

    async function fetchUser() {
      const session = await getSession();
      if (session) {
        setUser({ name: session.name, email: session.email });
      }
    }

    fetchUser();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("token");
    redirect("/login");
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  async function handleEditProfile(user: UpdateDataSubmit) {
    try {
      const updatedUserData = await updateUser(user);
      setUser({ name: updatedUserData.name, email: updatedUserData.email });
      closeModal();
    } catch (error) {
      console.log("Erro ao atualizar dados do usuário", error);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col p-4 border items-center bg-menu-bg text-white border-gray-400 absolute h-screen">
        <h1 className="text-3xl">Menu</h1>
        <div className="flex flex-col h-full relative">
          <h2>{user.name}</h2>
          <h2>{user.email}</h2>
          <button onClick={() => openModal()}>Editar dados</button>
          <div className="flex absolute bottom-0 w-full justify-center">
            <Link onClick={handleLogout} href="/login">
              Logout
            </Link>
          </div>
        </div>
      </div>
      {modalOpen && (
        <EditProfileModal
          user={{ name: user.name, password: "" }}
          closeModal={closeModal}
          handleSubmit={handleEditProfile}
        />
      )}
      {children}
    </div>
  );
}
