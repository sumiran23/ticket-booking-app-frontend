import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwtDecode(token);
  return dayjs.unix(decodedToken.exp as number).diff(dayjs()) < 1;
};
