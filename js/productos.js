function listaProducto(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "SELECT p.id_producto, p.marca, p.talle, p.estilo, p.genero, pv.razon_social, s.cantidad, b.ciudad FROM haner_campos.Producto p LEFT JOIN haner_campos.Proveedor pv ON p.id_prov = pv.id_proveedor LEFT JOIN haner_campos.Stock s ON p.id_producto = s.id_prod LEFT JOIN haner_campos.Bodegas b ON b.id_bodegas = s.id_bod ORDER BY p.id_producto ASC;"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
};

    fetch('http://164.90.186.2:4040/dynamic/Producto/', requestOptions)
    //de vuelve un archivo json
      .then(response => response.json())
      //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
      .then((json)=>json.forEach(mostrarProductos))
    
      .then(result => console.log(result))
      .catch(err => console.error('error', err));
};

function mostrarProductos(element, index, arr){
    //index el que recorre
    //element es el valor
    //del documento selecciona la clase .data
arr[index] = document.querySelector('.data').innerHTML += 
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
    ${element.razon_social} 
    </td>

    <td>
    ${element.cantidad} 
    </td>

    <td>
    ${element.ciudad} 
    </td>
    <td>
    <!-- boton modal borrar -->
    <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#borraritem" onclick="items = ${element.id_producto}, ${index};">
    <span class="material-icons"><i class="fa-solid fa-trash"></i></span>
    </button>

    <!-- boton modal editar -->
    <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editaritem" onclick="id_item = ${element.id_producto},${index};">
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
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="eliminar(items);">Borrar</button>
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
                            <label for="marca">Marca:</label>
                            <input type="text" id="marca2" name="marca" class="form-control" required>
                            <label for="talle">Talle:</label>
                            <input type="number" id="talle2" name="talle" class="form-control" required>
                            <label for="estilo">Estilo:</label>
                            <input type="text" id="estilo2" name="estilo" class="form-control" required>
                            <label for="genero">Genero:</label>
                            <input type="text" id="genero2" name="genero" class="form-control" required>
                            <label for="proveedor">Proveedor:</label>
                            <select id="selectprov2" class="form-select" aria-label="Default select example">

                            </select>
                            
                                
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



function Actualizar(id_producto) {  
    var getmarca = document.getElementById('marca2').value;
    var gettalle = document.getElementById('talle2').value;
    var getestilo = document.getElementById('estilo2').value;
    var getgenero = document.getElementById('genero2').value;
    var getproveedor = document.getElementById('selectprov2').value;
    var registro = [getmarca, getestilo, getgenero]
    if (Pruebas(registro) == true){
    var getdata = {
      marca: getmarca,
      talle: gettalle,
      estilo: getestilo,
      genero: getgenero,
      id_prov: getproveedor
    };
    var requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
  
    fetch(`http://164.90.186.2:4040/api/Producto/${id_producto}`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se actualizaron los datos');
        } else {
          console.log('Error al actualizar los datos...');
        }
      });
  }
}

function obtenerProv() {
    var myHeaders2 = new Headers();
    myHeaders2.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "query": "select razon_social, id_proveedor from haner_campos.Proveedor"
    });
    var requestOptions = {
        method: 'POST',
        headers: myHeaders2,
        body: raw,
        redirect: 'follow'
    };

    fetch('http://164.90.186.2:4040/dynamic/Proveedor/', requestOptions)
        .then(response => response.json())
        .then(json => json.forEach(mostrarProv))
        .then(result => console.log(result))
        .catch(err => console.error('error', err));
}

function mostrarProv(element, index, arr) {
    arr[index] = document.querySelector('#selectprov').innerHTML += `
        <option id= ${element.razon_social}" value="${element.id_proveedor}">${element.razon_social}</option>
    `;
    arr[index] = document.querySelector('#selectprov2').innerHTML += `
        <option id= ${element.razon_social}" value="${element.id_proveedor}">${element.razon_social}</option>
    `;
}



function insertarProd() {
    
    var getmarca = document.getElementById('marca').value;
    var gettalle = document.getElementById('talle').value;
    var getestilo = document.getElementById('estilo').value;
    var getgenero = document.getElementById('genero').value;
    var getproveedor = document.getElementById('selectprov').value;
    registro = [getmarca, getestilo, getgenero]
    if (Pruebas(registro) == true){
    var getdata = {
      marca: getmarca,
      talle: gettalle,
      estilo: getestilo,
      genero: getgenero,
      id_prov: getproveedor
    };
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getdata)
    };
  
    fetch(`http://164.90.186.2:4040/api/Producto/`, requestOptions)
      .then(response => {
        if (response.status == 200) {
          console.log('Se agregaron los datos');
        } else {
          console.log('Error al agregar los datos...');
        }
      });
    
  }
}



function noVacio(registro) {
  for (var i = 0; i < registro.length; i++) {
    if (registro[i].trim() === "") {
      return false;
    }
  }
  return true;
}

function noNumeros(registro) {
  var regex = /^[a-zA-Z\s]+$/;
  
  for (var i = 0; i < registro.length; i++) {
    if (!regex.test(registro[i])) {
      return false;
    }
  }
  return true;
}

function Pruebas(registro){
  if (noVacio(registro) === true && noNumeros(registro) == true){
    console.log("logrado")
    return true;
  } else {
    console.log("Rechazado")
    return false
  }
}

