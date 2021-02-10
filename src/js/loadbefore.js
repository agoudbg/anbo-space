// 判断debug
DEBUG_URLS = ["localhost", "t.anbo.space", "sakura"];
debug = false;
for (i = 0; i < DEBUG_URLS.length; i++) {
    if (window.location.host.match(DEBUG_URLS[i]) != null)
        debug = true;
}

HTTP_PAGE = ["live", "tv-desk", "chunwanlive"];
// 跳转https
if (debug == false) {
    for (i = 0; i < HTTP_PAGE.length; i++) {
        if ((window.location.pathname.match(HTTP_PAGE[i]) != null) & (window.location.protocol == "https:"))
            window.location.href = "http://" + window.location.host + window.location.pathname + window.location.search;
        else if (window.location.protocol == "http:")
            window.location.href = "https://" + window.location.host + window.location.pathname + window.location.search;

    }

}