import {createContext,useState} from 'react'

const CreateSearchContext = createContext()

// eslint-disable-next-line react/prop-types
export const SearchContextProvider = ({children}) =>{
    const [searchValue,setSearchValue] = useState('');

    return (
        <CreateSearchContext.Provider value={{searchValue,setSearchValue}}>
            {children}
        </CreateSearchContext.Provider>
    )
}


export default CreateSearchContext;