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

    function cerrarMenu() {
        menu.classList.remove("active");
        const icono = menuToggle.querySelector("i");
        icono.classList.remove("fa-xmark");
        icono.classList.add("fa-bars");
    }

    if (menuToggle && menu) {

        menuToggle.addEventListener("click", () => {

            menu.classList.toggle("active");

            const icono = menuToggle.querySelector("i");
            const abierto = menu.classList.contains("active");

            icono.classList.toggle("fa-xmark", abierto);
            icono.classList.toggle("fa-bars", !abierto);

        });

        document.querySelectorAll(".menu a").forEach(link => {
            link.addEventListener("click", cerrarMenu);
        });

    }

    /*==========================================
                HEADER SCROLL
    ==========================================*/

    const header = document.getElementById("header");

    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 60) {
                header.style.boxShadow = "0 10px 25px rgba(0,0,0,.10)";
                header.style.background = "rgba(255,255,255,.98)";
            } else {
                header.style.boxShadow = "0 5px 20px rgba(0,0,0,.05)";
                header.style.background = "rgba(255,255,255,.95)";
            }

        });

    }

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

        formulario.addEventListener("submit", (e) => {

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

            // Se arma con saltos de línea normales y luego se codifica completo.
            // Así los acentos, emojis y símbolos (&, #, %) no rompen el mensaje.
            const texto = [
                "*NUEVA SOLICITUD DE COTIZACIÓN*",
                "------------------------------------",
                `👤 *Nombre:* ${nombre}`,
                `📱 *WhatsApp:* ${telefono}`,
                `📧 *Correo:* ${correo || "No proporcionado"}`,
                `💧 *Equipo de interés:* ${equipo}`,
                `📝 *Mensaje:* ${mensaje || "Sin comentarios"}`,
                "------------------------------------",
                "Enviado desde la página web de AquaPure Guatemala."
            ].join("\n");

            const url = `https://wa.me/50239856332?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank", "noopener");

            formulario.reset();

        });

    }

    /*==========================================
            SCROLL SUAVE
    ==========================================*/

    document.querySelectorAll('a[href^="#"]').forEach(ancla => {

        ancla.addEventListener("click", function (e) {

            const id = this.getAttribute("href");

            if (id.length < 2) return;

            const destino = document.querySelector(id);

            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: "smooth" });
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
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }

        });

    }, { threshold: .15 });

    elementos.forEach(el => {

        el.classList.add("reveal");

        observer.observe(el);

    });

    /*==========================================
        DETALLES DESPLEGABLES DE PRODUCTOS
    ==========================================*/

    const tarjetas = document.querySelectorAll(".card-producto");

    tarjetas.forEach(tarjeta => {

        const ficha = tarjeta.querySelector(".ficha-producto");
        const imagenTarjeta = tarjeta.querySelector("img");

        if (!ficha || !imagenTarjeta) return;

        const boton = document.createElement("button");
        boton.type = "button";
        boton.className = "btn-detalles";
        boton.setAttribute("aria-expanded", "false");
        boton.innerHTML = '<span>Ver detalles</span> <i class="fa-solid fa-chevron-down"></i>';

        ficha.before(boton);

        function alternar() {
            const abierta = tarjeta.classList.toggle("abierta");
            boton.setAttribute("aria-expanded", abierta);
            boton.querySelector("span").textContent = abierta ? "Ocultar detalles" : "Ver detalles";
        }

        boton.addEventListener("click", alternar);
        imagenTarjeta.addEventListener("click", alternar);

    });

    /*==========================================
            VISOR Y ZOOM DE PRODUCTOS
    ==========================================*/

    const visor = document.getElementById("visor-producto");
    const visorImagen = document.getElementById("visor-imagen");
    const visorCerrar = document.getElementById("visor-cerrar");

    const zoomMas = document.getElementById("zoom-mas");
    const zoomMenos = document.getElementById("zoom-menos");
    const zoomReset = document.getElementById("zoom-reset");

    const imagenesProductos = document.querySelectorAll(".card-producto img");

    const ZOOM_MIN = 0.5;
    const ZOOM_MAX = 3;

    let escala = 1;

    function actualizarZoom() {

        escala = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, escala));

        visorImagen.style.transform = `scale(${escala})`;
        zoomReset.textContent = `${Math.round(escala * 100)}%`;

    }

    function abrirVisor(imagen) {

        visorImagen.src = imagen.src;
        visorImagen.alt = imagen.alt;

        escala = 1;
        actualizarZoom();

        visor.classList.add("active");
        document.body.style.overflow = "hidden";

    }

    function cerrarVisor() {

        visor.classList.remove("active");
        document.body.style.overflow = "";
        visorImagen.removeAttribute("src");

    }

    if (visor && visorImagen) {

        // Botón de lupa sobre cada imagen para abrir el zoom
        imagenesProductos.forEach(imagen => {

            const lupa = document.createElement("button");
            lupa.type = "button";
            lupa.className = "btn-zoom";
            lupa.setAttribute("aria-label", "Ampliar imagen");
            lupa.innerHTML = '<i class="fa-solid fa-magnifying-glass-plus"></i>';
            lupa.addEventListener("click", () => abrirVisor(imagen));

            imagen.parentElement.appendChild(lupa);

        });

        visorCerrar.addEventListener("click", cerrarVisor);

        // Cerrar al hacer clic en el fondo
        visor.addEventListener("click", (e) => {
            if (e.target === visor) cerrarVisor();
        });

        // Cerrar con ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && visor.classList.contains("active")) {
                cerrarVisor();
            }
        });

        zoomMas.addEventListener("click", () => {
            escala += 0.25;
            actualizarZoom();
        });

        zoomMenos.addEventListener("click", () => {
            escala -= 0.25;
            actualizarZoom();
        });

        zoomReset.addEventListener("click", () => {
            escala = 1;
            actualizarZoom();
        });

        // Zoom con la rueda del mouse
        visorImagen.addEventListener("wheel", (e) => {

            e.preventDefault();

            escala += e.deltaY < 0 ? 0.15 : -0.15;
            actualizarZoom();

        }, { passive: false });

    }

});
