
async function get(url){
    let response= await fetch(url);
    response= await response.json();
    return response;
}
async function post(url,body){
    let response= await fetch(url,{method:"POST",headers:{
        "Content-Type":"application/json;charset=utf8"
    },body:JSON.stringify(body)});
    response= await response.json();
    return response;
}
async function put(url,body){
    let response= await fetch(url,{method:"PUT",headers:{
        "Content-Type":"application/json;charset=utf8"
    },body:JSON.stringify(body)});
    response= await response.json();
    return response;
}
async function Delete(url,body){
    let response= await fetch(url,{method:"DELETE",headers:{
        "Content-Type":"application/json;charset=utf8"
    },body:JSON.stringify(body)});
    response= await response.json();
    return response;
}
export default {
    get,post,delete:Delete,put
}