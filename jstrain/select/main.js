function Select(){}
Select.prototype={
	forms:null,
	selects:[[]],
	showdl:function(oElement){
		oElement.style.display="block";

	},
	createElm:function(){
		var forms = document.getElementsByTagName("form");
		for (var i = 0; i < forms.length; i++) {
			var selects = forms[i].getElementsByTagName("select");
			for (var j = 0; j < selects.length; j++) {
				forms[i].dls[j]= selects[j];
			}
		}
	},
	formHandler:function(oForm){
		for (var i = 0; i < oForm.length; i++) {
			//使select的display:none
			this.hideSelect(oForm[i]);
			 var selectsObj = oForm[i].getElementsByTagName("select");
			for (var j = 0; j < selectsObj.length; j++) {				
				//创建selectDiv
				this.selects[i][j]=this.selectHandler(selectsObj[j],i,j);
				oForm[i].appendChild(this.selects[i][j]);

				//创建dlDiv
				var dlOutBox = this.dlHandler(selectsObj[j],i,j);
				this.forms[i].appendChild(dlOutBox);

				//定位dl
				var dl = this.forms[i].getElementsByTagName("dl");
				this.positionDl(dl[j],i,j);
				this.divWidthHandler(this.selects[i][j],dl[j]);
				//赋值
				this.selects[i][j].firstChild.innerHTML = dl[j].firstChild.innerHTML;
			}
			this.setDlDispaly(oForm[i]);
			this.addDivClick(oForm[i],i);
		}
	},
	selectHandler:function(oSelect,formIndex,selectIndex){
		var selectNow;
		selectNow=document.createElement("div");
		selectNow.setAttribute("class","select_box");
		selectNow.child = document.createElement("div");
		selectNow.child.setAttribute("class","select_inner");
		selectNow.appendChild(selectNow.child);
		selectNow.child.innerHTML="#";
		
		return selectNow;
	},
	dlHandler:function(oSelect,formIndex,selectIndex){
		var selectIn = oSelect.getElementsByTagName("option");
		var nodes = oSelect.getElementsByTagName("*");
		var dlOutBox = document.createElement("div");
		dlOutBox.setAttribute("class","select_option");
		var dl = document.createElement("dl");
		dl.setAttribute("class","option_dl");
		var flag = 0;
		for (var i = 0; i < nodes.length; i++) {
			var dd = document.createElement("dd");
			//处理optgroup		
			if (nodes[i].tagName.toLowerCase()=="optgroup") {
				dd.setAttribute("class","option_dd_groupe");
				dd.innerHTML = nodes[i].getAttribute("label")
			}

			else{
				if (!flag) {
					dd.setAttribute("class","option_dd op_selected");
					flag = 1;
				}
				else{
					dd.setAttribute("class","option_dd");
				}
				dd.innerHTML = nodes[i].innerHTML;
				
			}
			dl.appendChild(dd);
		}
		dlOutBox.appendChild(dl);
		return dlOutBox;
	},
	positionDl:function(oDl,formIndex,selectIndex){
		oDl.style.display = "block";
		var select = this.selects[formIndex][selectIndex];
		oDl.style.position = "absolute"; 	
	    oDl.style.left = select.offsetLeft+"px";
	    oDl.style.top = select.offsetTop+30+"px";  
	},
	divWidthHandler:function(oDiv,oDl){
		oDiv.style.width = oDl.offsetWidth-2 +"px";
	},
	hideSelect(oForm){
		var selects = oForm.getElementsByTagName("select");
		for (var i =0;i<selects.length;i++) {
			selects[i].style.display="none";
		}
	},
	setDlDispaly:function(oForm){
		var oDl = oForm.getElementsByTagName("dl");
		for (var i = 0; i < oDl.length; i++) {
			oDl[i].parentNode.style.display="none";
		}
	},
	addDivClick:function(oForm,formIndex){
		var $this = this;
		var divs = oForm.getElementsByClassName("select_inner");
		for (var i = 0; i < divs.length; i++) {
			divs[i].onclick = (function(i){
				return function(){
					for (var j = 0; j < divs.length; j++) {
						if (j!=i) {
							oForm.getElementsByTagName("dl")[j].parentNode.style.display = "none";
						}
						else{
							oForm.getElementsByTagName("dl")[i].parentNode.style.display = "inline-block";
						}
					}
				}
			})(i)
		}
	},
	addDdClick:function(oForm){
		var $this = this;
		for (var i = 0; i < oForm.length; i++) {
			var dds = oForm[i].getElementsByTagName("dd");
			var formindex = oForm[i];
			var index = i;
			for (var j = 0; j < dds.length; j++) {
				dds[j].onclick = (function(j,i){
					return function(){
						if (dds[j].className=="option_dd_groupe") {
							return ;
						}
						var ddsReal = dds[j].parentNode.getElementsByTagName("dd");
						for (var k = 0; k < ddsReal.length; k++) {
							if (ddsReal[k].className.indexOf("op_selected")>-1 ) {
								ddsReal[k].className = "option_dd";
							}
						}
						if (dds[j].className == "option_dd") {
							dds[j].className += " op_selected";
						}
						console.log(typeof oForm)
						$this.updateInnerhtml(dds[j],formindex,index);
					}
				})(j)
			}
		}
		
	},
	updateInnerhtml:function(oDd,oForm,index){
		var node1 = oDd.parentNode;
		var node2 = oForm.getElementsByTagName("dl");
		for (var i = 0; i < node2.length; i++) {
			if (node2[i].isEqualNode(node1)) {
				this.selects[index][i].firstChild.innerHTML=oDd.innerHTML;
				return;
			}
		}
	},
	scanform:function(){
		this.forms = document.getElementsByTagName("form");
		return this.forms;
	 },
	test:function(){
		document.onclick = function(e) {
		var ele = e ? e.target : window.event.srcElement;
		if(ele.className != "select_inner") {
			var dls = document.getElementsByTagName("dl");
			for (var i = 0; i < dls.length; i++) {
				dls[i].parentNode.style.display = "none";
			}
			}
		}

	}
}
window.onload = function(){
	var select = new Select();
	var dls = document.getElementsByTagName("dl");
	var divs = document.getElementsByClassName("select_box");
	var forms = select.scanform()
select.formHandler(forms);
select.test();
select.addDdClick(forms)
}

