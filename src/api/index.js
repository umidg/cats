import axios from "axios";

export const callApi = async (url, method = "GET") => {
  const config = {
    method,
    url,
  };
  return axios(config)
    .then((res) => res.data)
    .catch((err) => err);
};
