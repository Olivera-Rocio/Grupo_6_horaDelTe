console.log('productModify sucess');
const $ = id => document.getElementById(id);
const formAddProduct = $('form-modify-product');
const regExExt = /\.(jpg|jpeg|png|gif|webp)$/i;
var preview = document.querySelector('#preview');

console.log(formAddProduct)

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
        case this.files.length > 1:
            imageError.innerHTML = "Solo se permite una imagen"
            this.classList.add('is-invalid');
            preview.innerHTML = null;
            break
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            imageError.innerHTML = null;
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
        }
        if (i === 2) {
            i++
            this.elements[i].classList.contains('is-invalid') ? error = true : null
        }
    }
    !error && this.submit();
})

/*const preview = document.getElementById('preview');

const showPreview = array => {
    preview.innerHTML = null;
    array.forEach(image => {
        preview.innerHTML += `
        <div >
            <img width="200" src="/img/products/${image.file}" alt="">
            
        </div>
        `
    })
    return false
}

/*
const deleteImage = async id => {
    try {
        let response = await fetch('/api/delete-image/' + id, {
            method: 'POST',
        })
        let result = await response.json()
        showPreview(result.images)
    } catch (error) {
        console.log(error)
    }
}

const addImage = async (id,files) => {
    let data = new FormData()
    for (const file of files) {
        data.append('images',file,file.name)
    }
    console.log(data)

    try {
        let response = await fetch('/api/add-images/' + id, {
            method: 'POST',
            body : data,
        })
        let result = await response.json()
        showPreview(result.images)
    } catch (error) {
        
    }
}*/