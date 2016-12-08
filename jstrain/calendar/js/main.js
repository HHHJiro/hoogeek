window.onload = function(){
	// console.log("right");
	//当前的年月日
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth();
	var input_year = document.getElementById('year');
	var input_month = document.getElementById('month');
	var td = document.getElementsByTagName('td');
	var day = date.getDate();
	//创建月份天数数组 0-11
	var m_days = new Array (31,28+is_lear(year),31,30,31,30,31,31,30,31,30,31);

 	show(year,month-1);




	//计算年份
	function is_lear(year){
		//整百年份能又能被400整除 是闰年
		//不是整百年份能被4整除   是闰年
		return (year%100==0?res=(year%400==0?1:0):res=(year%4==0?1:0));
	};
	function clean(){
		for (var i = 0; i <td.length; i++) {
			td[i].innerHTML = "";
		}
	}
	function show(year,month,day){
		clean();
		var table = document.getElementById('calendar');
		//获得当月第一天的日期
		var m_firstDay = new Date(year,month,1).getDay();
		//计算显示的行数
		var tr_rows = Math.ceil((m_days[month]+m_firstDay)/7);
		var print=1;
		for(var i=1;i<tr_rows+1;i++){
			for (var j = 0; j <7; j++) {
				if(print>m_days[month])
					{break;}
				else if(i == 1 &&　j == 0)
				{
					j = m_firstDay;
					table.rows[i].cells[j].innerHTML=print;
					print++;
				}
				else
					{table.rows[i].cells[j].innerHTML=print;
					print++;}
			}
		}
		input_year.value=year;     
		input_month.value=month+1;
		


	};
		// 回车事件
	document.onkeydown=function(event){
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if(e && e.keyCode==13){ // enter 键
			year = input_year.value;
			month =input_month.value;
			show(year,month-1);
		}
	}
};