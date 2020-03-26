export const setToken =(token) =>{
    const storage = getTokenLocation()
    return storage.setItem('token',token)
}

export const getToken =() =>{
    const storage = getTokenLocation()
    return storage.getItem('token')
}

export const clearToken =() =>{
    const storage = getTokenLocation()
    return storage.removeItem('token')
}

const getTokenLocation =() =>{
    const _s = window.localStorage.getItem('switch')
    if(_s == 'false' || _s == null){
        return window.sessionStorage
    }else{
        return window.localStorage
    }
}

//将日期转化字符串(yyyy-MM-dd)
export const dateToStr =(date) =>{
    let year = date.getFullYear();
    let month =(date.getMonth() + 1).toString();
    let day = (date.getDate()).toString();
    if (month.length == 1) {
        month = "0" + month;
    }
    if (day.length == 1) {
        day = "0" + day;
    }
    let dateTime = year +"-"+ month +"-"+  day;
    return dateTime
}