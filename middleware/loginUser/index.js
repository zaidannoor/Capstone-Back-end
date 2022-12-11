function loginUser(req, res, next) {
    const isUserLoggedIn = req.user.id == req.params.id;

    if (!isUserLoggedIn) {
        res.status(403).json({
            status: 'failed',
            message: "You are not user",
        });
    }
    next();
}

function isPenyewa(x) {
    return x.roleName == "Penyewa";
}

function isTukang(x) {
    return x.roleName == "Tukang";
}
module.exports = loginUser;