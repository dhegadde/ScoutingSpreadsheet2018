function comparisonFormatter(row, cell, value, columnDef, dataContext){
	var rtn= {text: value}
	if (value !== null || value !== "") {
		if (value < 33) {
          rtn.addClasses = "red";
        } else if (value < 66) {
          rtn.addClasses =  "orange";
        } else {
          rtn.addClasses =  "green";
        }
	}
	return rtn
}

var maxCubeNum=0
function averager(row, cell, value, columnDef, dataContext){
	maxCubeNum=Math.max(maxCubeNum, value/dataContext.matchTotal)
	return {text:value/dataContext.matchTotal, addClasses:columnDef.id}
}

var maxClimbNum=0
function climbAverager(row, cell, value, columnDef, dataContext){
	maxClimbNum=Math.max(maxClimbNum, value/dataContext.matchTotal)
	value = value/dataContext.matchTotal*100
	
	if (value < 25) {
      color = "red";
    } else if (value < 50) {
      color = "silver";
    } else {
      color = "green";
    }
	
	return {text:"<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "px;'></span>"+
	'<span class="climbAveValue" style="position:absolute;left:8px">'+value+'%</span>',
	addClasses:"climbAveCell"}
}

function cubePercent(row, cell, value, columnDef, dataContext){
	 if (value == null || value === "") {
      return "";
    }
	
	value=value/dataContext.cubeTotal*100
    var color;

    if (value < 25) {
      color = "red";
    } else if (value < 50) {
      color = "silver";
    } else {
      color = "green";
    }

    return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "px;'></span>";
}

var selectedTeams=[]
function chooseSortTeams(){
	selectedTeams=prompt("Enter teams separated by commas",selectedTeams).split(",")
	
	for(var i=0;i<selectedTeams.length;i++){
		selectedTeams[i]-=0
	}
}

var teamColumns;
function teamGridSetup() {

	teamColumns = [
		{id: "team", name: "Team", field: "team", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "name", name: "Name", field: "name", minWidth:128, width:256, cssClass: "cell-title"},
		{id: "gscore", name: "G Score", field: "gscore", sortable:true, formatter:comparisonFormatter},
		{id: "cubeNum", name: "Cubes Handled per Game", field: "cubeTotal", formatter:averager},
		//{id: "cubeTime", name: "Time Difference Between Cube Placement", field: "cubeTime"},
		{id: "percentSwitch", name: "Switch Focus", field: "percentSwitch", width:110, resizable:false, formatter:cubePercent},
		{id: "percentScale", name: "Scale Focus", field: "percentScale", width:110, resizable:false, formatter:cubePercent},
		{id: "percentSwitchEnemy", name: "Enemy Switch", field: "percentSwitchEnemy", width:110, resizable:false, formatter:cubePercent},
		{id: "climbSuccess", name: "Climb Success", field: "climbSuccess", width:110, resizable:false, formatter:climbAverager}
	];


	var options = {
		enableCellNavigation: true,
		enableColumnReorder: false,
		editable: false
	};



	
	for (var i = 0; i < matchData.length; i++) {
		var match=matchData[i]
		var team=teams[match.team]
		if(!team){continue}
		team.percentSwitch+=match.switchFriendly.length
		team.percentSwitchEnemy+=match.switchEnemy.length
		team.percentScale+=match.scale.length
		team.cubeTotal+=match.switchFriendly.length+match.switchEnemy.length+match.scale.length
		team.climbSuccess+=match.climbSkill==2
		team.matchTotal++
	}
	
	grid.team = new Slick.Grid("#teamGrid", teamData, teamColumns, options);
	
	var cubeNumCells=document.getElementsByClassName("cubeNum")
	for(var i=0;i<teamData.length;i++){
		cubeNumCells[i].style.background=getRGB(cubeNumCells[i].innerHTML/maxCubeNum)
	}
}