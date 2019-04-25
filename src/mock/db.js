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
//  首页 --待发行 发行中--流通中数据接口
    formData: Mock.mock({
    	'data|3':[{
    		  'name': '@cname',
		      'hold':'@float(60, 100, 3, 5)',
		      'issue':'@integer(60, 100)',
		      'remarks':'@date(2019-4-dd)'
    	}]
    }),
//  通证详情接口
    detailsData:Mock.mock({
    		'name': '@cname',
    		'nickname':'@cword',
    		'address':'@ip',
    		'subject':'@county()',
    		'Issuer': 'platoland集团',
    		'num':'@increment',
    		'state':'待发行',
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
    query:(
    	[
    	{
				'id':'0',
		  	'name': '待发行',
	      'hold':'10',
	      'issue':'152',
	      'date':'2019-4-15'
    	},
			{			
				'id':'1',
			  'name': '发行中',
	      'hold':'10',
	      'issue':'152',
	      'date':'2019-4-15'
	    },
		 	{
	 			'id':'2',
			  'name': '流通中',
	      'hold':'10',
	      'issue':'152',
	      'date':'2019-4-15'
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
			version:Mock.mock({
  			"version|123.1-10": 1
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
