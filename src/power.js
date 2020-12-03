
async function IsNeedAuthorization(id) {
    if (id === "submenu-2") return true;
    return false;
}
async function Authorization(id) {
    return await new Promise((resolve)=>{
        setTimeout(()=>resolve(false),5000);
    })
}
export { IsNeedAuthorization, Authorization }