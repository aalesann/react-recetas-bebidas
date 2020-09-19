import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


// Creamos el context
export const ModalContext = createContext();

const ModalProvider = (props) => {

    // Estado del Provider
    const [ idreceta, guardarIdReceta ] = useState(null);
    const [ infoReceta, guardarInfoReceta ] = useState({});

    useEffect(() => {
       if(idreceta != null){
        const obtenerInfoReceta = async () => {
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            // console.warn("RECETA OBTENIDA");
            // console.log(resultado.data.drinks[0]);
            guardarInfoReceta(resultado.data.drinks[0])
        }
        obtenerInfoReceta(idreceta)
       }

    }, [idreceta])


    return ( 
        <ModalContext.Provider
            value={{
                infoReceta,
                guardarIdReceta,
                guardarInfoReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;