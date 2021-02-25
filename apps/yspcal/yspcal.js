needToCheck0 = ["nowHaveInbox", "wishInbox", "daysInMonthInbox", "videoPerDayInbox", "tvPerDayInbox", "livePerDayInbox", "followPerDayInbox",];
needToCheck3 = ["videoPerDayInbox", "tvPerDayInbox", "livePerDayInbox", "followPerDayInbox",];


function checknuminput() {

	for (i = 0; i < needToCheck0.length; i++) {
		checking = document.getElementById(needToCheck0[i]);
		if (checking.value < 0)
			checking.value = 0;
	}

	for (i = 0; i < needToCheck3.length; i++) {
		checking = document.getElementById(needToCheck3[i]);
		if (checking.value > 3)
			checking.value = 0;
	}

	if (daysInMonthInbox.value > 31)
		daysInMonthInbox.value = 31;

}

function fast() {

	daysInMonthInbox.value = 31;
	for (i = 0; i < needToCheck3.length; i++) {
		checking = document.getElementById(needToCheck3[i]);
		checking.value = 3;
	}

}

function calc() {

	// 注意每日积分小于等于零
	gainPerDay = 10 * videoPerDayInbox.value + 10 * tvPerDayInbox.value + 10 * livePerDayInbox.value + 10 * followPerDayInbox.value + 14 + 1 * otherInbox.value;
	console.log('DailyCount: ' + gainPerDay);
	if (isNaN(gainPerDay) == true) {
		resultbox.innerHTML = "Error(-1): 'gainPerDay' is not a number(" + gainPerDay + ")";
		return -1;
	}
	if (gainPerDay <= 14) {
		resultbox.innerHTML = "Error(-2): 'gainPerDay' is not bigger than 14(" + gainPerDay + ")";
		return -2;
	}
	needCount = 1 * wishInbox.value - 1 * nowHaveInbox.value;
	console.log('NeedCount: ' + needCount);
	if (isNaN(needCount) == true) {
		resultbox.innerHTML = "Error(-3): 'needCount' is not a number(" + needCount + ")";
		return -3;
	}
	if (needCount <= 0) {
		resultbox.innerHTML = "Error(-4): 'needCount' is not bigger than 0(" + needCount + ")";
		return -4;
	}
	workingDates = 1 * daysInMonthInbox.value;
	if (isNaN(workingDates) == true || workingDates == 0) {
		resultbox.innerHTML = "Error(-5): 'workingDates' is not a number except 0(" + workingDates + ")";
		return -5;
	}
	if (workingDates == 31)
		workingDates = 30.5;
	var myDate = new Date();
	// myDate.getYear();        //获取当前年份(2位)
	// myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	// myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	// myDate.getDate();        //获取当前日(1-31)
	// myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
	// myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
	// myDate.getHours();       //获取当前小时数(0-23)
	// myDate.getMinutes();     //获取当前分钟数(0-59)
	// myDate.getSeconds();     //获取当前秒数(0-59)
	// myDate.getMilliseconds();    //获取当前毫秒数(0-999)
	// myDate.toLocaleDateString();     //获取当前日期
	var mytime = myDate.toLocaleTimeString();     //获取当前时间
	// myDate.toLocaleString( );        //获取日期与时间

}