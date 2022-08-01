import {useEffect, useRef} from "react";

export function useInterval(callback: () => void, delay: number) {
    const savedCallback: any = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

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
