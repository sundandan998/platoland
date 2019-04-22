import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
//测试页面
import Cs from '@/pages/home/in-circulation/Cs'
//登录页面
import Login from '@/pages/login/Login'
//登录页面--忘记密码
import Password from '@/pages/login/forget-password/ForgetPassword'
//登录页面--重置邮件发送
import Reset from '@/pages/login/reset-mail/ResetMail'
//注册页面
import Register from '@/pages/register/Register'
//注册页面/发送邮件
import Send from '@/pages/register/send-mail/SendMail'
//我的/关于我们
import About from '@/pages/mine/about-our/AboutOur'
//我的/资产
import Assets from '@/pages/mine/assets/Assets'
//首页/我的/资产/明细
import DetailedList from '@/pages/mine/assets/DetailedList'
//首页/我的/资产/资产详情
import AssetsDetailed from '@/pages/mine/assets/AssetsDetailed'
//首页/我的/资产/明细/交易详情
import TransactionDetails from '@/pages/mine/assets/TransactionDetails'
//首页/我的/资产/明细/转入
import Into from '@/pages/mine/assets/ToChangeInto'
//首页/我的/资产/明细/转出
import Out from '@/pages/mine/assets/TurnOut'
//我的/安全
import Safety from '@/pages/mine/safety-center/SafetyCenter'
//我的/安全/重置密码
import Rest from '@/pages/mine/safety-center/RestPassWord'
//我的/安全/开启信息验证
import Open from '@/pages/mine/safety-center/OpenInformation'
//我的/安全/关闭信息验证
import Close from '@/pages/mine/safety-center/CloseInformation'
//我的/安全/开启支付密码
import PayPassWOrde from '@/pages/mine/safety-center/OpenPayPassWOrd'
//我的/安全/安全验证
import SafetyVerification from '@/pages/mine/safety-center/SafetyVerification'
//我的/地址薄
import Book from '@/pages/mine/address-book/AddressBook'
//我的/地址薄/编辑地址
import Edit from '@/pages/mine/address-book/EditAddress'
//我的/地址薄/添加地址
import Add from '@/pages/mine/address-book/AddAddress'
//我的/公告消息
import News from '@/pages/mine/news-center/NewsCenter'
//我的/公告消息/详情
import NewsDetails from '@/pages/mine/news-center/NewsDetails'
//首页--通证列表
import List from '@/pages/home/certificate-list/CertificateList'
//首页/流通中/通证详情
import Pass from '@/pages/home/in-circulation/PassDetails'
//首页/流通中/主体详情页
import Subject from '@/pages/home/in-circulation/SubjectDetails'
//首页/流通中/去交易
import Deal from '@/pages/home/in-circulation/ToDeal'
//首页/流通中/去交易/购买通证
import PurchasePass from '@/pages/home/in-circulation/PurchasePass'
//首页/流通中/去交易/出售通证
import Sell from '@/pages/home/in-circulation/Sell'
//首页/流通中/去交易/买入发布
import Purchase from '@/pages/home/in-circulation/PurchaseRelease'
//首页/流通中/去交易/卖出发布
import SellOut from '@/pages/home/in-circulation/SellRelease'
//首页/发行中/通证详情
import Details from '@/pages/home/in-issue/PassDetails'
//首页/发行中/买入通证
import Buy from '@/pages/home/in-issue/BuyingPass'
//首页/待发行/入驻期
import Issue from '@/pages/home/to-issue/ToIssue'
Vue.use(Router)

export default new Router({
  routes: [
//测试
		{
      path: '/cs',
      name: 'Cs',
      component: Cs
  	},
		//登录
		{
      path: '/login',
      name: 'Login',
      component: Login
    },
		//  登录/忘记密码
    {
      path: '/password',
      name: 'Password',
      component: Password
    },
    //登录/重置邮件发送
    {
      path: '/reset',
      name: 'Reset',
      component: Reset
    },
		//  注册
		{
      path: '/register',
      name: 'Register',
      component: Register
    },
    //  注册/发送邮件
    {
      path: '/send',
      name: 'Send',
      component: Send
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    },
		//  我的/关于我们
		{
      path: '/about',
      name: 'About',
      component: About
    },
		//  我的---资产
    {
      path: '/assets',
      name: 'Assets',
      component: Assets
    },
    //  我的---资产/明细
    {
      path: '/detailedlist',
      name: 'DetailedList',
      component: DetailedList
    },
    //  我的---资产/资产详情
    {
      path: '/assetsdetailed',
      name: 'AssetsDetailed',
      component: AssetsDetailed
    },
    //  我的---资产/明细/交易详情
    {
      path: '/transaction',
      name: 'TransactionDetails',
      component: TransactionDetails
    },
    //首页/我的/资产/明细/转入
    {
      path: '/into',
      name: 'Into',
      component: Into
    },
    //首页/我的/资产/明细/转出
    {
      path: '/out',
      name: 'Out',
      component: Out
    },
     // 我的/安全
    {
      path: '/safety',
      name: 'Safety',
      component: Safety
    },
    //  我的/安全/重置密码
    {
    	path: '/rest',
      name: 'Rest',
      component: Rest
    },
    //  我的/安全/开启信息验证
    {
    	path: '/open',
      name: 'Open',
      component: Open
    },
		//我的/安全/关闭信息验证
		{
    	path: '/close',
      name: 'Close',
      component: Close
    },
    //我的/安全/开启支付密码
    {
    	path: '/paypassword',
      name: 'PayPassWOrde',
      component: PayPassWOrde
    },
    //我的/安全/安全验证
    {
    	path: '/safetyverification',
      name: 'SafetyVerification',
      component: SafetyVerification
    },
		//  我的/地址薄
		{
      path: '/book',
      name: 'Book',
      component: Book
    },
    	//  我的/地址薄/编辑地址
		{
      path: '/edit',
      name: 'Edit',
      component: Edit
    },
    //  我的/地址薄/添加地址
		{
      path: '/add',
      name: 'Add',
      component: Add
   },
		//我的--消息中心
		{
      path: '/news',
      name: 'News',
      component: News  
  	},
  	//我的/公告消息/详情
  	{
      path: '/newsdetails',
      name: 'NewsDetails',
      component: NewsDetails  
  	},
		//首页--通证列表
		{
      path: '/list',
      name: 'List',
      component: List  
	  },
//	  首页/流通中/通证详情
		{
			path: '/pass',
			name: 'Pass',
			component: Pass
		},
//	首页/流通中/主体详情
		{
			path: '/subject',
			name: 'Subject',
			component: Subject
		},
		//首页/流通中/去交易
		{
			path: '/deal',
			name: 'Deal',
			component: Deal
		},
		//首页/流通中/去交易/购买通证
		{
			path: '/purchase',
			name: 'PurchasePass',
			component: PurchasePass
		},
			//首页/流通中/去交易/出售通证
		{
			path: '/sell',
			name: 'Sell',
			component: Sell
		},
		//首页/流通中/去交易/买入发布
		{
			path: '/purchaserelease',
			name: 'Purchase',
			component: Purchase
		},
		//首页/流通中/去交易/卖出发布
		{
			path: '/sellrelease',
			name: 'SellOut',
			component: SellOut
		},
//	首页/发行中/通证详情
		{
			path: '/details',
			name: 'Details',
			component: Details
		},
//	首页/发行中/通证详情
		{
			path: '/buy',
			name: 'Buy',
			component: Buy
		},
//首页/待发行/入驻期
		{
			path: '/issue',
			name: 'Issue',
			component: Issue
		}
	]
})
