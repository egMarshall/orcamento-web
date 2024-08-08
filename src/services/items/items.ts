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
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
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
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
}

async function getAllItems(): Promise<DataSubmit[]> {
  const response = await fetch(`http://localhost:3001/budget-items/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
    },
  });
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
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
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message);
  }

  return json;
}

export { createItem, updateItem, getAllItems, deleteItem };
