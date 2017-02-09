//模式编写
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId

var CatetorySchema = new Schema({
	name:String,
	movies:[{type:ObjectId, ref: 'Movie'}],
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


CatetorySchema.pre('save', function(next){
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
CatetorySchema.statics = {
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


module.exports = CatetorySchema