export const getParamValues = (url) => {
    return url
      .slice(1)
      .split('&')
      .reduce((prev, curr) => {
        const [title, value] = curr.split('=');
        prev[title] = value;
        return prev;
      }, {});
  };


export const getAccessToken = () =>{
    const params = JSON.parse(localStorage.getItem('params'));
    return params.access_token;
}

export const getExpiryTime = () =>{
  const params = JSON.parse(localStorage.getItem('params'));
  const currentDate = new Date().getTime();
  if(params)
  return params.expires_in * 1000 + currentDate;

  return;
}

