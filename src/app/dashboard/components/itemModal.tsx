import { useState } from "react";
import { BudgetItemProps } from "../page";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { cn } from "@/utils/utils";

interface ItemModalProps {
  item?: BudgetItemProps;
  closeModal: () => void;
  handleSubmit: (item: BudgetItemProps) => void;
  newItem: boolean;
}

export default function ItemModal({
  closeModal,
  handleSubmit,
  newItem,
  item,
}: ItemModalProps) {
  const [itemName, setItemName] = useState(item?.name || "");
  const [itemValue, setItemValue] = useState(item?.value || "");
  const [itemType, setItemType] = useState(item?.type || "");
  const [itemDate, setItemDate] = useState({
    startDate: item?.date || new Date(),
    endDate: item?.date || null,
  });

  const [isValidationFailed, setIsValidationFailed] = useState(false);

  const handleDateChange = (newDate: any) => {
    setItemDate(newDate);
  };

  const handleCheckboxChange = (type: string) => {
    setItemType(type);
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!itemName || !itemValue || !itemType || !itemDate) {
      setIsValidationFailed(true);
      return;
    }

    handleSubmit({
      id: item?.id || "",
      name: itemName,
      value: Number(itemValue),
      type: itemType,
      date: itemDate.startDate,
    });

    setIsValidationFailed(false);
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
          <h1>{newItem ? "Criar Item" : "Editar Item"}</h1>
        </div>
        <form onSubmit={handleFormSubmit} className="max-w mx-auto">
          <div className="mb-5">
            <label
              htmlFor="text"
              className={cn(
                `block mb-2 text-sm font-medium text-gray-900`,
                isValidationFailed && "text-red-500"
              )}
            >
              Item
            </label>
            <input
              type="text"
              id="itemName"
              placeholder="Monitor"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className={cn(
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5  focus:outline-none shadow-sm`,
                isValidationFailed && "border-red-500"
              )}
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="number"
              className={cn(
                `block mb-2 text-sm font-medium text-gray-900`,
                isValidationFailed && "text-red-500"
              )}
            >
              Valor
            </label>
            <input
              type="number"
              id="itemValue"
              value={itemValue}
              onChange={(e) => setItemValue(Number(e.target.value))}
              className={cn(
                `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title block w-full p-2.5  focus:outline-none shadow-sm`,
                isValidationFailed && "border-red-500"
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              id="checkbox-gasto"
              type="checkbox"
              value="Gasto"
              checked={itemType === "Despesa"}
              onChange={() =>
                handleCheckboxChange(itemType === "Despesa" ? "" : "Despesa")
              }
              className={cn(
                `w-4 h-4 text-primary-title bg-gray-100 border-gray-300 rounded focus:ring-primary-title accent-primary-title shadow-sm`,
                isValidationFailed && "text-red-500"
              )}
            />
            <label
              htmlFor="checkbox-2"
              className={cn(
                `ms-2 text-sm font-medium text-gray-900 mr-4`,
                isValidationFailed && "text-red-500"
              )}
            >
              Gasto
            </label>
            <input
              id="checkbox-receita"
              type="checkbox"
              value="Receita"
              checked={itemType === "Receita"}
              onChange={() =>
                handleCheckboxChange(itemType === "Receita" ? "" : "Receita")
              }
              className={cn(
                `w-4 h-4 text-primary-title bg-gray-100 border-gray-300 rounded focus:ring-primary-title accent-primary-title shadow-sm`,
                isValidationFailed && "text-red-500"
              )}
            />
            <label
              htmlFor="checkbox-2"
              className={cn(
                `ms-2 text-sm font-medium text-gray-900`,
                isValidationFailed && "text-red-500"
              )}
            >
              Receita
            </label>
          </div>
          <div className="mb-5">
            <Datepicker
              value={itemDate}
              onChange={handleDateChange}
              useRange={false}
              asSingle={true}
              displayFormat={"DD/MM/YYYY"}
              placeholder={
                item?.date
                  ? dayjs(item.date).format("DD/MM/YYYY")
                  : "Selecione a data"
              }
              inputClassName={cn(
                `bg-gray-50 border  text-gray-900 text-sm rounded-lg focus:border-primary-title focus:ring-primary-title w-full p-2.5 focus:outline-none text-primary-title placeholder-primary-title shadow-sm`,
                isValidationFailed && "border-red-500"
              )}
            />
            {isValidationFailed && (
              <p className="text-red-500 text-sm my-1">
                Todos os campos são obrigatórios.
              </p>
            )}
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="text-white bg-primary-title hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 px-5 py-2.5 text-center shadow-md"
            >
              {newItem ? "Confirmar" : "Editar Item"}
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <button
            className="text-primary-title border border-gray-200 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-1/2 py-2.5 text-center shadow-md"
            onClick={closeModal}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
