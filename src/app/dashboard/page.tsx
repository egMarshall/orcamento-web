'use client';

import { useState } from "react";
import BudgetItemsList from "./components/budgetItensList";

export interface BudgetItemProps {
  id: number;
  name: string;
  value: number;
  date: string;
  type: string;
}

export default function Dashboard() {

  const [items, setItems] = useState([
    {id:1, name: "Carro", value: 40.000, date: "12/12/2012", type: "Gasto" },
    {id:2, name: "Bicicleta", value: 5.000, date: "19/02/2020", type: "Gasto" },
    {id:3, name: "Teclado", value: 500, date: "13/08/2022", type: "Venda" }
  ]);

  function removeBudgetItem(itemId: number) {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }

  function editBudgetItem(itemId: number) {
    console.log("Editando item de id: ", itemId);
  }

  function calculateBalance(items: BudgetItemProps[]) {
    let balance = 0;
    items.forEach(item => {
      if (item.type === "Gasto") {
        balance -= item.value;
      } else {
        balance += item.value;
      }
    });
    return balance;
  }

  return (
    <main className="container mx-auto text-gray-600 flex flex-row justify-center w-100">
      <div className="flex flex-col items-center w-3/5">
        <h1 className="text-3xl">Sistema de orçamento</h1>
        <BudgetItemsList 
          items={items} 
          removeBudgetItem={removeBudgetItem}
          editBudgetItem={editBudgetItem}
        />
      </div>
      <div className="flex flex-col items-center w-1/4 border-l border-primary-subtitle">
        <h2 className="text-2xl">Saldo:</h2>
        <h3 className="text-xl">R$ {calculateBalance(items)}</h3>
      </div>
    </main>
  );
}
