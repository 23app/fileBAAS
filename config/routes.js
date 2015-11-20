module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	var api = require('../app/controllers/api');

	app.get('/', home.index);
	app.get('/edit/:id', home.editUser);
	app.get('/deleteuser/:id', home.deleteuser);
	app.get('/adduser', home.adduser);
	app.post('/updateuser',home.updateUsers);

	app.get('/api/count.json',api.countSections);
	app.get('/api/query.json/:class/:user',api.query);
};
