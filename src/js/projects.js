PROJECTSJSON = loadc("/src/template/products.json");

PROJECTS = JSON.parse(PROJECTSJSON);

did = 0;

search("all", "", "main_result_div");

function search(type, keywords, backdiv) {
    document.getElementById(backdiv).innerHTML = '';
    for (searchedtypes = 0, hasfoundinthistype = 0; searchedtypes < PROJECTS.type.length; searchedtypes++, hasfoundinthistype = 0) {
        typename = PROJECTS.type[[searchedtypes]].name;
        typediscribe = PROJECTS.type[[searchedtypes]].describe;
        for (searchedproducts = 0; searchedproducts < PROJECTS.type[[searchedtypes]].innerproducts.length; searchedproducts++) {
            if (type == "all")
                type = ["name", "describe", "slug", "page_url"];
            for (searchedprojecttypes = 0; searchedprojecttypes < type.length; searchedprojecttypes++) {
                searchingtype = type[searchedprojecttypes];
                if (getdoc(searchedtypes, searchedproducts, searchingtype).match(keywords) != null) {
                    if (hasfoundinthistype == 0) {
                        document.getElementById(backdiv).innerHTML += "<h2>" + typename + "</h2><h3>" + typediscribe + "</h3>";
                        hasfoundinthistype = 1;
                    }
                    putpreview(searchedtypes, searchedproducts, backdiv);
                    break;
                }
            }
        }
    }
    if (document.getElementById(backdiv).innerHTML == '')
        document.getElementById(backdiv).innerHTML = '<p style="text-align:center;display:block;width:100%"><img src="https://junbo.wang/src/img/not-found-small.png" style="width:35%;max-width:140px;background:url()!important;"></p><p style="text-align:center;display:block;width:100%">好像没有你想要的结果<br></p>';
}

function opend(tid, pid) {
    developerid = getdoc(tid, pid, "developer")
    newd = document.createElement("div");
    document.body.appendChild(newd);
    newd.innerHTML += `
    <div class="detail-cover" id="d`+ did + `cover" onClick="closed(` + did + `)"></div> 
    <div class="detail" id="d`+ did + `">
        <div class="detail-header" id="d`+ did + `detail-header">		
            <p class="detail-header-back" id="d`+ did + `back" onClick="closedev(` + tid + `,` + pid + `,` + did + `)"><svg t="1595519506428" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2349" width="18" height="18" style="display: inline;"><path d="M314.011 489.179c-12.496 12.496-12.497 32.758-0.001 45.256 12.496 12.496 32.759 12.497 45.254 0.001L709.989 183.71c12.498-12.498 12.497-32.76-0.001-45.257-12.496-12.495-32.757-12.495-45.253 0.001L314.011 489.179z" p-id="2350" fill="#3776F4"></path><path d="M664.734 885.546c12.496 12.496 32.759 12.497 45.254 0.002 12.498-12.497 12.498-32.759 0-45.257L359.266 489.569c-12.497-12.498-32.76-12.498-45.256 0-12.496 12.496-12.496 32.758 0.001 45.254l350.723 350.723z" p-id="2351" fill="#3776F4"></path></svg>返回</p>
            <p class="detail-header-title" id="d`+ did + `title">` + getdoc(tid, pid, "name") + `</p>
            <p class="detail-header-finish" onClick="closed(`+ did + `)">完成</p>
        </div>
        <div class="detail-main" >
            <div class="products" id="d`+ did + `products"></div>
            <h3>简介</h3>
            <div class="detail-img" id="d`+ did + `detail-img"></div>
            <div class="detail-intro">`+ getdoc(tid, pid, "describe") + `</div>
            <div class="detail-developer" onClick="opendev(`+ tid + `,` + pid + `,` + did + `)">
                <img src="`+ PROJECTS.developer[developerid].icon + `"/>
                <p>`+ PROJECTS.developer[developerid].name + `</p>
                <p class="detail-developer-go"><svg t="1595514904008" class="preview_go" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2122" width="14" height="14"><path d="M730.802325 593.75489 804.269733 525.91913 273.742891 0.511968 219.730267 54.012624 694.580589 524.191238 220.562215 969.987376 274.382851 1023.36004 730.994313 593.946878Z" p-id="2123" fill="#bfbfbf"></path></svg></p>
            </div>
            <h3>详细信息</h3>
            <table class="detail-detail">
                <tr>
                     <td class="left">开发者</td>
                      <td id="t_developer" class="detail-detail-num">`+ PROJECTS.developer[developerid].name + `</td>
                </tr>

                <tr>
                    <td class="left">应用类型</td>
                    <td id="t_type" class="detail-detail-num">`+ getdoc(tid, pid, "dtype") + `</td>
                </tr>
                <tr>
                  <td class="left">兼容性</td>
                  <td id="t_workable" class="detail-detail-num">`+ getdoc(tid, pid, "djrx") + `</td>
                </tr>
            </table>
        </div>	
        <div class="detail-developer-related"  id="d`+ did + `dev" >
            <div class="detail-main related-detail">
                <h1>`+ PROJECTS.developer[developerid].name + `</h1>
                <div class="products-container" id="d`+ did + `devc" ></div></div>												
            </div>	
        </div>
    </div>`;
    putpreview(tid, pid, "d" + did + "products", true);
    for (t = 0; t < getdoc(tid, pid, "img").length; t++) {
        if (getdoc(tid, pid, "img")[t].match("type=video") != null)
            document.getElementById(`d` + did + `detail-img`).innerHTML += "<video src='" + getdoc(tid, pid, "img")[t] + "' autoplay='true'</video>"
        else
            document.getElementById(`d` + did + `detail-img`).innerHTML += "<img src='" + getdoc(tid, pid, "img")[t] + "'/>"
    }

    did++;
}

function opendev(tid, pid, did) {
    document.getElementById("d" + did + "dev").className += " detail-developer-related-opened";
    document.getElementById("d" + did + "back").className += " detail-header-back-opened";
    document.getElementById("d" + did + "title").className += " detail-header-title-opened";
    search(["developer"], getdoc(tid, pid, "developer"), "d" + did + "devc");

}
1
function closedev(tid, pid, did) {
    document.getElementById("d" + did + "dev").className = " detail-developer-related";
    document.getElementById("d" + did + "back").className = " detail-header-back";
    document.getElementById("d" + did + "title").className = " detail-header-title";

}
function closed(did) {
    document.getElementById("d" + did + "cover").className += " cover-closed";
    document.getElementById("d" + did + "").className += " detail-closed";
    setTimeout(function () {
        document.getElementById("d" + did).innerHTML = "";
    }, 2000);


}

function getdoc(tid, pid, fid) {
    return PROJECTS.type[[tid]].innerproducts[pid][fid];
}

function putpreview(tid, pid, div, disableclick) {
    if (getdoc(tid, pid, "third_party") == true)
        thirdparty = '<img class="products-3" src="/src/img/3rd-party.png"/>';
    else thirdparty = "";
    if (disableclick == true)
        onclickw = "";
    else onclickw = `onClick="opend('` + tid + `','` + pid + `')"`;
    document.getElementById(div).innerHTML += `<div class="products"` + onclickw + `>
    <img class="products-img" src="`+ getdoc(tid, pid, "icon") + `"/>
    <p class="products-title">` + getdoc(tid, pid, "name") + `</p>` + thirdparty + `
    <p class="products-little">` + getdoc(tid, pid, "slug") + `</p>
    <button class="products-button" onClick="window.open('`+ getdoc(tid, pid, "page_url") + `')">` + getdoc(tid, pid, "operation") + `</button></div>`;
}


function enterHandler() {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
        search("all", searchbox.value, "main_result_div");
    }
}