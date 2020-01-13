<template>
  <div class="life">
    <div class="life-header header">
      <mt-header fixed title="什么是LIFE+？">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="life-text">
      <div>
        <p class="title"> <img src="../../../assets/images/point.svg" alt=""> 什么是LIFE+？</p>
        <span>LIFE+是北京斯帕尔克细胞科技有限公司发行的企业通证，目的是聚合内外部资源，支持企业持久发展。
          LIFE+持有人能够兑换斯帕尔克提供的细胞服务，并享受与之相关的增值收益。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> LIFE+和比特币有什么区别？</p>
        <span>比特币是数字货币，价值来自社群共识，LIFE+是企业通证，价值和斯帕尔克的企业成长有关。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 市场上听到很多XX币XX链，LIFE+和他们有什么不同？</p>
        <span>基于区块链技术的项目很多，有的是技术创新，有的是和实体产业结合，也有只是概念包装。LIFE+依赖实业经营,这是最大的区别。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 长期持有LIFE+有什么好处？</p>
        <span>LIFE+的总量是恒定的，而可兑换的细胞服务品质在增长,成本在降低。如果长期持有，随着斯帕尔克经营的扩大，LIFE+的价值自然一直是上升的。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 会不会有一天LIFE+和斯帕尔克没有关系了？</p>
        <span>不会。LIFE+和现实中的预付款、储值卡一样，受到法律保护。同时，斯帕尔克锁定一部分股份，和柏拉图兰签订三方协议，从商业合同上进一步保证LIFE+持有人的权益</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> LIFE+能换回人民币吗？</p>
        <span>LIFE+不是货币，按照国家法律，也不允许斯帕尔克提供人民币兑换服务。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> LIFE+是企业积分吗？有什么不同？</p>
        <span class="footer">
          LIFE+和企业积分有很多相似的地方，比如都能兑换产品或服务，但两者出发点和地位不同。<br>
          LIFE+作为企业通证，目的是融合股东、员工、上下游企业、消费者各方资源和智慧，参与企业发展,共享企业增长红利。而企业积分主要作为企业营销方式，面向消费者，发行管理都比较随意。<br>
          LIFE+属于企业的数字资产，关注长期发展，是企业的战略行为，而企业积分只是普通的营销手段。<br>
          因为两者的出发点不同，未来可能会演化出很多不同的地方。就目前而言，至少存在下列不同：<br>
          &nbsp;&nbsp;1）LIFE+发行透明，发行情况可以在区块链上随时查看，数据不可篡改，交易往来也可追溯。<br>
          &nbsp;&nbsp;2）LIFE+数据记录在区块链上，转移不受任何第三方技术限制。<br>
          &nbsp;&nbsp;3）LIFE+代表的权益受到第三方约束，有法律保障，不会存在霸王条款。
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .life {
    background-color: #fff;

    .life-text {
      margin: 0 24px;
      padding-bottom: 20px;

      p {
        font-size: 26px;
        font-weight: 700;
        margin: 10px 0 20px 0;
      }

      .title {
        margin-top: 50px;
        display: inline-block;
      }

      .footer {
        margin-bottom: 50px;
      }

      span {
        font-size: 22px;
        width: 80%;
        margin: 0 auto;
        display: block;
        line-height: 40px;
      }

      img {
        width: 50px;
        position: relative;
        top: 12px;
      }
    }
  }
</style>