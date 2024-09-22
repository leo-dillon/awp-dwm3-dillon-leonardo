const API = 'https://rickandmortyapi.com/api'
const personaje = '/character'
const ubicacion = '/location'
const capitulos = '/episode'
const page_Favoritos = document.querySelector('a.fav')
let favoritos = (localStorage.getItem('fav')?.length) ? JSON.parse(localStorage.getItem('fav')) : []

function numARomano(num) {
    const valoresRomanos = [
        { v: 1000, s: 'M' },
        { v: 900, s: 'CM' },
        { v: 500, s: 'D' },
        { v: 400, s: 'CD' },
        { v: 100, s: 'C' },
        { v: 90, s: 'XC' },
        { v: 50, s: 'L' },
        { v: 40, s: 'XL' },
        { v: 10, s: 'X' },
        { v: 9, s: 'IX' },
        { v: 5, s: 'V' },
        { v: 4, s: 'IV' },
        { v: 1, s: 'I' }
    ];
    let r = '';
    for (let i = 0; i < valoresRomanos.length; i++) {
        while (num >= valoresRomanos[i].v) {
            r += valoresRomanos[i].s;
            num -= valoresRomanos[i].v;
        }
    }
    return r;
}
function buscarIDs(array){
    let respuesta = []
    array.forEach(resident => {
        respuesta.push(resident.split('/').slice(-1)[0])
    });
    return respuesta
}
function icon(estado){
    let icon
    switch (estado) {
        case 'Alive':
            icon = '💚'
            break;
        case 'Dead':
            icon = '💀'
            break
        case 'unknown':
            icon = '❓'
            break
        default:
            icon = estado
            break;
    }
   
    return icon
    
}
function generarCards(datos, cont){
    if(!datos.length){
        let array = []
        array.push(datos)
        datos = array
    }
    cont.innerHTML = ''
    datos.forEach(element => {
        let contenedor = document.createElement('div')
        contenedor.classList.add('personaje')
        contenedor.innerHTML += `
            <div class="datos frente">
                <p><strong>${numARomano(element.id)}</strong></p>
                <picture>
                    <img src="${element.image}" alt="personaje ${element.name}">
                </picture>
                <span title='${element.status}' >${icon(element.status)}</span>                
                <h2>${element.name}</h2>
            </div>
            <div class="datos detras">
                <h2>${element.name}</h2>
                <ul>
                    <li>
                        <p><strong>Especie:</strong> ${element.species}</p>
                    </li>
                    <li>
                        <p><strong>Origen:</strong> ${element.origin.name}</p>
                    </li>
                    <li>
                        <p><strong>Estado:</strong> ${element.status}</p>
                    </li>
                    </ul>
                    <button class='fav'>${existeFavorito(element.id)? 'Remover': 'Guardar'}</button>
                    <button class='close'>❌</button>
                <picture>
                    <img src="${element.image}" alt="personaje ${element.name}">
                </picture>
            </div>
        `
        let frente = contenedor.querySelector('div.frente') 
        let detras = contenedor.querySelector('div.detras')
        let fav = contenedor.querySelector('button.fav')
        frente.addEventListener('click', () => {
            frente.style = `opacity: 0; transform: perspective(600px) translateZ(-10000px);`  
            detras.style = `opacity: 1; transform: perspective(600px) translateZ( 0px);`  
        })
        detras.addEventListener('click', () => {
            detras.style = `opacity: 0; transform: perspective(600px) translateZ(-10000px);`  
            frente.style = `opacity: 1; transform: perspective(600px) translateZ( 0px);`
        })
        fav.addEventListener('click', (e) => {
            e.stopPropagation()
            if(existeFavorito(element.id)){
                quitarFavorito(contenedor, element.id)
                fav.innerText = 'Guardar'
            }else{
                anadirFavorito(element.id)
                fav.innerText = 'Remover'
            }
        })
        frente.style = `animation: aparecerDerecha ${numRandom()}s ease-out both;`
        cont.append(contenedor)
    });

}
page_Favoritos?.addEventListener('click', (e) => {
    e.preventDefault()
    if(favoritos.length >= 1){
        location.href = '/pag/favoritos.html'
    }else{
        generarMensaje('Error', 'Debes guardar un articulo antes de acceder a esta sección.')
    }
})
function existeFavorito(id){
   return favoritos.includes(id)
}
function anadirFavorito(id){
    favoritos.push(id)
    generarMensaje('Guardado', 'Has guardado con exito tu carta.')
    guardarLocalStorage(favoritos)
}
function quitarFavorito(contenedor, id){
    let posicion = favoritos.indexOf(id)
    favoritos.splice(posicion, 1)
    generarMensaje('Removido', 'Eliminaste con exito la carta seleccionada.')
    guardarLocalStorage(favoritos)
    if(location.pathname == '/pag/favoritos.html'){
        if(favoritos.length == 0 ){
            let contador = 100;
            contenedor__personajes.innerHTML = `
                    <div style='display:flex; flex-direction:column; text-align:center;'>
                        <h2> No tienes elementos guardados. </h2>
                        <p> Ve a buscar más personajes 🔥🔥🔥🔥</p>
                        <p><strong class="cont" style='font-size:3rem;'> </strong></p>
                    </div>
                    `
            let intervalo = setInterval(() => {
                contenedor__personajes.querySelector('.cont').innerText = contador;
                if (contador === 0) {
                    clearInterval(intervalo);
                    location.href = '/'
                }
                contador--;
            }, 100);
        }
        contenedor.style = `animation: desaparecer ${numRandom()}s both ease-out;`
        setTimeout(() => {
            contenedor.remove()
        }, 510);
        
    }
}
function generarMensaje(titulo, mensaje){
    document.querySelector('div.cartel')?.remove()
    let cartel = document.createElement('div')
    cartel.classList.add('cartel')
    cartel.innerHTML += `
        <h2>${titulo}</h2>
        <p>${mensaje}</p>
        <button>❌</button>
    `
    document.body.prepend(cartel)
    setTimeout(() => {
        cartel.style = `animation: desaparecerDerecha .3s ease-in both;`
        setTimeout(() => {
            cartel.remove()
        }, 2000);
    }, 3000);
}
function guardarLocalStorage(elementos){
    localStorage.setItem('fav', JSON.stringify(elementos))
}
function numRandom(){
    let num = ((Math.floor(Math.random()* 12  )) / 10 ) + 0.5
    return num
}