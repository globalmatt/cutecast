import { useState, useEffect } from "react";

function useStateWithLocalStorage(keyName: string, defaultValue: any) {
    const [value, setValue] = useState(
        localStorage.getItem(keyName)
            ? JSON.parse(localStorage.getItem(keyName) as string)
            : defaultValue
    );

    useEffect(
        () => localStorage.setItem(keyName, JSON.stringify(value)),
        [keyName, value]
    );

    return [value, setValue];
}

export default useStateWithLocalStorage;
