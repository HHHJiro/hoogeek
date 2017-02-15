$(function(){
	$('.del').click(function(e){
		var target = $(e.target) 
		//获取到id
		var id = target.data('id')
		//获取到该tr
		var tr = $('.item-id-' + id)
		//发起ajax 请求 类型是DELETE
		$.ajax({
			type:'DELETE',
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

	$('#douban').blur(function(){
		var douban = $(this)
		var id = douban.val()

		if(id){
			$.ajax({
				url:'https://api.douban.com/v2/movie/subject/' + id,
				cache: true,
				type: 'get',
				dataType: 'jsonp',
				crossDomain: true,
				jsonp: 'callback',
				success: function(data){
					$('#inputTitle').val(data.title)
					$('#inputDoctor').val(data.directors[0].name)
					$('#inputCountry').val(data.countries[0])
					$('#inputPoster').val(data.images.large)
					$('#inputYear').val(data.year)
					$('#inputSummary').val(data.summary)
				}
			})
		}
	})
})