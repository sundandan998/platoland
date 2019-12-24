<template>
  <div class="economy">
    <div class="economy-header header">
      <mt-header fixed title="通证经济">
        <mt-button icon="back" slot="left" v-on:click="$router.go(-1)">{{$t('m.back')}}</mt-button>
      </mt-header>
    </div>
    <div class="economy-text">
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 什么是通证经济？</p>
        <span>参考维基百科，通证经济脱胎于行为经济学，通过引入通证，制定发行、流通、交易、销毁等规则，对人的行为产生奖励或约束，是一门正在演化发展的新学科。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 那什么是通证？</p>
        <span>通证源自英文“token”，早期在数字货币圈有人翻译为“代币”，但随着区块链在各领域的广泛使用，这个翻译已不能反映其底层价值和实际现状。后统一翻译为“通证”，具体表述为：可流通的加密数字权益证明。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 定义太难懂了，有没有简单点儿的解释？</p>
        <span>人类社会使用某一类物品对行为激励其实很普遍，比如军队里面的勋章、幼儿园小朋友的小红花、商城中的消费积分、电子游戏中的虚拟货币等等，通证的概念脱胎于此，不是凭空产生的“空”概念。
          当然，它也不是新瓶装旧酒的概念噱头，作为通证还需要具备一些特征：
          1，可流通。通证之间可以自由交换；
          2，防伪。确保每个通证唯一，不可复制，不可篡改；
          3，可信任。有机制保证发行流通环节公正，能接受公众监督。
        </span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 通证和比特币是什么关系？</p>
        <span>数字货币是通证的一种，比特币是数字货币的一种，他们是包含关系</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 那谈通证，是不是就是指数字货币，做比特币做的类似事情呢？</p>
        <span>这个理解当然不对，数字货币只是整个通证的一部分。比特币的经济设计启发了人们，设计与各行各业相融合的不同模式，正是通证设计的重点。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">没有通证也挺好的，有了通证会有什么不一样？</p>
        <span>在现代社会中，企业卖东西，消费者花钱消费。如果企业提高利润，消费者支出就变大，两者之间存在博弈关系。而通证把股东、员工、消费者、供应链上下游等资源联系到一起，使得大家成为利益共同体。这样，可利用的资源扩大，
          增大了企业的生存力，企业经营获利时每个通证持有人也能从中受益，这和现在是不一样的。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt=""> 通证的想法很好，距离实现这个想法有多远？</p>
        <span>通证的基础是区块链，而区块链发展了信任机制，使得人类向信任社会迈出坚实的一步。信任成本的降低使得更多企业发行通证具备了可能，普通人持有企业通证的机会大量涌现。
          当然，通证自身的完善和发展需要一段路要走，人们接受新事物也需要一些时间。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">这里的通证就是股权吗？</p>
        <span>这个理解不完整，通证代表的是一切可以流通的数字权益，它可能是虚拟财产，比如游戏装备、数字版权等，
          也可能映射为现实社会中的股权、资产等，还可能包含一些未来会出现的一些新事物。当然，股权作为现实世界的主要资产类型，
          很普遍，也已发展出了成熟的交易体系和管理规则。这些都为通证的设计和发展提供了坚实的基础。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">普通人靠什么判断某个通证的好劣呢？</p>
        <span>如果你日常就接触这个通证，熟悉通证发行企业的理想和做事风格，自然会有大量信息可供你做出判断。如果你的生活和这个通证没有交集，
          那持有就需要更谨慎考虑。</span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">激励人用金钱就够了，通证是不是把事情搞复杂了？</p>
        <span>毫无疑问，金钱激励普遍存在。但认为金钱是唯一方式倒是值得深思下。
          想一想你第一次在豆瓣写下影评，在知乎回答问题，在网购后评论，在微博中追星，在github上写下代码，
          是什么推动你这么做？金钱奖励可能是动机之一，但绝不会是主要动力。相反，金钱奖励产生的水化行为，
          恰是这些系统设计者重点防范的。 当人们的很多行为在某个阶段难以用金钱衡量，或不适合用金钱衡量时，
          通证无疑是一个好的选择。未来的社会层次必将更加多元和包容，而通证将为社会发展提供新思路。
        </span>
      </div>
      <div>
        <p> <img src="../../../assets/images/point.svg" alt="">PLATOLAND和通证经济有什么关系？</p>
        <span>PLATOLAND随着区块链技术的发展成立，致力于构建一个价值可实现、人人可交易的数字资产世界。这个愿景是未来通证经济中的一部分，我们就是要构建这样一块新大陆。
        </span>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  @import '../../../assets/scss/global';

  .economy {
    background-color: #fff;

    .economy-text {
      margin: 0 24px;
      padding-bottom: 20px;
      p {
        font-size: 30px;
        font-weight: 700;
      }

      span {
        font-size: 26px;
      }

      img {
        width: 50px;
        position: relative;
        top: 12px;
      }
    }
  }
</style>