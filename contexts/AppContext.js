import { createContext, useState } from "react";
import { useActionDispatcher } from "../hooks/use-action-dispatcher";

export const AppContext = createContext();

export const AppContextProvider = props => {
    
    const [notification, setNotification] = useState();

    return(
        <AppContext.Provider value={[notification, setNotification]}>
            {props.children}
        </AppContext.Provider>
    )
}