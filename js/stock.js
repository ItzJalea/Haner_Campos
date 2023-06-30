function listaStock(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT p.id_producto, p.marca, p.talle, p.estilo, p.genero, s.id_stock, s.cantidad, s.id_bod, b.ciudad FROM haner_campos.Producto p LEFT JOIN haner_campos.Stock s ON p.id_producto = s.id_prod LEFT JOIN haner_campos.Bodegas b ON b.id_bodegas = s.id_bod ORDER BY p.id_producto ASC;"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
};

    fetch('http://164.90.186.2:4040/dynamic/Stock/', requestOptions)
    //de vuelve un archivo json
      .then(response => response.json())
      //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
      .then((json)=>json.forEach(mostrarStock))
    
      .then(result => console.log(result))
      .catch(err => console.error('error', err));
};

function mostrarStock(element, index, arr){
    //index el que recorre
    //element es el valor
    //del documento selecciona la clase .data
arr[index] = document.querySelector('.stockdata').innerHTML += 
`
<tr>
    <td>
    ${element.id_producto}
    </td>
    <td>
    ${element.marca} 
    </td>
    <td>
    ${element.talle} 
    </td>
    <td>
    ${element.estilo} 
    </td>
    <td>
    ${element.genero} 
    </td>
    <td>
    ${element.id_stock}
    </td>
    <td>
    ${element.cantidad} 
    </td>
    <td>
    ${element.id_bod}
    </td>
    <td>
    ${element.ciudad} 
    </td>
    <td>
    <!-- boton modal borrar -->
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borraritem" onclick="items = ${element.id_stock}, ${index};">
    <span class="material-icons"><i class="fa-solid fa-trash"></i></span>
    </button>

    <!-- boton modal editar -->
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editarstock" onclick="id_item = ${element.id_stock};">
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminarstock(items);">Borrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal Editar -->
    <div class="modal fade" id="editarstock" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">Editar Datos</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="dat-form">
                        <form action="#" autocomplete="off">
                            <label for="cantidad">Cantidad:</label>
                            <input type="number" id="cantidad2" name="talle" class="form-control" required>
                            <label for="bodega">Bodega:</label>
                            <select id="selectbod2" class="form-select" aria-label="Default select example">
                                
                            </select>
                            <label for="producto">Id producto:</label>
                            <input type="number" id="producto2" name="genero" class="form-control" required>
                            
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" id="cerrar" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-danger" id="confirmar" onclick="Actualizar(id_item)">Enviar</button>
                </div>
            </div>
        </div>
    </div>


    </td>

</tr>
`;
}

function eliminarstock(id_stock){
    var options = {
        method: 'DELETE',
        redirect: 'follow'
    }
fetch(`http://164.90.186.2:4040/api/Stock/${id_stock}`, options)
    .then(response => {
        if(response.status == 200){
            alert("Eliminado con exito")
        }else{
            console.log('Error al eliminar stock...');
        }
})
.then(response => console.log(response))
.catch(err => console.error(err));
}

function obtenerBod() {
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "select id_bodegas, ciudad from haner_campos.Bodegas"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders2,
        body: raw,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:4040/dynamic/Bodegas/', requestOptions)
        .then(response => response.json())
        .then(json => json.forEach(mostrarBod))
        .then(result => console.log(result))
        .catch(err => console.error('error', err));
}

function mostrarBod(element, index, arr) {
    arr[index] = document.querySelector('#selectbod').innerHTML += `
    <option id= "${element.id_bodegas}" value="${element.id_bodegas}">${element.ciudad}</option>
    `;
    arr[index] = document.querySelector('#selectbod2').innerHTML += `
    <option id= "${element.id_bodegas}" value="${element.id_bodegas}">${element.ciudad}</option>
    `;
}

function insertarStock() {
    var getcantidad = document.getElementById('cantidad').value;
    var getproducto = document.getElementById('producto').value;
    var getbodega = document.getElementById('selectbod').value;
    if (Pruebas(getcantidad, getproducto) == true){
    var getdata = {
      cantidad: getcantidad,
      id_bod: getbodega,
      id_prod: getproducto
    };
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
  
    fetch(`http://164.90.186.2:4040/api/Stock/`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se agrego el stock');
        } else {
          console.log('Error al agregar el stock...');
        }
      });
}}

function Actualizar(id_producto) {
    var getcantidad = document.getElementById('cantidad2').value;
    var getbodega = document.getElementById('selectbod2').value;
    var getproducto = document.getElementById('producto2').value;

    if (Pruebas(getcantidad, getproducto) == true){
    var getdata = {
      cantidad: getcantidad,
      id_bod: getbodega,
      id_prod: getproducto
    };
    var requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
  
    fetch(`http://164.90.186.2:4040/api/Stock/${id_producto}`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se actualizaron los datos');
        } else {
          console.log('Error al actualizar los datos...');
        }
      });
}}


function noVacio(cantidad, id_producto){
if (cantidad.trim() !== "" && id_producto.trim() !== "") {
    return true;
} else {
    return false;
}
}

function noLetras(cantidad, id_producto) {
    var regex = /^[a-zA-Z\s]+$/;
    
    
    if (regex.test(cantidad) && regex.test(id_producto)) {
        return false;
    } else {
        return true;
    }
}

function Pruebas(cantidad, id_producto){
    if (noVacio(cantidad, id_producto) === true && noLetras(cantidad, id_producto) == true){
        alert("Se a realizado la operacion correctamente");
        return true;
    } else {
        alert("Uno de los campos no cumple los requisitos, \nrecuerda no tener campos vacios o numeros en ciudad")
    }
}
    