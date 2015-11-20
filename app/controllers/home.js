var Store = require("jfs");
var db = new Store("data");

exports.index = function(req, res){
	
	db.get("_users", function(err, obj){
		if(err)return err;
		var sortArr = Array();
		var sortObj = {}
		var newSortedObj = {}
		for(key in obj){
			sortArr.push(obj[key].username);
			sortObj[obj[key].username] = key;
		}
		sortArr.sort();
		//console.log(sortObj)
		for(var i=0;i<sortArr.length;i++){
			newSortedObj[sortObj[sortArr[i]]] = obj[sortObj[sortArr[i]]];
		}
		//console.log(newSortedObj);
		res.render('home/index.ejs', {
			users:newSortedObj
		});
	})    
  
};

exports.editUser = function(req, res){
	var id = req.params.id;
	db.get("_users", function(err, obj){
		if(err)return err;
		if(typeof obj[id] !="undefined"){
			db.get(obj[id].slug,function(err,obj1){
				if(err)return err;
				res.render('home/edituser.ejs', {
					classes:obj1,
					user:obj[id]
				});
			})
		}else{
			req.flash('danger', "Username doesnot exists");
			res.redirect('/');
			return 0;
		}
		
	});
};

exports.deleteuser = function(req,res){
	var id = req.params.id;
	db.get("_users", function(err, obj){
		if(err)return err;
		var userFound = 0;
		var userSlug = "";
		for(var key in obj){
			if(key==id){
				userFound = 1;
				userSlug = obj[key].slug;
			}
		}
		if(userFound==1){
			delete obj[key];
			db.saveSync("_users", obj);
			db.delete(userSlug);
			req.flash('success', "Username deleted.");
			res.redirect('/');
		}else{
			req.flash('danger', "Username does not exists.");
			res.redirect('/');
		}
	});
}

exports.adduser = function(req, res){
	
	var username = req.query.username.toString();

	db.get("_users", function(err, obj){
		if(err)return err;
		var userFound = 0;
		for(var key in obj){
			if(convertToSlug(obj[key].username)==convertToSlug(username)){
				userFound = 1;			
			}
		}
		if(userFound){
			req.flash('danger', "Username already exists.");
			res.redirect('/');
			return 0;
		}else if(username=="users"){
			req.flash('danger', "Cannot create user with name users.");
			res.redirect('/');
			return 0;
		}else{
			var tmp = {};
			tmp.id= new Date().getTime();
			tmp.username = username.toLowerCase();
			tmp.slug = convertToSlug(username);
			obj[tmp.id] = tmp;

			db.saveSync("_users", obj);

			db.saveSync(tmp.slug, {"data":[]});

			req.flash('success', "User added.");
			res.redirect('/');
		}
	});
};


exports.updateUsers = function(req,res){
	var userSlug = req.body.userSlug.toString();
	var classData = req.body.classData.toString();
	if(typeof userSlug != "undefined" && typeof classData != "undefined"){
		classData = JSON.parse(classData);
		//console.log(classData);
		var classes = Array();
		classData.data.forEach(function(v){classes.push(v.name)});
		//console.log(classes);
		db.get("_total-classes-data", function(err, obj){
			for (var i=0;i<classes.length;i++){
				if(obj.indexOf(classes[i])==-1){
					obj.push(classes[i]);
				}
			}
			db.saveSync("_total-classes-data", obj);
			db.saveSync(userSlug, classData);
			req.flash('success', "User updated.");
			res.redirect('/');
		});
		
	}else{
		req.flash('danger', "No data passed.");
		res.redirect('/');
	}
}

function convertToSlug(Text){
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}
