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

//  首页流通中/待发行/发行中接口
    query:Mock.mock(
      [
        {
          'id':'WHZ',
          'name': 'WHZ',
          'icon':'u383',
          'nickname': 'Celebrity Diamond',
          'body':'Beauty Makeup Office',
          'issuer':'Beauty Makeup Office',
          'state':'Pending',
          'address':'13Sn....igg9',
          'explain':'Equity Intro',
          'proportion':'1%',
          'assets':'USDT',
          'mode':'Initial Offering',
          'issuetime':'2019/12/12',
          'endtime':'2021/12/11',
          'minnum':'2,500,000',
          'amountnum':'500,000,000',
          'soldnum':'0',
          'purchasenum':'20,000',
          'initialprice':'0.1',
          'issueprice':'0.1',
          'bodytype':'Company',
          'residence':'Beijing Chaoyang District Wangjing SOHO',
          'businessaddress':'Beijing Changping District',
          'person':'Mr. Li',
          'capital':'100万',
          'establishdate':'2012/12/12',
          'term':'2012-12-12-2032-12-11',
          // 'range':'技术推广服务；主体管理咨询；不得从事本市产业政策禁止和限制类项目的经营活动'
          'range':'Technical service, business consulting'
        },
        {
          'id':'ZCK',
          'icon':'u365',
          'name': 'ZuCheKa',
          'nickname': 'Rent Card',
          'address':'23Sn....ixzs',
          'body':'Shanghai Fengda Rental Company',
          'issuer':'Shanghai Fengda Rental Company',
          'explain':'Equity Intro',
          'state':'Issuing',
          'proportion':'1%',
          'assets':'GUSD',
          'mode':'Capital Increase Offering',
          'issuetime':'2018/1/1',
          'endtime':'2019/7/28',
          'minnum':'5,000,000',
          'amountnum':'900,000,000',
          'soldnum':'200,000',
          'purchasenum':'5,000',
          'initialprice':'0.01',
          'issueprice':'0.01',
          'bodytype':'Company',
          'residence':'Hebei, Shijiazhuang',
          'businessaddress':'Beijing Changping District',
          'person':'Wang Wu',
          'capital':'1,000,000',
          'establishdate':'2011/11/11',
          'term':'2031-11-11  -  2032-11-10',
          'range':'Technical service, business consulting'
        },
        {
          'id':'LD',
          'name': 'LaoDou',
          'icon':'ld',
          'nickname': 'Dou Lao',
          'address':'33Sn....ix7c',
          'body':'Beijing Doulao Restaurant',
          'issuer':'Beijing Doulao Restaurant',
          'explain':'Equity Intro',
          'state':'In Circulation',
          'proportion':'10%',
          'assets':'USDT',
          'mode':'Initial Offering',
          'issuetime':'2018/4/1',
          'endtime':'2019/4/1',
          'minnum':'500,000',
          'amountnum':'5,000,000',
          'soldnum':'5,000,000',
          'purchasenum':'5,000',
          'initialprice':'0.5',
          'issueprice':'0.5',
          'bodytype':'Company',
          'residence':'Beijing Shijingshan District',
          'businessaddress':'Hebei Shijiazhuang',
          'person':'Jia Ba',
          'capital':'1,000,000',
          'establishdate':'2012/12/12',
          'term':'2012-12-12-2032-12-11',
          'range':'Restaurant Investment and Operation'
        },
        {
          'id':'PLD',
          'name': 'PLD',
          'icon':'u363',
          'nickname': 'PLD',
          'body':'Platland Ltd.',
          'issuer':'Platland Ltd.',
          'state':'Issuing',
          'address':'13Sn....q2ws',
          'explain':'Equity Intro',
          'proportion':'1%',
          'assets':'USDT',
          'mode':'Initial Offering',
          'issuetime':'2019/12/12',
          'endtime':'2021/12/11',
          'minnum':'2,500,000',
          'amountnum':'500,000,000',
          'soldnum':'150,000',
          'purchasenum':'2,000',
          'initialprice':'0.01',
          'issueprice':'0.02',
          'bodytype':'Company',
          'residence':'Virgin Island',
          'businessaddress':'Beijing Changping District',
          'person':'Jia Ba',
          'capital':'10,000,000,000',
          'establishdate':'2012/12/12',
          'term':'2012-12-12-2032-12-11',
          'range':'Technical service, business consulting'
        },
      ]),
    asset:Mock.mock(
      [
        {
          'id':'USDT',
          'name': 'USDT',
          'body':'Tether Ltd.',
          'issuer':'Tether Ltd.',
          'state':'In Circulation',
          'address':'13Sn....ix7c',
          'amount':'500',
          'explain':'Equity Intro',
          'proportion':'1%',
          'assets':'USD',
          'mode':'Initial Offering',
          'issuetime':'2019/12/12',
          'endtime':'2021/12/11',
          'minnum':'2,500,000',
          'amountnum':'500,000,000',
          'soldnum':'0',
          'purchasenum':'20,000',
          'initialprice':'1',
          'issueprice':'1'
        },
        {
          'id':'PLD',
          'name': 'PLD',
          'address':'23Sn....ix7c',
          'body':'Platland Ltd.',
          'issuer':'Platland Ltd.',
          'amount':'1500',
          'explain':'Equity Intro',
          'state':'Issuing',
          'proportion':'1%',
          'assets':'GUSD',
          'mode':'Inital Offering',
          'issuetime':'2018/1/1',
          'endtime':'2019/7/28',
          'minnum':'5,000,000',
          'soldnum':'9,000,000',
          'purchasenum':'50,000',
          'initialprice':'0.01',
          'issueprice':'0.02'
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
      "version":'0.1',
      "force": 0,
      "describe":'Upgrade Details'
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
