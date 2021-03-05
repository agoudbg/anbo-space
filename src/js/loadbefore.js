// 判断debug
DEBUG_URLS = ["localhost", "t.anbo.space", "sakura"];
debug = false;
for (i = 0; i < DEBUG_URLS.length; i++) {
    if (window.location.host.match(DEBUG_URLS[i]) != null)
        debug = true;
}

// 跳转https
HTTP_PAGE = ["live", "tv-desk", "chunwanlive"];
if (debug == false) {
    FORCEHTTP = false;
    for (i = 0; i < HTTP_PAGE.length; i++) {
        if (window.location.pathname.match(HTTP_PAGE[i]) != null) {
            FORCEHTTP = true;
            break;
        }
    }
    if (window.location.protocol == "http:" & FORCEHTTP == false)
        window.location.href = "https://" + window.location.host + window.location.pathname + window.location.search;
    if (window.location.protocol == "https:" & FORCEHTTP == true)
        window.location.href = "http://" + window.location.host + window.location.pathname + window.location.search;

}
// 判断不需要顶栏和底栏的页面
NOHEADER_PAGE = ["noheader=true", "pwa-start"];
noheader = false;
for (i = 0; i < NOHEADER_PAGE.length; i++) {
    if ((window.location.pathname + window.location.search).match(NOHEADER_PAGE[i]) != null) {
        noheader = true;
        break;
    }
}

// 广告代码
document.write(`<script data-ad-client="ca-pub-5639925822995109" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script><script  src="https://cdn.junbo.wang/ads.js"></script>`);