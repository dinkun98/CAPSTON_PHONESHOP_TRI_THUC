function kiemTraRong(value, idErr, message) {
    // trim: xóa space ở đầu và cuối chuỗi, chỉ áp dụng với chuỗi(string)
    if (value.trim() === "") {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    } else {
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
}

function kiemTraDoDai(value, min, max, idErr, message) {
    var length = value.length;
    if (length >= min && length <= max) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }
}

function kiemTraChuVaSo(value, idErr, message) {
    const re = /[^a-zA-Z0-9 ]/;

    var isString = re.test(value);
    if (isString) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }
}

function kiemTraSo(value, idErr, message) {
    const re = /^[0-9]+$/;

    var isString = re.test(value);
    console.log("isString: ", isString);
    if (isString) {
        document.querySelector(idErr).innerHTML = "";
        return true;
    } else {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }
}

function kiemTraUrl(value, idErr, message) {
    var res = value.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if (res == null) {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }

    else {
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
    ;
}

function kiemTraSelectedBrand(value, idErr, message){
    if(value=="Select brand"){
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }else{
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
}

function kiemTraTen(value, idErr, message){
    var res = value.match(/^[A-Za-z\s]+$/);
    if (res == null) {
        document.querySelector(idErr).innerHTML = message;
        document.querySelector(idErr).style.display = "block";
        return false;
    }

    else {
        document.querySelector(idErr).innerHTML = "";
        return true;
    }
    ;
}