fs = require('fs');

function getYMD( aDate ){
	var year = aDate.getFullYear();
	var month = aDate.getMonth()+1;
	var day = aDate.getDate();

	return "" + year + "-" + month + "-" + day;

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
	    
		console.log("getBooking(): " + strBookingList);

	    aJson = JSON.parse(strBookingList);
	}
	return aJson;
} 

// 生成空白的预约登记表
function makeBlankBooking( aDate, num ){
	var aJson = {};

	aJson.bookinglist = [];
	aJson.siUpload = false;
	aJson.uploadDate = "";
	aJson.BookingDate = getYMD( aDate );
	
	for( i=0; i<num; i++ ){
		var obj = makeBlankLine(aDate);
		obj.index = i+1;
		aJson.bookinglist.push(obj);
	}
	
	return aJson;
} 

function makeBlankLine(aDate){
	var obj = new Object();
	
	obj.treat_date = aDate;
	obj.patient_id =  "000";
    obj.case_id =  "000";
    obj.mobile =  "";
    obj.name =  "";
    obj.comment =  "";
	return obj;
}


/*  操作Mysql数据库   */
function getConn(){
	var mysql = require('mysql');
	var conn = mysql.createConnection({
	    host: 'localhost',
	    user: 'root',
	    password: '',
	    database:'frt',
	    port: 3306
	});
	return conn;
}

