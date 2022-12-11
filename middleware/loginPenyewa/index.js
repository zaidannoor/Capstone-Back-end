function loginPenyewa(req, res, next) {
    const isPenyewa = req.user.roleName == "Penyewa";


    if (!isPenyewa) {
        res.status(403).json({
            status: 'failed',
            message: "You are not Penyewa",
        });
    }
    next();
}

module.exports = loginPenyewa;