
var router = require('express').Router();
var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');

router.post('/', function(req, res, next){
	console.log(req.body);
	console.log(req.session);
	User.findOne({
		where: {
			email: req.body.email,
			password: req.body.password
		}
	})
	.then(user => {
		if(!user){
			res.sendStatus(401);
		} else {
			req.session.userId = user.id;
			res.status(204).json(user);
		}
	})
	.catch(next);
})

module.exports = router;