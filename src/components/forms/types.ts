import { Dispatch } from "react";

export type FormTypes = {
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  type: "create" | "update";
  data?: any;
};
