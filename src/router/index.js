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
      path: '/reset',
      name: 'Reset',
      component: () => import("@/pages/login/reset-mail/ResetMail")
    },
    // 重置登录密码
    {
      path: '/resetpwd',
      name: 'ResetPwd',
      component: () => import("@/pages/login/reset-mail/ResetPwd")
    },
    // 注册协议
    {
      path: '/agreement',
      name: 'Agreement',
      component: () => import("@/pages/login/agreement-details/AgreementDetails")
    },
    //  注册
    {
      path: '/register',
      name: 'Register',
      component: () => import("@/pages/login/Register")
    },
    // //  注册/发送邮件
    // {
    //   path: '/send',
    //   name: 'Send',
    //   component: () => import("@/pages/register/send-mail/SendMail")
    // },
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
    // 轮播图--通证经济
    {
      path: '/economy',
      name: 'Economy',
      component: () => import("@/pages/home/carousel/TokenEconomy")
    },
    // 轮播图--life+
    {
      path: '/life',
      name: 'Life',
      component: () => import("@/pages/home/carousel/Life")
    },
    // 发行详情
    {
      path: '/issued/:id',
      name: 'Issued',
      component: () => import("@/pages/home/issued-detail/IssuedDetail")
    },
    // 发行情况
    {
      path: '/issuance',
      name: 'Issuance',
      component: () => import("@/pages/home/issued-detail/Issuance")
    },
    // 发行专区
    {
      path: '/zone',
      name: 'Zone',
      component: () => import("@/pages/home/issued-detail/IssuedZone")
    },
    // 发行通证
    {
      path: '/token',
      name: 'Token',
      component: () => import("@/pages/home/issued-detail/IssuedToken")
    },
    // 分利宝
    {
      path: '/bao',
      name: 'Bao',
      component: () => import("@/pages/home/fenlibao/FenLibao")
    },
    // 转入分利宝
    {
      path: '/transferflb/:id',
      name: 'Transferflb',
      component: () => import("@/pages/home/fenlibao/TransferIntoflb")
    },
    //  我的
    {
      path: '/mine',
      name: 'Mine',
      component: () => import("@/pages/mine/Mine")
    },
    // 修改昵称
    {
      path: '/editnickname',
      name: 'EditNickname',
      component: () => import("@/pages/mine/nickname/EditNickname")
    },
    // 个人信息
    {
      path: '/information',
      name: 'Information',
      component: () => import("@/pages/mine/nickname/Information")
    },
    // 邀请新人
    {
      path: '/invite',
      name: 'Invite',
      component: () => import("@/pages/mine/invite-people/InvitePeople")
    },
    // 我的通证
    {
      path: '/certificate/:code',
      name: 'Certificate',
      component: () => import("@/pages/mine/my-certificate/MyCertificate")
    },
    // 发布分利计划
    {
      path: '/release',
      name: 'Release',
      component: () => import("@/pages/mine/my-certificate/distribution/ReleaseDistribution")
    },
    // 发布详情
    {
      path: '/releasedetail/:id',
      name: 'ReleaseDetail',
      component: () => import("@/pages/mine/my-certificate/distribution/ReleaseDetail")
    },
    // 发布详情历史
    {
      path: '/releasehistory',
      name: 'ReleaseHistory',
      component: () => import("@/pages/mine/my-certificate/distribution/ReleaseHistory")
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
    // 订单
    {
      path: '/order',
      name: 'Order',
      component: () => import("@/pages/mine/order/Order")
    },
    // 订单详情
    {
      path: '/orderdetail/:order_id',
      name: 'OrderDetail',
      component: () => import("@/pages/mine/order/OrderDetail")
    },
    // 订单详情列表
    {
      path: '/orderdetaillist',
      name: 'OrderDetailList',
      component: () => import("@/pages/mine/order/OrderDetailList")
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
    //  我的---资产/冻结详情
    {
      path: '/freeze',
      name: 'FreezeDetail',
      component: () => import("@/pages/mine/assets/FreezeDetail")
    },
    // 冻结转让
    {
      path: '/freezetransfer/:order_id',
      name: 'FreezeTransfer',
      component: () => import("@/pages/mine/assets/FreezeTransfer")
    },
    // 可用转让
    {
      path: '/availabletransfer',
      name: 'AvailableTransfer',
      component: () => import("@/pages/mine/assets/AvailableTransfer")
    },
    // 确认转让
    {
      path: '/confirmtransfer',
      name: 'ConfirmTransfer',
      component: () => import("@/pages/mine/assets/ConfirmTransfer")
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
      path: '/out',
      name: 'Out',
      component: () => import("@/pages/mine/assets/TurnOut")
    },
    // 转出确认
    {
      path: '/confirm',
      name: 'OutConfirm',
      component: () => import("@/pages/mine/assets/OutConfirm")
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
    //  我的/安全/开启邮箱验证
    {
      path: '/email',
      name: 'Email',
      component: () => import("@/pages/mine/safety-center/OpenEmail")
    },
    //我的/安全/开启支付密码
    {
      path: '/paypassword',
      name: 'PayPassWorde',
      component: () => import("@/pages/mine/safety-center/OpenPayPassWord")
    },
    // 修改支付密码
    {
      path: '/modify',
      name: 'Modify',
      component: () => import("@/pages/mine/safety-center/ModifyPwd")
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
      path: '/edit',
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
    //首页--通证详情
    {
      path: '/detail/:code',
      name: 'Detail',
      component: () => import("@/pages/home/detail/Detail")
    },
    // 效用说明
    {
      path: '/description',
      name: 'Description',
      component: () => import("@/pages/home/detail/UtilityDescription")
    },
    //首页--通证列表
    {
      path: '/list',
      name: 'List',
      component: () => import("@/pages/home/certificate-list/CertificateList")
    },
    //  首页/主体详情
    {
      path: '/subject',
      name: 'Subject',
      component: () => import("@/pages/home/in-circulation/SubjectDetails")
    },
    //首页/去交易
    {
      path: '/deal',
      name: 'Deal',
      component: () => import("@/pages/home/in-circulation/ToDeal")
    },
    // 交易市场通证
    {
      path: '/markettoken',
      name: 'MarketToken',
      component: () => import("@/pages/home/in-circulation/MarketToken")
    },
    //首页/去交易/购买通证
    {
      path: '/purchase/:id',
      name: 'PurchasePass',
      component: () => import("@/pages/home/in-circulation/PurchasePass")
    },
    //首页/流通中/去交易/出售通证
    {
      path: '/sell/:id',
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
    },
    // 买入记录
    {
      path: '/buyrecord',
      name: 'BuyRecord',
      component: () => import("@/pages/home/in-circulation/BuyRecord")
    },
  ]
})

