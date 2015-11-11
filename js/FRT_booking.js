var fs = require('fs');
var _ = require('underscore');


function isblank(strA){
	if(strA){
		if( "string" === typeof(strA) ){
			if( "" === strA.trim()){
				return true;
			}else{
				return false;
			}
		}else{
			return false;
		}
	}else{
		return true;
	}
}

function isMobile(mobileNo){
	console.log(mobileNo);
    if((/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(mobileNo))){  
        return true; 
    }
    else{
    	return false; 
    }
}

function getYMD( aDate ){
	var year = aDate.getFullYear();
	var month = aDate.getMonth()+1;
	var day = aDate.getDate();

	return "" + year + "-" + month + "-" + day;

}

function getYMD_no_dash( aDate ){
	var year = aDate.getFullYear();
	var month = aDate.getMonth()+1;
	var day = aDate.getDate();

	return "" + year + month + day;

}

function getBookingFilename( aDate ){
	return 'booking_' + getYMD(aDate) + '.json' ;
}


// 生成空白的预约登记表
function makeBlankBooking( aDate, num ){
	var aJson = {};

	aJson.bookinglist = [];
	aJson.isUpload = false;
	aJson.uploadDate = "";
	aJson.BookingDate = getYMD( aDate );

	strYMD = getYMD(aDate);
	
	for( i=0; i<num; i++ ){
		var obj = makeBlankLine(aDate);
		obj.index = i+1;
		obj.case_no = strYMD + "_" + (i+1);
		aJson.bookinglist.push(obj);
	}
	
	return aJson;
} 

function makeBlankLine(aDate){
	var obj = {};
	
	obj.treat_date = getYMD( aDate );
	obj.patient_no =  "0";
    obj.case_no =  "0";
    obj.mobile =  "";
    obj.name =  "";
    obj.comment =  "";
    obj.doctor_name = "";
    obj.sms_num = 0;
	return obj;
}

// 把内容附加到文件中的 Json 数组中，作为最后一个成员。
function appendToJsonFile( filename, aJsonObj ){
	
	// 打开文件，读入json串。  解析为json对象。
	var fileStr = fs.readFileSync(filename);

	//console.log("getBooking(): " + strBookingList);
    var jsonObj = JSON.parse(fileStr);

    // 将内容append为最后一个成员
    jsonObj.push(aJsonObj);

	var jsonStr = JSON.stringify(jsonObj);
	fs.writeFileSync( filename, jsonStr);
}

/*  读文件并且转为Json返回   */
function readFileToJson( filename ){
	
	aJson = "{'runResult':'start run.'}";
	if(fs.existsSync( filename) ){
		var strFileContent = fs.readFileSync(filename);   
		//console.log("getBooking(): " + strBookingList);
	    aJson = JSON.parse(strFileContent);
	}
	return aJson;
}









