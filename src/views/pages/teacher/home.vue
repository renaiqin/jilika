

<template>
  <div class="warp">
    <div class="top">
      <p>{{schoolName}}</p>
      <img src="../../../assets/banner.png" />
    </div>
    <div class="tip clearfix" v-show="isClue">
      <img src="../../../assets/tongzhi.png" />
      <p @click="rendersetClass" class="tipP">设置常用班级，发卡更简便！</p>
      <p class="notip" @click="noClue">不再提醒</p>
    </div>

    <div class="hengwarp clearfix">
      <img src="../../../assets/heng.png" />
      <p v-if="usertype == 3">欢迎{{adminName}}老师</p>
      <p v-else>欢迎{{adminName}}</p>
    </div>
    
    <div class="gongneng">
      <van-row gutter="20">
         <router-link to="cardRecord/cardRecord" v-if="findqx('jlk001') != -1">
          <van-col span="6">
            <div class="gong-1">
              <img src="../../../assets/fk.png" />
            </div>
            <p>发卡</p>
          </van-col>
        </router-link>
        <router-link v-if="findqx('jlk002') != -1" to="rankingList/rankingHome">
          <van-col span="6">
            <div class="gong-2">
              <img src="../../../assets/hk.png" />
            </div>
            <p>琅琊榜</p>
          </van-col>
        </router-link>
        <router-link v-if="findqx('jlk003') != -1" to="dynamic/index">
          <van-col class="dtNumWarp" span="6">
            <div class="gong-3">
              <img src="../../../assets/lyb.png" />
              <span v-if="dtNum != 0 && dtNum != '0'" class="dtNum">{{dtNum}}</span>
            </div>
            <p class="bjdt">动态</p>
          </van-col>
        </router-link>
        <router-link v-if="findqx('jlk004') != -1" to="setClass">
          <van-col span="6">
            <div class="gong-4">
              <img src="../../../assets/sz.png" />
            </div>
            <p>设置</p>
          </van-col>
        </router-link>
      </van-row>
    </div>
    

    <div class="grayline"></div>

    <div class="getcard">
      <div class="cardtitle clearfix">
        <p class="cardleft">最新发卡</p>
        <p class="cardright more" v-if="findqx('jlk001') != -1" @click="renderCardRecord">更多</p>
      </div>
      <div class="cardmain">
        <van-row gutter="30" v-if="newFaka.length == 0">
          <p class="tipsP">尚未获得卡片哦~</p>
        </van-row>
        <van-row gutter="30" v-else>
          <van-col span="12" v-for="(item,index) in newFaka" :key="index">
            <div><img :src="item.tplj?item.tplj:'static/img/test1.png'"></div>
            <!-- 'http://115.231.105.146/' +  -->
            <p>评价人：{{item.ckrxm}}</p>
            <p>{{item.bfsj}}</p>
          </van-col>

        </van-row>
      </div>
    </div>
    
    <div class="grayline"></div>

    <div class="getcard">
      <div class="cardtitle clearfix">
        <p class="cardleft">琅琊榜榜主</p>
        <p class="cardright more" v-if="findqx('jlk002') != -1" @click="renderRanking">更多</p>
      </div>
      <div class="bangmain">
        <van-row gutter="20" v-if="lybData.length != 0">
          <van-col span="8" v-for="(item,index) in lybData" :key="index">
           
              <div class="userInfo">
                <img :src="item.xbm == 2 ? '../static/img/gril.png' : '../static/img/boy.png'"/>
                <p>{{item.xm}}</p>
                <p>{{item.bjmc}}</p>
              </div>
              <p class="cardNum">{{item.hks}}</p>
              <p class="cardLx">{{item.kplx}}</p>
           
          </van-col>
         
        </van-row>
        <van-row v-else gutter="20">
          <p class="tipsP">无榜主信息哦~</p>
        </van-row>
      </div>
    </div>

    <div class="grayline"></div>

    <div class="getcard">
      <div class="cardtitle clearfix">
        <p class="cardleft">班级动态</p>
        <p v-if="classData.length != 0" class="cardright change" @click="changeClass">{{showchooseClass}}
        </p>
        <p v-else class="cardright">全校
        </p>
      </div>
      <div class="dongtaimain" v-if="classDt.length != 0">
        <div class="dongtaiLi" v-for="(item,index) in classDt" :key="index">
          <div class="viainfo clearfix">
            <div class="via">
              <img :src="item.xb == 2 ? '/static/img/gril.png' : '/static/img/boy.png'"/>
            </div>
            <div class="name">
              <p>{{item.xm}}</p>
              <p>{{item.fbdtsj}}</p>
            </div>
          </div>
          <p class="dongtaicontent">{{item.fbnr}}</p>
          <p class="cardType">{{item.kplxmc}}</p>
        </div>
      </div>
      <div class="dongtaimain" v-else>
        <p class="tipsP">班级动态尚未发布哦~</p>
      </div>
      
    </div>
    
    
    <div class="fade" v-if="isSetShow">
      <div class="showChange">
        <div class="showtop clearfix">
          <p class="chooseP">选择班级</p>
          <img @click="close" class="close" src="../../../assets/close.png" />
        </div>
        <div class="classmain">
          <div class="classwarp clearfix" v-for="(item,index) in classData" :key="index">
            <p class="classtitle">{{item.njmc}}</p>
                <span
                  v-for="(itemchild,indexchild) in item.objectOne" :key="indexchild"
                  @click="chooseClass(itemchild.bjdm,itemchild.bjmcs)"
                  class="bjName"
                  :class="{'on':itemchild.bjdm==classcode}"
                >{{itemchild.bjmcs}}</span>
          </div>
        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
  import { api } from "../../../utils/Api/index";
  export default {
    name: "home",
    data(){
      return {
        isSetShow: false,//是否显示设置常用班级弹层
        userinfo:'',//用户信息
        newFaka:[],//最新发卡
        lybData:[],//琅琊榜信息
        adminName:'',//所显示的名称
        classDt:[],//班级动态
        isClue:localStorage.getItem('isClue') == 'true' ? true : false,//是否显示设置班级提示
        classData:[],//老师所带班级数组
        dtNum:'',
        classcode:'',
        showchooseClass:'全校',
        qxlist:[],//权限列表
        usertype:'',
        schoolName:''
      }
    },
    methods: {
      changeClass(){
        this.isSetShow = true;
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          setTimeout(done, 1000);
        } else {
          done();
        }
      },
      saveSet(){//点击保存设置的常用班级

      },
      close(){
        this.isSetShow = false;
      },
      
      /**
       * @description: 获取最近卡片  发卡或获卡
       * @param {type} 
       * @return: 
       */
      getNewKpxxList(){
        let that = this;
        window.localStorage.setItem('istoken',true);
        this.$fetch(api.getNewKpxxList(),{userid: localStorage.getItem('userid'),usertype:localStorage.getItem('usertype'),xxdm:localStorage.getItem('xxdm')}).then(res=>{
          this.newFaka = res.data.length <= 2 ? res.data : res.data.slice(0,2);
        });
      },
      
      /**
       * @description: 查询琅琊榜榜主
       * @param {type} 
       * @return: 
       */
      async getTopKpxxList(){
        this.$post(api.getTopKpxxList(),{zgh: localStorage.getItem('zgh'),xndm:localStorage.getItem('xn'),xqdm:localStorage.getItem('xq'),xxdm:localStorage.getItem('xxdm')},{headers:'application/json'}).then( res =>{
          
          this.lybData = res.data;
        });
        
      },

      /**
       * @description: 跳转到获卡页面
       * @param {type} 
       * @return: 
       */
      renderCardRecord(){
        this.$router.push('/pages/teacher/cardRecord/cardRecord');
      },
      /**
       * @description: 查询最新班级动态
       * @param {type} 
       * @return: 
       */
      async getXxdtList(){
        this.$fetch(api.getXxdtList(),{xxdm:localStorage.getItem('xxdm'),userid: localStorage.getItem('zgh'),usertype:localStorage.getItem('usertype'),classCode:this.classcode}).then(res=>{
          this.classDt = res.data.content.length <= 15 ? res.data.content : res.data.content.slice(0,15);
        });
      },
      /**
       * @description:  不再提示设置常用班级
       * @param {type} 
       * @return: 
       */  
      noClue(){
        localStorage.setItem('isClue',false);
        this.isClue = false;
      },
      /**
       * @description: 切换班级动态的班级
       * @param {type} 
       * @return: 
       */
      async getQxBjList(){
        var {data} = await this.$fetch(api.getQxBjList(),{zgh:localStorage.getItem('zgh'),xxdm:localStorage.getItem('xxdm'),xndm:localStorage.getItem('xn')});//localStorage.getItem('zgh')   localStorage.getItem('xxdm')  localStorage.getItem('xn')
        this.classData = data;
        if(this.classData.length != 0){
          this.showchooseClass = this.classData[0].objectOne[0].bjmcs;

          this.classcode = this.classData[0].objectOne[0].bjdm;
        }
        this.getXxdtList();
      },
      /* 跳转到设置班级页面 */
      rendersetClass(){
        this.$router.push('/pages/teacher/setClass');
      },
      /**
       * @description: 查看班级动态未读数量
       * @param {type} 
       * @return: 
       */
      async getXxdtNum(){
        let user;
        let usertype =localStorage.getItem('usertype');
        this.$fetch(api.getXxdtNum(),{xxdm:localStorage.getItem('xxdm'),userid: localStorage.getItem("zgh"),usertype:usertype}).then(res=>{

          this.dtNum = res.data;
        });
      },
      chooseClass(classcode,bjmcs){
        this.classcode = classcode;
        this.isSetShow = false;
        this.showchooseClass = bjmcs;
        this.getXxdtList();
      },
      /* z跳转到琅琊榜页面 */
      renderRanking(){
        this.$router.push('/pages/teacher/rankingList/rankingHome');
      },
      /** 
       * 首页权限的显示
      */
      async qxlistFun(){
        var {data} = await this.$fetch(api.qxlist(),{xxdm: localStorage.getItem('xxdm')});
        data.forEach((item,index) =>{
          if(item.ydgnlx == 1){
            this.qxlist.push(item)
          }
        })
        this.qxlist = data;
      },
      
      /** 
       * 查询是否有权限
       * raq
      */
      async findqx(key){
        let that = this;
        await that.qxlistFun() 
        let index = this.qxlist.findIndex(item =>{
          return item.ydgndm == key
        })
        return index
      },
    },
    mounted() {
      this.usertype =localStorage.getItem('usertype')
      Promise.all([this.getNewKpxxList(),this.getQxBjList(),this.getTopKpxxList(),this.getXxdtNum()])
      this.adminName = localStorage.getItem('truename');
      this.schoolName = localStorage.getItem('xxmc');
      this.$store.dispatch('setSelectStudent',[]);
      this.$store.dispatch('setSelectAllClass',[]);
      this.$store.dispatch('setSelectAllGrade',[]);
      this.$store.dispatch('setSelectCard',{});

    },
    
  }
</script>

<style scoped lang="scss">
@import '../../../style/style.scss';
  .flod-enter-active{
    animation-name:fadeInRight;animation-duration:.5s;
  }
  .layer-enter-active{
    animation-name:fadeInRight;animation-duration:.5s;
  } 
  .layer-leave-active{
      animation-name:fadeOutLeft;animation-duration:.5s;
  } 
  .warp{
    width: 100%;
    height: 100%;
    .tipsP{
      font-size: px2rem(30px);
      padding-left:px2rem(30px);
      padding-bottom:px2rem(60px);
      padding-top:px2rem(40px);
    }
    .top{
      width: 100%;
      height: px2rem(350px);
      position: relative;
      img{
        width: 100%;
      }
      p{
        position: absolute;
        left: px2rem(95px);
        top:px2rem(130px);
        color:#0f0629;
        font-size: px2rem(34px)
      }
    }
    .tip{
      width: px2rem(688px);
      height: px2rem(53px);
      background-color: #F0F3F8;
      border-radius: px2rem(30px);
      margin: px2rem(40px) auto;
      overflow: hidden;
      display: block;
      img{
        width: px2rem(34px);
        height: px2rem(30px);
        margin: px2rem(12px) px2rem(20px);
        display: block;
        float: left;
      }
      p{
        float: left;
        line-height: px2rem(53px);
      }
      .tipP{
        color: #999;
        line-height: px2rem(56px);
        margin-right: px2rem(50px);
        font-size: px2rem(26px);
      }
      .notip{
        color: #3e81ff;
        font-size: px2rem(23px);
        margin-right: px2rem(30px);
        float: right;
      }
    }
    .hengwarp{
      position: relative;
      width: 100%;
      margin-top:px2rem(30px);
      p{
        width: px2rem(260px);
        height: px2rem(40px);
        text-align: center;
        line-height: px2rem(40px);
        font-size: px2rem(28px);
        margin:0 auto;
      }
      img{
        margin: px2rem(20px) auto;
        display: block;
        width: px2rem(589px);
        position: absolute;
        top: px2rem(0px);
        left: px2rem(70px);
      }
    }
    .gongneng{
      width: 90%;
      margin:px2rem(50px) auto;
      
      .gong-1,.gong-2,.gong-3,.gong-4{
        width: px2rem(88px);
        height: px2rem(88px);
        margin:px2rem(20px) auto;
        img{
          width: px2rem(88px);
          height: px2rem(88px);
        }
      }
      p{
        text-align: center;
        color: #303133;
        font-size: px2rem(32px);
        font-weight: 600;
      }
      .dtNumWarp{
        position: relative;
        .dtNum{
          position: absolute;
          width: px2rem(40px);
          height: px2rem(40px);
          background-color: #ff3b30;
          top: px2rem(20px);
          right:px2rem(30px);
          text-align: center;
          line-height: px2rem(50px);
          color:#fff;
          font-size: px2rem(26px);
          border-radius: 50%;
        }
      }
      
    }
    .grayline{
      width: 100%;
      background-color: #eff1f3;
      height: px2rem(20px);
    }
    .getcard{
      width: 100%;
      padding:0 px2rem(32px);
      display: block;
      .cardtitle{
        width: 100%;
        height: px2rem(100px);
        line-height: px2rem(100px);
        // margin-top:px2rem(50px);
        // margin-bottom:px2rem(40px);
        P{
          font-size: px2rem(34px);
          
        }
        .cardleft{
          float: left;
          color:#303133;
          font-weight: 600;
        }
        .cardright{
          float: right;
          color:#909399;
          img{
            width: px2rem(30px);
          }
        }
        .cardright.more{
          background: url(../../../assets/arrow_right.png) no-repeat right center;
          background-size: auto 35%;
          font-size: px2rem(30px);
          padding-right: px2rem(30px);
        }
        .cardright.change{
          background: url(../../../assets/changeicon.png) no-repeat right center;
          background-size: auto 30%;
          font-size: px2rem(30px);
          padding-right: px2rem(45px);
        }
      }
      .cardmain{
        .van-col{
          div{
            width: 100%;
            height: px2rem(150px);
            background-color: #999;
            border-radius: px2rem(10px);
            overflow: hidden;
            img{
              width: 100%;
              height: 100%;
            }
          }
          p:nth-child(2){
            color: #606266;
            font-size: px2rem(28px);
            margin-top: px2rem(20px);
            margin-bottom: px2rem(20px);

          }
          p:nth-child(3){
            color: #909399;
            font-size: px2rem(18px);
            margin-bottom: px2rem(50px);
          }
        }
      }
      .bangmain{
        .van-col{
          position: relative;
          .userInfo{
            float: left;
            padding-top:px2rem(50px);
            padding-left:px2rem(20px);
            width: px2rem(100px);
            img{
              width: px2rem(50px);
              height: px2rem(50px);
              box-shadow:0px 1px 3px #000;
              border-radius: 50%;
              margin:0;
              padding: 0;
            }
            p:nth-child(2){
              font-size: px2rem(24px);
              color:#fff;
            }
            p:nth-child(3){
              font-size: px2rem(24px);
              color:#fff;
            }
          }
          .cardLx{
            width: px2rem(170px);
            font-size: px2rem(30px);
            height: px2rem(60px);
            line-height: px2rem(60px);
            display: block;
            clear: both;
          }
          .cardNum{
            font-size: px2rem(30px);
            position: absolute;
            top:px2rem(80px);
            right:px2rem(40px);
            color:#fff;
          }
        }
        .van-col:nth-child(1){
          div{
            width: px2rem(208px);
            height: px2rem(214px);
            background-image: url('../../../assets/1bg.png');
            background-size: 100% 100%;
          }
        }
        .van-col:nth-child(2){
          div{
            width: px2rem(208px);
            height: px2rem(214px);
            background-image: url('../../../assets/2bg.png');
            background-size: 100% 100%;
          }
        }
        .van-col:nth-child(3){
          div{
            width: px2rem(208px);
            height: px2rem(214px);
            background-image: url('../../../assets/3bg.png');
            background-size: 100% 100%;
          }
        }
      }
      .dongtaimain{
        .dongtaiLi{
          border-bottom: px2rem(2px) solid #EAEAEA;
          padding:px2rem(30px) 0;
        }
        .viainfo{
          .via{
            width: px2rem(64px);
            height: px2rem(64px);
            border-radius: 50%;
            background-color: #909399;
             img{
            width: 100%;
            height: 100%;
          }
          }
          .via,.name{
            float: left;
          }
          .name{
            margin-left: px2rem(30px);
            p:nth-child(1){
              color:#303133;
              font-size: px2rem(29px);
              
            }
            p:nth-child(2){
              color:#909399;
              font-size: px2rem(18px);
              line-height: px2rem(50px);
              height: px2rem(50px);
            }
          }
        }
        .dongtaicontent{
          color:#303133;
          font-size: px2rem(28px);
          line-height:px2rem(40px);
        }
        .cardType{
          font-size: px2rem(28px);
          color:#909399;
          line-height: px2rem(50px);
        }
      }
      .solidline{
        width: 100%;
        height: px2rem(2px);
        background-color: #EAEAEA;
        margin:px2rem(40px) auto;
      }
    }
    .fade{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.6);
      position: fixed;
      top: 0;
      left: 0;
      .showChange{
        width: px2rem(600px);
        background-color: #fff;
        border-radius: px2rem(20px);
        margin: px2rem(200px) auto;
        padding:px2rem(30px) px2rem(40px);
        height: px2rem(800px);
        overflow-y: scroll;
        .showtop{
          position: relative;
          p{
            font-size: px2rem(34px);
            font-weight: 600;
            height: px2rem(50px);
            line-height: px2rem(50px);
            float: left;
            display: block;
          }
          .close{
            width: px2rem(30px);
            position: absolute;
            top: px2rem(10px);
            right:0;
          }
        }
      }
      .classmain{
        height:px2rem(700px);
        
        .classtitle{
          font-size: px2rem(32px);
          // margin-left: px2rem(34px);
          color:#000;
        }
        .tags{
          width: px2rem(240px);
          text-align: center;
          font-size: px2rem(26px);
          font-family:'PingFang-SC-Bold';
          margin-top: px2rem(20px);
          border-radius: px2rem(30px);
          padding:px2rem(14px) px2rem(15px);
          margin-left:px2rem(5px);
          height: px2rem(60px);
        }
        .saveset{
          width: px2rem(520px);
          height: px2rem(88px);
          background-color: #3e81ff;
          color:#fff;
          font-size: px2rem(34px);
          line-height: px2rem(88px);
          text-align: center;
          border-radius: px2rem(40px);
          margin: px2rem(30px) auto;
          
        }
        .classwarp{
          padding-top:px2rem(30px);
          div{
            float: left;
          }
        }
      }
    }
 
    .bjName {
      padding: 0 px2rem(35px);
      display: inline-block;
      height: px2rem(64px);
      line-height: px2rem(64px);
      border-radius: px2rem(30px);
      border: 1px solid #e0e0e0;
      color: #606060;
      margin-right: px2rem(20px);
      margin-top: px2rem(20px);
      font-size: px2rem(30px);
    }
    .bjName.on {
      background: #3e81ff;
      border: 1px solid #3e81ff;
      color: #fff;
    }
    
 
  }
</style>

<style lang="scss">
  @import '../../../style/style.scss';
   
</style>

