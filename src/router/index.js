import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    /* 教师端首页 */
    {
      path: "/",
      redirect: '/pages/index'
    },
    /* 空白跳转页 */
    {
      path: "/pages/index",
      name: "index",
      component: () =>
        import("../views/pages/index.vue"),
      

    },
  /* 教师端首页 */
    {
      path: "/pages/teacher/home",
      name: "home",
      component: () =>
        import("../views/pages/teacher/home.vue"),
      meta: {
        title: '激励卡'
      }
    },
  /* 教师端设置班级 */
    {
      path: "/pages/teacher/setClass",
      name: "setClass",
      component: () =>
        import("../views/pages/teacher/setClass.vue"),
      meta: {
        title: '设置'
      }
    },
  /* 教师端发卡记录选择学生 */
    {
      path: "/pages/teacher/cardRecord/selectStudent",
      name: "selectStudent",
      component: () =>
        import("../views/pages/teacher/cardRecord/selectStudent.vue"),
      meta: {
        title: '选择学生'
      }
    },
    /* 教师端发卡记录首页 */
    {
      path: "/pages/teacher/cardRecord/cardRecord",
      name: "cardRecord",
      component: () =>
        import("../views/pages/teacher/cardRecord/cardRecord.vue"),
      meta: {
        title: '发卡记录'
      }
    },
    /* 教师端发卡记录发卡 */
    {
      path: "/pages/teacher/cardRecord/postCard",
      name: "postCard",
      component: () =>
        import("../views/pages/teacher/cardRecord/postCard.vue"),
      meta: {
        title: '发卡记录'
      }
    },
    /* 教师端发卡记录发卡详情 */
    {
      path: "/pages/teacher/cardRecord/cardDetail",
      name: "cardDetail",
      component: () =>
        import("../views/pages/teacher/cardRecord/cardDetail.vue"),
      meta: {
        title: '发卡详情'
      }
    },
    /* 教师端发卡记录选择卡片 */
    // {
    //   path: "/pages/teacher/cardRecord/selectCard",
    //   name: "selectCard",
    //   component: () =>
    //     import("../views/pages/teacher/cardRecord/selectCard.vue")
    // },
    /* 教师端琅琊榜首页 */
    {
      path: "/pages/teacher/rankingList/rankingHome",
      name: "rankingHome",
      component: () =>
        import("../views/pages/teacher/rankingList/rankingHome.vue"),
      meta: {
        title: '琅琊榜'
      }
    },
     /* 教师端动态首页 */
     {
      path: "/pages/teacher/dynamic/index",
      name: "rankingHome",
      component: () =>
         import("../views/pages/teacher/dynamic/index.vue"),
       meta: {
         title: '动态'
       }
    },
    /*RayJ 2019-03-20  教师端发布动态*/
    {
      path: "/pages/teacher/dynamic/release",
      name: "studynamic",
      component: () =>
        import("../views/pages/teacher/dynamic/release.vue"),
      meta: {
        title: '发布动态'
      }
    },
    /*RayJ 2019-03-20  教师端搜索老师*/
    {
      path: "/pages/teacher/dynamic/search",
      name: "studynamic",
      component: () =>
        import("../views/pages/teacher/dynamic/search.vue"),
      meta: {
        title: '搜索动态'
      }
    },

    /*RayJ 2019-03-13  学生端首页*/
    {
      path: "/pages/student/home",
      name: "studentHome",
      component: () =>
        import("../views/pages/student/home.vue"),
      meta: {
        title: '激励卡'
      }
    },

    /*RayJ 2019-03-01  学生端获卡首页*/
    {
      path: "/pages/student/cardsList/cardsList",
      name: "cardsList",
      component: () =>
        import("../views/pages/student/cardsList/cardsList.vue"),
      meta: {
        title: '获卡'
      }
    },
    /*RayJ 2019-03-01  学生端获卡列表*/
    {
      path: "/pages/student/cardsList/cardsRecord",
      name: "cardsRecord",
      component: () =>
        import("../views/pages/student/cardsList/cardsRecord.vue"),
      meta: {
        title: '发卡'
      }
    },
    /*RayJ 2019-03-02  学生端获卡图表展示*/
    {
      path: "/pages/student/cardsList/cardsChart",
      name: "cardsChart",
      component: () =>
        import("../views/pages/student/cardsList/cardsChart.vue"),
      meta: {
        title: '获卡'
      }
    },
    /*RayJ 2019-03-11  学生端动态*/
    {
      path: "/pages/student/dynamic/index",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/index.vue"),
      meta: {
        title: '动态'
      }
    },
    /*RayJ 2019-03-11  学生端发布动态*/
    {
      path: "/pages/student/dynamic/release",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/release.vue"),
      meta: {
        title: '发布动态'
      }
    },
    /*RayJ 2019-03-11  学生端选择部门*/
    {
      path: "/pages/student/dynamic/seldepartment",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/seldepartment.vue"),
      meta: {
        title: '选择部门'
      }
    },
    /*RayJ 2019-03-11  学生端选择教师*/
    {
      path: "/pages/student/dynamic/selteacher",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/selteacher.vue"),
      meta: {
        title: '选择教师'
      }
    },
    /*RayJ 2019-03-11  学生端搜索老师*/
    {
      path: "/pages/student/dynamic/search",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/search.vue"),
      meta: {
        title: '搜索'
      }
    },
     /*raq 2019-03-30  学生端获卡详情*/
    {
      path: " /pages/student/cardsList/myCardsRecord",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/cardsList/myCardsRecord.vue"),
      meta: {
        title: '获卡'
      }
    },
    /*raq 2019-03-30  学生端琅琊榜*/
    {
      path: "/pages/student/rankingList/rankingHome",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/rankingList/rankingHome.vue"),
      meta: {
        title: '琅琊榜'
      }
    },
    /*raq 2019-03-30  学生端动态*/
    {
      path: "/pages/student/dynamic/index",
      name: "studynamic",
      component: () =>
        import("../views/pages/student/dynamic/index.vue"),
      meta: {
        title: '动态'
      }
    },
    /*raq 2019-03-30  学生端发卡*/
    {
      path: "/pages/student/cardsList/postCard",
      name: "cardsList",
      component: () =>
        import("../views/pages/student/cardsList/postCard.vue"),
      meta: {
        title: '发卡'
      }
    },
    /*raq 2019-03-30  学生端发卡详情*/
    {
      path: "/pages/student/cardsList/cardDetail",
      name: "cardsList",
      component: () =>
        import("../views/pages/student/cardsList/cardDetail.vue"),
      meta: {
        title: '发卡'
      }
    },
    /*raq 2019-03-30  学生端发卡详情*/
    {
      path: "/pages/student/cardsList/myCardsRecord",
      name: "cardsList",
      component: () =>
        import("../views/pages/student/cardsList/myCardsRecord.vue"),
      meta: {
        title: '获卡'
      }
    },
  ],
  

})

// 