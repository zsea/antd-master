function getCookie(name) {
    //获取name在Cookie中起止位置
    var cookies = document.cookie;
    //console.log(cookies);
    var re = /\s*?(.+?)=(.*?)($|;)/g;
    var cookiesDict={};
    for(let result= re.exec(cookies);result; result = re.exec(cookies) ){
        cookiesDict[result[1].trim()]=result[2];
    }
    //console.log(cookiesDict);
    return cookiesDict[name];
}
function setCookie(c_name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";path=/;expires=" + exdate.toGMTString());
}
export {
    getCookie,setCookie
}