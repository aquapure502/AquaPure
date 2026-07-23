function mostrarImagen(nombreArchivo) {
    const contenedor = document.getElementById('imagen-producto');
    contenedor.innerHTML = `<img src="images/${nombreArchivo}" alt="Producto">`;
}
