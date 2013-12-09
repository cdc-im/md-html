var toMarkdown = require("./js/to-markdown");

var fs = require('fs'),
	dirNames = {
		"sourceFile" : process.argv[2] || "testSource" ,
		"resultFile" : process.argv[3] || "testResult"
	}
/*if(!Array.prototype.forEach){
	Array.prototype.forEach = function(callback) {
		if (this == null) return;
		var returnAry = [];
		//判断length为num
		if (this.length === +this.length) {
			for (var i = 0, l = this.length; i < l; i++) {
				returnAry.push(callback(this[i]));
			}
		}
		return returnAry;
	};
}*/

fs.readdir('./' + dirNames["sourceFile"] , function( e , files) {
	if(e) throw e;
	files.forEach(function(filename){
		fs.readFile('./' + dirNames["sourceFile"] + '/' + filename, function (er, data) {
		if(er) throw er;
			if(!filename) return;

			var newfilename = filename.replace(/\.[\s\S]+$/,".md");

			if(!fs.existsSync('./' + dirNames["resultFile"])){
				fs.mkdirSync('./' + dirNames["resultFile"]);
			}

			fs.writeFileSync('./' + dirNames["resultFile"] + '/' + newfilename, toMarkdown.toMarkdown(data.toString()));
		});
	});
});
