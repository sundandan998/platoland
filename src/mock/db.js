var Mock = require('mockjs')
module.exports = function () {
  return {
    user: Mock.mock({
      'name': '@cname',
      'email': '@email',
      'age|18-25': 22,
      'sex': 'girl'
    }),
    formData: Mock.mock({
    	'data|3':[{
    		  'name': '@cname',
		      'hold':'@float(60, 100, 3, 5)',
		      'issue':'@integer(60, 100)',
		      'remarks':'@date(2019-4-dd)'
    	}]
    }),
    historyData:Mock.mock({
    	'data|5':[{
    		'date': '@datetime("MM-dd HH:mm:ss")',
    		'email':'@email',
    		'num':'@increment'
    	}]
    }),
    query:([
    	{
    		  'name': '流通中',
		      'hold':'10',
		      'issue':'152',
		      'date':'2019-4-15'
    },
   	{
    		  'name': '待发行',
		      'hold':'10',
		      'issue':'152',
		      'date':'2019-4-15'
    },
     	{
    		  'name': '发行中',
		      'hold':'10',
		      'issue':'152',
		      'date':'2019-4-15'
    }
    	])
  }
}
