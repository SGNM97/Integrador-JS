// === LOCALSTORAGE === //
//traer productos localstorage
export const handleGetProductoLocalStorage = () =>{
    const products = JSON.parse (localStorage.getItem("products"));
    if(products) {
        return products;
    } else {
        return [];
    }
};

//Guardar En Local Storage
//recibir un producto
export const setInLocalStorage = (productIn) => {
    if (productIn){
        //traer los elementos
        let productsInLocal = handleGetProductoLocalStorage();
        console.log(productIn);
        const existingIndex = productsInLocal.findIndex((productsLocal)=> productsLocal.id === productIn.id)
        //verificar si el elemento existe
        if(existingIndex ==! -1){
            //si existe debe reemplazarse
            productsInLocal[existingIndex] = productIn;
        } else{
            //si no agregarse
            productsInLocal.push(productIn);
        }
        //Setear el nuevo array
        localStorage.setItem("products", JSON.stringify(productsInLocal));
    }
};