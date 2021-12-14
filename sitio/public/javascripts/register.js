const qs = (e) => document.querySelector(e)

window.addEventListener('load', () => {
    console.log('Javascript está vinculado correctamente');

    let formulario = qs('form.form-reg')
    let nombre = formulario.elements[0];
    let email = formulario.elements[1];
    let telefono = formulario.elements[2];
    let pass1 = formulario.elements[3];
    let pass2 = formulario.elements[4];
    let regExEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]:+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    let regExLetras = /^[a-zA-Z\sñáéíóúü]*$/
    nombre.addEventListener('blur', () => {
        switch (true) {
            case !nombre.value:
                errorName.innerHTML = "obligatorio";
                nombre.classList.add('is-invalid');
                break;
            case !regExLetras.test(nombre.value):
                errorName.innerHTML = "Solo letras por favor";
                nombre.classList.add('is-invalid');
                break;
            case nombre.value.length < 2:
                errorName.innerHTML = 'El nombre debe tener al menos dos letras';
                nombre.classList.add('is-invalid');
                break;
            default:
                errorName.innerHTML = "";
                nombre.classList.remove('is-invalid');
                nombre.classList.add('is-valid');
                break;
        }
    })
    email.addEventListener('blur', () => {
        switch (true) {
            case !email.value:
                errorEmail.innerHTML = "obligatorio";
                email.classList.add('is-invalid');
                break;
            case !regExEmail.test(email.value):
                errorEmail.innerHTML = "Ingrese un email válido";
                email.classList.add('is-invalid');
                break;
            default:
                errorEmail.innerHTML = "";
                email.classList.remove('is-invalid');
                email.classList.add('is-valid');
                break;
        }
    })
    pass1.addEventListener('blur', () => {
        switch (true) {
            case !pass1.value:
                errorPass1.innerHTML = "obligatorio";
                pass1.classList.add('is-invalid');
                break;
            case !regExPass.test(pass1.value):
                errorPass1.innerHTML = "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número";
                pass1.classList.add('is-invalid');
                break;
            default:
                errorPass1.innerHTML = "";
                pass1.classList.remove('is-invalid');
                pass1.classList.add('is-valid');
                break;
        }
    })
    pass2.addEventListener('blur', () => {
        switch (true) {
            case !pass2.value:
                errorPass2.innerHTML = "Verifique la contraseña";
                pass2.classList.add('is-invalid');
                break;
            case pass2.value != pass1.value:
                errorPass2.innerHTML = "Las contraseñas no coinciden";
                pass2.classList.add('is-invalid');
                break;
            default:
                errorPass2.innerHTML = "";
                pass2.classList.remove('is-invalid');
                pass2.classList.add('is-valid');
                break;
        }
    })
    formulario.addEventListener('submit', (e) => {
        let error = false;
        e.preventDefault();

        let elementsForm = formulario.elements;

        for (let index = 0; index < elementsForm.length - 1; index++) { /* -1 para que no cuente al boton cuando recorre el array */
            if (!elementsForm[index].value) {
                elementsForm[index].classList.add('is-invalid')
                msgError.innerHTML = "Los campos señalados son obligatorios"
                error = true;
            }
        } 
            if (!error) {
                formulario.submit()
            }
        
    })
})
