kf['host'] = '';
kf.use('list1.0', function(){
	var sList = new kf.list('kj-list', {
		action: 'json/photo_{$page}.txt'
	});
});


// 定义申请获得的appKey和appSecret
var appkey = "968612903";
var secret = "e7208543c4fc40acb1f93efca54c18b0";

// 创建参数表
var param = {};
param["business_id"]="2692024";

// 对参数名进行字典排序
var array = new Array();
for(var key in param){
	array.push(key);
}
array.sort();

// 拼接有序的参数名-值串
var paramArray = new Array();
paramArray.push(appkey);
for(var index in array) {
	var key = array[index];
	paramArray.push(key + param[key]);
}
paramArray.push(secret);

// SHA-1编码，并转换成大写，即可获得签名
var shaSource = paramArray.join("");
var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();

//签名示例 
//7D78381BC58E1DB1DBA4BD965916FE6B4D5DC892

//注意使用encodeURI对URL进行UTF-8编码
var url = encodeURI('http://api.dianping.com/v1/business/get_single_business?appkey=' + appkey +'&sign=' + sign + '&business_id=2692024')

$.getJSON(url, function(response){
	console.log(response);
});
