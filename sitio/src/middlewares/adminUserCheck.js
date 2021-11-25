module.exports = (req,res,next) => {
    if(req.session.userLogin && req.session.userLogin.id === 2){
        next()
    }else{
        res.redirect('/')
    }
}