<template>
  <div class="selTeacherwarp">
        <div class="m_selTeachHead">
            <div class="searchbox" v-on:click="searchTeacher">
                <div class="searchNone"><div class="holder">搜索</div></div>
            </div>
        </div>
        <div class="m_selTeachBody">
            <div class="u_selAllText"><p class="blue allText" @click="renderAll">全部</p> > {{curDepartment.name}}</div>
        </div>
        <div class="m_selLine"></div>
        <div class="m_teacherMain">
            <ul>
                <li v-for="(item,index) in departmentTeacherList" v-on:click="choiceTeacher(item)">
                    <!-- <div class="selState"></div> -->
                    <div class="teachimg">
                        <img :src="item.xbm == 2 ? '/static/img/gril.png' : '/static/img/boy.png'"/>
                    </div> 
                    <div class="teachname">{{item.xm}}</div>
                </li>
            </ul>
        </div>
        <!-- <div class="m_selcount">

        </div> -->
  </div>
</template>

<script>
  import { api } from "../../../../utils/Api/index";
  import _ from 'lodash';
  export default {
    name: "rankingHome",
    data(){
      return {
          curDepartment:{},
          departmentTeacherList:[],
          allTeacherList:[],
      }
    },
    mounted() {
        this.init();
    },
    methods: {
        /**
         * 说明:初始化基础数据并存入localStorage里(只做set不做判断是否存在,保证每次浏览页面都是最新的数据)
         * 作者:RayJ
         * 更新时间:2019-03-09
         */
        async init(){
            //获取当前部门对象
            this.curDepartment = this.$store.getters.getChoiceDepartment;

            //获取所有教师对象
            this.allTeacherList = this.$store.getters.getAllTeacher;

            //查询与当前部门所匹配的教师对象并赋值
            this.departmentTeacherList = this.$store.getters.setAllTeacher; 
            //console.log(this.$store.getters.getAllTeacher)
            this.departmentTeacherList = this.$store.getters.getAllTeacher

        },
        choiceTeacher(item){
            this.$store.dispatch("setChoiceTeacher",item);
            //this.$router.push({path:'/pages/student/dynamic/release'})
            history.go(-2)
        },
        searchTeacher(){
            this.$router.push({path:'/pages/student/dynamic/search'})
        },
        /** 
         * raq 
         * 2019-3-29
         * 跳转到部门页面
        */
        renderAll(){
            this.$router.push({path:'/pages/student/dynamic/seldepartment'})
        }
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
    .selTeacherwarp{
        height: 100%;
        background: #FFF;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .blue{
        color:#3e81ff;
    }
    .allText{
        display: inline-block;
    }
    .searchbox{
        height: px2rem(58px);
        width: 100%;
        background: #eff1f3;
        border-radius: px2rem(29px);
        font-size: px2rem(28px);
        line-height: px2rem(58px);
        padding:0 px2rem(40px);
        text-align: center;
        color: #8e8e8e;
        position: relative;
        .searchipt{
            background: transparent;
            width: 100%;
            height: px2rem(56px);
        }
        .searchNone{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        .holder{
            display: inline-block;
            background: url(../../../../assets/dot_search.png) no-repeat left center;
            background-size: auto 50%;
            padding-left: px2rem(50px);
        }
    }
    .m_selTeachHead{
        width: 100%;
        padding:px2rem(30px);
        float: left;
    }
    .m_selTeachBody{
        float: left;
        .u_selAllText{
            font-size: px2rem(32px);
            color: #333;
            width: 100%;
            padding: px2rem(30px);
            padding-top: 0;
        }
    }
    .m_selLine{
        width: 100%;
        height: px2rem(20px);
        background: #f0f3f8;
    }
    .m_teacherMain{
        flex: 1;
        width: 100%;
        overflow: auto;
        background: #FFF;
        padding-left: px2rem(30px);
    }
    .m_teacherMain li{
        height: px2rem(120px);
        padding:px2rem(20px) 0;
        padding-right:px2rem(30px);
        width: 100%;
        border-bottom: 1px solid #eff1f3;
        line-height: px2rem(120px);
        .selState{
            width: px2rem(75px);
            height: px2rem(80px);
            background: url(../../../../assets/dot_sel.png) no-repeat left center;
            background-size: auto 55%;
            float: left;
        }
        .teachimg{
            width: px2rem(80px);
            height: px2rem(80px);
            border-radius:50%;
            overflow: hidden;
            float:left;
            img{
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .teachname{
            float: left;
            height: px2rem(80px);
            line-height: px2rem(80px);
            font-size: px2rem(30px);
            padding-left:px2rem(20px);
        }
        // .u_department_col{
        //     font-size: px2rem(32px);
        //     color:#333;
        //     width: 100%;
        //     height: px2rem(120px);
        //     background: url(../../../../assets/arrow_right.png) no-repeat right center;
        //     background-size: auto 30%;
        // }
    }
    .m_selcount{
        width: 100%;
        height: px2rem(105px);
        border-top: 1px solid #e0e0e0;
        background: #FFF;
    }

</style>
