kf['host'] = '';
kf.use('list1.0', function(){
	var sList = new kf.list('kj-list', {
		action: 'json/photo_{$page}.txt'
	});
});


// ���������õ�appKey��appSecret
var appkey = "968612903";
var secret = "e7208543c4fc40acb1f93efca54c18b0";

// ����������
var param = {};
param["business_id"]="2692024";

// �Բ����������ֵ�����
var array = new Array();
for(var key in param){
	array.push(key);
}
array.sort();

// ƴ������Ĳ�����-ֵ��
var paramArray = new Array();
paramArray.push(appkey);
for(var index in array) {
	var key = array[index];
	paramArray.push(key + param[key]);
}
paramArray.push(secret);

// SHA-1���룬��ת���ɴ�д�����ɻ��ǩ��
var shaSource = paramArray.join("");
var sign = new String(CryptoJS.SHA1(shaSource)).toUpperCase();

//ǩ��ʾ�� 
//7D78381BC58E1DB1DBA4BD965916FE6B4D5DC892

//ע��ʹ��encodeURI��URL����UTF-8����
var url = encodeURI('http://api.dianping.com/v1/business/get_single_business?appkey=' + appkey +'&sign=' + sign + '&business_id=2692024')

$.getJSON(url, function(response){
	console.log(response);
});
