let contenedor__personajes = document.querySelector('section.personajes')
let load = document.querySelector('.load')
let form = document.querySelector('form')

let API = 'https://rickandmortyapi.com/api'


form.addEventListener('submit', (e) => {
    e.preventDefault()
    let {name, gender, status, species} = e.target
    let hash = `?name=${name.value}&gender=${gender.value}&status=${status.value}&species=${species.value}`
    GET_personajes(hash)
})
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
function generarCards(datos){
    contenedor__personajes.innerHTML = ''
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
        contenedor__personajes.append(contenedor)
    });

}
function GET_personajes(filtros = ''){
    load.style = 'display: block'
    let URL_final = API + '/character' + filtros
    fetch(URL_final)
        .then(dat => dat.json())
        .then (res => {
            generarCards(res.results)
            load.style = 'display: none'
        })
        .catch(error => {
            console.log(error)
            contenedor__personajes.innerHTML = `
                <h2>No existen coincidencias</h2>
            `
        })
}
    GET_personajes()
