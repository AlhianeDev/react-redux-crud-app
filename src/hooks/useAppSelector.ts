import { TypedUseSelectorHook, useSelector } from "react-redux";

import { StateType } from "../app/store";

export const useAppSelectore: TypedUseSelectorHook<StateType> = useSelector;
