$(function(){
	$('.del').click(function(e){
		var target = $(e.target) 
		//获取到id
		var id = target.data('id')
		//获取到该tr
		var tr = $('.item-id-' + id)
		//发起ajax 请求 类型是DELETE
		$.ajax({
			type:"DELETE",
			url:'/admin/movie/list?id='+id
		})
		.done(function(results){
			if (results.success ===1) {
				if (tr.length>0) {
					//移除这一行
					tr.remove()
				}
			}
		})
	})
})