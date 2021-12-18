console.log('header sucess');
const $ = id => document.getElementById(id);
const formSearch = $('form-search');

 formSearch.addEventListener('submit', function (e) {
    
    e.preventDefault();
    console.log(this.value.length);
    
    if (this.value.length == 0) {
        
        return false
    } 
    
})
