var Movie = require('../models/movie')
var Category = require('../models/category')

exports.index = function(req, res){
	Category
		.find({})
		.populate({path: 'movies', options:{limit:5}})
		.exec(function(err,categories){
			if(err){
			console.log(err)
			}
			res.render('index',{
			title: "imooc 首页",
			categories:categories
			})
		})
}
// search page
exports.search = function(req, res){
	var catId = req.query.cat
	var q = req.query.q
	var page = parseInt(req.query.p,10) || 0
	var count = 2
	var index = page * count
	var totalPage = 0

	if(catId){
		Category
			.find({_id: catId})
			.populate({
				path: 'movies', 
				select: 'title poster',
				options:{limit:count, skip: index}
			})
			.exec(function(err,categories){
				if(err){
				console.log(err)
				}
				var category = categories[0] || {}
				totalPage =Math.ceil(category.__v/count)
				res.render('results',{
				title: "imooc 结果列表页",
				keyword: category.name,
				movies:category.movies,
				query: 'cat=' + catId,
				totalPage:totalPage,
				currentPage: (page+1)
				})
			})
	}

	else{
		Movie
			.count({title: new RegExp(q+'.*','i')},function(err,num){
				totalPage = Math.ceil(num/count)
			})
			.exec(function(){
				Movie
				.find({title: new RegExp(q+'.*','i')})
				.limit(count)
				.skip(index)
				.exec(function(err,movies){
					if(err){
						console.log(err)
					}
					res.render('results',{
					title: "imooc 结果列表页",
					keyword: q,
					movies:movies,
					query: 'q=' + q,
					totalPage:totalPage,
					currentPage: (page+1)
					})
				
			})
			})
	}
	
}
	