import React ,{useContext,createContext,useReducer} from 'react';
 
export const Statecontext =createContext();

export const Stateprovider=({reducer,initialstate,children})=>{
    return(
    <Statecontext.Provider value={useReducer(reducer,initialstate)}>{children}</Statecontext.Provider>
    );
}

export const useStateValue =()=> useContext(Statecontext);  