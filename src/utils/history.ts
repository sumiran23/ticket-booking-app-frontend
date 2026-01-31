import { type NavigateFunction } from "react-router-dom";

type History = {
  navigate: NavigateFunction | null;
};

export const history: History = {
  navigate: null,
};
