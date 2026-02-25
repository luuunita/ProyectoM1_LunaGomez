// traemos los elementos de html usando sus id
const botonGenerar = document.getElementById("generate");
const selectorCantidad = document.getElementById("size");
const contenedorColores = document.getElementById("colors-container");
const selectorFormato = document.getElementById("format");
const tooltipMsg = document.getElementById("msg-tooltip");

function mostrarMensaje(texto) {
    tooltipMsg.textContent = texto;
    tooltipMsg.classList.add("show");

    clearTimeout(tooltipMsg._t);
    tooltipMsg._t = setTimeout(() => {
        tooltipMsg.classList.remove("show");
    }, 1200);
}
function mensajeListo() {
    const cantidad= selectorCantidad.value;
    const formato = selectorFormato.value;

    if (cantidad === "" || formato === "select" || formato === "") return; //si falta algo no muestra
    
    mostrarMensaje("Listo para generar: " + cantidad + " en " + formato);
}
    selectorCantidad.addEventListener("change", mensajeListo);
    selectorFormato.addEventListener("change", mensajeListo);

// el evento que va a suceder cuando el usuaio haga clic en el boton
// cuando haya un click.....
botonGenerar.addEventListener("click", function() { 
    console.log("clic Generar Paleta");

    // leer cuantos colores quiere el usuario, ...ejecuta este bloque cuando haya clic
    let cantidad = Number(selectorCantidad.value);
    console.log("Cantidad", cantidad);

    const formato = selectorFormato.value;

    if (!cantidad || formato === "select" || formato === "") {
        mostrarMensaje("Selecciona cantidad y formato");
        return;
    }

    //esto es para limpiar el contenedor, los colores anteriores
    contenedorColores.innerHTML = "";

    function hslToRGB(h, s, l) {
        //convertimos s y l de porcentaje a decimal
        s = s/ 100;
        l = l/ 100;

        //calculamos un valor intermedio llamado c
        let c = (1 - Math.abs(2 * l - 1)) * s;
        //calculamos otro valor intermedio llamado x
        let x = c* (1 - Math.abs((h / 60) % 2 - 1));

        //calculamos un ajuste llamado m
        let m = l - c / 2;

        //declaramos variables temporales
        let r1, g1, b1;
         
        //dependiendo del rango hue asignamos valores
        if (h < 60) {
            r1 = c; g1 = x; b1 = 0
        } else if (h < 120) {
            r1 = x; g1 = c; b1 = 0
        } else if (h < 180) {
            r1 = 0; g1 = c; b1 = x;
        } else if (h < 240) {
            r1 = 0; g1 = x; b1 = c;
        } else if (h < 300) {
            r1 = x; g1 = 0; b1 = c;
        } else {
            r1 = c; g1 = 0; b1 = x;
        }   

        //convertimos los valores a escala 0-255
       let r = Math.round((r1 + m) * 255);
       let g = Math.round((g1 + m) * 255);
       let b = Math.round((b1 + m) * 255);

        //devolvemos valores en un objeto
        return {r: r, g: g, b: b };
    }

    const formatoSeleccionado = selectorFormato.value.toLowerCase();

    for (let i = 0; i < cantidad; i++) {
      
        //hsl aleatorio
        let h = Math.floor(Math.random() *360);
        let s = Math.floor(Math.random() * 101);
        let l = Math.floor(Math.random() * 101);

        let colorHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";

        const rgb = hslToRGB(h, s, l);

        const colorRGB = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b +")";                   
    
        //tarjeta de color
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("color-box");
        tarjeta.setAttribute("data-tooltip", "Clic para copiar");
        tarjeta.setAttribute("tabindex", "0");

        //muestra de color
        const muestra = document.createElement("div");
        muestra.classList.add("color-sample");

        //crear el texto del formato
        const textoFormato = document.createElement("p");

        //mostrar texto segun seleccion
        if (formatoSeleccionado === "hsl") {
            muestra.style.backgroundColor = colorHSL;
            textoFormato.textContent = colorHSL;
        } else {
            muestra.style.backgroundColor = colorRGB;
            textoFormato.textContent = colorRGB;
        }

        //insertamos en el DOM
        tarjeta.appendChild(muestra);
        tarjeta.appendChild(textoFormato);

        contenedorColores.appendChild(tarjeta);

    }
    animarTarjetas();

     mostrarMensaje("Colores generados: " + selectorCantidad.value + " en " + selectorFormato.value);
});
function animarTarjetas() { //crea una funciona para animar tarjetas
    const tarjetas = document.querySelectorAll(".color-box"); //selecciona todas las tarj
    tarjetas.forEach((t, index) => {//recorre tarj con su posicion
    t.style.opacity = "0";  //empieza invisible 
    t.style.transform = "translateY(10px)"; //empieza un poco abajo
    t.style.transition = "opacity 0.25s ease, transform 0.25s ease"; //animacion suave
    setTimeout(()  => {  //hace una espera 
        t.style.opacity = "1"; //aparece
        t.style.transform = "translateY(0)"; //sube a su lugar 
    }, 40 * index); //retraso por tarj para efecto escalonado
});
}

document.addEventListener("click", async (e) => {
  const tarjeta = e.target.closest(".color-box");
  if (!tarjeta) return;

  const textoFormato = tarjeta.querySelector("p");
  if (!textoFormato) return;

  const textoACopiar = textoFormato.textContent.trim();

  try {
    await navigator.clipboard.writeText(textoACopiar);
    tarjeta.setAttribute("data-tooltip", "Copiado en el portapapeles");
    tarjeta.classList.remove("tooltip-hidden");

    clearTimeout(tarjeta._tooltipTimer);
    tarjeta._tooltipTimer = setTimeout(() => {
      tarjeta.classList.add("tooltip-hidden");
      tarjeta.setAttribute("data-tooltip", "Clic para copiar");
    }, 1000);
  } catch (error) {
    console.log("X Error al copiar:", error);
  }
});
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    const tarjeta = document.activeElement;
    if (!tarjeta || !tarjeta.classList.contains("color-box")) return;

    e.preventDefault();
    tarjeta.click();
  });

