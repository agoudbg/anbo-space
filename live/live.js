var open0 = 0;
var single;
id = 0;
searched = 0;
whatsea = "";
playernum = 0;
tit = document.title;

//UA
var Sys = {};
var ua = navigator.userAgent.toLowerCase();
if (ua.match("anbo_space_android_app")!=null){
	window.open("/blackboard/2021/01/android-app-live-center-bug.html")
}
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
			(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
				(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

nocheckip = m3u8playable();
//设置读取内容
function loadc(name) {
	let xhr = new XMLHttpRequest(),
		okStatus = document.location.protocol === "file:" ? 0 : 200;
	xhr.open('GET', name, false);
	xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
	xhr.send(null);
	return xhr.status === okStatus ? xhr.responseText : null;
}
let channels = loadc("link.html")
var a = new RegExp("{disable:(\\S*)}", "");
ipblacklist = channels.match(a);//[1];
ipblacklist = ipblacklist[1].split(",");
changetab("#selected");


var goto = Request("id");
var comment = Request("code");
var words = Request("t");
if (goto != "") find(goto);
if (words != "") search(words);

// var type=Request("type");
// if (type!="")changetab(type);
window.onresize =
	function cw() {
		changewidth();
	}
function changetab(c) {

	type = document.getElementsByClassName("preview_type");
	a = 0;
	while (a < 10) {
		type[a].style.setProperty('background-color', 'transparent');
		type[a].style.color = '';

		type[a].style.setProperty('font-weight', 'normal');

		a++;
	}

	type = document.getElementById(c);
	if (preview_types.innerHTML.match(c) != null) {
		type.style.setProperty('background-color', 'grey');
		type.style.setProperty('color', 'white');
		type.style.setProperty('font-weight', 'bold');
	}
	//else preview_types.style.height="0"; 
	searched = 0;
	if (c == 'alltype') search('');
	else search("," + c + ",");

	// changeURLParam('t', c)

}

function getdetail(id) {
	var a = new RegExp("{" + id + ",(\\S*)}", "");
	single = channels.match(a);//[1];
	return single;
}

function search(words) {
	words = words.toLowerCase();

	if (words == ",#selected,") {

		forsel = 1;
		words = "";
	}
	else forsel = 0;
	if (words == 'more') {
		words = whatsea;
		if (showmore.innerHTML == "已加载完成") {
			alert('哎呀 人家都说加载完了还要戳我 讨厌鬼(＞人＜)');
			showmore.innerHTML = "(´･_･`)";
			return -1;
		}
	}
	else {
		whatsea = words;
		showmore.innerHTML = "正在加载";
		// changeURLParam('words', whatsea);
	}

	singlecount = 0;
	if (searched == 0) {
		preview_main.innerHTML = "";
		preview_top.innerHTML = "";
		id = 0;
	}
	NEEDNUM = 50;
	searched += 250;
	for (id; singlecount <= NEEDNUM; id++) {
		things = "";
		single = getdetail(id);
		if (single != null)
			single = single[1];

		else continue;
		if (single == "stopsearch") {
			showmore.innerHTML = "已加载完成";
			if (singlecount == 0)
				preview_main.innerHTML = "<p style=\'text-align:center;\'><img src=\'https://junbo.wang/src/img/not-found-small.png\'style=\'width:35%;max-width:140px;background:url()!important;\'></p><p style=\'text-align:center;\'>好像没有你想要的结果<br/></p>"
			return 0;
		}
		searchlower = single.toLowerCase().split(",");
		if (single.toLowerCase().indexOf(words) == -1) continue;


		//alert(single);
		things = single.split(",");

		if (things[3] != "") {
			selected = '<svg t="1600529705535" class="preview_selected" id="selected-svg" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9176" width="20" height="20"><path d="M391.936 684.288L233.536 525.888a32 32 0 0 0-45.248 45.248l180.992 180.992a31.872 31.872 0 0 0 45.248 0l407.296-407.296a32 32 0 0 0-45.248-45.248l-384.64 384.64zM512 1024A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z" fill="#3776F4" p-id="8940"></path></svg>';
			selint = " | " + things[3];
		}
		else {
			selected = "";
			selint = "";
			if (forsel == "1") continue;
		}


		preview_top.innerHTML += ('<div class="preview_box" onclick="find(' + id + ')"><img src="' + things[1] + '" class="preview_img"><p class="preview_title">' + things[0] + '</p><p class="preview_little">' + getsourcenum(id) + '个直播源' + selint + '</p>' + selected + '<svg t="1595514904008" class="preview_go" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="200" height="200"><path d="M730.802325 593.75489 804.269733 525.91913 273.742891 0.511968 219.730267 54.012624 694.580589 524.191238 220.562215 969.987376 274.382851 1023.36004 730.994313 593.946878Z" p-id="2123" fill="#bfbfbf"></path></svg></div>');
		singlecount++;
	}
	if (singlecount == 0) {
		search('more');
	}
	else {

	}

	showmore.innerHTML = "加载更多";
	//preview_main.innerHTML="<h2>your str";
}


function find(id) {
	open0 = 1;
	detail.scrollTop = 0;
	detail_img.src = "zlz.png";
	titu.style.background = "url(zlz.png)center 0 no-repeat";
	//var id,name,photo,scrnum,introduce;
	details = getdetail(id);
	things = details[1].split(",");
	dheader_title.innerHTML = things[0];
	detail_img.src = things[1];
	sharephoto.src = things[1];
	detail_title.innerHTML = things[0];
	detail_int.innerHTML = things[5];
	detail_tag.innerHTML = "";
	for (i = 1; i <= things[6]; i++) {

		tag = things[i + 6];
		tagplus = '<p class="tag" onclick="closewin();document.documentElement.scrollTop = 0;changetab(&quot;' + tag + '&quot;);">' + tag + '</p>';
		detail_tag.innerHTML += tagplus;
	}
	detail_tag.innerHTML += '<p class="tag" >id: ' + id + '</p>';

	detail_baike.href = 'https://www.baidu.com/s?wd=' + things[0];
	if (things[2] != "") {

		titu.style.background = "url(" + things[2] + ")center center no-repeat";
		dheader_main.className = "height showimgbg";
		dheader_title.className = "showimgp";
		titu.style.display = "block";
	}
	else {

		dheader_main.className = "height";
		dheader_title.className = "";
		titu.style.display = "none";


	}

	if (things[3] != "") {

		selected_inner.innerHTML = "<b>安播空间直播中心精选：</b>" + things[3];
		detail_selected.style.display = "inline-block";
	}
	else detail_selected.style.display = "none";

	if (things[4] != "") {

		detail_litetv.href = "/live/lite?tid=" + things[4];
		detail_litetv.style.display = "block";

	}
	else detail_litetv.style.display = "none";
	snum = getsourcenum(id);
	countnum.innerHTML = '（共' + snum + '个）';
	if (snum == 0) linksin.innerHTML = "<p style=\'text-align:center;\'><img src=\'https://junbo.wang/src/img/not-found-small.png\'style=\'width:35%;max-width:170px;background:url()!important;\'></p><p style=\'text-align:center;\'>这里还什么都没有呢<br/></p>";
	else linksin.innerHTML = "";
	for (i = 1, n = 0; n < snum; i++) {

		linkname = things[2 * i + 10];
		linkurl = things[2 * i + 11];
		if (linkurl == "") continue;
		else n++;
		playbroke = "";
		for (j = 0; (j < ipblacklist.length); j++) {
			if (nocheckip == 1) break;
			if ((linkurl.match(ipblacklist[j]) != null) && (ipblacklist[j] != "")) {//增加容错性，若预留了逗号不会被识别
				playbroke = "opacity:0.2;pointer-events:none;";
				break;
			}
			else
				playbroke = "";

		}
		alllink = '<div class="singlelink"><p class="introduce linklist" title="' + linkname + '">' + linkname + '</p><pre class="url" id="' + linkurl + '" >' + linkurl + '</pre><button style="' + playbroke + '"class="play" onclick=play("' + linkurl + '")><svg t="1595687531264" class="playicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2074" width="12" height="12"><path d="M870.05628 437.593243L260.040791 19.178254l-0.284443 0.227554a70.59864 70.59864 0 0 0-119.06765 50.289443c0 21.105637-0.910216 62.634249 0 61.724033v774.935278c0 38.399744 31.459346 69.688424 70.371086 69.688424 18.943874 0 36.181092-7.395506 48.810341-19.512758L869.942503 538.172128c13.255023-12.686138 21.617634-30.492241 21.617633-50.232554v-0.227554c0-19.683424-8.248834-37.546416-21.503856-50.175666z" fill="#2c2c2c" p-id="2075"></path></svg></button><button class="play" onclick="copyLink(\'' + linkurl + '\',\'复制成功，快去粘贴播放吧~\',\'' + linkurl + '\');"data-clipboard-action="copy" data-clipboard-target="#linkurl"><svg t="1602572543986" class="playicon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2385" width="18" height="18"><path d="M672 832H224c-52.928 0-96-43.072-96-96V160c0-52.928 43.072-96 96-96h448c52.928 0 96 43.072 96 96v576c0 52.928-43.072 96-96 96zM224 128c-17.632 0-32 14.368-32 32v576c0 17.664 14.368 32 32 32h448c17.664 0 32-14.336 32-32V160c0-17.632-14.336-32-32-32H224z m576 832H320c-17.664 0-32-14.304-32-32s14.336-32 32-32h480c17.664 0 32-14.336 32-32V256c0-17.664 14.304-32 32-32s32 14.336 32 32v608c0 52.928-43.072 96-96 96zM544 320H288c-17.664 0-32-14.336-32-32s14.336-32 32-32h256c17.696 0 32 14.336 32 32s-14.304 32-32 32z m64 160H288.032c-17.664 0-32-14.336-32-32s14.336-32 32-32H608c17.696 0 32 14.336 32 32s-14.304 32-32 32z m0 160H288c-17.664 0-32-14.304-32-32s14.336-32 32-32h320c17.696 0 32 14.304 32 32s-14.304 32-32 32z" p-id="2386"></path></svg></button></div>';
		linksin.innerHTML += alllink;
	}

	//history.replaceState("","","?id="+id+"&code="+comment)
	changeURLParam("id", id)
	changewidth();


	document.title = things[0] + " - " + tit;
}
function closewin() {
	detail.style.setProperty('left', '100%');
	dheader_sharesvg.style.cssText = "display:nozne;";
	open0 = 0;
	changewidth();

	changeURLParam("id", "")
	document.title = tit;

}
function changewidth() {
	if (open0 == 1) {
		if (window.innerWidth > 630) {

			detail.style.cssText = "display:inline"
			dheader_backsvg.style.cssText = "display:none";
		}

		else {
			detail.style.cssText = "left:0;";
			dheader_backsvg.style.cssText = "display:inline";
		}
		dheader_sharesvg.style.cssText = "display:inline";

	}
	else {
		detail.style.cssText = "left:100%;";
		dheader_sharesvg.style.cssText = "display:none;";
	}
}

function play(url) {


	if (window.location.href.charAt('4') == 's') {

		iosDialog1.style.setProperty('display', 'inline');
		document.getElementById('weui-mask').style.display = "inline";
		turnhttp.href = ("http://anbo.space" + window.location.pathname + window.location.search + "&from=https");
		//alert();
	}
	else {
		cplayer = document.createElement("div");
		document.body.appendChild(cplayer);
		if (Sys.safari) player = "";
		else player = "http://dbt.junbo.wang/player.html?s=";
		cplayer.innerHTML += '<div class="player" id="player' + playernum + '" onmousemove="dragElement(this);"><div class="bar" id="bar' + playernum + '"><svg t="1595741392405"  class="closeplayer" onclick="closeplayer(\'' + playernum + '\');" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2045" width="20" height="20"><path d="M519.02036023 459.47959989L221.8941505 162.35411435a37.07885742 37.07885742 0 1 0-52.45354772 52.40502656l297.12476134 297.15010821L169.44060278 809.05863314a37.07885742 37.07885742 0 1 0 52.42964924 52.42892505l297.15010821-297.12476136 297.15010822 297.12476136a37.07885742 37.07885742 0 1 0 52.42892504-52.40430237l-297.12476135-297.1740067 297.12476135-297.12548553a37.07885742 37.07885742 0 1 0-52.42892504-52.42964924L519.04498291 459.47959989z" fill="#2c2c2c" p-id="2046"></path></svg><svg t="1597646897891" class="closeplayer changesize" onclick="changesize(\'' + playernum + '\');"viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3287" width="20" height="20"><path d="M921.6 0a102.4 102.4 0 0 1 102.4 102.4v819.2a102.4 102.4 0 0 1-102.4 102.4H102.4a102.4 102.4 0 0 1-102.4-102.4V102.4a102.4 102.4 0 0 1 102.4-102.4h819.2z m-51.2 51.2H153.6a102.4 102.4 0 0 0-102.4 102.4v716.8a102.4 102.4 0 0 0 102.4 102.4h716.8a102.4 102.4 0 0 0 102.4-102.4V153.6a102.4 102.4 0 0 0-102.4-102.4zM460.8 460.8a102.4 102.4 0 0 1 102.4 102.4v256a102.4 102.4 0 0 1-102.4 102.4H204.8a102.4 102.4 0 0 1-102.4-102.4v-256a102.4 102.4 0 0 1 102.4-102.4h256z m-51.2 51.2H256a102.4 102.4 0 0 0-102.4 102.4v153.6a102.4 102.4 0 0 0 102.4 102.4h153.6a102.4 102.4 0 0 0 102.4-102.4v-153.6a102.4 102.4 0 0 0-102.4-102.4z" p-id="3288"></path><path d="M665.6 153.6v51.2h168.96l-230.4 234.7008 35.84 35.84L870.4 240.64V409.6h51.2V153.6z" p-id="3289"></path></svg><svg t="1597647036129" class="closeplayer" onclick="openinnew(\'' + playernum + '\');" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4139" width="20" height="20"><path d="M692.610189 1023.597872H159.388812C73.552819 1023.597872 0 949.606369 0 857.11699V320.605476C0 234.330799 73.552819 160.339295 159.388812 160.339295h533.221377c91.941023 0 165.493842 73.991503 165.493842 160.302738v536.474957c0 92.489379-73.552819 166.480883-165.493842 166.480882zM159.388812 234.257684c-42.881439 0-85.799436 43.210453-85.799436 92.562494v536.438399c0 43.173896 36.776409 80.169648 85.799436 80.169648h533.257934c42.917997 0 79.694406-36.995752 79.694406-80.169648V320.642033c0-43.137339-36.776409-86.311235-79.694406-86.311234L159.388812 234.257684z m821.327621 709.207098c-24.493235 0-42.881439-18.534433-42.88144-43.173896V160.339295c0-43.173896-36.776409-86.347792-79.694405-86.347792H122.575845c-24.493235 0-36.776409-12.319732-36.776409-36.995751S98.08261 0 122.575845 0h735.528186C950.045054 0 1023.597872 73.991503 1023.597872 160.339295v739.915034c0 24.67602-18.388205 43.173896-42.917996 43.173896z" p-id="4140"></path></svg><svg t="1597651619837" class="closeplayer" onclick="refreshplayer(\'' + playernum + '\');" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2639" width="20" height="20"><path d="M 888.23 392.083 L 718.385 392.083 c -21.6679 0 -39.1942 -17.5561 -39.1942 -39.1961 c 0 -21.6382 17.5273 -39.1942 39.1942 -39.1942 l 68.1819 0 c -61.5039 -86.9065 -162.641 -143.715 -277.223 -143.715 c -187.607 0 -339.692 152.086 -339.692 339.69 c 0 187.606 152.086 339.691 339.692 339.691 c 187.606 0 339.691 -152.086 339.691 -339.691 c 0 -21.6382 17.5264 -39.1942 39.1933 -39.1942 c 21.64 0 39.1971 17.5561 39.1971 39.1942 c 0 230.899 -187.2 418.082 -418.082 418.082 c -230.885 0 -418.083 -187.182 -418.083 -418.082 c 0 -230.898 187.198 -418.081 418.083 -418.081 c 140.127 0 263.895 69.0866 339.691 174.935 l 0 -70.4143 c 0 -21.64 17.5264 -39.1952 39.1933 -39.1952 c 21.64 0 39.1971 17.5552 39.1971 39.1952 l 0 156.78 C 927.427 374.527 909.868 392.083 888.23 392.083 Z" fill="#333333" p-id="2640"></path></svg>' + dheader_title.innerHTML + '</div><div class="playin" id="playin' + playernum + '"><iframe id="' + playernum + '" width="100%"  height="100%" marginwidth=0 marginheight=0 frameborder="no" border="0" allowfullscreen="true" src="' + player + url + '" ></iframe></div></div>'

		document.getElementById(("player" + playernum)).style.setProperty("display", "inline");
		dragElement(document.getElementById(("player" + playernum)));
		playernum++;
	}
}

function closeplayer(which) {
	player = "player" + which;

	document.getElementById(player).innerHTML = '';
	document.getElementById(player).style.display = none;
	// playin.style.setProperty("display","none");

}
function changesize(which) {
	player = "player" + which;
	playin = "playin" + which;
	alert
	if (document.getElementById(player).style.width == '600px') {
		document.getElementById(player).style.width = '300px';
		document.getElementById(playin).style.width = '300px';
		document.getElementById(playin).style.height = '168px'
	}
	else {
		document.getElementById(player).style.width = '600px';
		document.getElementById(playin).style.width = '600px';
		document.getElementById(playin).style.height = '320px'
	}

	// playin.style.setProperty("display","none");

}
function openinnew(which) {

	window.open(document.getElementById(which).src);

	closeplayer(which);

}
function refreshplayer(which) {

	document.getElementById(which).src = document.getElementById(which).src;

}


function copyLink(content, texts, you) {

	var aux = document.createElement("input");
	aux.setAttribute("value", content);
	document.body.appendChild(aux);
	aux.select();
	document.execCommand("copy");
	document.body.removeChild(aux);
	you = document.getElementById(you);
	toast.style.opacity = "1";
	toast.style.display = "inline";
	toast_text.innerHTML = texts;
	r = you.onclick;
	you.onclick = Function();
	setTimeout(function () {
		toast.style.opacity = "0";
		toast.style.display = "none";
		you.onclick = r;
	}, 2000);



}

function openshare() {

	js_dialog_1.style.bottom = "0";
	document.getElementById("weui-mask").style.display = "inline";

}

function closeshare() {

	js_dialog_1.style.bottom = "-300px";
	document.getElementById("weui-mask").style.display = "none";

}

//Make the DIV element draggagle:


function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + "header")) {
		/* if present, the header is where you move the DIV from:*/
		document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
	} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

function Request(strName) {
	var strHref = location.href;
	var intPos = strHref.indexOf("?");
	var strRight = strHref.substr(intPos + 1);
	var arrTmp = strRight.split("&");
	for (var i = 0; i < arrTmp.length; i++) {
		var arrTemp = arrTmp[i].split("=");
		if (arrTemp[0].toUpperCase() == strName.toUpperCase())
			return arrTemp[1];
	}
	return "";
}

// $(function(){
// 滚动超过一屏幕应该显示，否则消失
// var pagelookheight = document.documentElement.clientHeight;
// var topTimer = null;
// $(function () {
// $(window).scroll(function(){
// if ($(window).scrollTop()>pagelookheight){
// $("#backToTop").fadeIn(500);
// $("#backToTop").style.display = "block";
// }
// else
// {
// $("#backToTop").fadeOut(500);

// }
// });

// });
// });

function openl() {

	type = document.getElementsByClassName("listtype");
	type[0].style.setProperty('display', 'none');
	type[1].style.setProperty('display', 'none');
	preview_types.style.setProperty('white-space', 'normal');
	preview_types.style.setProperty('overflow', 'visible');
	preview_types.style.setProperty('height', 'auto');
	preview_types.style.setProperty('padding-right', '0px;');



}

function getsourcenum(id) {

	details = getdetail(id);
	things = details[1].split(",");

	for (i = 0, co = 0; ; i++) {
		linkurl = things[2 * i + 11];
		if (linkurl == "") continue;
		else if (linkurl == undefined) return co;
		else co++;
	}

}
function loadcom(plid, pls) {
	/*gitalk = new Gitalk({
		clientID: '89cf078cdb5b042dcff3',
		clientSecret: 'dedfa35991c966629a7acfde537b5ef74312d122',
		repo: '229pl',
		owner: 'agoudbg',
		admin: ['agoudbg'],
		id: location.pathname,//getUrlArgStr(),      // Ensure uniqueness and length less than 50
		distractionFreeMode: true  // Facebook-like distraction free mode
	})

	gitalk.render('gitalk-container')*/
}

//loadcom();
function getUrlArgStr() {
	var q = location.search.substr(1);
	var qs = q.split('&');
	var argStr = '';
	if (qs) {
		for (var i = 0; i < qs.length; i++) {
			argStr += qs[i].substring(0, qs[i].indexOf('=')) + '=' + qs[i].substring(qs[i].indexOf('=') + 1) + '&';
		}
	}
	return argStr;
}
function changeURLParam(name, value) {
	var url = document.URL, resultUrl = ''
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
	var r = window.location.search.substr(1).match(reg);
	var replaceText = name + '=' + value;
	if (r != null) {
		var tmp = url.replace(unescape(name + '=' + r[2]), replaceText);
		resultUrl = (tmp);
	} else {
		if (url.match('[\?]')) {
			resultUrl = url + '&' + replaceText;
		}
		else {
			resultUrl = url + '?' + replaceText;
		}
	}
	history.replaceState(null, null, resultUrl)
}


function enterHandler() {
	var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if (keyCode == 13) {
		changetab('alltype');
		searched = 0;
		search(searchbox.value);

	}
}

function m3u8playable() {

	if (/* (device()==0)|| */(device() == 1) || (Sys.safari)) {

		return 1;

	}


}

function device() {
	var u = navigator.userAgent;
	if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
		return 0;
	} else if (u.indexOf('iPhone') > -1) {
		return 1;//苹果手机
	} else if (u.indexOf('Windows Phone') > -1) {
		return 2;//winphone手机
	}
}


document.getElementById("detail").onscroll = function () {

	detx = detail.scrollTop;
	if (things[2] != "" && detx < 260) {

		dheader_main.className = "height showimgbg";
		dheader_title.className = "showimgp";


	}
	else {

		dheader_main.className = "height";
		dheader_title.className = "";


	}


};