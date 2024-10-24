// ====== STORE =====

import { setProductoActivo } from "../../main";
import { handleGetProductoLocalStorage } from "../persistence/localStorage";
import { openModal } from "./modal";

// Función que se encarga de traer elementos y llamar al render
export const handleGetProductsToStore = () => {
    const products = handleGetProductoLocalStorage();
    handleRenderList(products);
}

// Se encarga de filtrar y de renderizar la seccion con todos sus respectivos
// elementos
export const handleRenderList = (productosIn) => {
    // filtrado de arrays por categorias
    const burgers = productosIn.filter((el) => el.categories === "Hamburguesas");
    const papas = productosIn.filter((el) => el.categories === "Papas");
    const gaseosas = productosIn.filter((el) => el.categories === "Gaseosas");

    // Renderiza los elementos de la sección
    const renderProductGroup = (productos, title) => {
        if(productos.length > 0){
            const productosHTML = productos.map((producto, index) => {
                return `
                    <div class='containerTargetItem' id='product-${producto.categories}-${index}'>
                    <div>
                    <img src='${producto.imagen}'/>
                    <div>
                    <h2>${producto.nombre}</h2>
                    </div>
                    <div class='targetProps'>
                    <p><b>Precio: </b> ${producto.precio}</p>
                    </div>
                    </div>
                    </div>
                `;
            });
            // Retorna la sección con todos los elementos dentro
            return `
                <section class='sectionStore'>
                <div class='containerTitleSection'>
                <h3>${title}</h3>
                </div>
                <div class='containerProductStore'>
                ${productosHTML.join('')}
                </div>
                </section>
            `;
        } else{
            return ""
        }
    };

    //Se encarga de renderizar cada uno de los productos dentro de su categoria
    const appContainer = document.getElementById("storeContainer");
    appContainer.innerHTML = `
    ${renderProductGroup(burgers, "Hamburguesas")}
    ${renderProductGroup(papas, "Papas")}
    ${renderProductGroup(gaseosas, "Gaseosas")}
    `;

    // añaden los eventos de manera dinamica
    const addEvents = (productsIn) => {
        console.log(productosIn)
        if(productsIn){
            productsIn.forEach((element, index) => {
                console.log(element);
                const productContainer = document.getElementById(`product-${element.categories}-${index}`);
                productContainer.addEventListener('click', () => {
                    setProductoActivo(element);
                    openModal();
                });
            });
        }
    };
    addEvents(papas);
    addEvents(burgers);
    addEvents(gaseosas);
};