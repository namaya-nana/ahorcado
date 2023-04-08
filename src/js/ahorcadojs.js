
    //variables globlales / si hago F5 se recarga la pagina nuevamente con estos valores
    //palabra a advinar, no se puede modificar
    
    let arrCoincidencias = []; 
    const palabrAdivinar = ingresarPalabra(arrCoincidencias);
    let intentos = 6;
    

    //va a funcionar mientras se modifique el input
    const letra = document.querySelector('input');

    //cada vez que el usuario escriba algo en el imput ejecutar la siguiente funcion
    letra.oninput = function(){
        soloLetras(letra.value, palabrAdivinar,arrCoincidencias);
    };

    function ingresarPalabra(){
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
                    ${creaTablero(arrPalabra)}    
                </tr>    
            </table>
        `;
        //En el codigo html si quiero ir a javascript uso el signo ${}
        return arrPalabra;
    };


    function creaTablero(arrPalabra){

        let tablero = "";

        //forEach es como el for pero itera sobre un array
        /*dentro del forEach hay una funcion flecha pequeña, letra va a tomar
        el valor de cada iteracion*/
        arrPalabra.forEach(letra => {
            tablero = tablero + "<td> ? </td>";
        });
        return tablero;
    }

    function soloLetras(cadena, palabrAdivinar,arrCoincidencias){
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
                    ${buscarCoincidencia(cadena,palabrAdivinar,arrCoincidencias)}    
                </tr>    
            </table>
        `;
            //limpia el cuadro de texto para ingresar otra letra
            document.querySelector('input').value = "";
            return true;
        }
    }
    //si la variable esta en la palabra, la muestra y si no le coloca ?
    function buscarCoincidencia(letra, arrPalabra,arrCoincidencias){
        let tablero = "";
        let coincidencias = 0;
        let exito = true;
        
        
        arrPalabra.forEach(caracter => {
            
            //includes sirve para saber si el caracter está en el array, entonces devuelve un true
            

            //if: filtra si el caracter ya fue identificado
            if(arrCoincidencias.includes(caracter)){
                tablero = tablero + "<td>"+ caracter +" </td>";

            /*else if: si no fue identificado guarda el caracter en arrCoincidencias e incrementa coincidencias 
            para registrarlas y luego informar en la función leyendaCoincidencia*/ 
            } else if(caracter == letra){              
                tablero = tablero + "<td>"+ caracter +" </td>"; 
                arrCoincidencias.push(caracter);//push inserta al final del array cada caracter
                coincidencias = coincidencias + 1;
            
            //else: no hubo coincidencia, pongo la variable exito en false para luego evaluar los intentos
            } else{
                tablero = tablero + "<td> ? </td>";
                exito = false;
            }
            
        });

        leyendaCoincidencia(coincidencias, letra);

        //si no hubo aciertos va perdiendo intentos
        if(coincidencias==0){ 
            intentos--; //segun el numero de intento cambio la direccion de la imagen
            if(intentos==5){document.getElementById('imagen').src = "img/ahorcado5.png"; }
            if(intentos==4){document.getElementById('imagen').src = "img/ahorcado4.png"; }
            if(intentos==3){document.getElementById('imagen').src = "img/ahorcado3.png"; }
            if(intentos==2){document.getElementById('imagen').src = "img/ahorcado2.png"; }
            if(intentos==1){document.getElementById('imagen').src = "img/ahorcado1.png"; }
            if(intentos==0){document.getElementById('imagen').src = "img/ahorcado0.png"; }
            if(intentos<0){location.reload();}
                
        }

        
        console.log(arrCoincidencias + " " + intentos);//imprimo la letra que coincide e intentos que quedan



        if(exito){ leyendaFelicitaciones(true);}
        else if(intentos==0) {leyendaFelicitaciones(false);}
            

        return tablero;
    }

    function leyendaCoincidencia(coincidencias, caracter){
        if(coincidencias > 0){
            document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias con la letra ` + caracter;
        }else{
            document.getElementById("status").innerHTML = `No hubo coinciencias nuevas con la letra ` + caracter + `, te quedan ` + (intentos-1) + ` intentos` ;
        }
    }
    function leyendaFelicitaciones(gano){
        
        if(gano){
            document.getElementById("status").innerHTML = `Felicitaciones. Ganaste!!!`;
        }else{
            document.getElementById("status").innerHTML = `Se acabaron los intentos. Perdiste`;
            
        }
        
    }



    
