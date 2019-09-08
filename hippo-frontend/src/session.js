const getSessionToken = () => {
  const sessionToken = window.sessionStorage.getItem("sessionToken");
  if (sessionToken) return sessionToken;

  const randomChars = Array.from(
    window.crypto.getRandomValues(new Uint8Array(64))
  )
    .map(String.fromCharCode)
    .join("");

  const token = btoa(randomChars);
  window.sessionStorage.setItem("sessionToken", token);
  return token;
};

export default getSessionToken;
