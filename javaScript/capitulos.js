let contenedor__personajes = document.querySelector('section.personajes')
let form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    let {episodes} = e.target 
    GET_episodes(capitulos, episodes.value)
})
function GET_personajesLocation(url  , ids = ''){
    let textoIds = ids.toString()
    let URL_final = API + url + '/' +textoIds
    fetch(URL_final)
        .then(dat => dat.json())
        .then (res => {
            contenedor__personajes.innerHTML = ''
            if(res.results){
                contenedor__personajes.innerHTML = `
                    <h2> No se encuentran personajes en la ubicación. </h2>
                `
            }else{
                generarCards(res, contenedor__personajes)
            }
        })
        .catch(error => {
            console.error(error)
            contenedor__personajes.innerHTML = ''
            contenedor__personajes.innerHTML = `
                <h2>No existen coincidencias.</h2>
        //     `
        })
}
function GET_episodes(url, id = ''){
    let URL_final = API + url + '/' + id 
    contenedor__personajes.innerHTML = `
                <h2>Buscando...</h2>
            `
    fetch(URL_final)
        .then(res => res.json())
        .then(data => {
            let ids = buscarIDs(data.characters)
            GET_personajesLocation(personaje, ids )
        }
        )
        .catch(error => {
            console.log(error)
            contenedor__personajes.innerHTML = `
                <h2>No existen coincidencias.</h2>
            `
        })

}
GET_episodes(capitulos, '/1')