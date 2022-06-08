export async function getArticles(offset = 0) {
  // eslint-disable-next-line no-return-await
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const res = await fetch(
    `https://kata.academy:8021/api/articles?limit=5&offset=${offset}`,
    requestOptions
  );
  if (!res.ok) {
    return getArticles();
  }
  // eslint-disable-next-line no-return-await
  return await res.json();
}

export async function newUser(data) {
  const { username, email, password } = data;
  const raw = JSON.stringify({
    user: {
      username,
      email,
      password,
    },
  });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: raw,
    redirect: "follow",
  };
  let res = await fetch(
    "https://kata.academy:8021/api/users",
    requestOptions
  ).then((response) => response.json());
  return await res;
}

export async function loginUser(data) {
  const { email, password } = data;
  const raw = JSON.stringify({
    user: {
      email,
      password,
    },
  });
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: raw,
    redirect: "follow",
  };
  let res = await fetch(
    "https://kata.academy:8021/api/users/login",
    requestOptions
  ).then((response) => response.json());
  return await res;
}

export async function updateUserFetch(data, token) {
  const { email, username, password, avatar } = data;

  const raw = JSON.stringify({
    user: {
      username,
      email,
      password,
      image: avatar,
    },
  });
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: raw,
    redirect: "follow",
  };
  let res = await fetch(
    "https://kata.academy:8021/api/user",
    requestOptions
  ).then((response) => response.json());
  return await res;
}
