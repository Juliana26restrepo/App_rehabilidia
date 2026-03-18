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
