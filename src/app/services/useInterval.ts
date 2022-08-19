import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number) {
    const savedCallback: any = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => {
                clearInterval(id);
            };
        }
    }, [callback, delay]);
}
