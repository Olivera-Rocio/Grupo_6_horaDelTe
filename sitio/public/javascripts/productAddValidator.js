console.log('productAdd sucess');
const $ = id => document.getElementById(id);
const formAddProduct = $('form-add-product');
const regExExt = /\.(jpg|jpeg|png|gif|webp)$/i;
var preview = document.querySelector('#preview');

formAddProduct.elements[0].addEventListener('blur', function () {
    switch (true) {
        case this.value.trim() == "":
            this.classList.add('is-invalid');
            nameError.innerHTML = 'Nombre de producto obligatorio.';
            break;
    
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            nameError.innerHTML = null;
            break;
    }
})

formAddProduct.elements[1].addEventListener('blur', function () {
    switch (true) {
        case this.value == "":
            this.classList.add('is-invalid');
            descriptionError.innerHTML = 'Descripción obligatoria.';
            break;

        case this.value.length < 20:
            this.classList.add('is-invalid');
            descriptionError.innerHTML = 'Debe tener un mímino de 20 carácteres.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            descriptionError.innerHTML = null;
            break;
    }
})

formAddProduct.elements[2].addEventListener('blur', function () {
    switch (true) {
        case this.value == "":
            this.classList.add('is-invalid');
            categoryError.innerHTML = 'Debe indicar una categoría.';
            break;
    
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            categoryError.innerHTML = null;
            break;
    }
})

formAddProduct.elements[3].addEventListener('change', function (e) {
    switch (true) {
        case !regExExt.exec(this.value):
            imageError.innerHTML = "Solo imagen con extensión jpg, jpeg, png, gif, webp"
            this.classList.add('is-invalid')
            preview.innerHTML = null;
            break;
        case !this.value :
            imageError.innerHTML = "Debe subir una imagen"
            this.classList.add('is-invalid');
            preview.innerHTML = null;
            break
        case this.files.length > 1:
            imageError.innerHTML = "Solo se permite una imagen"
            this.classList.add('is-invalid');
            preview.innerHTML = null;
            break
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            $('btnImagen').classList.add('btn-outline-dark');
            $('btnImagen').classList.remove('btn-outline-danger');
            imageError.innerHTML = null;
            btnImagen.innerText = "Cambiar imagen"
            if (this.files) {
                [].forEach.call(this.files, readAndPreview);
            }

            function readAndPreview(file) {

                var reader = new FileReader();
                preview.innerHTML = null;
                reader.addEventListener("load", function () {
                    var image = new Image();
                    image.height = 150;
                    image.title = file.name;
                    image.src = this.result;
                    preview.appendChild(image);
                });
                reader.readAsDataURL(file);

            }
            break;
    }
})

formAddProduct.elements[4].addEventListener('blur', function () {
    switch (true) {
        case this.value == "":
            this.classList.add('is-invalid');
            priceError.innerHTML = 'Debe indicar precio.';
            break;

        case this.value <= 0:
            this.classList.add('is-invalid');
            priceError.innerHTML = 'Se requiere un número mayor a cero.';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            priceError.innerHTML = null;
            break;
    }
})

formAddProduct.elements[5].addEventListener('blur', function () {
    switch (true) {
        case this.value == "":
            this.classList.add('is-invalid');
            discountError.innerHTML = 'Debe indicar descuento (si no lo tiene, indicar 0).';
            break;

        case this.value >0:
            this.classList.add('is-invalid');
            priceError.innerHTML = 'Se requiere un número valido';
            break;

        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            discountError.innerHTML = null;
            break;
    }
})

formAddProduct.addEventListener('submit', function(e) {
    e.preventDefault();
    let error = false;
    for (let i = 0; i < this.elements.length - 1; i++) {
        if(this.elements[i].classList.contains('is-invalid') || !this.elements[i].value){
            error = true
            this.elements[i].classList.add('is-invalid');
            errorEmpty.innerHTML = "*Los campos indicados son obligatorios"
            if(!this.elements[3].value){
                $('btnImagen').classList.remove('btn-outline-dark')
                $('btnImagen').classList.add('btn-outline-danger')
            } 
        }
    }
    !error && this.submit();
})