<template>
  <div class="selectCard">
        <div class="m_selectMian">
            <div @click="selectCard(item)" class="activeimg" v-for="(item,index) in cardList" :key="index">
                <!-- <img @click="selectCard" :src="item.tplj?item.tplj:'/static/img/test1.png'"/> -->
                <img :src="item.tplj"/>
                <p class="cardNum">剩余{{item.kpsl}}张</p>
            </div>
        </div>
  </div>
</template>

<script>
  import { api } from "../../../utils/Api/index"
  
export default {
    name:'selectCard',
    data() {
        return {
            cardList:[],  //卡牌列表
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init(){
          if(localStorage.getItem('usertype') == '3' || localStorage.getItem('usertype') == '2'){//教师
            let studentList = this.$store.getters.getSelectStudent;
            let classList = this.$store.getters.getSelectAllClass;
            let {data} = await this.$fetch(api.getKplxByCountList(),{ckr:localStorage.getItem('zgh'),ckrlx:'ls',xxdm:localStorage.getItem('xxdm'),dqxn:localStorage.getItem('xn'),dqxq:localStorage.getItem('xq')});
            //this.cardList = data;
            if(studentList.length == 0 && classList.length == 0){
              this.cardList = data
            }else{//根据所选班级去帅选卡片
              //console.log(data,565655555)
              data.forEach((item,index)=>{
                studentList.forEach((citem,cindex)=>{
                  //console.log(citem,66666666)
                  item.gradeList.includes(citem.njdm) ? this.cardList.push(item) : ''
                })
                
                classList.forEach((sitem,sindex)=>{
                  //console.log(item.gradeList.includes(sitem.njdm))
                  //console.log(sitem,7777777777777)
                  item.gradeList.includes(sitem.njdm) ? this.cardList.push(item) : ''
                })
              })

              this.cardList = _.uniqBy(this.cardList, "kpid");//去重
            }

          }else{
            let {data} = await this.$fetch(api.getKplxByCountList(),{ckr:localStorage.getItem('xh'),ckrlx:'jz',xxdm:localStorage.getItem('xxdm'),dqxn:localStorage.getItem('xn'),dqxq:localStorage.getItem('xq')});
             this.cardList = data;
          }
            
           
            //console.log(this.cardList)
        },
        selectCard(item){
            if(item.kpsl == 0){
              this.$toast('卡片数量不足，需后台设置后才能发卡！')
              return;
            }
            this.$emit('submitCard',item);
        }

        // toggle(index) {
        // this.$refs.checkboxes[index].toggle();
        // }
    }
}
</script>

<style scoped lang="scss">
@import '../../../style/style.scss';
  body{
    background-color: #fff !important;
    position: relative;
  }
  .selectCard{
      width: 100%;
      height: 100%;
      flex: 1;
      position: fixed;
      top: 0;
      left: 0;
      background: #FFF;
      overflow: auto;
      .m_selectMian{
            width: 100%;
            height: 100%;
            padding:px2rem(20px) 2.5%;
      }
        .activeimg{
            height: px2rem(180px);
            width: 46%;
            margin:2%;
            float: left;
            position: relative;
            border-radius: px2rem(20px);
            overflow: hidden;
            img{
            width: 100%;
            border-radius: px2rem(20px);
            height: 100%;
            display: block;
            }
            div{
            width: 100%;
            height: px2rem(150px);
            border-radius: px2rem(20px);
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0,0,0,0.4);
            display: block;
            div{
                width: px2rem(50px);
                height: px2rem(50px);
                background-color: #3E81FF;
                border-radius: px2rem(50px);
                margin:px2rem(56px) 43% ; 
                .van-icon{
                color:#fff;
                font-size: px2rem(30px);
                display: block;
                margin:0 auto;
                line-height: px2rem(50px);
                text-align: center;
                z-index: 1;
                }
            }
            
            }
            .cardNum{
            position: absolute;
            bottom: px2rem(30px);
            right:px2rem(20px);
            font-size: px2rem(26px);
            padding:px2rem(10px) px2rem(15px);
            background: rgba($color: #FFFFFF, $alpha:0.7);
            border-radius: px2rem(10px);
            }
        .activeimg.check::after{
            content: '\20';
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: 0.4);
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
        }
        .activeimg.check::before{
            content: '\20';
            width: 100%;
            height: 100%;
            background: url(../../../assets/dot_sel_cur.png) no-repeat center;
            background-size: auto 50%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
      }
    .groupwarp{
      height: px2rem(160px);
      margin-top:px2rem(30px);
      margin-left: px2rem(30px);
      .groupleft{
        width: px2rem(413px);
        float: left;
        height: 100%;
        margin-left: -4px;
      }
      .groupmid{
        height: 100%;
        float: left;
        width: 0.10667rem;
        z-index: 44;
        background-image: radial-gradient(transparent 0, transparent 7px, #f0f3f8 2px);
        background-size: 15px 8px;
        background-position: 5px 18px;
        position: relative;
        &::before {
          content: ' ';
          display: block;
          background-color: #f0f3f8;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0px;
          right: 3px;
          z-index: 0;
        }
      }
      .groupright{
        float: left;
        background-color: #f6d989;
        width: px2rem(228px);
        height: 100%;
        border-top-left-radius: px2rem(14px);
        border-bottom-left-radius: px2rem(12px);
        p{
          display: block;
          height: px2rem(50px);
          padding-left:px2rem(20px);
        }
        p:nth-child(1){
          font-size: px2rem(30px);
          color:#303133;
          height: px2rem(60px);
          line-height: px2rem(80px);
          border-bottom:0.5px solid #e3e3e3;
        }
        p:nth-child(2){
          font-size: px2rem(28px);
          color:#606266;
          padding-top:px2rem(14px);
        }
        p:nth-child(3){
          font-size: px2rem(28px);
          color:#606266;
          padding-top:px2rem(10px);
        }
      }
      
    }
  }

</style>
<style lang="scss">
  @import '../../../style/style.scss';
  .selectCard{
    position: relative;
    .van-checkbox{
      margin:0 auto;
      .van-checkbox__icon, .van-checkbox__label{
        margin:px2rem(50px) px2rem(10px);
        
      }
      
    }
  }
</style>
