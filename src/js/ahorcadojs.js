
    //variables globlales / si hago F5 se recarga la pagina nuevamente con estos valores
    //palabra a advinar, no se puede modificar
    
    let arrCoincidencias = ['hola']; // esto es para corregir!
    const palabrAdivinar = ingresarPalabra(arrCoincidencias);

    //va a funcionar mientras se modifique el input
    const letra = document.querySelector('input');
    //cada vez que el usuario escriba algo en el imput ejecutar la siguiente funcion
    letra.oninput = function(){
        soloLetras(letra.value, palabrAdivinar);
    };

    function ingresarPalabra(arrCoincidencias){
        //variables locales
        /*El método prompt() muestra un diálogo con mensaje opcional, que solicita al 
        usuario que introduzca un texto. */
        const palabra = prompt("Ingresa una palabra para adivinar!");
        //split toma una cadena y la divide elemento a elemento
        let palabramin =palabra.toLowerCase(); //convierto la palabra en minuscula -
       
        const arrPalabra = palabramin.split("");
        //Muestra un mensaje en la consola web (o del intérprete JavaScript).
        //solo se ve si voy a la consola con F12
        console.log(arrPalabra);
        /*La propiedad Element.innerHTML devuelve o establece la sintaxis HTML describiendo 
        los descendientes del elemento.*/
        //construye la tabla donde esta el id "tablero", usa comillas invertidas
        document.getElementById("tablero").innerHTML = `
            <table border="1"> 
                <tr>
                    ${creaTablero(arrPalabra, arrCoincidencias)}    
                </tr>    
            </table>
        `;
        //En el codigo html si quiero ir a javascript uso el signo ${}
        return arrPalabra;
    };

    function valida_palabra(palabramin){
        

    }
    function creaTablero(arrPalabra, arrCoincidencias){
        console.log(arrCoincidencias);
        //let tablero = "";
        //forEach es como el for pero itera sobre un array
        /*dentro del forEach hay una funcion flecha pequeña, letra va a tomar
        el valor de cada iteracion*/
        arrPalabra.forEach(letra => {
            arrCoincidencias = arrCoincidencias + "<td> ? </td>";
        });
        return arrCoincidencias;
    }

    function soloLetras(cadena, palabrAdivinar){
        //pattern restringue que solo ingrese solo letras
        const pattern = new RegExp('[a-zA-Z]');
        //verifica que lo que obtuve  coincide con el patron, en este caso letras
        console.log(pattern.test(cadena));
        /*si es falso, va a agarrar el imput y lo va a borrar*/
        if(!pattern.test(cadena)){
            document.querySelector('input').value = "";
            //me va a al id "status"
            document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
            return false;
            //si es verdadero
        }else{ /*vuelve a crear una tabla con el resultado de la funcion 
            buscarcoinCidencias*/
            document.getElementById("tablero").innerHTML = `
            <table border="1">
                <tr>
                    ${buscarCoincidencia(cadena,palabrAdivinar)}    
                </tr>    
            </table>
        `;
            return true;
        }
    }
    //si la variable esta en la palabra, la muestra y si no le coloca ?
    function buscarCoincidencia(letra, arrPalabra){
        let tablero = "";
        let coincidencias = 0;
        arrPalabra.forEach(caracter => {
            if(caracter == letra){
                tablero = tablero + "<td>"+ caracter +" </td>"; 
                coincidencias = coincidencias + 1;
            }else{
                tablero = tablero + "<td> ? </td>";
            }
            //llama a la funcion conincidencia que me muestra la cantidad
            leyendaCoincidencia(coincidencias);
        });
        return tablero;
    }

    function leyendaCoincidencia(coincidencias){
        if(coincidencias > 0){
            document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
        }else{
            document.getElementById("status").innerHTML = `No hubo coinciencias :(`;
        }
    }


    
