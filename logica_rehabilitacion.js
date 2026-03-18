// --- CEREBRO CENTRAL REHABILIDIA ---

function aplicarAjustes() {
    // 1. OBTENER VALORES DE LA MEMORIA (localStorage)
    const negrilla = localStorage.getItem('config_negrilla');
    const tamaño = localStorage.getItem('config_tamaño');
    const brillo = localStorage.getItem('config_brillo') || 100;
    const contraste = localStorage.getItem('config_contraste') || 100;
    const saturacion = localStorage.getItem('config_saturacion') || 100;

    // 2. APLICAR FILTROS VISUALES (Brillo, Contraste, Saturación)
    // Esto aplica los cambios a toda la pantalla de la app
    document.body.style.filter = `brightness(${brillo}%) contrast(${contraste}%) saturate(${saturacion}%)`;

    // 3. APLICAR NEGRILLA
    if (negrilla === 'activo') {
        document.body.style.fontWeight = "bold";
        // Forzamos a todos los textos, títulos y botones
        const elementos = document.querySelectorAll('h1, h2, h3, p, span, a, button, .label-txt, .texto-instruccion');
        elementos.forEach(el => {
            el.style.setProperty('font-weight', '900', 'important');
        });
    } else {
        document.body.style.fontWeight = "normal";
    }

    // 4. APLICAR TAMAÑO DE LETRA
    if (tamaño === 'grande') {
        // Aumentamos el tamaño base de la app
        document.documentElement.style.fontSize = "1.25rem"; 
        // Agrandamos específicamente instrucciones en las sesiones
        const instrucciones = document.querySelectorAll('#instruccion, #info-nivel, .texto-instruccion');
        instrucciones.forEach(t => t.style.fontSize = "1.6rem");
    } else {
        document.documentElement.style.fontSize = "1rem";
    }
}

// 5. FUNCIÓN DE VOZ UNIVERSAL
// Reemplaza la voz vieja para que respete la velocidad elegida en Ajustes
window.hablar = function(mensaje) {
    window.speechSynthesis.cancel();
    const voz = new SpeechSynthesisUtterance(mensaje);
    voz.lang = 'es-ES';
    
    // Si no hay velocidad guardada, usa 1.0 (normal)
    const vel = localStorage.getItem('config_voz') || '1.0';
    voz.rate = parseFloat(vel);
    
    window.speechSynthesis.speak(voz);
};

// 6. EJECUCIÓN AUTOMÁTICA
// Se asegura de que los ajustes se apliquen apenas abra cualquier página
window.addEventListener('DOMContentLoaded', aplicarAjustes);
// Por si acaso la página es muy pesada, lo intentamos de nuevo al cargar todo
window.onload = aplicarAjustes;
