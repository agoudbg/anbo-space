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

	resultbox.innerHTML = "";
	window.location.href = "#resultbox";
	document.body.scrollTop-=90;
	needCount = 1 * wishInbox.value - 1 * nowHaveInbox.value;
	console.log('NeedCount: ' + needCount);
	if (isNaN(needCount) == true) {
		resultbox.innerHTML = "Error(-1): 'needCount' is not a number(" + needCount + ")";
		return -1;
	}
	if (needCount <= 0) {
		resultbox.innerHTML = "Error(-2): 'needCount' is not bigger than 0(" + needCount + ")";
		return -2;
	} gainPerDay = 10 * videoPerDayInbox.value + 10 * tvPerDayInbox.value + 10 * livePerDayInbox.value + 10 * followPerDayInbox.value + 14 + 1 * otherInbox.value;
	console.log('DailyCount: ' + gainPerDay);
	if (isNaN(gainPerDay) == true) {
		resultbox.innerHTML = "Error(-3): 'gainPerDay' is not a number(" + gainPerDay + ")";
		return -3;
	}
	if (gainPerDay <= 14) {
		resultbox.innerHTML = "Error(-4): 'gainPerDay' is not bigger than 14(" + gainPerDay + ")";
		return -4;
	}

	workingDates = 1 * daysInMonthInbox.value;
	if (isNaN(workingDates) == true || workingDates == 0) {
		resultbox.innerHTML = "Error(-5): 'workingDates' is not a number except 0(" + workingDates + ")";
		return -5;
	}
	if (workingDates == 31)
		workingDates = 30.5;
	needDay = needCount / gainPerDay - (needCount / gainPerDay) % 1;
	console.log('NeedDay: ' + needDay);
	actuallyDay = needDay / workingDates * 30.5 - (needDay / workingDates * 30.5) % 1;
	if ((needDay / workingDates * 30.5) % 1 != 0)
		actuallyDay++;
	console.log('Actually Need: ' + actuallyDay);
	var date = new Date();
	date.setDate(date.getDate() + actuallyDay);
	finishDate = (date.getFullYear()) + " 年 " + (date.getMonth() + 1) + " 月 " + date.getDate() + " 日 ";
	var nowDate = new Date();
	if (date.getFullYear() - nowDate.getFullYear() > 0)
		warningExpire = true;
	else
		warningExpire = false;
	resultbox.innerHTML += "根据你的所填，如果你从今天起";
	if (workingDates == 30.5)
		resultbox.innerHTML += "每";
	else
		resultbox.innerHTML += "平均每月 " + workingDates + " ";
	resultbox.innerHTML += "天在央视频：<br />• 签到  ";
	if (videoPerDayInbox.value != 0)
		resultbox.innerHTML += "<br />• 观看视频 " + videoPerDayInbox.value + " 次  ";
	if (tvPerDayInbox.value != 0)
		resultbox.innerHTML += "<br />• 观看电视 " + tvPerDayInbox.value + " 次  ";
	if (livePerDayInbox.value != 0)
		resultbox.innerHTML += "<br />• 观看直播 " + livePerDayInbox.value + " 次  ";
	if (followPerDayInbox.value != 0)
		resultbox.innerHTML += "<br />• 关注央视频号 " + followPerDayInbox.value + " 次";
	if (otherInbox.value != 0)
		resultbox.innerHTML += "，<br />并且每日通过其他途径获取或消耗 " + otherInbox.value + " 积分";
	resultbox.innerHTML += "，那么你将在"
		;
	if (actuallyDay != 0)
		resultbox.innerHTML += "约 " + actuallyDay + " 天后，即 " + finishDate;
	else
		resultbox.innerHTML += "今天";
	resultbox.innerHTML += "达成获得 " + wishInbox.value + " 积分的目标。安播空间祝你如愿以偿。";
	if (warningExpire == true)
		resultbox.innerHTML += "<br />提示：此段时间跨过年末，可能产生积分过期。";
}

function copy() {
	let input = document.createElement('input')
	input.setAttribute('readonly', 'readonly') // 防止手机上弹出软键盘
	input.setAttribute('value', "安播空间的央视频积分计算器告诉我，" + resultbox.innerHTML.replace(/<br>/g, `
`).replace(/你/g, "我") + "你也快到 https://anbo.space/apps/yspcal 算算吧！") // txval 为所需复制的值 变量 或者 写死
	document.body.appendChild(input)
	input.select()
	document.execCommand('copy')
	document.body.removeChild(input)
}
