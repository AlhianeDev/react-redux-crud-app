import { useDispatch } from "react-redux";

import { dispatchType } from "../app/store";

export const useAppDispatch = () => useDispatch<dispatchType>();
