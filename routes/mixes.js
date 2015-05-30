var mongoose = require('mongoose');
var Mix = mongoose.model('Mix');
var ObjectId = require('mongoose').Types.ObjectId;

exports.routes = function(app) {
	app.get('/mix/:url', exports.view);
};

exports.view = function(req, res) {
	var mix = Mix.findOne({url: req.params.url}).exec(function (err, mix){

		if (err || !mix) {
			res.status(401).render('404.jade', {title: 'Not Found'});
		}

		if (!mix.hidden || req.session.username) {
			var title;
			if (mix.dj) {
				title = mix.dj + ' - '; 
			}
			else {
				title = 'Unknown DJ - ';
			}
	
			if (mix.title) {
				title += mix.title;
			}
			else {
				title += 'Untitled';
			}

			title += ' | Grime Archive';

			res.render('mix', {
				title: title,
				mix: mix
			});
		}
		else {
			res.status(401).render('404.jade', {title: 'Not Found'});
		}
	});
};
