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
	return 'data/booking_' + getYMD(aDate) + '.json' ;
}

// 读入指定日期的预约登记表
function getBooking( aDate ){
	var aJson = makeBlankBooking( aDate, 40 );
	var strFilename = getBookingFilename(aDate) ;

	if(fs.existsSync( strFilename) ){
		var strBookingList = fs.readFileSync(strFilename);
	    
		//console.log("getBooking(): " + strBookingList);

	    aJson = JSON.parse(strBookingList);
	}
	return aJson;
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
	var obj = new Object();
	
	obj.treat_date = getYMD( aDate );
	obj.patient_no =  "0";
    obj.case_no =  "0";
    obj.mobile =  "";
    obj.name =  "";
    obj.comment =  "";
	return obj;
}

// 把内容附加到文件中的 Json 数组中，作为最后一个成员。
function appendToJsonFile( filename, aJsonObj ){
	
	// 打开文件，读入json串。  解析为json对象。
	var fileStr = fs.readFileSync(filename);

	//console.log("getBooking(): " + strBookingList);
    var jsonObj = JSON.parse(fileStr);

    // 将内容append为最后一个成员
    jsonObj.push(aJsonObj)

	var jsonStr = JSON.stringify(jsonObj);
	fs.writeFileSync( filename, jsonStr);
}

/*  读文件并且转为Json返回   */
function readFileToJson( filename ){
	
	aJson = "{'runResult':'start run.'}"
	if(fs.existsSync( filename) ){
		var strFileContent = fs.readFileSync(filename);   
		//console.log("getBooking(): " + strBookingList);
	    aJson = JSON.parse(strFileContent);
	}
	return aJson;
}



/*  连接Mysql数据库   */
function getConn(){
	
	var conn = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database:'frt',
	    port: 3306
	});
	return conn;
}









