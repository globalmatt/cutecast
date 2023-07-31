import { useEffect, useRef } from "react";

/**
 * Run an effect only once.
 *
 * Passes the supplied callback function to the `useEffect()` hook,
 * ensuring that the callback will only be called once.
 *
 * This not only makes the calling code neater, it also provides a way
 * to run an effect once without triggering the
 * `react-hooks/exhaustive-deps` ESLint rule.
 *
 * @see https://stackoverflow.com/a/56767883/10310114
 * @see
 * https://github.com/facebook/create-react-app/issues/6880#issuecomment-486636121
 *
 * @param {function} fun - The callback function to pass to the
 * `useEffect` hook.
 */
export default function useMount(fun: Function): void {
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            fun();
            mounted.current = true;
        }
    }, [fun]);
}
