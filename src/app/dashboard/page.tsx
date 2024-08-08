"use client";

import { useEffect, useState } from "react";
import BudgetItemsList from "./components/budgetItensList";
import ItemModal from "./components/itemModal";
import {
  getAllItems,
  createItem,
  deleteItem,
  updateItem,
} from "@/services/items/items";
import Spinner from "../components/spinner";
import { toast } from "sonner";
import DeleteItemModal from "./components/deleteItemModal";

export interface BudgetItemProps {
  id: string;
  name: string;
  value: number;
  type: string;
  date: Date;
}

export interface CreateBudgetItemProps {
  name: string;
  value: number;
  type: string;
  date: Date;
}

export interface SortingOptions {
  recentDate: "recentDate";
  oldestDate: "oldestDate";
  highestValue: "highestValue";
  lowestValue: "lowestValue";
}

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteItemModalOpen, setDeleteItemModalOpen] = useState(false);
  const [newItem, setNewItem] = useState(true);
  const [selectedItem, setSelectedItem] = useState<BudgetItemProps | undefined>(
    undefined
  );
  const [selectedItemToDelete, setSelectedItemToDelete] =
    useState<BudgetItemProps>();
  const [items, setItems] = useState<BudgetItemProps[]>([]);
  const [sortOption, setSortOption] =
    useState<keyof SortingOptions>("recentDate");

  const openModal = (item?: BudgetItemProps) => {
    if (item) {
      setNewItem(false);
      setSelectedItem(item);
    } else {
      setNewItem(true);
      setSelectedItem(undefined);
    }
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const openDeleteItemModal = (item: BudgetItemProps) => {
    setSelectedItemToDelete(item);
    setDeleteItemModalOpen(true);
  };
  const closeDeleteItemModal = () => setDeleteItemModalOpen(false);

  useEffect(() => {
    async function fetchItems() {
      try {
        const fetchedItems: BudgetItemProps[] = await getAllItems();
        setItems(fetchedItems);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchItems();
  }, []);

  async function removeBudgetItem(deleting_item: BudgetItemProps) {
    try {
      await deleteItem(deleting_item.id);
      setItems((prevItems) =>
        prevItems.filter((item) => item.id !== deleting_item.id)
      );
      closeDeleteItemModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao criar item", {
        description: error.message,
      });
    }
  }

  async function handleNewItem(item: BudgetItemProps) {
    try {
      const newItem = await createItem(item);
      setItems((prevItems) => [...prevItems, newItem]);
      closeModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao criar item", {
        description: error.message,
      });
    }
  }

  async function handleEditItem(item: BudgetItemProps) {
    try {
      const updatedItem = await updateItem(item);
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === updatedItem.id ? updatedItem : prevItem
        )
      );
      closeModal();
    } catch (error: any) {
      console.log(error);
      toast.error("Erro ao criar item", {
        description: error.message,
      });
    }
  }

  const sortedItems = [...items].sort((a, b) => {
    switch (sortOption) {
      case "recentDate":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldestDate":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highestValue":
        return b.value - a.value;
      case "lowestValue":
        return a.value - b.value;
      default:
        return 0;
    }
  });

  function calculateBalance(items: BudgetItemProps[]) {
    let balance = 0;
    items.forEach((item) => {
      if (item.type === "Despesa") {
        balance -= item.value;
      } else {
        balance += item.value;
      }
    });
    return balance;
  }

  return (
    <main className="container mx-auto text-gray-600 flex flex-row justify-center w-100 bg-slate-100 pl-5">
      <div className="flex flex-col items-center w-4/5">
        <h1 className="text-3xl mb-10 mt-10">Sistema de orçamento</h1>
        <div className="flex w-full">
          <div className="flex w-full justify-center">
            <button
              onClick={() => openModal()}
              className=" text-white bg-menu-bg hover:bg-gray-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-1/5 sm:w-1/5 px-5 py-2.5 text-center mb-5 ml-20 shadow-md"
            >
              <h1 className="text-lg">Adicionar Item</h1>
            </button>
          </div>
          <div className="flex justify-end mb-5">
            <select
              value={sortOption}
              onChange={(e) =>
                setSortOption(e.target.value as keyof SortingOptions)
              }
              className="px-4 py-2 rounded bg-gray-200 shadow-md h-10"
            >
              <option value="recentDate">Data mais recente</option>
              <option value="oldestDate">Data mais antiga</option>
              <option value="highestValue">Maior valor</option>
              <option value="lowestValue">Menor valor</option>
            </select>
          </div>
        </div>
        {modalOpen && (
          <ItemModal
            closeModal={closeModal}
            handleSubmit={newItem ? handleNewItem : handleEditItem}
            newItem={newItem}
            item={selectedItem}
          />
        )}
        {deleteItemModalOpen && (
          <DeleteItemModal
            item={selectedItemToDelete}
            closeModal={closeDeleteItemModal}
            handleDeleteItem={removeBudgetItem}
          />
        )}
        {isLoading ? (
          <Spinner />
        ) : sortedItems.length > 0 ? (
          <BudgetItemsList
            items={sortedItems}
            removeBudgetItem={(item) => openDeleteItemModal(item)}
            editBudgetItem={(item) => openModal(item)}
          />
        ) : (
          <h2 className="text-2xl">Nenhum item cadastrado</h2>
        )}
      </div>
      <div className="flex flex-col items-center w-1/5">
        <h2 className="text-2xl mt-20">Saldo:</h2>
        <h3 className="text-xl">
          R$ {isLoading ? <Spinner /> : calculateBalance(items)}
        </h3>
      </div>
    </main>
  );
}
