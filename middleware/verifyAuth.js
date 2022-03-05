const jwt = require('jsonwebtoken')


module.exports = function (req, res, next) {
	const token = req.cookies.access_token;

	// check if jwt exists & is verified
	if (token) {
		jwt.verify(token, process.env.SECRET_TOKEN, (err, decodedToken) => {
			if (err) {
				console.log(err.message);
				res.redirect('/signin');
			}else{
				// console.log(decodedToken);
				next();
			}
		});
	}else{
		res.redirect('/signin');
	}

}