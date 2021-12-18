console.log('header sucess');
const $ = id => document.getElementById(id);
const formSearch = $('form-search');
 console.log(formSearch.elements[0]);

 formSearch.elements[0].addEventListener('submit', function (e) {
    
    e.preventDefault();
    
    if (this.value.length === "") {
        console.log(value.length);
        return false
    } else {
        return true
    }
    
})
