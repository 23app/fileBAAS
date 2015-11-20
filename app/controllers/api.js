var Store = require("jfs");

exports.countSections = function(req, res){
	var db = new Store("data");

	db.get("_total-classes-data", function(err, obj){
		if(err){
			res.status(500);
			res.json({"meta":{"code":500,"status":"error","message":err.message}});
			return err;
		}
		res.json(obj);
	});  
};

exports.query = function(req, res){
	//{"meta":{"code":200,"status":"ok","total_results":1},"response":{"blog":[{"url":"http://www.ansys-blog.com/feed/"}]}}
	var class1 = req.params.class.toString();
	var user = req.params.user.toString();
	console.log(user);
	var db = new Store("data");
	db.get(user, function(err, obj){
		if(err){
			res.status(500);
			res.json({"meta":{"code":500,"status":"error","message":err.message}});
			return err;
		}else{
			var arrTemp = Array();
			var resOutput = {"meta":{"code":200,"status":"ok","total_results":0},"response":{}};
			var total_results = 0;
			for(var i=0;i<obj.data.length;i++){
				if(obj.data[i].name==class1){
					arrTemp.push(obj.data[i].classData);
					total_results++;
				}
			}
			resOutput.meta["total_results"] = total_results;
			resOutput.response[class1] = arrTemp;

			res.json(resOutput);
		}
		
	});
}