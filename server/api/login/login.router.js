var router = require('express').Router();
var HttpError = require('../../utils/HttpError');
var User = require('../users/user.model');

router.post('/', function(req, res, next){
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

router.get('/', function(req, res, next) {
	console.log(req.session);
	req.session.destroy();
	res.sendStatus(200);
})

module.exports = router;