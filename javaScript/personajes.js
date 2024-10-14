let contenedor__personajes = document.querySelector('section.personajes')
let form = document.querySelector('form')

// console.log(API + character)

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let {name, gender, status, species} = e.target
    let hash = `?name=${name.value}&gender=${gender.value}&status=${status.value}&species=${species.value}`
    name.value = ''
    gender.value = ''
    status.value = ''
    species.value = ''
    GET_personajes(personaje, hash)
})
function GET_personajes(url  ,filtros = ''){
    console.log('ejecutando GET PERSONAJES')
    let URL_final = API + url + filtros
    contenedor__personajes.innerHTML = `
                <h2>Buscando...</h2>
            `
    fetch(URL_final)
        .then(dat => dat.json())
        .then (res => {
            contenedor__personajes.innerHTML = ``
            generarCards(res.results, contenedor__personajes)
        })
        .catch(error => {
            console.error(error)
            contenedor__personajes.innerHTML = ``
            contenedor__personajes.innerHTML = `
                <h2>No existen coincidencias.</h2>
            `
        })
}
GET_personajes(personaje)
