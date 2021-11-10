export default async function fetchAuth(url, accessToken, method = "GET", body = {}) {
  const options = {
    method: method,
    headers: {
      "Authorization": `Bearer ${accessToken}`,
    }
  };
  switch (method) {
    case "POST":
    case "PUT":
    case "PATCH":
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
      break;
    default:
      break;
  }

  return await fetch(url, options);
}
