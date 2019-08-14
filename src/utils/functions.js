/**
 * 通用方法
 */
export function formateDateAndTimeToString(date,type){
        var hours = date.getHours();
        var mins = date.getMinutes();
        var secs = date.getSeconds();
        var msecs = date.getMilliseconds();
        if(hours<10) hours = "0"+hours;
        if(mins<10) mins = "0"+mins;
        if(secs<10) secs = "0"+secs;
        if(msecs<10) secs = "0"+msecs;
        if(type=="date"){
                return formatDateToString(date);
        }
        return formatDateToString(date)+ " " +hours+':'+mins+':'+secs;
}


function formatDateToString(date){
	// if(checkIsNull(date)){
	// 	date = new Date();
	// }
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	if(month<10) month = "0"+month;
	if(day<10) day = "0"+day;
	return year+'-'+month+'-'+day;
}