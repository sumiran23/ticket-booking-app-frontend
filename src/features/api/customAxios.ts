/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { AxiosInstance } from "axios";

import { isTokenExpired } from "../../utils/jwtDecode";
import {
  setLoginData,
  setLogoutData,
} from "../authentication/reducer/authSlice";
import { history } from "../../utils/history";
import publicAPIs from "../../utils/constant";

let customAxios: AxiosInstance;

export const getCustomAxios = (api: any) => {
  if (!customAxios) {
    console.log("Creating custom axios");
    customAxios = axios.create({
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const navigate = history.navigate!;

    customAxios.interceptors.request.use(
      async (config) => {
        const url = new URL(config.url || "");
        const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");

        if (
          (publicAPIs.includes(url.origin + url.pathname) ||
            url.pathname.includes("event")) &&
          !url.pathname.includes("reserve") &&
          !url.pathname.includes("confirm") &&
          !isUserLoggedIn
        ) {
          return config;
        }

        const accessToken = api.getState().auth.accessToken;

        if (!accessToken || isTokenExpired(accessToken)) {
          try {
            const response = await axios.post(
              "http://localhost:3001/api/v1/auth/refreshToken",
              {},
              { withCredentials: true },
            );

            api.dispatch(
              setLoginData({
                email: response.data.email,
                accessToken: response.data.accessToken,
              }),
            );
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            console.log("Unable to refresh the token");
            api.dispatch(setLogoutData());
            navigate("/login");
            throw new axios.Cancel("Request canceled");
          }
        } else {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error) => {},
    );
    customAxios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          api.dispatch(setLogoutData());
          navigate("/login");
          return;
        }
        return Promise.reject(error);
      },
    );
  }

  return customAxios;
};
