import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { getCustomAxios } from "./customAxios";

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers }, api) => {
    try {
      const customAxios = getCustomAxios(api);
      const response = await customAxios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      });
      return { data: response.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      console.log(err);
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || { message: err.message },
        },
      };
    }
  };

export default axiosBaseQuery;
