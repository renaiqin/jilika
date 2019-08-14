<template>
  <div class="selTeacherwarp">
        <div class="m_selTeachHead">
            <div class="searchbox">
                <input type="text" class="searchipt">
                <em class="cleartext"></em>
            </div>
            <div class="searchconfirm">搜索</div>
            <div class="searchcancel">取消</div>
        </div>
        <div class="m_searchteacherMain">
            <ul>
                <li>
                    <div class="selState"></div>
                    <div class="teachimg">
                        <img src="/static/img/tx2.png">
                    </div> 
                    <div class="teachname">老师名字1
                        <span class="department">教研组</span>
                    </div>
                </li>   
                <li>
                    <div class="selState"></div>
                    <div class="teachimg">
                        <img src="/static/img/tx2.png">
                    </div> 
                    <div class="teachname">老师名字1
                        <span class="department">教研组</span>
                    </div>
                </li>         
            </ul>
        </div>
        <!-- <div class="m_selcount">

        </div> -->
  </div>
</template>

<script>
  import { api } from "../../../../utils/Api/index";
  export default {
    name: "rankingHome",
    data(){
      return {
          radio:"1",
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

            //父组件数据加载完毕后再调用子组件



        },
        releaseDynamic(){

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
    .selTeacherwarp{
        height: 100%;
        background: #FFF;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
    .m_selTeachHead{
        width: 100%;
        padding:px2rem(30px);
        padding-bottom: 0;
        float: left;
    }
    .searchbox{
        height: px2rem(58px);
        width: px2rem(490px);
        margin-right: px2rem(20px);
        background: #eff1f3;
        border-radius: px2rem(29px);
        font-size: px2rem(28px);
        line-height: px2rem(58px);
        padding:0 px2rem(40px);
        text-align: center;
        color: #8e8e8e;
        position: relative;
        float: left;
        .cleartext{
            width: px2rem(32px);
            height: px2rem(32px);
            background: url(../../../../assets/dot-cleartxt.png) no-repeat center;
            background-size: 100% 100%;
            position: absolute;
            top: px2rem(13px);
            right: px2rem(13px);
        }
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
    .searchconfirm{
        float: left;
        font-size: px2rem(34px);
        color: #3e81ff;
        line-height: px2rem(58px);
        padding-left: px2rem(20px);
    }
    .searchcancel{
        float: left;
        font-size: px2rem(34px);
        color: #3e81ff;
        line-height: px2rem(58px);
        padding-left: px2rem(20px);
    }
    .m_teacherMain{
        flex: 1;
        width: 100%;
        overflow: auto;
        background: #FFF;
        padding-left: px2rem(30px);
    }
    .m_searchteacherMain{
        padding-left:px2rem(30px);
    }
    .m_searchteacherMain li{
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
            line-height: px2rem(45px);
            font-size: px2rem(30px);
            padding-left:px2rem(20px);
            color: #000;
            .department{
                display: block;
                font-size: px2rem(24px);
                color: #606060;
            }
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
    
</style>
