//此文件主要用来控制路由
var express = require('express');
var router = express.Router();
var path=require("path");//toknow:path是一个专门用来处理路径的模块
var media=path.join(__dirname,"../public/media");//__dirname是当前目录路径



/* GET home page. */
router.get('/', function(req, res, next) {
	var fs=require("fs");//toknow:fs文件系统模块
	fs.readdir(media,function(err,names){
		if(err){
			console.log(err);
		}else{
			//toknow:这里是将media文件加下的歌曲读取并且返回给music的一个names属性
			res.render('index', { title: 'Round Music',music:names });
		}
	});//readdir用来异步读取文件中的文件夹

  
});

module.exports = router;
