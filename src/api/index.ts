import axios from "axios";
import { TArticleFormData } from "../types/article";
import { IUserFormData } from "../types/user";

export const axiosApiInstance = axios.create({
  baseURL: "https://conduit.productionready.io/api/",
});

export const setToken = (token: string): void => {
  localStorage.setItem("token", JSON.stringify(token));
};
export const getToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  }
  return null;
};
axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers = {
        Authorization: `Token ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getData = async (endPoint: string): Promise<any> => {
  const response = await axiosApiInstance.get(endPoint);
  return response.data;
};
export const postFetch = async (
  endPoint: string,
  data: IUserFormData | TArticleFormData
): Promise<any> => {
  const response = await axiosApiInstance.post(endPoint, data);
  return response.data;
};
export const putFetch = async (
  endPoint: string,
  data: IUserFormData | TArticleFormData
): Promise<any> => {
  const response = await axiosApiInstance.put(endPoint, data);
  return response.data;
};
