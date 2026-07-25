/*==================================================
                AQUAPURE GUATEMALA
                script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*==========================================
            MENÚ RESPONSIVE
    ==========================================*/

    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");

    if (menuToggle && menu) {

        menuToggle.addEventListener("click", () => {

            menu.classList.toggle("active");

            const icono = menuToggle.querySelector("i");

            if (menu.classList.contains("active")) {

                icono.classList.remove("fa-bars");
                icono.classList.add("fa-xmark");

            } else {

                icono.classList.remove("fa-xmark");
                icono.classList.add("fa-bars");

            }

        });

        document.querySelectorAll(".menu a").forEach(link => {

            link.addEventListener("click", () => {

                menu.classList.remove("active");

                const icono = menuToggle.querySelector("i");

                icono.classList.remove("fa-xmark");
                icono.classList.add("fa-bars");

            });

        });

    }

    /*==========================================
                HEADER SCROLL
    ==========================================*/

    const header = document.getElementById("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 60) {

            header.style.boxShadow = "0 10px 25px rgba(0,0,0,.10)";
            header.style.background = "rgba(255,255,255,.98)";

        } else {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
            header.style.background = "rgba(255,255,255,.95)";

        }

    });

    /*==========================================
                    FAQ
    ==========================================*/

    const preguntas = document.querySelectorAll(".faq-item");

    preguntas.forEach(item => {

        const boton = item.querySelector(".faq-pregunta");

        boton.addEventListener("click", () => {

            preguntas.forEach(faq => {

                if (faq !== item) {

                    faq.classList.remove("active");

                }

            });

            item.classList.toggle("active");

        });

    });

    /*==========================================
        FORMULARIO -> WHATSAPP
    ==========================================*/

    const formulario = document.getElementById("formulario");

    if (formulario) {

        formulario.addEventListener("submit", function (e) {

            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const correo = document.getElementById("correo").value.trim();
            const equipo = document.getElementById("equipo").value;
            const mensaje = document.getElementById("mensaje").value.trim();

            if (nombre === "" || telefono === "") {

                alert("Por favor completa tu nombre y número de WhatsApp.");

                return;

            }

            let texto =

`*NUEVA SOLICITUD DE COTIZACIÓN*%0A
------------------------------------%0A
👤 *Nombre:* ${nombre}%0A
📱 *WhatsApp:* ${telefono}%0A
📧 *Correo:* ${correo || "No proporcionado"}%0A
💧 *Equipo de interés:* ${equipo}%0A
📝 *Mensaje:* ${mensaje || "Sin comentarios"}%0A
------------------------------------%0A
Enviado desde la página web de AquaPure Guatemala.`;

            const url = `https://wa.me/50239856332?text=${texto}`;

            window.open(url, "_blank");

            formulario.reset();

        });

    }

    /*==========================================
            SCROLL SUAVE
    ==========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(ancla => {

        ancla.addEventListener("click", function (e) {

            const destino = document.querySelector(this.getAttribute("href"));

            if (destino) {

                e.preventDefault();

                destino.scrollIntoView({

                    behavior: "smooth"

                });

            }

        });

    });

    /*==========================================
            ANIMACIÓN AL HACER SCROLL
    ==========================================*/

    const elementos = document.querySelectorAll(

        ".beneficio, .servicio, .card-producto, .card-mision, .card-vision"

    );

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    }, {

        threshold: .15

    });

    elementos.forEach(el => {

        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.transition = ".7s";

        observer.observe(el);

    });

});