/*==================================================
                AQUAPURE GUATEMALA
==================================================*/

/*==========================================
      MENÚ RESPONSIVE
==========================================*/

const menuToggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

    menuToggle.addEventListener("click", () => {

        menu.classList.toggle("activo");

    });

}


/*==========================================
      CERRAR MENÚ AL SELECCIONAR OPCIÓN
==========================================*/

document.querySelectorAll(".menu a").forEach(enlace => {

    enlace.addEventListener("click", () => {

        menu.classList.remove("activo");

    });

});


/*==========================================
      SCROLL SUAVE
==========================================*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const destino = document.querySelector(this.getAttribute("href"));

        if(destino){

            destino.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});


/*==========================================
      MOSTRAR PRODUCTOS
==========================================*/

function mostrarImagen(nombreArchivo){

    const contenedor = document.getElementById("imagen-producto");

    contenedor.innerHTML = `

        <div class="producto-detalle">

            <img src="images/${nombreArchivo}" alt="Producto AquaPure">

            <div class="detalle-producto">

                <h3>Solicita más información</h3>

                <p>

                    Si deseas conocer precios,
                    instalación o especificaciones
                    técnicas de este equipo,
                    contáctanos y uno de nuestros
                    asesores te ayudará.

                </p>

                <a
                href="https://wa.me/message/HGVGMG5HMFBRL1"
                target="_blank"
                class="btn btn-principal">

                    Solicitar Información

                </a>

            </div>

        </div>

    `;

    contenedor.scrollIntoView({

        behavior:"smooth"

    });

}


/*==========================================
      ANIMACIÓN AL HACER SCROLL
==========================================*/

const elementos = document.querySelectorAll(

".beneficio, .servicio, .card-producto, .nosotros, .mision-vision, .faq-item"

);

const observer = new IntersectionObserver(

(entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("mostrar");

        }

    });

},

{

    threshold:0.15

}

);

elementos.forEach(elemento=>{

    observer.observe(elemento);

});


/*==========================================
      FAQ
==========================================*/

const preguntas = document.querySelectorAll(".faq-pregunta");

preguntas.forEach(pregunta=>{

    pregunta.addEventListener("click",()=>{

        const respuesta = pregunta.nextElementSibling;

        respuesta.classList.toggle("abierta");

        const signo = pregunta.querySelector("span");

        if(respuesta.classList.contains("abierta")){

            signo.textContent="-";

        }

        else{

            signo.textContent="+";

        }

    });

});


/*==========================================
      FORMULARIO
==========================================*/

const formulario = document.querySelector(".formulario");

if(formulario){

formulario.addEventListener("submit",(e)=>{

    e.preventDefault();

    alert(

`¡Gracias por comunicarte con AquaPure!

Hemos recibido tu solicitud.

Muy pronto uno de nuestros asesores se pondrá en contacto contigo.`

);

formulario.reset();

});

}


/*==========================================
      HEADER AL HACER SCROLL
==========================================*/

window.addEventListener("scroll",()=>{

const header=document.querySelector(".header");

if(window.scrollY>80){

header.classList.add("scroll");

}

else{

header.classList.remove("scroll");

}

});