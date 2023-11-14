import { createContext, useState } from "react";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";

export const AppContext = createContext();

export const AppContextProvider = props => {
    
    const [userState, userDispatch] = useActionDispatcher({});

    return(
        <AppContext.Provider value={[userState, userDispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}