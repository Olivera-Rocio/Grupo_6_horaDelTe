console.log('header, header-admin sucess');

const formSearch = document.getElementById('form-search');

 formSearch.addEventListener('submit', function (e) {
    
    e.preventDefault();
    var inputSearch = document.getElementById("input-search")
    console.log(inputSearch.value.trim().length);
    
    if (inputSearch.value.trim().length != 0) {
        
        this.submit()
    } 
    
})
