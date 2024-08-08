interface DeleteAccountModalProps {
  closeModal: () => void;
  handleDeleteAccount: () => void;
}

export default function DeleteAccountModal({
  closeModal,
  handleDeleteAccount,
}: DeleteAccountModalProps) {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDeleteAccount();
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      onClick={closeModal}
    >
      <div
        className="relative top-20 mx-auto p-5 border border-transparent w-96 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col justify-center text-2xl text-center">
          <h1>Tem certeza de que deseja deletar sua conta?</h1>
        </div>

        <div className="flex flex-col justify-center mt-4 items-center">
          <button
            type="submit"
            onClick={handleFormSubmit}
            className="text-white bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 px-5 py-2.5 text-center hover:bg-red-700 my-2 shadow-md"
          >
            Deletar Conta
          </button>
          <button
            className="text-primary-title border border-gray-300 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 py-2.5 text-center shadow-md"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
