var Mock = require('mockjs')
module.exports = function () {
  return {
//	登录注册接口
    user: Mock.mock({
      'name': '@cname',
      'email': '@email',
      'age|18-25': 22,
      'sex': 'girl'
    }),
    //  pld通证详情接口
    pldDetailsData:Mock.mock({
    		'id':'PLD',
        'name': 'PLATOLAND集团',
        'body':'PLATOLAND',
        'issuer':'PLATOLAND',
        'state':'发行中',
        'address':'13Sn....ix7c',
        'explain':'权益说明',
        'proportion':'1%',
        'assets':'USDT',
        'mode':'首次发行',
        'issuetime':'2019/12/12',
        'endtime':'2021/12/11',
        'minnum':'2,500,000',
        'amountnum':'500,000,000',
        'soldnum':'0',
        'purchasenum':'20,000',
        'initialprice':'0.1  USDT',
        'issueprice':'0.1  USDT',
        'residence':'北京市石景山区畅园2号222',
        'businessaddress':'北京昌平区回龙观102号',
        'person':'贾八',
        'capital':'100万',
        'establishdate':'2012/12/12',
        'term':'2012-12-12-2032-12-11',
        'range':'经营范围'
    }),
//  首页流通中/待发行/发行中接口
    query:Mock.mock(
    	[
    	{
				'id':'WHZ',
				'name': '网红钻',
				'body':'丽人美妆工作室',
				'issuer':'丽人美妆工作室',
				'state':'待发行',
				'address':'13Sn....ix7c',
	      'explain':'权益说明',
	 			'proportion':'1%',
	 			'assets':'USDT',
	 			'mode':'首次发行',
	 			'issuetime':'2019/12/12',
	      'endtime':'2021/12/11',
	      'minnum':'2,500,000',
	      'amountnum':'500,000,000',
	      'soldnum':'0',
	      'purchasenum':'20,000',
	      'initialprice':'0.1  USDT',
	      'issueprice':'0.1  USDT',
	      'residence':'北京市朝阳区望京1号111',
	      'businessaddress':'北京昌平区天长街101号',
	      'person':'李四',
	      'capital':'100万',
	      'establishdate':'2012/12/12',
	      'term':'2012-12-12-2032-12-11',
	      'range':'技术推广服务；主体管理咨询；不得从事本市产业政策禁止和限制类项目的经营活动'
    	},
    	{
				'id':'ZCK(ZuCheKa)',
				'name': '租车卡',
				'address':'23Sn....ix7c',
				'body':'上海丰达汽车租赁有限公司',
				'issuer':'上海丰达汽车租赁有限公司',
				'explain':'权益说明',
				'state':'发行中',
				'proportion':'1%',
				'assets':'GUSD',
				'mode':'增资发行',
				'issuetime':'2018/1/1',
	      'endtime':'2019/7/28',
	      'minnum':'5,000,000',
	      'amountnum':'900,000,000',
	      'soldnum':'9,000,000',
	      'purchasenum':'50,000',
	      'initialprice':'0.01  GUSD',
	      'issueprice':'0.02  USDT',
	      'residence':'河北省石家庄市宇彤大街12号',
	      'businessaddress':'北京昌平区天长街101号',
	      'person':'王五',
	      'capital':'100万',
	       'establishdate':'2011/11/11',
	      'term':'2031-11-11  -  2032-11-10',
	      'range':'技术推广服务；主体管理咨询'
    	},
    	{
				'id':'LD(LaoDou)',
				'name': '捞豆',
				'address':'33Sn....ix7c',
				'body':'北京河底捞餐饮有限公司',
				'issuer':'北京河底捞餐饮有限公司',
				'explain':'权益说明',
				'state':'流通中',
				'proportion':'10%',
				'assets':'流通中',
				'mode':'首次发行',
				'issuetime':'2018/4/1',
	      'endtime':'2019/4/1',
	      'minnum':'500,000',
	      'amountnum':'5,000,000',
	      'soldnum':'5,000,000',
	      'purchasenum':'5,000',
	      'initialprice':'0.5  USDT',
	      'issueprice':'0.5  USDT',
	      'residence':'北京市石景山区畅园2号222',
	      'businessaddress':'河北省石家庄市宇彤大街12号',
	      'person':'贾八',
	      'capital':'100万',
	       'establishdate':'2012/12/12',
	      'term':'2012-12-12-2032-12-11',
	      'range':'餐饮管理，经营投资；不得从事本市产业政策禁止和限制类项目的经营活动'
    	},
    	{
				'id':'PLD',
				'name': 'PLATOLAND集团',
				'body':'PLATOLAND',
				'issuer':'PLATOLAND',
				'state':'发行中',
				'address':'13Sn....ix7c',
	      'explain':'权益说明',
	 			'proportion':'1%',
	 			'assets':'USDT',
	 			'mode':'首次发行',
	 			'issuetime':'2019/12/12',
	      'endtime':'2021/12/11',
	      'minnum':'2,500,000',
	      'amountnum':'500,000,000',
	      'soldnum':'0',
	      'purchasenum':'20,000',
	      'initialprice':'0.1  USDT',
	      'issueprice':'0.1  USDT',
	      'residence':'北京市石景山区畅园2号222',
	      'businessaddress':'北京昌平区回龙观102号',
	      'person':'贾八',
	      'capital':'100万',
	      'establishdate':'2012/12/12',
	      'term':'2012-12-12-2032-12-11',
	      'range':'经营范围'

    	},
    	]),
    	asset:Mock.mock(
    	[
    	{
				'id':'USDT',
				'name': 'USDT',
				'body':'USDT',
				'issuer':'USDT',
				'state':'待发行',
				'address':'13Sn....ix7c',
				'amount':'500',
	      'explain':'权益说明',
	 			'proportion':'1%',
	 			'assets':'USDT',
	 			'mode':'首次发行',
	 			'issuetime':'2019/12/12',
	      'endtime':'2021/12/11',
	      'minnum':'2,500,000',
	      'amountnum':'500,000,000',
	      'soldnum':'0',
	      'purchasenum':'20,000',
	      'initialprice':'0.1  USDT',
	      'issueprice':'0.1  USDT'
    	},
    	{
				'id':'PLD',
				'name': 'PLATOLAND集团',
				'address':'43Sn....ix7c',
				'body':'PLATOLAND集团',
				'issuer':'PLATOLAND集团',
				'amount':'1500',
				'explain':'权益说明',
				'state':'发行中',
				'proportion':'2%',
				'assets':'GUSD',
				'mode':'增资发行',
				'issuetime':'2019/1/1',
	      'endtime':'2020/12/28',
	      'minnum':'5,000,000',
	      'soldnum':'9,000,000',
	      'purchasenum':'50,000',
	      'initialprice':'0.01  GUSD',
	      'issueprice':'0.02  USDT',

    	}
    	]),
//  	地址簿接口
    address:Mock.mock({
    	'data|4':[{
    			'name': '@cname',
    			'address':'@guid'
    	}]
    }),
		//  版本号接口
			versionnum:Mock.mock({
  			"version":'3.0',
  			"force|1-0": 1,
  			"describe":'升级描述'
		}),
//		资产列表接口
  list:Mock.mock({
    	'data|4':[{
    			'name': '@cname',
    			'company':'@guid'
    	}]
    })
  }
}
