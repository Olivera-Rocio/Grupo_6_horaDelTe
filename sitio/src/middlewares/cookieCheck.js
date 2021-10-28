module.exports = (req,res,next) =>{
    if(req.cookies.horaDelTe){
        req.session.userLogin = req.cookies.horaDelTe
    }
    next()
}