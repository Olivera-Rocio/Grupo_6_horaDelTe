console.log('registerValidator success');

const $ = id => document.getElementById(id);

const formulario = $('form-perfil');

const imgPreview = $('img-preview')
const inputName = $('name');
const inputTelefono = $('telefono');
const inputPassword = $('password');
const inputAvatar = $('avatar');
const btnWatch = $('watch');
const btnSubmit = $('error-empty');

//expresiones regulares
const regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/; //Que introduzcan letras
const regExPassword = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/
const regExPhone = /^[0-9]\S{7,16}$/


//Nombre
inputName.addEventListener('focus', function () {
    $('info-name').innerText = "Solo letras";
    $('error-name').innerText = null;
    this.classList.remove('is-invalid');
})

inputName.addEventListener('keydown', function () {// keydown es cuando presionas las teclas
    $('info-name').innerText = null;
})


inputName.addEventListener('blur', function () {
    let nombreSeparado = inputName.value.split(" ");

    let nombre = nombreSeparado[0];

    let apellido = nombreSeparado[1];

    switch (true) {
        case !nombre || !apellido:
            $('error-name').innerText = 'Este campo es obligatorio';
            this.classList.add('is-invalid');
            $('info-name').innerText = null;
            break;
        case !regExAlpha.test(this.value):
            $('error-name').innerText = 'Ingresa un nombre valido';
            this.classList.add('is-invalid');
            $('info-name').innerText = null;
            break;
        case nombre.trim().length < 2 || apellido.trim().length < 2:
            $('error-name').innerText = 'El nombre y el apellido debe tener 2 o más caracteres';
            this.classList.add('is-invalid');
            $('info-name').innerText = null;
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            $('info-name').innerText = null;
            $('error-name').innerText = "";
            break;
    }
});

//Telefono
inputTelefono.addEventListener('blur', function () {
    console.log(this.value.trim());
    switch (true) {
        case !this.value.trim():
            $('error-telefono').innerText = 'El campo teléfono es requerido';
            this.classList.add('is-invalid');
            break;
        case !regExPhone.test(this.value):
            $('error-telefono').innerText = 'Ingresa un numero valido';
            this.classList.add('is-invalid');
            break;
        case this.value.trim().length < 8:
            $('error-telefono').innerText = 'El número ingresado no contiene los caracteres requeridos';
            this.classList.add('is-invalid');
            break;
        default:
            this.classList.remove('is-invalid');
            this.classList.add('is-valid');
            $('error-telefono').innerText = "";
            break;
    }
});

// Contraseña
inputPassword.addEventListener('keyup', function () {// keyup cuando soltas la tecla?
    if (this.value === '') {
        this.classList.remove('is-invalid')
    }
})

inputPassword.addEventListener('blur', function () {
    switch (true) {
        case !this.value.trim():
            $('error-password').innerText = null;
            break;
        case !regExPassword.test(this.value):
            $('error-password').innerText = 'Mayúscula, minúscula, número y caracter especial, 8 a 16 caracteres';
            this.classList.add('is-invalid');
            break;
        default:
            this.classList.remove("is-invalid");
            this.classList.add('is-valid');
            $('error-password').innerText = "";
            break;
    }
});

/* ver contraseña */
btnWatch.addEventListener('click', () => {
    inputPassword.type === "text" ? inputPassword.type = "password" : inputPassword.type = "text";
    console.log(inputPassword.type)
})

//Avatar
inputAvatar.addEventListener('change',
    function fileValidation() {
        let filePath = this.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if (!allowefExtensions.exec(filePath)) { //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            $('error-file').innerText = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            this.value = '';
            $('img-preview').innerText = '';
            return false;
        } else {
            // Image preview
            console.log(this.files);
            if (this.files && this.files[0]) {

                let reader = new FileReader();
                reader.readAsDataURL(this.files[0]);

                reader.onload = () => imgPreview.src = reader.result;
            };
            $('error-file').innerText = '';
            this.classList.remove('is-invalid')
        }
    }
)


// Botón de envio
formulario.addEventListener('submit', e => {

    e.preventDefault();

    let error = false;
    const elementos = formulario.elements;

    for (let i = 0; i < elementos.length - 3; i++) {

        if (!elementos[i].value) {
            elementos[i].classList.add('is-invalid');
            $('error-empty').innerText = "Los campos señalados son obligatorios";
            error = true;
        }

    }

    if (!error) {
        formulario.submit()
    }

})
