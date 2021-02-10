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