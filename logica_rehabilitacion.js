// --- APLICADOR UNIVERSAL DE ESTILOS ---
function aplicarAjustesGlobales() {
    const esNegrilla = localStorage.getItem('config_negrilla') === 'activo';
    const esGrande = localStorage.getItem('config_tamaño') === 'grande';

    if (esNegrilla) {
        // Esto afecta a ABSOLUTAMENTE TODO el texto de la página actual
        document.body.style.fontWeight = "bold";
        
        // Forzamos a títulos y botones específicos para que se noten más
        const elementosFuertes = document.querySelectorAll('h1, h2, h3, p, a, button, .texto-instruccion');
        elementosFuertes.forEach(el => {
            el.style.fontWeight = "900"; 
        });
    }

    if (esGrande) {
        // Aumentamos el tamaño base de la fuente en toda la pantalla
        document.documentElement.style.fontSize = "1.25rem"; 
        
        // Ajustamos los títulos para que resalten más para Juan
        const titulos = document.querySelectorAll('h1, h2');
        titulos.forEach(t => {
            t.style.fontSize = "2rem";
        });
    }
}

// Se ejecuta automáticamente cada vez que una página se abre
window.addEventListener('DOMContentLoaded', aplicarAjustesGlobales);

function aplicarAjustes() {
    // Aplicar Negrilla si está activa
    if (localStorage.getItem('config_negrilla') === 'activo') {
        document.body.style.fontWeight = "bold";
        const textos = document.querySelectorAll('#instruccion, #info-nivel');
        textos.forEach(t => t.style.fontWeight = "900");
    }

    // Aplicar Tamaño Grande si está activo
    if (localStorage.getItem('config_tamaño') === 'grande') {
        const instrucciones = document.querySelectorAll('#instruccion, #info-nivel');
        instrucciones.forEach(t => t.style.fontSize = "1.5rem");
    }
}

// Esta función reemplaza a la antigua para que la voz respete los ajustes
function hablar(mensaje) {
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(mensaje);
    voz.lang = 'es-ES';
    const vel = localStorage.getItem('config_voz') || '0.9';
    voz.rate = parseFloat(vel);
    window.speechSynthesis.speak(voz);
}

// Se ejecuta solo al cargar la página
window.onload = aplicarAjustes;
