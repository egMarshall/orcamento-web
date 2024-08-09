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
import Image from "next/image";
import userIcon from "../../../public/assets/icons/userName.svg";
import mailIcon from "../../../public/assets/icons/userMail.svg";
import editIcon from "../../../public/assets/icons/editUser.svg";
import deleteUserIcon from "../../../public/assets/icons/deleteUser.svg";
import logoutIcon from "../../../public/assets/icons/logout.svg";

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
      <div className="flex flex-col p-6 border items-center bg-menu-bg text-white border-gray-400 h-screen">
        <h1 className="text-3xl">Menu</h1>
        <div className="flex flex-col h-full relative">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col gap-2 py-4">
              <div className="flex items-center gap-1">
                <Image src={userIcon} alt="Editar" width={20} />
                <h2>{user.name}</h2>
              </div>
              <div className="flex items-center gap-1">
                <Image src={mailIcon} alt="Editar" width={20} />
                <h2>{user.email}</h2>
              </div>
            </div>
          )}
          <button
            className="mt-5 text-center inline-flex items-center gap-1 self-center hover:bg-menu-bg-hover rounded-md p-2 w-full transition duration-200 hover:shadow-lg"
            onClick={() => openModal()}
          >
            <Image src={editIcon} alt="Editar" width={20} />
            Editar Dados
          </button>
          <div className="flex flex-col absolute bottom-0 w-full justify-center">
            <button
              className="mt-5 text-center inline-flex items-center gap-1 self-center hover:bg-menu-bg-hover rounded-md p-2 w-full transition duration-200 hover:shadow-lg"
              onClick={() => openDeleteModal()}
            >
              <Image src={deleteUserIcon} alt="Editar" width={20} />
              Deletar conta
            </button>
            <button
              className="mt-5 text-center inline-flex items-center gap-1 self-center hover:bg-menu-bg-hover rounded-md p-2 w-full transition duration-200 hover:shadow-lg"
              onClick={handleLogout}
            >
              <Image src={logoutIcon} alt="Editar" width={20} />
              Sair
            </button>
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
