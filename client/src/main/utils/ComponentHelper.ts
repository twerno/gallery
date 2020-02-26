import React from "react";

const shallow = require("shallow-equal") as { shallowEqualObjects: (objA?: {}, objB?: {}) => boolean };

export const useIsMounted = () => {
    const _isMounted = React.useRef<boolean>(true);

    React.useEffect(() => {
        _isMounted.current = true;
        return () => { _isMounted.current = false; }
    }, []);

    return { isMounted: () => _isMounted.current };
};

/**
 * helper hook for async actions to determined if action is being resolved in valid context
 * isObsolete returns true if component has been unmounted or param has been updated
 */
export const useIsObsolete = <T>(initParam?: T) => {
    const { isMounted } = useIsMounted();
    const paramRef = React.useRef<T | undefined>(initParam);

    const isObsolete = (shallowParam: T): boolean => {
        return !isMounted() || !shallow.shallowEqualObjects(paramRef.current, shallowParam);
    }

    const updateParam = (newShallowParam: T) => paramRef.current = newShallowParam;

    return {
        isObsolete,
        updateParam
    };
};
