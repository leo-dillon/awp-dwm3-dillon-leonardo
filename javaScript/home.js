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


console.log('a')
const request = window.indexedDB.open('baseLocal', 1)
request.onupgradeneeded = (e) => {
    const db = e.target.result
    // console.log(db)
    const objectStore = db.createObjectStore('cliente', {keyPath: 'id'})
    objectStore.createIndex('nombre', 'nombre', {unique: false})
}
request.onsuccess = (e) => {
    const db = e.target.result
    const transaction = db.transaction(['cliente'], 'readwrite')
    const objectStore = transaction.objectStore('cliente')
    objectStore.add({
        id: 1,
        nombre: 'Leo',
        email: 'leo@davinci.edu.ar'
    })
    objectStore.add({
        id: 2,
        nombre: 'Karen',
        email: 'karen@gmail.edu.ar'
    })
    const request = objectStore.getAll()
    request.onsuccess = (e) => {
        console.log(e.target.result)
    }
    transaction.oncomplete = () => {
        const transaction = db.transaction(['cliente'], 'readonly')
        const objectStore = transaction.objectStore('cliente')
        const request = objectStore.getAll()
        request.onsuccess = (e) => {
            console.log(e.target.result)
        }
    }
}

