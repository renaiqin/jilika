<template>
  <div class="raq_rankwarp">
<!-- rankwarp -->
    <div class="m_tabbox">
        <ul class="u_tabul">
            <li :class="{on:active_type==0}" v-on:click="changeView(0)"><span>全校动态</span></li>
            <li :class="{on:active_type==1}" v-on:click="changeView(1)"><span>班级动态</span></li>
            <li :class="{on:active_type==2}" v-on:click="changeView(2)"><span>我的动态</span></li>
        </ul>
    </div>
    

    <div class="raq_m_IncentiveCardBox">
        <!-- m_IncentiveCardBox -->
        <transition  name='flod'>
            <component v-if="hackReset" :is="curcomp" :active_type="active_type"/>
        </transition>
    </div>

    <div class="m_botRelease">
        <div class="ReleaseDynamic" v-on:click="releaseDynamic">发动态</div>
    </div>
  </div>
</template>

<script>
  import { api } from "../../../../utils/Api/index";
  import * as utilsfun from "../../../../utils/functions.js";
  import comp_dynamiclist from '../../commons/dynamiclist.vue';
  
  export default {
    name: "rankingHome",
    data(){
      return {
        hackReset:true,                                     //是否可切换                   
        curcomp:"",                            //列表组件的名称
        active_type:0,                                      //三种类型的标识 0-全校 1-年级 2-班级
      }
    },
    mounted() {
        localStorage.setItem('stuReleasText','')
        localStorage.setItem('stuAttachmentList',[])
        localStorage.setItem('stuCurCardType','')
        this.$fetch(api.updateXxdtNum(),{xxdm:localStorage.getItem('xxdm'),userid: localStorage.getItem("xh"),usertype:localStorage.getItem('usertype')});
        this.init();
    },
    components:{    //这里是注册你所需要的组件的地方 上面import进来,这里注册
        comp_dynamiclist
    },
    methods: {
        /**
         * 说明:初始化基础数据并存入localStorage里(只做set不做判断是否存在,保证每次浏览页面都是最新的数据)
         * 作者:RayJ
         * 更新时间:2019-03-09
         */
        async init(){
            // console.log(utilsfun.formateDateAndTimeToString(new Date()));
            
            //父组件数据加载完毕后再调用子组件
            this.curcomp = "comp_dynamiclist";

        },
        /**
         * 说明:切换标签卡
         * 作者:RayJ
         * 更新时间:2019-02-27
         */
        changeView(num){
            this.hackReset = false
            this.$nextTick(() => {
                this.hackReset = true
            })
            this.active_type = num;
        },
        /**
         * 说明:发表动态
         * 作者:RayJ
         * 更新时间:2019-03-11
         */
        releaseDynamic(){
            this.$router.push({path:'/pages/student/dynamic/release', query:{active_type:this.active_type}})
        },
        
    },
  }
</script>

<style scoped lang="scss">
@import '../../../../style/style.scss';
  body{
    background-color: #fff !important;
  }
  .flod-enter-active{
    animation-name:fadeInRight;animation-duration:.5s;
    }
  .rankwarp{
      height: 100%;
      background: #eff0f3;
      overflow: hidden;
      display: -webkit-box; /* Chrome 4+, Safari 3.1, iOS Safari 3.2+ */  
      display: -moz-box; /* Firefox 17- */  
      display: -webkit-flex; /* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 */  
      display: -moz-flex; /* Firefox 18+ */  
      display: -ms-flexbox; /* IE 10 */  
      display: flex;
      -webkit-box-orient: vertical;
      -ms-flex-direction: column;
      -webkit-flex-direction: column;
      flex-direction: column;
  }
  .raq_rankwarp{
      height: 100%;
      background: #eff0f3;
      overflow: hidden;
    
  }
  .m_tabbox{
        background: #FFF;
        width: 100%;
        height: px2rem(92px);
        overflow: hidden;
        .u_tabul{
                height: 100%;
                width: 100%;
            li{
                width:33%;
                float: left;
                font-size: px2rem(30px);
                line-height: px2rem(90px);
                text-align: center;
                color: #909399;
                height: 100%;
                overflow: hidden;
                position: relative;
            }
            li.on{
                color: #3e81ff;
            }
            li::after{
                content: '\20';
                width: 0;
                height: px2rem(4px);
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                background: #3e81ff;
                transition: .2s all;
            }
            li.on::after{
                width: px2rem(120px);
            }
        }
  }
  .m_IncentiveCardBox{
       -webkit-box-flex: 1;   /* OLD - iOS 6-, Safari 3.1-6 */  
      -moz-box-flex: 1;    /* OLD - Firefox 19- */              
      -webkit-flex: 1;   /* Chrome */  
      -ms-flex: 1;       /* IE 10 */  
      flex: 1;       
      background: #FFF;
      padding: 0;
      //float: left;
    //   overflow: auto;
    //   -webkit-overflow-scrolling: touch;
   
      margin-top: px2rem(16px);
      height: 100%;
  }
  .raq_m_IncentiveCardBox{
      width: 100%;
      background: #FFF;
      padding: 0;
      float: left;
      margin-top: px2rem(10px);
      height: 100%;
      padding-bottom:px2rem(250px);
  }
  .m_botRelease{
      height: px2rem(130px);
      background: #FFF;
      width: 100%;
      margin-top: px2rem(20px);
  }
    .ReleaseDynamic{
        position: fixed;
        width: px2rem(640px);
        height: px2rem(90px);
        border-radius: px2rem(45px);
        background: #3e81ff;
        font-size: px2rem(36px);
        color: #FFF;
        line-height: px2rem(90px);
        text-align: center;
        bottom: px2rem(20px);
        left: px2rem(55px);
    }
    
    .rankwarp{
        .van-tab__pane{
        margin-top:px2rem(120px);
        }
    }
</style>
