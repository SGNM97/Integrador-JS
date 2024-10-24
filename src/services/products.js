/* === PRODUCT === */
import Swal from "sweetalert2";

import { productoActivo } from "../../main";
import { handleGetProductoLocalStorage, setInLocalStorage } from "../persistence/localStorage"
import { closeModal } from "../views/modal";
import { handleGetProductsToStore, handleRenderList } from "../views/store";


//Guardamos
const acceptButton = document.getElementById("acceptButton");
acceptButton.addEventListener('click', ()=> {
    handleSaveOrModifyElements();
})

//Funcion de guardar
const handleSaveOrModifyElements = ()=> {
    const nombre = document.getElementById("nombre").value,
    imagen = document.getElementById("img").value,
    precio = document.getElementById("precio").value,
    categories = document.getElementById("categoria").value;

    let object = null;

    if(productoActivo){
        object = {
            ... productoActivo,
            nombre,
            imagen,
            precio,
            categories,
        }
    } else {
        object = {
            id: new Date().toISOString(),
            nombre,
            imagen,
            precio,
            categories,
        };
    };

    Swal.fire({
        title: "Correcto!",
        text: "Producto guardado correctamente",
        icon: "success"
      });

    setInLocalStorage(object);
    handleGetProductsToStore();
    closeModal();
};

//Eliminar producto

export const handleDeleteProduct = () => {
    Swal.fire({
        title: "¿Desea eliminar este elemento?",
        text: "Esto es irrevertible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
            const products = handleGetProductoLocalStorage();
            const result = products.filter((el) => el.id !== productoActivo.id);
            //Setear el nuevo array
            localStorage.setItem("products", JSON.stringify(result));
            const newProducts = handleGetProductoLocalStorage();
            handleRenderList(newProducts);
            closeModal()
        } else {
            closeModal()
        }
    });   
};