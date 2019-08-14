<template>
  <div class="cardDetail">
    <div class="detailtop">
        <img class="cardpic" :src="cardItem.tplj" />
        <img class="bg" src="/static/img/graybg.png"/>
        <p>剩余：{{cardItem.kpsl}}张</p>
    </div>
    <div v-if="!isGiveCard" @click="changecard" class="changecard">切换卡片</div>
    <div class="grayline"></div>

    <div class="write">
        <div v-if="iskpfx">
          <van-cell-group v-if="actions.length > 0">
              <van-field v-model="actionsheetVal" required clearable label="考评分项" placeholder="点击选择考评分项"  readonly @click="changekpfx">
              <van-p slot="p" size="small" type="primary">{{actionsheetVal}}</van-p>
              </van-field>
          </van-cell-group>
        </div>
        <van-actionsheet
            v-model="showkpfx"
            :actions="actions"
            cancel-text="取消"
            @select="onSelectkpfx"
            @cancel="onCancelkpfx"
        />
        <van-field
            required
            clearable
            label="写评语"
            placeholder="请选择下方评语，可编辑"
            readonly
        />
        <div class="pinyu">
            <span :class="{'active':item.check}" v-for="(item,index) in PyList" @click="SelectPy(item)">{{item.pynr}}</span>
        </div>
        <textarea v-model="pyText" class="pinyutext"></textarea>
    </div>

    <div class="grayline"></div>
    <van-cell title="发卡时间" is-link @click="changetime" :value="currentDateVal" />
    <van-datetime-picker class="datetimepicker"
      v-model="currentDate"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      v-show="showtime"
      @confirm="confirmTime"
      @cancel="cancelTime"
      :visible-item-count="4"
    />
    <div class="addpic">
        <p>添加图片</p>
        <!-- <img src="" /> -->
        <!-- <div class="m_uploadimgMain">
              <ul>
                <li v-for="(item,index) in attachmentList">
                    <img v-if="item.type=='image'" :src="item.showimg">
                    <video v-if="item.type=='video'" :src="item.showimg"></video>
                    <img class="clearIcon" src="/static/img/dot-cleartxt.png" @click="delImg(item)"/>
                </li>
                <li class="f_adduploadimg" v-if="showAddImg">
                    <input type="file" class="addFile" @change="changefile">
                </li>
              </ul>
        </div> -->
      <addPic/>
    </div>

    <div class="tijiao" v-if="!funDone" @click="saveJLK">提交</div>
     <div class="tijiao" v-else>提交</div>
    <div class="mask" v-show="isMask"></div>


    <transition name="flod">
        <component v-show="isChangeCard" :is="currentView" @submitCard="submitCard"></component>
    </transition>



  </div>
</template>

<script>
import { api } from "../../../../utils/Api/index"
import * as utilsfun from "../../../../utils/functions.js";
import comp_SelectCard from '../../commons/selectCard.vue';
import addPic from '../../commons/addPic.vue';
import md5 from 'js-md5';
export default {
    name:'cardDetail',
    data() {
        return {
          isChangeCard:false,//是否切换卡牌
          currentView:"",
          actions:[],    //考评分项
          showkpfx:false,//是否展示选择切换考评分项
          minHour: 10,
          maxHour: 20,
          minDate: new Date(),
          maxDate: new Date(2019, 10, 1),
          currentDate: new Date(),
          currentDateVal:utilsfun.formateDateAndTimeToString(new Date()),
          showtime:false,//是否显示选择时间
          actionsheetVal:'',
          PyList:[],
          curKpzFx:{},    //卡片子分项
          pyText:'',   //卡片评语
          cardItem:{}, //选择的当前卡片
          selectStudent:[],//选中的学生List
          attachmentList:[],//上传文件附件照片或者视频列表
          isGiveCard:false,       //是否是从动态里过来的给与卡片
          isMask:false,
          AllSelectStudent:[], //选中的所有学生列表（全选班级，全选年级）都包含在内
          //showAddImg:true,//是否显示添加按钮按钮
          listId:'',// 从列表点击发卡 传入放入id
          iskpfx:false,// 是否展示考评分项 false 代表卡片的kpfx为0  则在该页面不显示考评分项字段，获取评语传卡片id   为true 代表显示考评分项  获取评语传所选择的考评分项的id
          getPyId:'',// 获取评语的id  
          funDone:false,//提交发卡后 请求是否完成  防止重复点击
        }
    },
    components: {
        comp_SelectCard,
        addPic
    },
    mounted(){
            this.iskpfx = this.$route.query.iskpfx == 1 ? true :false;
            this.getPyId = this.$route.query.iskpfx == 1 ? '' : this.$route.query.cardId;
            this.init();
    },
    methods: {
        async init(){
            //判断是不是给与卡片，还是老师主动发卡（给与卡片是不能切换卡片类型）
            this.isGiveCard = this.$route.query.type=="givecard"?true:false;
            this.listId = this.$route.query.id;
            if(this.isGiveCard){
             
              var getCard = await this.$fetch(api.getCardMessage(),{jlid:this.listId,kplx:this.$route.query.kplx,kpzlx:this.$route.query.kpzlx,zgh:localStorage.getItem('zgh'),xxdm:localStorage.getItem('xxdm'),xndm:localStorage.getItem('xn')});
              
              this.$store.dispatch("setSelectCard", {
                isCheck: true,
                iskpfx: getCard.data.kpzlx == '' ? 0: 1,
                kpid: getCard.data.kplx,
                kpmc: getCard.data.parentKpmc,
                kpsl: getCard.data.number,
                sfsj: getCard.data.sfsj,
                tplj: this.$route.query.tpmc,
              });
              let studentInfo = getCard.data.dtjsrlist;
              //console.log(studentInfo,6666)
             // console.log(studentInfo,8888)
              studentInfo.forEach((item,index) =>{
                this.selectStudent.push({
                  bjdm: item.jsrbjdm,
                  bjmc: item.jsrbjmc,
                  njdm: item.njdm,
                  xh: item.jsrdm,
                  xm: item.jsrxm,
                })
              })

              //console.log(this.selectStudent,4444444);
              this.PyList = getCard.data.pylist;
              this.cardItem = this.$store.getters.getSelectCard;
            }else{
              this.cardItem = this.$store.getters.getSelectCard;
              //获取当前卡片评语
              if(!this.iskpfx){
                var res = await this.$fetch(api.getPyList(),{xxdm:localStorage.getItem("xxdm"),id:this.getPyId});
                this.PyList = res.data;
              }

              if(!this.cardItem.kpid){
                this.$toast('卡片类型不能为空')
                this.$router.push({path:'/pages/teacher/cardRecord/postCard'});
                return
              }
              //整理选中学生的数据 
              this.formatAllStudentList();
            }
            //获取当前选中的卡片类型
            
            
            
            
            //获取所有卡片类型和分项
            var res = await this.$fetch(api.getKpFxList(),{xxdm:localStorage.getItem("xxdm"),kpid:this.cardItem.kpid});
            this.actions = res.data;
            //整理卡牌分项的数据
            this.formatKpFx(this.actions);

            



        },
        /**
         * 说明:选中默认评语
         * 作者:RayJ
         * 更新时间:2019-03-18
         */
        SelectPy(item){
            // console.log(item);
            this.$set(item,"check",!item.check);
            if(!item.check){
              this.pyText = this.pyText.replace(item.pynr + ';',"");
            }else{
              this.pyText = this.pyText  + item.pynr + ';';
            }
        },
        /**
         * 说明:格式化卡片分项
         * 作者:RayJ
         * 更新时间:2019-03-18
         */
        formatKpFx(itemList){
          for(var i=0;i<itemList.length;i++){
            itemList[i].name = itemList[i].fxmc;
          }
        },
        /**
         * 说明:格式化选择学生数组
         * 作者:RayJ
         * 更新时间:2019-03-18
         */
        formatSelStudent(itemList){
          this.selectStudent = [];
          for(var i=0;i<itemList.length;i++){
            var obj = {}
            obj.bjdm = itemList[i].bjdm;
            obj.bjmc = itemList[i].bjmc;
            obj.njdm = itemList[i].njdm;
            obj.xh = itemList[i].xh;
            obj.xm = itemList[i].xm;
            this.selectStudent.push(obj);
          }
          //console.log(this.selectStudent,555555555555)
        },
       
        /**  说明:格式化附件图片或者视频的数组格式
         * 作者:RayJ
         * 更新时间:2019-03-19
         */
        formatAttachment(itemList){
          var returnArr=[];
          for(var i=0;i<itemList.length;i++){
            var obj = {};
            obj.fjdx = itemList[i].size;
            obj.fjlx = itemList[i].type;
            obj.fjmc = "";
            obj.fjmcsmall = "";
            obj.fjymc = itemList[i].name;
            obj.sclj = itemList[i].url;
            obj.scsj = utilsfun.formateDateAndTimeToString(new Date());
            obj.tpgd = "0";
            obj.tpkd = "0";
            obj.xxdm = localStorage.getItem("xxdm");
            obj.xxid = "";
            returnArr.push(obj)
          }
          return returnArr
        },
        /**
         * 说明:保存提交激励卡
         * 作者:RayJ
         * 更新时间:2019-03-19
         */
        async saveJLK(){
          // console.log(this.selectStudent,8877777)
          //  console.log(this.selectStudent.length,8877777)
            this.funDone = true;
            if(!this.isGiveCard){
              if(this.actions.length>0&&this.actionsheetVal==""){
                this.$toast({message:'请选择考评分项',duration:1000});
                this.funDone = false;
                return
              }
            }
            if(this.pyText==""){
                this.$toast({message:'请填写评语',duration:1000});
                this.funDone = false;
                return
            }
          
            if(this.pyText.length > 1500){
                this.$toast({message:'评语字数过长，请删减！',duration:1000});
                this.funDone = false;
                return
            }
            if(this.selectStudent.length==0){
                this.$toast({message:'请选择发卡的对象',duration:1000});
                this.funDone = false;
                return
            }
            if(this.cardItem.kpsl==0){
                this.$toast({message:'卡片数量不足',duration:1000});
                this.funDone = false;
                return
            }
             if(localStorage.getItem('stuAttachmentList') != ''){
              let imgArr = JSON.parse(localStorage.getItem('stuAttachmentList'));
              this.attachmentList = imgArr
            }
          // return;
            var fjList = this.formatAttachment(this.attachmentList);
           // console.log(this.attachmentList,666)
            
            var parmaobj = {
                bfsj: this.currentDateVal,
                ckr: localStorage.getItem("zgh"),
                ckrlx: "ls",
                ckrxm: localStorage.getItem("truename"),
                fjList:fjList,  //图片信息
                fkpy: this.pyText,
                kplx: this.cardItem.kpid,
                kpzlx:this.curKpzFx.fxid,
                kpmc: this.cardItem.kpmc,
                sfsj: this.cardItem.sfsj,
                xndm: localStorage.getItem("xn"),
                xqdm: localStorage.getItem("xq"),
                xsList: this.selectStudent,
                xxdm: localStorage.getItem("xxdm"),
            }
            if(this.isGiveCard){
              await this.$fetch(api.updateAllDo(),{id:this.listId,lx:"sffk",value:"1"})
            }
           
            var res = await this.$post(api.saveJlkSave(),parmaobj,{headers:'application/json'})
            this.funDone = false;
            if(res.status==200){
              this.$toast({message:'发卡成功',duration:1000});
              localStorage.setItem("stuAttachmentList",'');
              if(this.isGiveCard){
                this.$fetch(api.updateAllDo(),{id:this.listId,lx:"fkjlid",value:res.data})
              }
              this.$router.push({path:'/pages/teacher/cardRecord/cardRecord'})
            }else{
              this.$toast({message:res.message,duration:1000});
            }
            this.$store.dispatch('setSelectStudent',[]);
            this.$store.dispatch('setSelectAllClass',[]);
            this.$store.dispatch('setSelectAllGrade',[]);
            this.$store.dispatch('setSelectCard',{});
        },
        /**
         * @description:切换卡片 
         * @param {type} 
         * @return: 
         */
        async changecard(){
          //console.log(444444444444444)
            this.isChangeCard =  true;
            this.currentView = "comp_SelectCard";
            this.PyList = [];
            this.actionsheetVal = '';
            this.pyText = '';
        },
        /**
         * @description: 切换考评分项
         * @param {type} 
         * @return: 
         */
        changekpfx(){
        this.showkpfx = true;
        },
        /**
         * @description: 取消评分项
         * @param {type} 
         * @return: 
         */
        onCancelkpfx(){
        this.showkpfx = false;
        },
        /**
         * @description: 选择考评分项
         * @param {type} 
         * @return: 
         */
        async onSelectkpfx(val){
          this.curKpzFx = val;
          this.actionsheetVal = val.name;
          this.showkpfx = false;
          this.getPyId = val.fxid;
          var res = await this.$fetch(api.getPyList(),{xxdm:localStorage.getItem("xxdm"),id:this.getPyId});
          this.PyList = res.data;
          //console.log(7777)
          this.pyText='';
        },
        /**
         * @description: 选择时间
         * @param {type} 
         * @return: 
         */
        changetime(){
        this.isMask = true
        this.showtime = true;
        },

        /**
         * @description: 选择时间点击确认
         * @param {type} 
         * @return: 
         */
        confirmTime(val){
            this.currentDateVal = utilsfun.formateDateAndTimeToString(val);
            //this.currentDate = utilsfun.formateDateAndTimeToString(val,'date');
            this.showtime = false;
            this.isMask = false
        },
        /**
         * @description: 选择时间点击取消 
         * @param {type} 
         * @return: 
         */
        cancelTime(){
        this.showtime = false;
        this.isMask = false
        },

        /**
         * 说明:格式化动态接收人
         * 作者:RayJ
         * 更新时间:2019-03-21
         */
        async formatAllStudentList(){
            //获取学生列表
            var studentdata =this.$store.getters.getSelectStudent;
            //console.log(studentdata,388888)
            //获取班级列表
            var classdata =this.$store.getters.getSelectAllClass;
            //获取年级列表
            //var gradedata =this.$store.getters.getSelectAllGrade;
            let classParam = [];
           // let gradeParam = [];  
            //生成获取班级学生需要的班级参数列表
            // console.log(studentdata,111111111111)
            // console.log(classdata,2222222222222)
            for(var i=0;i<classdata.length;i++){
                classParam.push(classdata[i].uuid);
            }
            //生成获取年级学生需要的年级参数列表
            // for(var i=0;i<gradedata.length;i++){
            //     gradeParam.push(gradedata[i].njdm);
            // }
            //如果有全选年级,获取年级下所有学生并concat到学生列表中
            // if(gradeParam.length>0){
            //     var grade_res = await this.$fetch(api.getStudentAllByGrade(),{xxdm:localStorage.getItem("xxdm"),dqxn:localStorage.getItem("xn"),list:gradeParam.toString()})
            //     // console.log(grade_res);
            //     studentdata = studentdata.concat(grade_res.data)
            // }
            //如果有全选班级,获取班级下所有学生并concat到学生列表中
            if(classParam.length>0){
                var class_res = await this.$fetch(api.getStudentAllByClass(),{xxdm:localStorage.getItem("xxdm"),dqxn:localStorage.getItem("xn"),list:classParam.toString()})
                // console.log(class_res);
                studentdata = studentdata.concat(class_res.data)
            }
            this.AllSelectStudent = studentdata;
            this.formatSelStudent(this.AllSelectStudent);
            // var dtjsrArr = [];
            
            // for(var i=0;i<studentdata.length;i++){
            //     dtjsrArr.push({jsrdm:studentdata[i].xh,jsrxm:studentdata[i].xm,jsrsfxz:"1"})
            // }
            // // console.log("dtjsrArr",dtjsrArr);
            // return dtjsrArr
        },
        /**
         * 说明:切换卡片
         * 作者:RayJ
         * 更新时间:2019-03-23
         */
        submitCard(item){
            //console.log(item);
            this.isChangeCard = false;
            this.currentView = "";
            this.$store.dispatch("setSelectCard",item);
            this.cardItem = item;
            this.getPyId = this.$route.query.iskpfx == 1 ? this.cardItem.kpid : this.$route.query.cardId;
            this.iskpfx = item.iskpfx == 1 ? true :false;
            this.init();
        },

        /**
         * 说明:删除图片
         * 作者:raq
         * 更新时间:2019-03-26
         */
        // delImg(item){
        //     var indexImg = this.attachmentList.findIndex(function(value, index, arr) {
        //         return value.name == item.name;
        //     })
        //     this.attachmentList.splice(indexImg,1);
        //     this.showAddImg = true;
        // },
    }
}
</script>

<style scoped lang="scss">
@import '../../../../style/style.scss';
  body{
    background-color: #fff !important;
    position: relative;
  }
  .flod-enter-active{
        animation-name:fadeInRight;animation-duration:.5s;
    }
  .cardDetail{
    width: 100%;
    height: 100%;
    
    .detailtop{
      width: 100%;
      height: px2rem(400px);
      position: relative;
      padding:px2rem(34px);
      .cardpic{
        border-radius: px2rem(30px);
        display: block;
        width: 100%;
        height: 100%;
      }
      .bg{
        position:absolute;
        left:px2rem(34px);
        bottom:px2rem(34px);
        width: 90%;
        border-bottom-left-radius:  px2rem(30px);
        border-bottom-right-radius:  px2rem(30px);
      }
      p{
        position:absolute;
        right: px2rem(60px);
        bottom:px2rem(40px);
        font-size: px2rem(30px);
        color:#fff;
        z-index: 9;
      }
    }
    .changecard{
      width: px2rem(200px);
      height: px2rem(60px);
      margin:0 auto px2rem(30px) auto;
      background-color: #F4F5F7;
      border-radius: px2rem(40px);
      color:#606266;
      font-size: px2rem(30px);
      text-align: center;
      line-height: px2rem(60px);
    }
    .grayline{
      width: 100%;
      height: px2rem(20px);
      background-color: #EFF1F3;
    }
    .write{
      .van-cell--required::before{
        left: px2rem(40px);
      }
      .pinyu{
        width: 100%;
        padding:0 px2rem(34px)  px2rem(10px)  px2rem(34px);
        span{
          background-color: #F4F5F7;
          color:#303133;
          font-size: px2rem(30px);
          border-radius: px2rem(30px);
          padding:px2rem(12px) px2rem(20px);
          display: inline-block;
          margin-right: px2rem(20px);
          margin-top:px2rem(20px);
        }
        .active{
          background-color: #3E81FF;
          color:#fff;
        }
      }
      .pinyutext{
        width: 90%;
        min-height: px2rem(220px);
        position: relative;
        margin:px2rem(34px);
        margin-top:px2rem(10px);
        border-radius: px2rem(20px);
        font-size: px2rem(30px);
        padding: px2rem(20px);
        border: 1px solid #e6e6e6;
      }
    }
    
    .clearIcon{
      left: 85%;
      top:14%;
      width: px2rem(40px);
      height: px2rem(40px);
    }
    .addpic{
      width: 100%;
      position: relative;
      padding:10px 15px;
      color: #333;
      float: left;
      p{
        font-size: px2rem(32px);
        font-weight: 600;
      }
      .addpicimg{
        width: px2rem(200px);
        margin-top:px2rem(30px);
      }
    }

    .tijiao{
      float: left;
      text-align: center;
      line-height: px2rem(88px);
      height: px2rem(88px);
      background-color: #3E81FF;
      color:#fff;
      width: px2rem(640px);
      font-size: px2rem(36px);
      border-radius: px2rem(50px);
      margin:0 px2rem(55px);
      position: relative;
    }
    
  }
    .m_uploadimgMain{
        float: left;
        margin-top: px2rem(40px);
        ul{
            width: 100%;
            float: left;
            clear: both;
        }
        li{
            width: px2rem(215px);
            height: px2rem(200px); 
            position: relative;
            overflow: hidden;
            float: left;
            background: #eff1f3;
            margin-right: px2rem(10px);
            margin-bottom:px2rem(20px);
            *{
                max-width: 100%;
                max-height: 100%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }
        }
        .f_adduploadimg{
            width: px2rem(215px);
            height: px2rem(200px);
            background: url(../../../../assets/upimgbg.png) #eff1f3 no-repeat center;
            background-size: auto 50%;
            position: relative;
            overflow: hidden;
            
            .van-uploader{
              width: 100%;
              height: 100%;
              position: absolute;
              opacity: 0;
              
            }
            .addFile{
              opacity: 0;
              width: 100%;
              height: 100%;
              z-index: 99;
              position: absolute;
              left: 50%;
              top: 50%;
              }
              .addImgIcon{
              width: px2rem(200px);
              height: px2rem(200px);
              img{
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  left: 0;
                  top: 0;
                  
              }
              }
              }
        .m_uploadinfo{
            float: left;
            width: 100%;
            padding-top: px2rem(20px);
            font-size: px2rem(24px);
            color: #909399;
        }
    }
    .datetimepicker{
      z-index: 550;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
    }
   
</style>
<style lang="scss">
  @import '../../../../style/style.scss';
  .cardDetail{
    .van-field .van-cell__title{
      margin-left:px2rem(40px);
      max-width:75px;
      span{
        font-size: px2rem(32px);
        font-weight:600;

      }
    }
    .van-cell__title{
      span{
        font-size:px2rem(32px);
        font-weight:600;
      }
    }
    .van-cell__value{
      span{
        color:#3E81FF;
        font-size:px2rem(32px);
      }
    }
    .van-field__control{
      text-align: right;
    }
  }
</style>
