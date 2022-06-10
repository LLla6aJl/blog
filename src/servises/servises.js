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
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: raw,
    redirect: "follow",
  };
  let res = await fetch(
    "https://kata.academy:8021/api/users/login",
    requestOptions
  ).then((response) => response.json());
  return await res;
}

export async function updateUserFetch(data, token, oldPassword, oldAvatar) {
  const { email, username, password, avatar } = data;

  const raw = JSON.stringify({
    user: {
      username,
      email,
      password: password ? password : oldPassword,
      image: avatar ? avatar : oldAvatar,
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

export async function fetchLike(slug, token, favorited) {
  const requestOptions = {
    method: favorited ? "DELETE" : "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    redirect: "follow",
  };

  let res = await fetch(
    `https://kata.academy:8021/api/articles/${slug}/favorite`,
    requestOptions
  ).then((response) => response.json());
  return await res;
}

export async function createArticle(data, token, tagsList) {
  console.log(tagsList);
  const { title, description, text } = data;
  const raw = JSON.stringify({
    article: {
      title,
      description,
      body: text,
      tagList: tagsList,
    },
  });
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      Authorization: `Bearer ${token}`,
    },
    body: raw,
    redirect: "follow",
  };

  let res = await fetch(
    `https://kata.academy:8021/api/articles`,
    requestOptions
  ).then((response) => response.json());
  return await res;
}
