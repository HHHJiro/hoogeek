//模式编写
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var CommentSchema = new Schema({
	movie:{type:ObjectId, ref: "Movie"},
	from:{type:ObjectId, ref: "User"},
	reply:[{
		from:{type:ObjectId, ref: "User"},
		to:{type:ObjectId, ref: "User"},
		content:String
	}],
	content: String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});


CommentSchema.pre('save', function(next){
	//查看是更新还是新建
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now(); 
	}
	else {
		this.meta.updateAt = Date.now()
	}
	next()
})

//静态方法
CommentSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function(id,cb){
	return this
		.findOne({_id:id})
		.sort('meta.updateAt')
		.exec(cb)
}
}


module.exports = CommentSchema