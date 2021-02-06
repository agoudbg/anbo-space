function loadc(name) {
	let xhr = new XMLHttpRequest(),
		okStatus = document.location.protocol === "file:" ? 0 : 200;
	xhr.open('GET', name, false);
	xhr.overrideMimeType("text/html;charset=utf-8");//默认为utf-8
	xhr.send(null);
	return xhr.status === okStatus ? xhr.responseText : null;
}
c = loadc("/src/template/header.html");
hcont.innerHTML = c;
c = loadc("/src/template/footer.html");
fcont.innerHTML = c;
c = loadc("/src/template/sidebar.html");
scont.innerHTML = c;
var sit = 0;
function go() {
	if (sit == 0) {
		document.getElementById("map-box-main").className = "map-box-opened";
		document.getElementById("header-main").className = "header-main-opened";
		// document.getElementById("header-box").className = "map-box-opened";
		cover.className = "cover-opened";
		sit = 1;
	}
	else {
		document.getElementById("map-box-main").className = "";
		document.getElementById("header-main").className = "";
		// document.getElementById("header-box").className = "";
		cover.className = "";
		sit = 0;
	}
}
function stop() {
	document.getElementById("map-box-main").className = "";
	document.getElementById("header-main").className = "";
	// document.getElementById("header-box").className = "";
	cover.className = "";
	sit = 0;
}
// window.onresize=function() {
// if (document.body.clientWidth > 700)
// document.getElementById("map-box-main").style.visibility = "visible";
// else {
// document.getElementById("map-box-main").style.visibility = "hidden";
// document.getElementById("cover").style.visibility = "hidden";

// }

// }


// 读取a标签列表
ATAGS = document.getElementsByTagName("a");

// 将出站链接重定向(待做)
OURSITEURL=["junbo.wang",]

// PWA-BETA
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('/sw.js', { scope: '/' }).then(function (registration) {
			// 注册成功 
			console.log('ServiceWorker registration successful with scope: ', registration.scope)
			// PWA 下，页面a标签在当前窗口打开
			if (isPwa() == true) {
				for (n = 0; n <= ATAGS.length; n++) {
					ATAGS[n].target = "_self";
				}
			}
		}).catch(function (err) {
			// 注册失败
			(console.log('ServiceWorker registration failed: ', err))
		})
	})
}

function isPwa() {
	
	if(window.matchMedia('(display-mode: standalone)').matches)
	return true;
	else return false;
	
}