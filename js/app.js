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

    if (cantidad === "" || formato === "select" || formato === "") return; 
    
    mostrarMensaje("Listo para generar: " + cantidad + " en " + formato);
}
    selectorCantidad.addEventListener("change", mensajeListo);
    selectorFormato.addEventListener("change", mensajeListo);

botonGenerar.addEventListener("click", function() { 
    console.log("clic Generar Paleta");

    let cantidad = Number(selectorCantidad.value);
    console.log("Cantidad", cantidad);

    const formato = selectorFormato.value;

    if (!cantidad || formato === "select" || formato === "") {
        mostrarMensaje("Selecciona cantidad y formato");
        return;
    }

    contenedorColores.innerHTML = "";

    function hslToRGB(h, s, l) {
        s = s/ 100;
        l = l/ 100;

        let c = (1 - Math.abs(2 * l - 1)) * s;
        let x = c* (1 - Math.abs((h / 60) % 2 - 1));

        let m = l - c / 2;

        let r1, g1, b1;
         
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

       let r = Math.round((r1 + m) * 255);
       let g = Math.round((g1 + m) * 255);
       let b = Math.round((b1 + m) * 255);

        return {r: r, g: g, b: b };
    }

    const formatoSeleccionado = selectorFormato.value.toLowerCase();

    for (let i = 0; i < cantidad; i++) {
      
        let h = Math.floor(Math.random() *360);
        let s = Math.floor(Math.random() * 101);
        let l = Math.floor(Math.random() * 101);

        let colorHSL = "hsl(" + h + ", " + s + "%, " + l + "%)";

        const rgb = hslToRGB(h, s, l);

        const colorRGB = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b +")";                   
    
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("color-box");
        tarjeta.setAttribute("data-tooltip", "Clic para copiar");
        tarjeta.setAttribute("tabindex", "0");

        const muestra = document.createElement("div");
        muestra.classList.add("color-sample");

        const textoFormato = document.createElement("p");

        if (formatoSeleccionado === "hsl") {
            muestra.style.backgroundColor = colorHSL;
            textoFormato.textContent = colorHSL;
        } else {
            muestra.style.backgroundColor = colorRGB;
            textoFormato.textContent = colorRGB;
        }

        tarjeta.appendChild(muestra);
        tarjeta.appendChild(textoFormato);

        contenedorColores.appendChild(tarjeta);

    }
    animarTarjetas();

     mostrarMensaje("Colores generados: " + selectorCantidad.value + " en " + selectorFormato.value);
});
function animarTarjetas() { 
    const tarjetas = document.querySelectorAll(".color-box"); 
    tarjetas.forEach((t, index) => {
    t.style.opacity = "0";  
    t.style.transform = "translateY(10px)"; 
    t.style.transition = "opacity 0.25s ease, transform 0.25s ease"; 
    setTimeout(()  => {  
        t.style.opacity = "1"; 
        t.style.transform = "translateY(0)"; 
    }, 40 * index); 
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

