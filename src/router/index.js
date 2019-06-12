import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  //mode:'history',
  routes: [
    //测试
    {
      path: '/cs',
      name: 'Cs',
      component: () => import("@/pages/home/in-circulation/cs")
    },
    //登录
    {
      path: '/login',
      name: 'Login',
      component: () => import("@/pages/login/Login")
    },
    //  登录/忘记密码
    {
      path: '/password',
      name: 'Password',
      component: () => import("@/pages/login/forget-password/ForgetPassword")
    },
    //登录/重置邮件发送
    {
      path: '/reset/:email',
      name: 'Reset',
      component: () => import("@/pages/login/reset-mail/ResetMail")
    },
    // 重置登录密码
    {
      path: '/resetpwd',
      name: 'ResetPwd',
      component: () => import("@/pages/login/reset-mail/ResetPwd")
    },
    //  注册
    {
      path: '/register',
      name: 'Register',
      component: () => import("@/pages/register/Register")
    },
    //  注册/发送邮件
    {
      path: '/send',
      name: 'Send',
      component: () => import("@/pages/register/send-mail/SendMail")
    },
    // 首页
    {
      path: '/',
      name: 'Home',
      component: () => import("@/pages/home/Home")
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import("@/pages/home/Home")
    },
    //  我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import("@/pages/mine/Mine")
    },
    // 探索
    {
      path: '/explore',
      name: 'Explore',
      component: () => import("@/pages/explore/Explore")
    },
    //  我的/关于我们
    {
      path: '/about',
      name: 'About',
      component: () => import("@/pages/mine/about-our/AboutOur")
    },
    //  我的---资产
    {
      path: '/assets',
      name: 'Assets',
      component: () => import("@/pages/mine/assets/Assets")
    },
    //  我的---资产/明细
    {
      path: '/detailedlist',
      name: 'DetailedList',
      component: () => import("@/pages/mine/assets/DetailedList")
    },
    //  我的---资产/资产详情
    {
      path: '/assetsdetailed/:id',
      name: 'AssetsDetailed',
      component: () => import("@/pages/mine/assets/AssetsDetailed")
    },
    //  我的---资产/明细/交易详情
    {
      path: '/transaction',
      name: 'TransactionDetails',
      component: () => import("@/pages/mine/assets/TransactionDetails")
    },
    //首页/我的/资产/明细/转入
    {
      path: '/into',
      name: 'Into',
      component: () => import("@/pages/mine/assets/ToChangeInto")
    },
    //首页/我的/资产/明细/转出
    {
      path: '/out/:id',
      name: 'Out',
      component: () => import("@/pages/mine/assets/TurnOut")
    },
    //首页/我的/资产/明细/扫一扫
    {
      path: '/scan',
      name: 'Scan',
      component: () => import("@/pages/mine/assets/Scan")
    },
    //首页/我的/资产/明细/扫一扫详情
    {
      path: '/scandetail',
      name: 'ScanDetail',
      component: () => import("@/pages/mine/assets/ScanDetail")
    },
    // 我的/安全
    {
      path: '/safety',
      name: 'Safety',
      component: () => import("@/pages/mine/safety-center/SafetyCenter")
    },
    //  我的/安全/重置密码
    {
      path: '/rest',
      name: 'Rest',
      component: () => import("@/pages/mine/safety-center/RestPassWord")
    },
    //  我的/安全/开启信息验证
    {
      path: '/open',
      name: 'Open',
      component: () => import("@/pages/mine/safety-center/OpenInformation")
    },
    //我的/安全/关闭信息验证
    {
      path: '/close',
      name: 'Close',
      component: () => import("@/pages/mine/safety-center/CloseInformation")
    },
    //我的/安全/开启支付密码
    {
      path: '/paypassword',
      name: 'PayPassWOrde',
      component: () => import("@/pages/mine/safety-center/OpenPayPassWOrd")
    },
    //我的/安全/安全验证
    {
      path: '/safetyverification',
      name: 'SafetyVerification',
      component: () => import("@/pages/mine/safety-center/SafetyVerification")
    },
    //  我的/地址薄
    {
      path: '/book',
      name: 'Book',
      component: () => import("@/pages/mine/address-book/AddressBook")
    },
    //  我的/地址薄/编辑地址
    {
      path: '/edit/:id',
      name: 'Edit',
      component: () => import("@/pages/mine/address-book/EditAddress")
    },
    //  我的/地址薄/添加地址
    {
      path: '/add',
      name: 'Add',
      component: () => import("@/pages/mine/address-book/AddAddress")
    },
    //我的--消息中心
    {
      path: '/news',
      name: 'News',
      component: () => import("@/pages/mine/news-center/NewsCenter")
    },
    //我的/公告消息/详情
    {
      path: '/newsdetails/:id',
      name: 'NewsDetails',
      component: () => import("@/pages/mine/news-center/NewsDetails")
    },
    //我的/版本更新
    {
      path: '/version',
      name: 'Version',
      component: () => import("@/pages/mine/version-update/Version")
    },
    //首页--通正详情
    {
      path: '/detail/:code',
      name: 'Detail',
      component: () => import("@/pages/home/detail/Detail")
    },
    //首页--通证列表
    {
      path: '/list',
      name: 'List',
      component: () => import("@/pages/home/certificate-list/CertificateList")
    },
    //  首页/主体详情
    {
      path: '/subject/:id',
      name: 'Subject',
      component: () => import("@/pages/home/in-circulation/SubjectDetails")
    },
    //首页/去交易
    {
      path: '/deal',
      name: 'Deal',
      component: () => import("@/pages/home/in-circulation/ToDeal")
    },
    //首页/去交易/购买通证
    {
      path: '/purchase/:id',
      name: 'PurchasePass',
      component: () => import("@/pages/home/in-circulation/PurchasePass")
    },
    //首页/流通中/去交易/出售通证
    {
      path: '/sell',
      name: 'Sell',
      component: () => import("@/pages/home/in-circulation/Sell")
    },
    //首页/流通中/去交易/买入发布
    {
      path: '/purchaserelease',
      name: 'Purchase',
      component: () => import("@/pages/home/in-circulation/PurchaseRelease")
    },
    //  首页/发行中/通证详情
    {
      path: '/buy',
      name: 'Buy',
      component: () => import("@/pages/home/in-circulation/BuyingPass")
    }
    ]
  })

