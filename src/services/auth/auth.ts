type LoginDataSubmit = {
  email: string;
  password: string;
};

type SignUpDataSubmit = {
  name: string;
  email: string;
  password: string;
};

export type UpdateDataSubmit = {
  name?: string;
  password?: string;
};

type LoginResponse = {
  token: string;
};

type UserData = {
  name: string;
  email: string;
};

async function signIn(dataSubmit: LoginDataSubmit): Promise<LoginResponse> {
  const response = await fetch("http://localhost:3001/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataSubmit),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Erro ao fazer login");
  }

  const { token } = await response.json();

  if (!token) {
    throw new Error("Usuário ou senha inválidos");
  }

  sessionStorage.setItem("token", token);

  return { token };
}

async function getSession() {
  const token = sessionStorage.getItem("token");

  if (!token) {
    return null;
  }

  const response = await fetch("http://localhost:3001/users/session", {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  });

  if (!response.ok) {
    return null;
  }

  return await response.json();
}

async function signUp(dataSubmit: SignUpDataSubmit): Promise<LoginResponse> {
  const response = await fetch("http://localhost:3001/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataSubmit),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  const { token } = await response.json();

  if (!token) {
    throw new Error("Erro ao fazer login");
  }

  return { token };
}

async function updateUser(dataSubmit: UpdateDataSubmit): Promise<UserData> {
  const response = await fetch(`http://localhost:3001/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer: ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(dataSubmit),
  });

  if (!response.ok) {
    throw new Error("Erro ao fazer login");
  }

  const { name, email } = await response.json();

  if (!name || !email) {
    throw new Error("Erro ao atualizar usuário");
  }

  return { name, email };
}

export { signIn, getSession, signUp, updateUser };
