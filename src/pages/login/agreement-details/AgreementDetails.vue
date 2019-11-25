<template>
  <div>
    <div class="turn-out-header">
      <mt-header fixed title="用户使用协议">
        <mt-button icon="back" v-on:click="$router.go(-1)" slot="left">返回</mt-button>
      </mt-header>
    </div>
    <div class="agreement-content">
      <span>【最新修订】： 2018. 11 .29</span>
      <p>本协议是您与服务提供商柏拉图兰(PLATOLAND)之间就使用任何由柏拉图兰(PLATOLAND)网(https://www.platoland.com/)， 柏拉图兰(PLATOLAND)API
        (https://api.platoland.com)以及柏拉图兰(PLATOLAND)相关公司提供的服务时，所达成的权力义务关系的协议。请确认您已阅读、理解，并接受所有本文包含的条款以及纳入通用数据保护条例（GDPR,
        General Data Protection Regulation）的隐私政策。
        由于此协议具有法律约束力，请在使用我们的服务前仔细阅读。注册访问和使用柏拉图兰(PLATOLAND)，表示您已同意本协议中所有条款。如有异议，请您保持账户锁定状态（针对现有用户）并停止使用柏拉图兰(PLATOLAND)。
        更多信息请参考柏拉图兰(PLATOLAND)官网。如果您对本协议有任何疑问，请联系我们的客户服务团队（https://platoland.com/ - Contact us）
      </p>
      <span>协议条件</span>
      <p>
        柏拉图兰(PLATOLAND)保留随时修改本协议条款的权力，修订通知将公布在以下链接并在协议中附最新修订时间：“【最新修订：****年**月**日】”(https://platoland.com)。最新版将于网站发布及向用户发布后立即生效。
        继续使用柏拉图兰(PLATOLAND)服务将视为您接受修改后的最新协议。</p>
      <span>适用条件</span>
      <p>
        注册并使用柏拉图兰(PLATOLAND)账户，需年满18周岁，且为具有合法身份的个人，法人或其他有权签署此用户协议的组织。如不满足以上条件，您和您的监护人应承担由您的行为导致的一切后果，并且柏拉图兰(PLATOLAND)有权取消或冻结您的帐户，同时向您及监护人提出赔偿要求。
      </p>
      <span>禁用条件</span>
      <p>在访问和使用柏拉图兰(PLATOLAND)及其相关服务时，您需确保不在任何贸易或经济制裁名单中，如联合国安理会制裁名单,美国财政部海外资产控制办公室(OFAC, Office of Foreign Assets
        Control)制裁名单及其他任何同类名单。
        柏拉图兰(PLATOLAND)保留其选择服务市场和司法管辖区的权利，并可能限制或拒绝其对相关受制裁国家的服务。本协议的内容不得排除在用户所在国的法律之外。柏拉图兰(PLATOLAND)禁止黑名单用户使用与柏拉图兰(PLATOLAND)相关的任何服务。
      </p>
      <span>柏拉图兰(PLATOLAND)服务描述</span>
      <p>
        柏拉图兰(PLATOLAND)是提供线上通证交易的平台，产品主要为通证。柏拉图兰(PLATOLAND)不提供法币交易，因此不受法币相关法规的制约。作为交易平台，柏拉图兰(PLATOLAND)并不是交易的买卖方，也不是做市商。交易者必须在开始交易之前在柏拉图兰(PLATOLAND)注册并开设账户，存储数字资产。交易者可提取其数字资产，但必须遵守条款中的条件限制。

        柏拉图兰(PLATOLAND)尽力确保其网站发布信息的准确性，但无法保证内容100%的适用性，可靠性，完整性及准确性，因此将不对任何可能出现的因发布内容引起的损失而承担直接或间接责任。柏拉图兰(PLATOLAND)网站的信息主要为辅助用户做出独立判断，会时时更新，并不另行通知。柏拉图兰(PLATOLAND)不提供投资或咨询意见，也不会对其网站及其他传播媒介中所述信息的使用承担责任。用户应了解交易有风险，鼓励所有用户谨慎负责地进行交易行为。
      </p>
    </div>
  </div>
</template>
<script>
</script>
<style lang="scss">
  @import '../../../assets/scss/global';

  .agreement-content {
    height: auto;
    padding: 10px;
    margin-top: 20px;
    background-color: #fff;
  }

  .agreement-content p {
    text-indent: 2em;
    /* font-size: 0.78rem; */
  }

  .agreement-content span {
    /* font-size: 0.78rem; */
    font-weight: 700;
  }
</style>