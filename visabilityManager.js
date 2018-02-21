function setVisiblity(who){
	$("#teamGrid")[0].style.visibility="hidden"
	$("#matchGrid")[0].style.visibility="hidden"
	$("#specificGrid")[0].style.visibility="hidden"
	$("#x")[0].style.visibility="hidden"
	$("#subNav")[0].style.visibility="hidden"
	
	
	if(who=="specificGrid"){
		$("#x")[0].style.visibility="visible"
		$("#subNav")[0].style.visibility="visible"
	}
	$("#"+who)[0].style.visibility="visible"
}

function getRGB(n){
	return "rgb("+Math.ceil(255 * 2 * (1-n))+","+Math.floor(255 * n) +",0)"
}

$(function(){
	setVisiblity("teamGrid")
	document.getElementById("rootNav").onchange=function(){setVisiblity(this.value)}
})