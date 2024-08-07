type DataSubmit = {
  id: string;
  name: string;
  value: number;
  type: string;
  date: Date;
};

type CreateDataSubmit = {
  name: string;
  value: number;
  type: string;
  date: Date;
};

async function createItem(dataSubmit: CreateDataSubmit): Promise<DataSubmit> {
  const response = await fetch(`http://localhost:3001/budget-items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(dataSubmit),
  });

  if (!response.ok) {
    console.log(response);
    throw new Error("Erro ao criar item");
  }

  return response.json();
}

async function updateItem(dataSubmit: DataSubmit): Promise<DataSubmit> {
  const response = await fetch(
    `http://localhost:3001/budget-items/${dataSubmit.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(dataSubmit),
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return response.json();
}

async function getAllItems(): Promise<DataSubmit[]> {
  const response = await fetch(`http://localhost:3001/budget-items/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar itens");
  }

  return response.json();
}

async function deleteItem(item_id: string): Promise<void> {
  const response = await fetch(
    `http://localhost:3001/budget-items/${item_id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao deletar item");
  }
}

export { createItem, updateItem, getAllItems, deleteItem };
