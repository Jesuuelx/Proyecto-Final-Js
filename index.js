/*  variables y selectores */

const seccion = $('.seccion');
const seccion2 = $('.seccion2')
const btnPerros = $('.btn-perros');
const btnGatos = $('.btn-gatos');
const form = $('form');
const carrito = $('.nroCompras');
let counter = 0;
let p;
const precioTotal = $('.precioMas');
let nuevoStorageUno;
let nuevoStorageDos;
let acumulado = 0;
let storage = [];
let cuentaStorage = [];
const productos = 'productos.json';
const productosCats = 'productosCats.json';

/* BASE DE DATOS */


let gatos = [
    { alimento:'hillsg',
      precio:100,
      title:'Hills'  
    },
{
    alimento:'nutrag',
      precio:60,
      title:'NutraNuggets',

},
{
      alimento:'royalg',
      precio:100,
      title:'RoyalCanin',

}

]

/* console.log(perros[1].title) */

/* CREAR HTML EN BOTON PERROS */
const crearHtmlDog = (  ) => {

      /* AJAX */
    $.get(productos, function(response, status) {
        if(status === 'success') {
    
     for (let i = 0; i < response.length; i++) {
               

        const html = `<div class="card"><p>${response[i].name}</p>
    <img class="img${i}" src="${response[i].url}" alt="">
    <p class="parrafo${i}">Precio:${response[i].precio}$</p>
    </div>
    `;
   
    seccion.append(html);



$(`.parrafo${i}`).append(`<button class="boton${i} btn btn-outline-primary"> Agregar al Carrito</button>`);

    /*  CONTADOR Y LOCALSTORAGE */

    $(`.card`).prepend(`<div id="div1" style="display:none">
    <h3>¡Agregado al Carrito!</h3>
    <h4>Con Exito!</h4>
    </div>`)

    $(`.boton${i}`).click( () => {
        

            (localStorage.getItem('contador') != 0) ? counter = localStorage.getItem('contador') : counter = 0;
            (localStorage.getItem('cuenta') != 0 ) ? acumulado =  JSON.parse( localStorage.getItem('cuenta') )  : acumulado = 0;
            ( localStorage.getItem('alimento') ) ? storage = JSON.parse( localStorage.getItem('alimento') ) : storage = [];
            console.log(typeof acumulado);
         /*    ( (JSON.parse(localStorage.getItem('alimento'))).length > 0) ? storage = localStorage.getItem('alimento') : storage = [];  */
            counter++;
            acumulado =  response[i].precio + acumulado   ; 
            nuevoStorageUno = response[i];
            storage.push( nuevoStorageUno );
            localStorage.setItem('alimento', JSON.stringify( storage ));
            localStorage.setItem('cuenta', acumulado);
            localStorage.setItem('contador', counter); 
            precioTotal.text(`${(localStorage.getItem('cuenta')) ? ( localStorage.getItem('cuenta') ) : 0}$`);
            carrito.text(`${(localStorage.getItem('contador')) ? JSON.parse( localStorage.getItem('contador') ) : 0}`) 
        
    
            $('#div1').fadeIn("slow" , function(){
                //Cuando termina de ocultarse el elemento lo mostramos nuevamente
                $("#div1").fadeOut(1000); })


         })        
        
    }}}  )}

   /* CREAR HTML BOTON GATOS */

    const crearHtmlCat = (  ) => {

        $.get(productosCats, function(response, status) {
            if(status === 'success') {
       
       
        for (let i = 0; i < response.length; i++) {
    
            const html = ` <div class="card"><p >${response[i].name}</p>
        <img class="img${i}" src="${response[i].url}" alt="">
        <p class="parrafo${i}">Precio : ${response[i].precio}$  </p></div>
        `;
       
        seccion.append(html);
    

        $(`.parrafo${i}`).append(`<button class="boton${i} btn btn-outline-primary"> Agregar al Carrito</button>`);

        $(`.card`).prepend(`<div id="div1" style="display:none">
    <h3>¡Agregado al Carrito!</h3>
    <h4>Con Exito!</h4>
    </div>`)
    
    /* CONTADOR Y LOCALSTORAGE */
        $(`.boton${i}`).click( () => {
            (localStorage.getItem('contador') != 0) ? counter = localStorage.getItem('contador') : counter = 0;
            (localStorage.getItem('cuenta') != 0 ) ? acumulado =  JSON.parse( localStorage.getItem('cuenta') )  : acumulado = 0;
            ( (localStorage.getItem('alimento')).length > 1 ) ? storage = JSON.parse( localStorage.getItem('alimento') ) : storage = [];    
            counter++;
            acumulado = acumulado + response[i].precio; 
            nuevoStorageUno = response[i];
            storage.push( nuevoStorageUno );
            localStorage.setItem('alimento', JSON.stringify( storage )) ;   
            localStorage.setItem('cuenta', acumulado);
            localStorage.setItem('contador', counter); 
            precioTotal.text(`${(localStorage.getItem('cuenta')) ? localStorage.getItem('cuenta') : 0}$`);
            carrito.text(`${(localStorage.getItem('contador')) ? localStorage.getItem('contador') : 0}`)
      
            
            
            $('#div1').fadeIn("slow" , function(){
                //Cuando termina de ocultarse el elemento lo mostramos nuevamente
                $("#div1").fadeOut(1000); })
        }

            )
         
        } }  })}
        
        precioTotal.text(`${(localStorage.getItem('cuenta')) ? localStorage.getItem('cuenta') : 0}$`);
        carrito.text(`${(localStorage.getItem('contador')) ? localStorage.getItem('contador') : 0}`)

/* TOCAR BOTON PERROS */
btnPerros.click( () => {
   
    $('.seccion').html('') 
    crearHtmlDog(  );

})
/* TOCAR BOTON GATOS */
btnGatos.click( () => {

    $('.seccion').html('')
    crearHtmlCat(  );
})

/* INPUT // BUSCADOR // FUNCIONA CON LAS PALABRAS INCLUDES */
form.submit(function (e)  {
    e.preventDefault();
    let text = e.target.children[0].value;
    if (text.includes('alimentos perros')) {

        $('.seccion').html('')
        crearHtmlDog(  );

    } else if (text.includes('alimentos gatos')) {
        $('.seccion').html('');    
        crearHtmlCat();
    }


})


/* boton de carrito */


/* $(`.dog`).prepend(`<div id="div2" style="display:none">
<div><h3>Productos Total a Pagar: | </h3>
<h4 class"cuenta"> ${(localStorage.getItem('cuenta')) ? localStorage.getItem('cuenta') : 0 }$</h4></div>
<div><h3>Cantidad</h3>
<h4 class"counter">${(localStorage.getItem('contador')) ? localStorage.getItem('contador') : 0}</h4></div>    

    </div>`)
$('#div2').css("position", "absolute");
 $('#div2').css("background-color", "yellow")
 $('#div2').css("width", "50%")
 $('#div2').css("border", "solid 2px black")
   

$('svg').click(() => {
    $('#div2').toggle("fast")
    $('cuenta').text();

})  */

/* vaciar carrito */

$('.vacio').click(() => {
    counter = 0;
    acumulado = 0;
    storage = [];
    localStorage.setItem('cuenta', acumulado);
    localStorage.setItem('contador', counter);
    localStorage.setItem('alimento', storage);
    precioTotal.text(`${(localStorage.getItem('cuenta')) ? localStorage.getItem('cuenta') : 0}$`);
        carrito.text(`${(localStorage.getItem('contador')) ? localStorage.getItem('contador') : 0}`)

})

counter = ( localStorage.getItem('contador') ) ? localStorage.getItem('contador') : 0;
 const crearListaCompras = ( data ) => {

    const html = `<div class="flex-data ${data.id}" data-id="${data.id}"><img class="img" src="${data.url}" alt="${data.name}">
    <div><p>Nombre del Producto:
    </p>
    <span>${data.name}</span>
    <span><p>Precio:</p>${data.precio}$</span></div><button class="btn btn-primary">Sumar</button> <button class="btn btn-danger peligro">Eliminar</button> </div> 
    `;
   
    seccion2.append(html);
    
    $('.peligro').click(() => {
      
        console.log(counter)
       counter = counter - 1;
       localStorage.setItem('contador', counter);

        const todoElemento   = event.target.parentElement;
        console.log(todoElemento)
       let id = $('.flex-data').attr('data-id');
       console.log(id)  /* 
       counter = JSON.parse( localStorage.getItem('contador'))
       counter = counter - 1;
       acumulado = JSON.parse( localStorage.getItem('cuenta'));
       acumulado = acumulado - data.precio;
       localStorage.setItem('cuenta', acumulado)
       localStorage.setItem('contador', counter) */

       

       storage = JSON.parse( localStorage.getItem('alimento') );
       storage = storage.filter(alimento => alimento.id != id )
       localStorage.setItem('alimento', JSON.stringify( storage ))
       localStorage.setItem('contador', counter);
       todoElemento.remove();

       
    })


}

const crearTotal = (  ) => {

    const html = `<table class="table table-success table-striped mr-5">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Total</th>
        <th scope="col">Cantidad</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">#</th>
        <td>${(localStorage.getItem('cuenta')) ? localStorage.getItem('cuenta') : 0}$</td>
        <td>${(localStorage.getItem('contador')) ? localStorage.getItem('contador') : 0}</td>
      </tr>
    </tbody>
  </table`

    $('.totales').append(html);

}

if( !(localStorage.getItem('alimento') ) ) {

    const html = `<div class="avisoVacio">
    <h3>El Carrito Esta Vacio</h3>
    <a href="./index.html"> Vuelve a la Pagina Principal</a></div>`;
console.log(storage)
    seccion2.append(html)


}else { 

    ( JSON.parse( localStorage.getItem('alimento') ) ).forEach(alimento =>{ crearListaCompras( alimento )});
crearTotal()

} 



  















