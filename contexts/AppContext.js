import { createContext, useState } from "react";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";

export const AppContext = createContext();

export const AppContextProvider = props => {
    
    const [state, dispatch] = useActionDispatcher([{
        userID: {},
        text: "",
        image_url: "",
        type: "",
        parent: "",
    }]);

    return(
        <AppContext.Provider value={[state,dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}