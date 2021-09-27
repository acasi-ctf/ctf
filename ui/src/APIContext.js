import React, {useContext, useState} from 'react'

const pageAPIContext = React.createContext()
const updateAPI = React.createContext()

export function useGetAPI(){
    return useContext(pageAPIContext)
}

export function useSetAPI(api){
    return useContext(updateAPI)
}

export function APIPathProvider ({children}){
    const [pageAPI, setPageAPI] = useState("");
    
    return(
        <pageAPIContext.Provider value={pageAPI}>
            <updateAPI.Provider value={(e) =>{setPageAPI(e)}}>
                {children}
            </updateAPI.Provider>
        </pageAPIContext.Provider>
    )
}