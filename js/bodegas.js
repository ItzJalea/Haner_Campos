function listarbodegas(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT id_bodegas, ciudad, calle FROM haner_campos.Bodegas ORDER BY id_bodegas ASC;"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
};

    fetch('http://164.90.186.2:4040/dynamic/Bodegas/', requestOptions)
    //de vuelve un archivo json
      .then(response => response.json())
      //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
      .then((json)=>json.forEach(mostrarBodegas))
    
      .then(result => console.log(result))
      .catch(err => console.error('error', err));
};

function mostrarBodegas(element, index, arr){
    //index el que recorre
    //element es el valor
    //del documento selecciona la clase .data
arr[index] = document.querySelector('.bodegas').innerHTML += 
`
<tr>
    <td>
    ${element.id_bodegas}
    </td>

    <td>
    ${element.ciudad} 
    </td>

    <td>
    ${element.calle} 
    </td>

    <td>
    <!-- boton modal borrar -->
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borraritem" onclick="items = ${element.id_bodegas}, ${index};">
    <span class="material-icons"><i class="fa-solid fa-trash"></i></span>
    </button>

    <!-- boton modal editar -->
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editaritem" onclick="id_Bodegas = ${element.id_bodegas};">
    <i class="fa-sharp fa-solid fa-file-pen"></i>
    </button>
    

    <!-- Modal borrar -->
    <div class="modal fade" id="borraritem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Alerta</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estas seguro que deseas eliminar?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarBod(items);">Borrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Editar -->
    <div class="modal fade" id="editaritem" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Editar Datos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="dat-form">
                        <form action="#" autocomplete="off">
                            <label for="ciudad">Ciudad:</label>
                            <input type="text" id="ciudadid" name="ciudad" class="form-control" required>
                            <label for="calle">calle:</label>
                            <input type="text" id="calleid" name="calle" class="form-control" required>
                            
                                
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cerrar" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="confirmar" onclick="actualizarBod(id_Bodegas)">Enviar</button>
                </div>
            </div>
        </div>
    </div>


    </td>

</tr>
`;
}

function crearBodega() {
    var getciudad = document.getElementById('ciudad').value;
    var getcalle = document.getElementById('calle').value;
    if(Pruebas(getciudad, getcalle) === true){
    var getdata = {
      ciudad: getciudad,
      calle: getcalle,
    };
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
  
    fetch(`http://164.90.186.2:4040/api/Bodegas/`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se agregaron los datos');
        } else {
          console.log('Error al agregar los datos...');
        }
      });
    }
}

function eliminarBod(id_bodegas){
    var options = {
        method: 'DELETE',
        redirect: 'follow'
    }
fetch(`http://164.90.186.2:4040/api/Bodegas/${id_bodegas}`, options)
    .then(response => {
        if(response.status == 200){
            console.log('Se elimino correctamente la bodega');
        }else{
            console.log('Error al eliminar la bodega...');
        }
})
.then(response => console.log(response))
.catch(err => console.error(err));
}

function actualizarBod(id_bodegas) {
    var getciudad = document.getElementById('ciudadid').value;
    var getcalle = document.getElementById('calleid').value;
    if(Pruebas(getciudad, getcalle) === true){
    var getdata = {
      ciudad: getciudad,
      calle: getcalle
    };
    var requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
    console.log(requestOptions)
    fetch(`http://164.90.186.2:4040/api/Bodegas/${id_bodegas}`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se actualizaron los datos');
        } else {
          console.log('Error al actualizar los datos...');
        }
      });
    }
}


function noVacio(ciudad, calle){
if (ciudad.trim() !== "" && calle.trim() !== "") {
    return true;
} else {
    return false;
}
}

function noNumeros(ciudad) {
    var regex = /^[a-zA-Z\s]+$/;
    
    
    if (regex.test(ciudad)) {
      return true;
    } else {
      return false;
    }
}

function Pruebas(ciudad, calle){
    if (noVacio(ciudad, calle) === true && noNumeros(ciudad) == true){
        alert("Se a realizado la operacion correctamente");
        return true;
    } else {
        alert("Uno de los campos no cumple los requisitos, \nrecuerda no tener campos vacios o numeros en ciudad")
    }
}
