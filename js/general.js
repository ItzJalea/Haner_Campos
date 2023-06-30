function eliminar(id_producto){
    var options = {
        method: 'DELETE',
        redirect: 'follow'
    }
fetch(`http://164.90.186.2:4040/api/Stock/${id_producto}`, options)
    .then(response => {
        if(response.status == 200){
            console.log('Se elimino Stock, eliminando Datos');
            fetch(`http://164.90.186.2:4040/api/Producto/${id_producto}`, options)
                if(response.status == 200){
                    console.log('Se eliminaron todos los datos');
                }else{
                    console.log('Error al eliminar los datos...');
                }
        }else{
            console.log('Error al eliminar los datos de stock...');
        }
})
.then(response => console.log(response))
.catch(err => console.error(err));
}




function verificardigitos() {
    const verificador = document.getElementById('marca').value;
    const verificador2 = document.getElementById('estilo').value;
    const verificador3 = document.getElementById('genero').value;
    console.log(verificador, verificador2, verificador3);
    if (/\d/.test(verificador) || /\d/.test(verificador2) || /\d/.test(verificador3)) {
        alert("Estás utilizando un dígito en una casilla incorrecta");
        return false;
    } else {
        alert("Datos verificados, cerrar casilla si completaste de actualizar datos");
        return true;
    }
}


