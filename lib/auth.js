module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        req.flash('error_msg', 'Silahkan Login');
        res.redirect('/login');
    },
    notAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) { return next(); }
        res.redirect('/dashboard');
    },
    isAdmin: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return res.status(401).json({ error: 'Akses ditolak. Anda harus terlebih dahulu melakukan login.' });
		}
		if (req.user.isAdmin) {
			return next();
		}
		res.status(403).json({ error: 'Akses ditolak. Anda tidak memiliki izin sebagai admin.' });
	}
};
