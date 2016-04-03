
var aqiData = {};
var citytip = document.createElement('span');
var qualitytip = document.createElement('span');
var city = document.getElementById("aqi-city-input");
var quality = document.getElementById('aqi-value-input');
city.placeholder = "输入中英文城市";
quality.placeholder = "输入空气质量整数";
city.parentNode.appendChild(citytip);
quality.parentNode.appendChild(qualitytip);
function addAqiData() {
    var city = document.getElementById("aqi-city-input");
    var quality = document.getElementById('aqi-value-input');
    var cityname = city.value.trim();
    var qualityvalue = quality.value.trim();
    if(!(cityname)){
        citytip.innerText = "城市不能为空";
        return ;
    }else if(!(/^[a-zA-z\u4E00-\u9FA5]+$/).test(cityname)){
        citytip.innerText = "城市名只可以是中英文字母";
    }
    if(!(qualityvalue)){
        qualitytip.innerText = "天气质量不能为空";
        return ;
    }else if(!(/^\d{0,3}$/).test(qualityvalue)){
        qualitytip.innerText = "天气质量为0-999";
        return ;
    }
   aqiData[cityname] = qualityvalue;
    city.value = "";
    quality.value = "";
}
function renderAqiList() {
    var table = document.getElementById('aqi-table');
    table.innerHTML = "";
    if(Object.keys(aqiData).length){
    var thead = document.createElement('tr');
    thead.innerHTML = "<th>" + "城市" +"</th><th>" +"天气质量" + "</th><th>" + "操作" +"</th>";
    var fragment =document.createDocumentFragment();
    for(var prop in aqiData){
        if(aqiData.hasOwnProperty(prop)){
            var row = document.createElement('tr');
            row.innerHTML =  "<td>" + prop + "</td><td>" + aqiData[prop]+ "</td><td><button>删除</button></td>";
            fragment.appendChild(row);
        }

    }
    table.appendChild(thead);
    table.appendChild(fragment);
    }
}


function addBtnHandle() {
    addAqiData();
    renderAqiList();
}
function delBtnHandle() {
    // do sth.
    var table = document.getElementById('aqi-table');
    var prop = this.parentNode.previousSibling.previousSibling;
    var propvalue = prop.innerText;
    delete aqiData[propvalue];
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
    //renderAqiList();
}

function init() {
    var add = document.querySelector("#add-btn");
    var table = document.getElementById('aqi-table');
    var delHandle = function(e){return delBtnHandle.bind(e.target)();};
    if(document.addEventListener){
    table.addEventListener('click',delHandle,false);
    }
   else if(document.attachEvent){
    table.attachEvent('onclick',delHandle);
   }else{
       table.onclick = delHandle;
   }
    if(document.addEventListener){
        add.addEventListener('click',addBtnHandle,false);
    }
    else if(document.attachEvent){

        add.attachEvent('onclick',addBtnHandle);
    }else{
        add.onclick = addBtnHandle;
    }

}
window.onload = init;
