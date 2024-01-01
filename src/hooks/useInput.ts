import { useState } from "react";

export type BindType = {

    value: string;

    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

}

export const useInput =

(initialState = ""): [string, BindType, (resetValue?: string) => void]  => {

    const [value, setValue] = useState(initialState);

    const reset = (resetValue = "") => {

        setValue(resetValue);

    }

    const bind = {

        value,

        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {

            setValue(e.target.value)

        }

    }

    return [value, bind, reset];

}
