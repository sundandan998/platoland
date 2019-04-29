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
    		'name': 'PLD',
    		'nickname':'@cword',
    		'address':'@ip',
    		'subject':'@county()',
    		'Issuer': 'platoland集团',
    		'num':'@increment',
    		'state':'发行中',
    		'Proportion':'@float(60, 100, 3, 5)',
    		'assets':'USDT',
    		'mode':'首次发行',
    		'issuedate':'@datetime',
    		'closingdata':'@datetime',
    		'smallnum':'@increment(100)',
    		'issuemum':'@increment',
    		'purnum':'@increment(100)',
    		'initialprice':'@increment()',
    		'issueprice':'@increment'
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
	      'issueprice':'0.1  USDT'
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
	      'issueprice':'0.02  USDT'
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
	      'issueprice':'0.5  USDT'
    	},
    	{
				'id':'PLD',
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
	      'issueprice':'0.1  USDT'
    	},
    	]),
    	asset:Mock.mock(
    	[
    	{
				'id':'USDT',
				'name': '网红钻',
				'body':'丽人美妆工作室',
				'issuer':'丽人美妆工作室',
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
				'name': '租车卡',
				'address':'23Sn....ix7c',
				'body':'上海丰达汽车租赁有限公司',
				'issuer':'上海丰达汽车租赁有限公司',
				'amount':'1500',
				'explain':'权益说明',
				'state':'发行中',
				'proportion':'1%',
				'assets':'GUSD',
				'mode':'增资发行',
				'issuetime':'2018/1/1',	 				 		 			
	      'endtime':'2019/7/28',
	      'minnum':'5,000,000',
	      'soldnum':'9,000,000',
	      'purchasenum':'50,000',
	      'initialprice':'0.01  GUSD',
	      'issueprice':'0.02  USDT'
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
