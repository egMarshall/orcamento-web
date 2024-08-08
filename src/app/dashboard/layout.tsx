"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import {
  getSession,
  updateUser,
  UpdateDataSubmit,
  deleteUser,
} from "@/services/auth/auth";
import EditProfileModal from "./components/editProfileModal";
import Spinner from "../components/spinner";
import DeleteAccountModal from "./components/deleteAccountModal";

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<{ name: string; email: string }>(
    {} as { name: string; email: string }
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }

    async function fetchUser() {
      try {
        const session = await getSession();
        if (session) {
          setUser({ name: session.name, email: session.email });
        }
      } catch (error) {
        console.log("Erro ao buscar dados do usuário", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  function handleLogout() {
    sessionStorage.removeItem("token");
    router.push("/login");
  }

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const openDeleteModal = () => setModalDeleteOpen(true);
  const closeDeleteModal = () => setModalDeleteOpen(false);

  async function handleEditProfile(user: UpdateDataSubmit) {
    try {
      const updatedUserData = await updateUser(user);
      setUser({ name: updatedUserData.name, email: updatedUserData.email });
      closeModal();
    } catch (error) {
      console.log("Erro ao atualizar dados do usuário", error);
    }
  }

  async function handleDeleteAccount() {
    try {
      await deleteUser();
      closeModal();
      handleLogout();
    } catch (error) {
      console.log("Erro ao deletar conta", error);
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col p-4 border items-center bg-menu-bg text-white border-gray-400 absolute h-screen">
        <h1 className="text-3xl">Menu</h1>
        <div className="flex flex-col h-full relative">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2>{user.name}</h2>
              <h2>{user.email}</h2>
            </>
          )}
          <button onClick={() => openModal()}>Editar dados</button>
          <div className="flex flex-col absolute bottom-0 w-full justify-center">
            <button onClick={() => openDeleteModal()}>Deletar conta</button>
            <Link
              className="text-center mt-5"
              onClick={handleLogout}
              href="/login"
            >
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
      {modalDeleteOpen && (
        <DeleteAccountModal
          closeModal={closeDeleteModal}
          handleDeleteAccount={handleDeleteAccount}
        />
      )}
      {children}
    </div>
  );
}
