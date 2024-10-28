if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceWorker.js')
        .then(function (registration) {
        })
        .catch(function (error) {
        });
}
if(window.Notification && Notification.permission !== 'denied' && !sessionStorage.getItem("cargadedatos")){
    setTimeout("Notification.requestPermission()", 100)
    let noti = new Notification ("titulo", {
        body: "Bienvenido",
        icon: "./IMG/favicon.png",
        image: "./IMG/favicon.png"
    })
}
sessionStorage.setItem('cargadedatos', 'El usuario ya paso por la página hoy')

window.addEventListener('change', () => {
    let metaTheme = document.querySelector("meta[theme-color]")
    window.addEventListener('online', () => {
        generarMensaje("Online", "Tiene conección a internet")
        metaTheme.setAttribute()
    });
    
    window.addEventListener('offline', () => {
        generarMensaje("Offline", "No tiene conección a internet")
    });
})
document.querySelector("#compartir").addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title : "Quieres compartir ?",
            text: "Visita la pàgina de Rick and Morty",
            url: "https://awp-dwm3-dillon-leonardo.vercel.app/"
        })
        .then( () => console.log("Se ejecuto"))
        .catch(err => console.error("No mires detras de ti, SOY UN ERROR"))
    }
})