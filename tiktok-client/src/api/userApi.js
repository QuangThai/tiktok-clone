import axiosClient from "./axiosClient";

const userApi = {
  login: (params) => {
    const url = "/v1/users/login";
    return axiosClient.post(url, params);
  },
  register: (params) => {
    const url = "/v1/users/register";
    return axiosClient.post(url, params);
  },
};
export default userApi