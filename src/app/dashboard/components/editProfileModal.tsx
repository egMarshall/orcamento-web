import { UpdateDataSubmit } from "@/services/auth/auth";
import { cn } from "@/utils/utils";
import { useState } from "react";

interface EditProfileModalProps {
  user: UpdateDataSubmit;
  closeModal: () => void;
  handleSubmit: (user: UpdateDataSubmit) => void;
}

export default function EditProfileModal({
  user,
  closeModal,
  handleSubmit,
}: EditProfileModalProps) {
  const [userName, setUserName] = useState(user.name);
  const [userNewPassword, setUserNewPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [isInputsEmpty, setIsInputsEmpty] = useState(false);
  const [isUserNameEmpty, setIsUserNameEmpty] = useState(false);
  const [isValidationFailed, setIsValidationFailed] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName) {
      setIsUserNameEmpty(true);
    }

    if (userNewPassword && userNewPassword !== userConfirmPassword) {
      setIsValidationFailed(true);
      return;
    }

    const updatedUser = {
      name: userName,
      ...(userNewPassword && { password: userNewPassword }),
    };
    handleSubmit(updatedUser);

    setIsInputsEmpty(false);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={closeModal}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center text-2xl">
          <h1>Editar Dados</h1>
        </div>
        <form onSubmit={handleFormSubmit} className="max-w mx-auto">
          <div className="mb-5">
            <label
              htmlFor="text"
              className={cn(
                `block mb-2 text-sm font-medium text-gray-900`,
                isUserNameEmpty && "text-red-500"
              )}
            >
              Nome
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className={cn(
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 focus:outline-none shadow-md`,
                isUserNameEmpty && "border-red-500"
              )}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="text"
              className={cn(
                `block mb-2 text-sm font-medium text-gray-900`,
                isInputsEmpty && "text-red-500"
              )}
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="userNewPassword"
              value={userNewPassword}
              onChange={(e) => setUserNewPassword(e.target.value)}
              className={cn(
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5 focus:outline-none shadow-md`,
                isInputsEmpty && "border-red-500"
              )}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="text"
              className={cn(
                `block mb-2 text-sm font-medium text-gray-900`,
                isInputsEmpty && "text-red-500"
              )}
            >
              Confirme a Senha
            </label>
            <input
              type="password"
              id="userConfirmPassword"
              value={userConfirmPassword}
              onChange={(e) => setUserConfirmPassword(e.target.value)}
              className={cn(
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5  focus:outline-none shadow-md`,
                isInputsEmpty && "border-red-500"
              )}
            />
            {isValidationFailed && (
              <p className="text-red-500 text-sm my-1">
                As senhas não coincidem.
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className=" text-white bg-primary-title hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 px-5 py-2.5 text-center shadow-lg"
            >
              Editar Dados
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="text-primary-title border border-gray-300 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 py-2.5 text-center shadow-lg"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
