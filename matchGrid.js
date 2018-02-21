function autonSkillFormat(row, cell, value, columnDef, dataContext){
	var rtn
	switch(value){
		case -1:
			rtn={text:"Data Not Avalible",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"No Auton",addClasses:"bad"}
			break;
		case 1:
			rtn={text:"Moves",addClasses:"ok"}
			break;
		case -2:
			rtn={text:"Incorrect Switch",addClasses:"veryBad"}
			break;
		case 2:
			rtn={text:"Switch",addClasses:"good"}
			break;
		case -3:
			rtn={text:"Incorrect Scale",addClasses:"veryBad"}
			break;
		case 3:
			rtn={text:"Scale",addClasses:"veryGood"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
	}
	return rtn
}

function startingPosFormat(row, cell, value, columnDef, dataContext){
	var rtn
	switch(value){
		case -1:
			rtn={text:"N/A",addClasses:"NA"}
			break;
		case 0:
			rtn={text:"Close"}
			break;
		case 1:
			rtn={text:"Middle"}
			break;
		case 2:
			rtn={text:"Far"}
			break;
		default:
			rtn={text:value,addClasses:"NA"}
			break;
	}
	return rtn
}

function arrayLengthFormat(row, cell, value, columnDef, dataContext){
	if(!value)
	{
		return ""
	}
	return value.length
}

function timeFormat(row, cell, value, columnDef, dataContext){
	var rtn={text:value+"s"}
	if(!(0<value&&value<135)){
		rtn.addClasses="bad"
	}
	return rtn
}

function specificGrid(name, type, data){
	setVisiblity("specificGrid")
	document.getElementById("subNav").innerHTML="< "+name
	var columns
	if(type=="switch"){
		columns=[
		{id:"type", name:"Type", field:"type"},
		{id:"time", name:"Time", field:"time", formatter: timeFormat}
		]
	}
	
	var options = {
		enableCellNavigation: true,
		enableColumnReorder: false,
		editable: false
	};
	
	grid.specific = new Slick.Grid("#specificGrid", data, columns, options);
}

var matchData
function matchGridSetup() {
	var columns = [
		{id: "match", name: "Match", field: "matchID", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "teamNumber", name: "Team", field: "team", width:64, resizable:false, sortable:true, cssClass: "cell-title"},
		{id: "teamName", name: "Name", field: "name", minWidth:64, width:128, sortable:true, cssClass: "cell-title"},
		{id: "startingPos", name: "St Pos", field: "startingPos", width:64, resizable:false, sortable:false, formatter:startingPosFormat},
		{id: "autonScore", name: "Auton Capability", field: "autonSkill", width:128, resizable:false, sortable:true, formatter:autonSkillFormat},
		{id: "allianceSwitch", name: "Ally Switch", field: "switchFriendly", minWidth:64, width:128, sortable:true, formatter:arrayLengthFormat},
		{id: "enemySwitch", name: "Enemy Switch", field: "switchEnemy", minWidth:64, width:128, sortable:true, formatter:arrayLengthFormat},
		{id: "scale", name: "Scale", field: "scale", width:64, resizable:false, sortable:true, formatter:arrayLengthFormat},
		{id: "climbed", name: "Climbed", field: "climbSkill", resizable:false, sortable:true, formatter:Slick.Formatters.Checkmark}
	];
	
	var options = {
		enableCellNavigation: true,
		enableColumnReorder: false,
		editable: false
	};
	
	matchData = JSON.parse("["+rawMatchData+"]");
	for (var i = 0; i < matchData.length; i++) {
		if(!teams[matchData[i].team]){
			matchData[i].name="N/A"
			continue
		}
		matchData[i].name=teams[matchData[i].team].name;
	}
	
	grid.match = new Slick.Grid("#matchGrid", matchData, columns, options);
	
	grid.match.onClick.subscribe(function(e){
		var cell=grid.match.getCellFromEvent(e)
		var row=grid.match.getDataItem(cell.row)
		if(cell.cell==5){
			specificGrid(row.team+" "+row.name+" Ally Switch","switch",row.switchFriendly)
		}else if(cell.cell==6){
			specificGrid(row.team+" "+row.name+" Enemy Switch","switch",row.switchEnemy)
		}else if(cell.cell==7){
			specificGrid("["+row.team+": "+row.name+"] Scale","switch",row.scale)
		}
	})
}