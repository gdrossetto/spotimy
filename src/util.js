export const getParamValues = (url) => {
  return url
    .slice(1)
    .split("&")
    .reduce((prev, curr) => {
      const [title, value] = curr.split("=");
      prev[title] = value;
      return prev;
    }, {});
};

export const getAccessToken = () => {
  const params = JSON.parse(localStorage.getItem("params"));
  if (params) return params.access_token;
};

export const getExpiryTime = () => {
  const expires_in = JSON.parse(localStorage.getItem("expiry_time"));
  if (expires_in) return expires_in;
};
