import { getCookie, setCookie } from "./cookie"
import jwtDecode from 'jwt-decode';

function getAccount() {
    var accountInfo = getCookie("token");
    //console.log(seller_nick)
    if (accountInfo) accountInfo = decodeURIComponent(accountInfo);
    try {
        accountInfo = jwtDecode(accountInfo);
    }
    catch (e) {
        accountInfo = null;
    }
    if (accountInfo) {
        if (!accountInfo.exp) {
            accountInfo = null;
        }
        else if (accountInfo.exp * 1000 < Date.now()) {
            accountInfo = null;
        }
    }
    else {
        accountInfo = null;
    }
    return accountInfo;
}
function saveToken(token) {
    setCookie("token", encodeURIComponent(token), 365);
}
export default {
    getAccount,
    saveToken
}