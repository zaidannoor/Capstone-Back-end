function loginTukang(req, res, next) {
    const isTukang = req.user.roleName == "Tukang";

    if (!isTukang) {
        res.status(403).json({
            status: 'failed',
            message: "You are not Tukang",
        });
    }
    next();
}

module.exports = loginTukang;