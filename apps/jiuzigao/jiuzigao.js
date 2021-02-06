function printg() {

	ptitle.innerHTML = title.value;
	peditor.innerHTML = editor.value;
	preporter.innerHTML = reporter.value;
	plength.innerHTML = length.value;
	pprinter.innerHTML = printer.value;
	printp.innerHTML = main.value;
	window.print();

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
	pprinttime.innerHTML = myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日" + myDate.toLocaleTimeString();
}


// https://xwsir.cn/2369.html
// document.oncontextmenu = function (e) {
// var e = e || window.event;
// alert('禁止使用鼠标右键');
// e.preventDefault(); // 阻止默认事件
// e.returnValue = false;
// return false;
// };
window.onkeydown = function (e) {
	// 屏蔽ctrl+c 复制
	// if (e.ctrlKey && e.keyCode == 67) {
	// alert('禁止使用ctrl+c');
	// e.preventDefault();
	// e.returnValue = false;
	// return false;
	// }
	// 屏蔽ctrl+p 打印
	if (e.ctrlKey && e.keyCode == 80) {
		// alert('禁止使用ctrl+p');
		printg();
		e.preventDefault();
		e.returnValue = false;
		return false;

	}
	// 屏蔽ctrl+s 保存
	// if (e.ctrlKey && e.keyCode == 83) {
	// alert('禁止使用ctrl+s');
	// e.preventDefault();
	// e.returnValue = false;
	// return false;
	// }
	// 禁止通过F12打开控制台
	// var e = event || window.event || arguments.callee.caller.arguments[0];
	// if (e && e.keyCode == 123) {
	// alert('禁止使用控制台');
	// e.returnValue = false;
	// return (false);
	// }
};