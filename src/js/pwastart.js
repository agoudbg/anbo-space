SINGLE = false;
IMGSRCS = ["https://ae03.alicdn.com/kf/U7781afed96214b68b4f7ca9671b7afc6x.jpg", "https://ae04.alicdn.com/kf/U01093487b5814070a8a5855d9b2c43aej.jpg", "https://sc04.alicdn.com/kf/Uadc741f340634adc91674007cc4beae3O.jpg"];
if (SINGLE == false) {
    document.getElementById("bodybg").style.backgroundImage = "url(" + IMGSRCS[randomNum(0, IMGSRCS.length - 1)] + ")";
}
else
    document.getElementById("bodybg").style.backgroundImage = "url(" + SINGLE + ")";

//生成从minNum到maxNum的随机数
function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
} 