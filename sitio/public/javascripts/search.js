console.log('header, header-admin sucess');

const $ = id => document.getElementById(id);
const formSearch = $('form-search');

 formSearch.addEventListener('submit', function (e) {
    
    e.preventDefault();
    var inputSearch = $("input-search")
    console.log(inputSearch.value.trim().length);
    
    if (inputSearch.value.trim().length != 0) {
        
        this.submit()
    } 
    
})
