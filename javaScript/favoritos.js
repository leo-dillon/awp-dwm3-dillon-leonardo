
let contenedor__personajes = document.querySelector('section.personajes')
contenedor__personajes.innerHTML = `
    <h2> Buscando tus personajes favoritos..... </h2>
`
function GET_personajesLocation(url  , ids = ''){
    let textoIds = ids.toString()
    let URL_final = API + url + '/' +textoIds
    fetch(URL_final)

        .then(dat => dat.json())
        .then (res => {
            contenedor__personajes.innerHTML = ''
            console.log(res.results)
            if(res.results){
                 let contador = 100;
                contenedor__personajes.innerHTML = `
                        <div style='display:flex; flex-direction:column; text-align:center;'>
                            <h2> No puedes accedes a esta pestaña!!! </h2>
                            <p> 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥</p>
                            <p><strong class="cont" style='font-size:3rem;'> </strong></p>
                        </div>
                        `
                let intervalo = setInterval(() => {
                    contenedor__personajes.querySelector('.cont').innerText = contador;
                    if (contador === 0) {
                        clearInterval(intervalo);
                        location.href = '/'
                    }
                    contador = contador - 1 ;
                }, 20);
            }else{
                generarCards(res, contenedor__personajes)
            }
        })
        .catch(error => {
            console.error(error)
            contenedor__personajes.innerHTML = ''
            contenedor__personajes.innerHTML = `
                <h2>No existen coincidencias.</h2>
             `
        })
}
GET_personajesLocation('/character', favoritos)