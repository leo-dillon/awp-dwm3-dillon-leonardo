const API = 'https://rickandmortyapi.com/api'
const personaje = '/character'
const ubicacion = '/location'
const capitulos = '/episode'

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
                        <p><strong>Genero:</strong> ${icon(element.gender)}</p>
                    </li>
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
                <picture>
                    <img src="${element.image}" alt="personaje ${element.name}">
                </picture>
            </div>
        `
        let frente = contenedor.querySelector('div.frente') 
        let detras = contenedor.querySelector('div.detras')
        frente.addEventListener('click', () => {
            frente.style = `opacity: 0; transform: perspective(600px) translateZ(-10000px);`  
            detras.style = `opacity: 1; transform: perspective(600px) translateZ( 0px);`  
        })
        detras.addEventListener('click', () => {
            detras.style = `opacity: 0; transform: perspective(600px) translateZ(-10000px);`  
            frente.style = `opacity: 1; transform: perspective(600px) translateZ( 0px);`
        })
        cont.append(contenedor)
    });

}