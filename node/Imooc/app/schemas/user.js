//模式编写
var mongoose = require('mongoose')

var bcrypt = require('bcryptjs')  //用bcryptjs 代替bcrypt 
var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	// 0 : nomal user
	// 1 : verified user
	// 2 : professonal user
	// >10: admin
	// >50: super admin 　　
	role:{
		type:Number,
		default:0
	},
	password:String,
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

// UserSchema.pre('save', function(next){
// 	var user = this
// 	//查看是更新还是新建
// 	if (this.isNew) {
// 		this.meta.createAt = this.meta.updateAt = Date.now(); 
// 	}
// 	else {
// 		this.meta.updateAt = Date.now()
// 	}
// 	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
// 		if (err) return next(err)

// 		bcrypt.hash(user.password,salt, function(err,hash){
// 			if (err) return next(err)

// 			user.password = hash
// 			next()
// 		})
// 	})

// 	next()
// })

//来自同学的回答解决了密码不加密的问题
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  var hash = bcrypt.hashSync(this.password);
  this.password = hash;
  next();
});
  
UserSchema.methods = {
 	comparePassword: function (_password, cb) {
    var hash = this.password;
    var isMatch = bcrypt.compareSync(_password, hash);
      cb(null, isMatch);
    }
};


//静态方法
UserSchema.statics = {
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


module.exports = UserSchema