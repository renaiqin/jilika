<template>
  <div class="scrollBoxWarp" ref="scrollBox" @scroll="watchScroll()">
    
    <!-- <div class="fade" v-if="loading">
        <van-loading />
    </div> -->
    <div class="m_w100">
      <div v-if="adminType != 4">
        <div
          class="teschSelectClass"
          @click="changeClass"
          v-if="activetype==1&&  userType!=4"
        >{{selClass.bj}}</div>
        <div class="teschSelectOrder" v-if="activetype==2">
          <div class="bjName" @click="selectOrder('time')" :class="{'on':order=='time'}">按时间顺序</div>
          <div class="bjName" @click="selectOrder('sffk')" :class="{'on':order=='sffk'}">未发卡优先</div>
        </div>
      </div>
      <div class="searchbox">
        <input
          type="search"
          @change="searchsubmit"
          v-model="searchVal"
          class="searchipt"
          ref="searchipt"
        >
        <img src="/static/img/dot-cleartxt.png" v-show="!isSearchIn" @click="clearSearch">
        <div class="searchNone" v-show="isSearchIn" @click="searchDynamic">
          <div class="holder">请输入姓名搜索</div>
        </div>
      </div>
    </div>

    <div class="m_dynamicMain">
      <div class="empty" v-if="dynamicList.length==0">别让这里空着哟~</div>
      <ul>
        <li v-for="(item,index) in dynamicList" >
          <div class="u_dynHead">
            <div class="u_Headimg">
              <img :src="item.xb == 2 ? '/static/img/gril.png' : '/static/img/boy.png'">

            </div>
            <div class="u_Headinfo">
              <div class="u_HeadName">{{item.xm}}</div>
              <div class="u_HeadTime"><span>{{item.fbdtsj}}</span>
              <span v-if="item.kjfw == 'gr'">仅学生自己可见</span>
              <span v-else-if="item.kjfw == 'qx'">全校可见</span>
              <span v-else>班级可见</span>
              </div>
            </div>

            <div class="u_card" v-if="item.sffk!=0">
              <img :src="item.tpmc">
            </div>
            <div class="u_card" v-else-if="adminType != 4" @click="sendCard(item)">
              <p>发卡</p>
            </div>
          </div>
          <div class="u_dynBody">{{item.fbnr}}</div>
          <div class="u_dynBody clearfix">
            <div class="imgpathlist clearfix" v-for="(sitem,sindex) in item.imgpathlist">
              <img :src="sitem.imgpath.indexOf('http') > -1 ? sitem.imgpath : 'http://115.231.105.146/'+sitem.imgpath">
            </div>
          </div>
          <div class="u_dynFoot">
            <div class="u_dynType">{{item.kplxmc}}</div>
            <div class="u_dynFrom">
              发布给
              <span v-for="(sitem,sindex) in item.dtjsrlist">{{sitem.jsrxm}},</span>
            </div>
            <div class="u_dynOpt">
              <div
                class="f_zan"
                :class="{on:checkZan(item.dzxxlist)}"
                @click="praise(item,index)"
              >{{item.dzxxlist.length}}</div>
              <div class="f_pl" @click="replyfun(true,item,'','',index)">{{item.replyLlist.length}}</div>
              <div class="f_del" v-if="item.fbrdm==usercode" @click="checkDelFb(item,index)">删除</div>
            </div>
          </div>
          <div class="u_praiseBox" v-if="item.dzxxlist.length>0">
            <span v-for="(sitem,sindex) in item.dzxxlist">{{sindex==0?"":","}} {{sitem.dzrxm}}</span> 觉得很赞
          </div>
          <div class="u_replyLlistBox" v-if="item.replyLlist.length">
            <div
              class="u_replyBox"
              v-for="(sitem,sindex) in item.replyLlist"
              @click="checkDel(sitem,item.id,index,sindex)"
            >
              <div v-if="sitem.bhfrdm==''">
                <span @click.stop="replyfun(false,sitem,item,'',index)">{{sitem.plrxm}}</span>
                :{{sitem.content}}
              </div>
              <div v-if="sitem.bhfrdm!=''">
                <span @click.stop="replyfun(false,sitem,item,'',index)">{{sitem.plrxm}}</span> 回复
                <span @click.stop="replyfun(false,sitem,item,true,index)">{{sitem.bhfrxm}}</span>
                :{{sitem.content}}
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="mask" v-show="isreply||ismask" @click="clearAll"></div>

    <transition name="reply">
      <div class="selectClassLayer" v-show="isSelectClass">
        <div class="layerTit">
          选择班级
          <span class="layerClose" @click="clearAll"></span>
        </div>
        <div class="layerCont">
          <div class="njCol" v-for="(item,index) in teacherClassList">
            <div class="njName">{{item.njmc}}</div>
            <span
              v-for="(sitem,sindex) in item.bjList"
              @click="changeClassDynamic(sitem)"
              class="bjName"
              :class="{'on':selClass.uuid==sitem.uuid}"
            >{{sitem.bj}}</span>
          </div>
        </div>
      </div>
    </transition>

    <transition name="reply">
      <div class="u_reply_layer" v-show="isreply">
        <div class="f_reply_tit">
          {{replyTit}}
          <span class="submit_reply" @click="submitReply">完成</span>
        </div>
        <textarea class="f_reply_area" v-model="replayContent"></textarea>
      </div>
    </transition>

    <transition name="list">
      <div class="botMenu" v-show="isDelReply">
        <div class="delopt" @click="DelReply">删除</div>
        <div class="cancel" @click="clearAll">取消</div>
      </div>
    </transition>
  </div>
</template>

<script>
import { api } from "../../../utils/Api/index";
import * as utilsfun from "../../../utils/functions.js";
import _ from "lodash";
import md5 from "js-md5";
export default {
  name: "DynamicList",
  props: ["active_type"],
  data() {
    return {
      userType: -1, //用户类型
      activetype: -1, //标签卡参数
      list_tit: "激励卡榜主名单",
      dynamicList: [],
      isSearchIn: true, //是否可以搜索
      isreply: false, //是否显示回复框
      replyTit: "写评语", //回复标题
      replayContent: "", //回复内容绑定
      studentObj: {}, //学生具体对象
      teacherObj: {}, //教师具体对象
      selfObj: {}, //登录人具体对象
      targetReplyObj: {}, //被回复人对象
      ismask: false,
      isDelReply: false, //是否显示删除确认菜单
      isSelectClass: false, //是否现实选择班级弹层
      tempDelReplyObj: {}, //删除评论的对象临时存放
      currentPage: 1, //当前页码
      maxpage: 1, //最大页码数
      isLoad: false,
      userType: "", //用户类型
      teacherClassList: [], //教师下的班级列表
      selClass: {}, //当前选择的班级OBJ
      usercode: "", //当前账号的编号xh或者zgh
      delRelayIndex: [], //所点击评论的id
      //isSelectMy:false,                               //是否显示我的动态切换  未发卡和时间排序
      order: "time", //查看排序方式 time 按时间排序   sffk:按照是否发卡排序
      // searchList:[],                                  //搜索数组
      searchVal: "", //搜索的内容
      adminType: "", //当前登录者的身份  教师或家长
      loading:true
    };
  },
  mounted() {
    this.init();
    
  },
  methods: {
    async init() {
      //分类信息赋值用户头部选择班级时的判断
      this.activetype = this.active_type;

      this.adminType = localStorage.getItem("usertype");

      //重新载入,页码和数据列表清空
      this.currentPage = 1;
      this.dynamicList = [];
      //this.searchList = [];
      //获取userType类型
      if (localStorage.getItem("usertype") == "3" || localStorage.getItem("usertype") == "2") {
        this.userType = "ls";
        this.usercode = localStorage.getItem("zgh");
      } else if (localStorage.getItem("usertype") == "4") {
        this.userType = "xs";
        this.usercode = localStorage.getItem("xh");
      }

      //获取登录用户对象信息
      this.selfObj = JSON.parse(localStorage.getItem("loginObj"));

      // console.log(this.selfObj);
      //
      //获取教师班级列表
      if (this.activetype == 1 && this.userType != "xs") {
        console.log(this.userType);
        var res = await this.$fetch(api.getTeacherClass(), {
          xxdm: localStorage.getItem("xxdm"),
          zgh: localStorage.getItem("zgh"),
          xndm: localStorage.getItem("xn")
        });
        this.teacherClassList = res.data;
        //默认为第一个年纪第一个班
        this.selClass = this.teacherClassList[0].bjList[0];
      } else {
        await this.getStudentInfo();
        //否则清空当前班级
        this.selClass = {};
      }

      //获取动态列表数据
      this.getDynamicList();
    },
    watchScroll() {
      //alert(5555555555555)
      // console.log(this.$refs.scrollBox.clientHeight);
      // console.log(this.$refs.scrollBox.scrollTop);
      // console.log(this.$refs.scrollBox.scrollHeight);
      if (this.$refs.scrollBox.clientHeight + this.$refs.scrollBox.scrollTop + 100 >
        this.$refs.scrollBox.scrollHeight
      ) {
        console.log("滚到底部了");
        if (!this.isLoad) {
          // console.log(555555555555555);
          // console.log(this.currentPage);
          if (this.currentPage < this.maxpage) {
            this.currentPage = this.currentPage + 1;
            this.getDynamicList();
            
          }
        }
      } else {
      }
    },
    /**
     * 说明:获取动态信息列表
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    async getDynamicList(search) {
      // console.log(this.isLoad);
      if (this.active_type != 2) {
        this.order = "time";
      }
      this.loading = true;
      if (!this.isLoad) {
        this.isLoad = true;
        var parmaobj = {
          type: this.userType == "xs" ? "student" : "teacher", //登陆人类型
          xxdm: localStorage.getItem("xxdm"), //学校代码
          zgh: this.selfObj.usercode ? this.selfObj.usercode : "", //职工号
          xh: this.selfObj.usercode ? this.selfObj.usercode : "", //学号
          currentPage: this.currentPage, //当前页码
          order: this.order, //排序方式(time:按时间排序(默认)，sffk:按照是否发卡排序)
          text: this.searchVal.trim(), //姓名模糊查询
          dotype:
            this.active_type == 0 ? "qx" : this.active_type == 1 ? "bj" : "gr", //动态类型:qx(全校动态)，bj(班级动态)，gr(个人动态)
          bjdm: this.selClass.uuid
            ? this.selClass.uuid
            : this.userType == "xs"
            ? this.studentObj.bjid
            : "", //班级代码(班级动态选择班级时候传过来的班级代码)

          xqdm: localStorage.getItem("xq"),
          xndm: localStorage.getItem("xn")
        };
        // console.log(5555555555);
        // console.log(this.studentObj);
        try {
          var res = await this.$fetch(api.getDynamicList(), parmaobj);
          this.loading = false;
          //console.log(res);
          this.maxpage = Math.ceil(res.data.totalElements / 10);
          if (res.data != "暂无数据") {
            // if(search){
            //     console.log(44444444444)
            //     this.searchList = this.dynamicList.concat(res.data.content);
            //     console.log(res.data.content)
            // }else{
            //console.log(6666666666666);
            this.dynamicList = this.dynamicList.concat(res.data.content);
            // console.log( this.dynamicList)
            //this.searchList = [];
            // }
          }
        } catch (e) {
        } finally {
          this.isLoad = false;
          this.loading = false;
        }
      }
      //console.log(this.dynamicList)
    },
    /**
     * 说明:切换班级显示弹层
     * 作者:RayJ
     * 更新时间:2019-03-21
     */
    async changeClass() {
      this.ismask = true;
      //if(type == 1){
      this.isSelectClass = true;
      //}else{
      //this.isSelectMy = true
      // }
      // console.log(res,216)
    },
    /**
     * 说明:切换班级切换数据
     * 作者:RayJ
     * 更新时间:2019-03-21
     */
    async changeClassDynamic(item) {
      this.selClass = item;
      this.dynamicList = [];
      this.currentPage = 1;
      this.getDynamicList();
      this.clearAll();
      //this.searchList = [];
    },
    /**
     * 说明:点击搜索提示层消失
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    searchDynamic() {
      this.isSearchIn = false;
      this.$refs.searchipt.focus();
      //this.searchList = [];
    },
    /**
     * 说明:搜索提交
     * 作者:raq
     * 更新时间:2019-03-27
     */
    searchsubmit() {
      // console.log(999999);
      // console.log(this.searchVal);
      this.currentPage = 1;
      this.dynamicList = [];
      this.getDynamicList();
    },
    /**
     * 说明:点击了遮罩层，清理所有弹层和数据
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    clearAll() {
      this.isSelectClass = false;
      this.isreply = false;
      this.ismask = false;
      this.isDelReply = false;
      this.replayContent = "";
      this.replyTit = "写评语";
      this.searchVal = "";
    },
    /**
     * 说明:点击了回复按钮
     * 参数:isReleaseUser是否是发帖人(true|false) ,item 回复人的相关对象用户姓名,xh等信息,baseitem 是发帖人对象, isbhfr 是否是被回复人,index 当前数组索引
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    replyfun(isReleaseUser, item, baseitem, isbhfr, index) {
      // console.log(isReleaseUser)
      //这里也许要判断自己给自己写回复
      this.isreply = true;
      if (isReleaseUser) {
        this.replyTit = "写评论";
        this.targetReplyObj.id = item.id;
        this.targetReplyObj.xm = "";
        this.targetReplyObj.dm = "";
        this.targetReplyObj.type = "";
      } else {
        if (!isbhfr) {
          this.targetReplyObj.id = baseitem.id;
          this.targetReplyObj.xm = item.plrxm;
          this.targetReplyObj.dm = item.plrdm;
          this.targetReplyObj.type = item.plrtype;
          this.replyTit = this.selfObj.name + " 回复 " + item.plrxm;
        } else {
          this.targetReplyObj.id = baseitem.id;
          this.targetReplyObj.xm = item.bhfrxm;
          this.targetReplyObj.dm = item.bhfrdm;
          this.targetReplyObj.type = item.bhfrtype;
          this.replyTit = this.selfObj.name + " 回复 " + item.bhfrxm;
        }
      }
      this.targetReplyObj.index = index;
    },
    /**
     * 说明:提交发布评论回复
     * 作者:RayJ
     * 更新时间:2019-03-16
     */
    async submitReply() {
      var obj = {
        replyid: md5(new Date().getTime() + this.selfObj.usercode),
        plrxm: this.selfObj.name,
        plrdm: this.selfObj.usercode,
        plrtype: "xs",
        bhfrxm: this.targetReplyObj.xm,
        bhfrdm: this.targetReplyObj.dm,
        bhfrtype: this.targetReplyObj.type,
        cjsj: utilsfun.formateDateAndTimeToString(new Date()),
        content: this.replayContent
      };
      if(this.replayContent.length == 0){
          this.$toast({ message: "内容不能为空！", duration: 1000 });
          return;
      }
      if(this.replayContent.length >140){
          this.$toast({ message: "内容长度不能超过140！", duration: 1000 });
          return;
      }
      var objstr = JSON.stringify(obj);
      var parmaobj = {
        id: this.targetReplyObj.id,
        obj: objstr,
        lx: "replyLlist"
      };
      var data = await this.$fetch(api.saveRelay(), parmaobj, {
        headers: "application/json"
      });

      // this.init();
      this.dynamicList[this.targetReplyObj.index].replyLlist.splice(
        this.dynamicList[this.targetReplyObj.index].replyLlist.length,
        0,
        {
          replyid: md5(new Date().getTime() + this.selfObj.usercode),
          plrxm: this.selfObj.name,
          plrdm: this.selfObj.usercode,
          plrtype: "xs",
          bhfrxm: this.targetReplyObj.xm,
          bhfrdm: this.targetReplyObj.dm,
          bhfrtype: this.targetReplyObj.type,
          cjsj: utilsfun.formateDateAndTimeToString(new Date()),
          content: this.replayContent
        }
      ); //像数组中加入评论内容
      this.$toast({ message: "评论成功", duration: 1000 });
      this.replayContent = "";
      this.isreply = false;
    },
    /**
     * 说明:获取学生信息
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    async getStudentInfo() {
      if (localStorage.getItem("usertype") == "4") {
        var { data } = await this.$fetch(api.getStudentMsg(), {
          xxdm: localStorage.getItem("xxdm"),
          xh: localStorage.getItem("xh")
        });
        this.$store.dispatch("setStudentInfo", data);
        this.studentObj = data;
      } else {
        console.log("我是教师");
      }
      //console.log(this.studentObj,181);
    },
    /**
     * 说明:点赞处理
     * 作者:RayJ
     * 更新时间:2019-03-14
     */
    async praise(item, index) {
      if (this.checkZan(item.dzxxlist)) {
        //取消点赞方法
        // console.log("我这里是取消赞的方法")
        var zanobj = _.find(item.dzxxlist, { dzrdm: this.selfObj.usercode });
        var parmaobj = {
          id: item.id,
          zid: zanobj.dzid,
          lx: "dzxxlist"
        };
        var data = await this.$fetch(api.delRelay(), parmaobj);
        var delIndex = _.findIndex(item.dzxxlist, {
          dzrdm: this.selfObj.usercode
        });
        var dzxxlist = item.dzxxlist.splice(delIndex, 1);
        // console.log(dzxxlist,88)
        //this.dynamicList.$set(index,{dzxxlist:item.dzxxlist})
        // this.$set(this.dynamicList[index],'dzxxlist',item.dzxxlist)
        // console.log(this.dynamicList[index],990)
      } else {
        //点赞方法
        var tempobj = {
          dzid: item.id + this.selfObj.usercode,
          dzrdm: this.selfObj.usercode,
          dzrtype: this.userType,
          dzrxm: this.selfObj.name
        };
        var objstr = JSON.stringify(tempobj);
        var parmaobj = {
          id: item.id,
          obj: objstr,
          lx: "dzxxlist"
        };
        //var dzxxlist = item.dzxxlist.splice(delIndex,1);

        //需要返回点赞ID..问后端要
        var data = await this.$fetch(api.saveRelay(), parmaobj);
        this.dynamicList[index].dzxxlist.splice(0, 0, {
          dzid: item.id + this.selfObj.usercode,
          dzrdm: this.selfObj.usercode,
          dzrtype: this.userType,
          dzrxm: this.selfObj.name
        });
        this.$toast({ message: "点赞成功！", duration: 1000 });
      }
    },
    /**
     * 说明:判断是否已经点赞
     * 作者:RayJ
     * 更新时间:2019-03-16
     */
    checkZan(item) {
      // console.log(this.selfObj.usercode)
      if (_.findIndex(item, { dzrdm: this.selfObj.usercode }) >= 0) {
        return true;
      } else {
        return false;
      }
    },
    /**
     * 说明:验证是否是自己发的帖子。是否有权限删除
     * 作者:RayJ
     * 更新时间:2019-03-16
     */
    checkDel(item, id, index, sindx) {
      // console.log(item,300);
      if (this.selfObj.usercode != item.plrdm) {
        return false;
      } else {
        this.delRelayIndex = [index, sindx];
        this.tempDelReplyObj = item;
        this.tempDelReplyObj.id = id; //把父类的id保存到这条评论上
        this.ismask = true;
        this.isDelReply = true;
      }
    },
    /**
     * 说明:删除整条记录
     * 作者:RayJ
     * 更新时间:2019-03-16
     */
    checkDelFb(item, index) {
      // this.tempDelReplyObj = item;
      // this.tempDelReplyObj.id = id;
      // this.ismask = true;
      // this.isDelReply = true;
      this.$dialog.confirm({
          message: '确定删除吗？'
      }).then(() => {
           var parmaobj = {
            id: item.id,
            zid: "null",
            lx: "all"
          };
          // console.log(parmaobj);
          this.$fetch(api.delRelay(), parmaobj, {
            headers: "application/json"
          }).then(res =>{
            this.dynamicList.splice(index, 1);
            this.$toast({ message: "删除成功！", duration: 1000 });
            this.clearAll();
          });
          // this.init();
          
      });


     
    },
    /**
     * 说明:删除自己的评论内容
     * 作者:RayJ
     * 更新时间:2019-03-16
     */
    async DelReply() {
      var parmaobj = {
        id: this.tempDelReplyObj.id,
        zid: this.tempDelReplyObj.replyid,
        lx: "replyLlist"
      };
      console.log(parmaobj);
      var data = await this.$fetch(api.delRelay(), parmaobj, {
        headers: "application/json"
      });
      // this.init();
      this.dynamicList[this.delRelayIndex[0]].replyLlist.splice(
        this.delRelayIndex[1],
        1
      );
      this.$toast({ message: "删除成功！", duration: 1000 });
      this.clearAll();
    },
    /**
     * 说明:教师发卡
     * 作者:RayJ
     * 更新时间:2019-03-20
     */
    sendCard(item) {
      //console.log(item,33)
      this.$router.push({
        path: "/pages/teacher/cardRecord/cardDetail",
        query: {
          type: "givecard",
          id: item.id,
          kplx: item.kplx,
          kpzlx: item.kpzlx,
          tpmc: item.tpmc,
          kplxmc: item.kplxmc
        }
      });
      // console.log("123123")
      // console.log(item)
    },
    /**
     * 说明:我的动态切换帅选条件
     * 作者:raq
     * 更新时间:2019-03-26
     */
    selectOrder(type) {
      this.order = type;
      this.dynamicList = [];
      this.currentPage = 1;
      this.getDynamicList();
      this.clearAll();
    },
    clearSearch() {
      this.currentPage = 1;
      this.dynamicList = [];
      this.searchVal = "";
      this.isSearchIn = true;
      this.getDynamicList();
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../style/style.scss";
.list-enter-active {
  animation-name: fadeInUp;
  animation-duration: 0.5s;
}
.list-leave-active {
  animation-name: fadeOutDown;
  animation-duration: 0.5s;
}
.reply-enter-active {
  animation-name: fadeInRight;
  animation-duration: 0.5s;
}
.reply-leave-active {
  animation-name: fadeOutLeft;
  animation-duration: 0.5s;
}
.scrollBoxWarp {
  width: 100%;
  height: 100%;
  padding: px2rem(30px);
  //float: left;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.m_w100 {
  width: 100%;
  // float: left;
}
.selectClassLayer {
  width: px2rem(650px);
  height: px2rem(500px);
  background: #fff;
  border-radius: px2rem(40px);
  position: fixed;
  top: 50%;
  left: 50%;
  padding: px2rem(30px);
  margin-top: px2rem(-250px);
  margin-left: px2rem(-325px);
  z-index: 550;
  .layerTit {
    width: 100%;
    font-size: px2rem(34px);
    color: #333;
    position: relative;
    font-weight: 700;
    .layerClose {
      display: block;
      position: absolute;
      width: px2rem(30px);
      height: px2rem(30px);
      top: 0;
      right: 0;
      background: url(../../../assets/layer_close.png) no-repeat center;
      background-size: 100%;
    }
  }
  .layerCont {
    overflow: auto;
    width: 100%;
    height: px2rem(400px);
    font-size: px2rem(28px);
    display: inline-block;
    margin-right: px2rem(15px);
    .njCol {
      width: 100%;
      padding-top: px2rem(40px);
      .njName {
        font-size: px2rem(30px);
        font-weight: 700;
        width: 100%;
        height: px2rem(50px);
        line-height: px2rem(50px);
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
      }
      .bjName.on {
        background: #3e81ff;
        border: 1px solid #3e81ff;
        color: #fff;
      }
    }
  }
}

.teschSelectClass {
  width: px2rem(200px);
  font-size: px2rem(30px);
  color: #666;
  line-height: px2rem(58px);
  height: px2rem(58px);
  float: right;
  text-align: right;
  padding: 0 px2rem(25px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background: url(../../../assets/arrow_right.png) no-repeat center right;
  background-size: auto 50%;
}
.teschSelectOrder {
  width: px2rem(380px);
  font-size: px2rem(30px);
  color: #666;
  line-height: px2rem(58px);
  height: px2rem(58px);
  float: right;
  text-align: right;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  background-size: auto 50%;
  div {
    float: left;
    margin-left: 5px;
    padding: 0 px2rem(10px);
    height: px2rem(58px);
    line-height: px2rem(58px);
    border-radius: px2rem(30px);
    border: 1px solid #e0e0e0;
    color: #606060;
  }
  .on {
    background: #3e81ff;
    border: 1px solid #3e81ff;
    color: #fff;
  }
}
.searchbox {
  height: px2rem(58px);
  // width: 100%;
  background: #eff1f3;
  border-radius: px2rem(29px);
  font-size: px2rem(28px);
  line-height: px2rem(58px);
  padding: 0 px2rem(40px);
  text-align: center;
  color: #8e8e8e;
  position: relative;
  overflow: hidden;
  .searchipt {
    background: transparent;
    width: 100%;
    height: px2rem(56px);
    border: none;
  }
  .searchNone {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  .holder {
    display: inline-block;
    background: url(../../../assets/dot_search.png) no-repeat left center;
    background-size: auto 50%;
    padding-left: px2rem(50px);
  }
  img {
    position: absolute;
    right: px2rem(20px);
    top: px2rem(10px);
    width: px2rem(40px);
  }
}
.m_dynamicMain {
  width: 100%;
  padding-top: px2rem(20px);
  .u_dynHead {
    width: 100%;
    float: left;
    position: relative;
    .u_card {
      position: absolute;
      right: 0;
      top: 0;
      font-size: px2rem(30px);
      width: px2rem(100px);
      height: px2rem(50px);
      p {
        background-color: #3e81ff;
        width: 100%;
        height: 100%;
        border-radius: px2rem(40px);
        color: #fff;
        line-height: px2rem(50px);
        text-align: center;
      }
    }
  }
  li {
    float: left;
    width: 100%;
    border-bottom: 1px solid #e0e0e0;
    padding: px2rem(20px) 0;
  }
  .u_Headimg {
    float: left;
    width: px2rem(70px);
    height: px2rem(70px);
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .u_Headinfo {
    float: left;
    padding-left: px2rem(20px);
    line-height: px2rem(35px);
    .u_HeadName {
      font-size: px2rem(26px);
    }
    .u_HeadTime {
      font-size: px2rem(24px);
      color: #999;
    }
  }
  .u_card {
    float: left;
    img {
      width: px2rem(100px);
      height: px2rem(50px);
      margin-top: px2rem(10px);
      border-radius: px2rem(10px);
    }
  }
  .u_dynBody {
    float: left;
    width: 100%;
    padding: px2rem(15px) 0;
    font-size: px2rem(30px);
    color: #000;
    line-height: 1.5em;
    .imgpathlist {
      width: px2rem(215px);
      height: px2rem(215px);
      margin-right: px2rem(10px);
      margin-bottom: px2rem(10px);
      float: left;
      position: relative;
      overflow: hidden;
    background: #eff1f3;
      img{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }
    }
  }
  .u_dynFoot {
    width: 100%;
    float: left;
    .u_dynType {
      width: 100%;
      font-size: px2rem(24px);
      color: #909090;
      padding-bottom: px2rem(15px);
    }
    .u_dynFrom {
      font-size: px2rem(26px);
      color: #909090;
      float: left;
      line-height: 1.5em;
      max-height: px2rem(80px);
      width: 60%;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .u_dynOpt {
      float: right;
      font-size: px2rem(24px);
      color: #606060;
      line-height: px2rem(30px);
      color: #666;
      .f_zan {
        height: px2rem(30px);
        padding-left: px2rem(50px);
        float: left;
        background: url(../../../assets/heart.png) no-repeat center left;
        background-size: auto 90%;
        margin-right: px2rem(30px);
      }
      .f_zan.on {
        background: url(../../../assets/heart_cur.png) no-repeat center left;
        background-size: auto 90%;
        margin-right: px2rem(30px);
      }
      .f_pl {
        height: px2rem(30px);
        padding-left: px2rem(60px);
        float: left;
        background: url(../../../assets/dot_pl.png) no-repeat center center;
        background-size: auto 90%;
        margin-right: px2rem(30px);
      }
      .f_del {
        float: left;
      }
    }
  }
}
.empty {
  width: 100%;
  height: px2rem(600px);
  background: url(../../../assets/empty.png) no-repeat center;
  background-size: 80% auto;
  text-align: center;
  font-size: px2rem(32px);
  color: #606060;
  padding-top: px2rem(530px);
}
.u_praiseBox {
  margin-top: px2rem(15px);
  width: 100%;
  padding-left: px2rem(50px);
  float: left;
  background: url(../../../assets/heart.png) no-repeat center left;
  background-size: auto px2rem(25px);
  font-size: px2rem(24px);
  color: #666;
  span {
    color: #3e81ff;
  }
}
.u_replyLlistBox {
  float: left;
  width: 100%;
  margin-top: px2rem(20px);
  font-size: px2rem(24px);
  color: #666;
  .u_replyBox {
    width: 100%;
    line-height: 1.6em;
    word-break: break-all;
  }
  span {
    color: #3e81ff;
  }
}
.ReleaseDynamic {
  position: fixed;
  width: px2rem(640px);
  height: px2rem(90px);
  border-radius: px2rem(45px);
  background: #3e81ff;
  font-size: px2rem(36px);
  color: #fff;
  line-height: px2rem(90px);
  text-align: center;
  bottom: px2rem(20px);
  left: px2rem(55px);
}
.u_reply_layer {
  width: px2rem(650px);
  height: px2rem(300px);
  position: absolute;
  top: 50%;
  left: 50%;
  padding: px2rem(30px);
  font-size: px2rem(28px);
  margin-left: px2rem(-325px);
  margin-top: px2rem(-150px);
  border-radius: px2rem(15px);
  background: #eff1f3;
  z-index: 550;
  .f_reply_tit {
    width: 100%;
    position: relative;
    .submit_reply {
      color: #3e81ff;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
  .f_reply_area {
    margin-top: px2rem(20px);
    width: 100%;
    height: px2rem(200px);
    border: none;
    border-radius: px2rem(10px);
    resize: none;
    padding: px2rem(15px);
  }
}
.botMenu {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 550;
  background: #ebeef2;
  width: 100%;
  .delopt,
  .cancel {
    width: 100%;
    height: px2rem(100px);
    background: #fff;
    line-height: px2rem(100px);
    text-align: center;
    font-size: px2rem(30px);
    float: left;
  }
  .delopt {
    margin-bottom: px2rem(10px);
  }
}
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none; //此处只是去掉默认的小×
}

.fade{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    position: fixed;
    z-index: 9999;
    top:0;
    left: 0;
    div{
        left: 50%;
        top:50%;
    }
}
</style>
<style lang="scss">
  .van-dialog__message{
    text-align: center;
  }

</style>