console.log('addmin sucess');

const confirmProduct = (id, e) => {
  e.preventDefault();

  Swal.fire({
    title: '¿Estás seguro que queres eliminar el producto?',
    text: "No podrás revertir los cambios",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
    
      Swal.fire(
        'Registro eliminado!',
        '',
        'success'
      )

      setTimeout(() => {
        document.getElementById(id).submit()

      }, 3000);
    }
  })
}

const confirmUser = (id, e) => {
  e.preventDefault();

  Swal.fire({
    title: '¿Estás seguro que queres eliminar el usuario?',
    text: "No podrás revertir los cambios",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, borralo!'
  }).then((result) => {
    if (result.isConfirmed) {
    
      Swal.fire(
        'Registro eliminado!',
        '',
        'success'
      )

      setTimeout(() => {
        document.getElementById(id).submit()

      }, 3000);
    }
  })
}
