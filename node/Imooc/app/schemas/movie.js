//模式编写
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.Types.ObjectId

var MovieSchema = new Schema({
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:String,
	pv:{
		type:Number,
		default:0
	},
	category:{
		type:ObjectId,
		ref:'Category'
	},
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


MovieSchema.pre('save', function(next){
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
MovieSchema.statics = {
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


module.exports = MovieSchema