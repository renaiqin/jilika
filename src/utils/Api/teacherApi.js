
/**
* 获取token
* @returns {string}
*/
export let token = () => `/api/auth/jwt/token`;

/**
* 获取用户基础信息
* @returns {string}
*/
export let info = () => `/api/admin/user/front/info`;


/**
* 查询用户信息
* @returns {string}
*/
export let getUserInfo = () => `/api/jlk/jlkglIndex/getUserInfo`;

/**
* 查询最新获卡或发卡
* @returns {string}
*/
export let getNewKpxxList = () => `/api/jlk/jlkglIndex/getNewKpxxList`;


/**
* 查询琅琊榜榜主
* @returns {string}
*/
export let getTopKpxxList = () => `/api/jlk/jlkglIndex/getTopKpxxList`;



/**
* 获得发卡记录列表
* @returns {string}
*/
export let queryPageList = () => `/api/jlk/fkjl/queryPageList`;

/////////////////////////////姜璀20190228编写的接口//////////////////////////
/**
* 查询激励卡琅琊榜展示规则  POST /jlkyftj/cxLybzsgz
* @returns {string}
*/
export let getLybGz = () => `/api/jlk/jlkyftj/cxLybzsgz`;

/**
* 激励卡查询班级动态  GET /jlkglIndex/getXxdtList
* @returns {string}
*/
export let getXxdtList = () => `/api/jlk/jlkglIndex/getXxdtList`;



/**
* 激励卡首页班级动态获取班级
* @returns {string}
*/
export let getQxBjList = () => `/api/jlk/jlkglIndex/getQxNjBjList`;



/**
* 激励卡首页获取动态未读消息的数量
* @returns {string}
*/
export let getXxdtNum = () => `/api/jlk/jlkglIndex/getXxdtNum`;




/**
* 激励卡获得当前学校周信息
* @returns {string}
*/
export let getWeekList = () => `/api/base/jcXndm/getWeekList`;


/**
* 激励卡发卡删除记录
* @returns {string}
*/
export let reCallJlkData = () => `/api/jlk/fkjl/reCallJlkData`;



/**
* 激励卡发卡记录详情
* @returns {string}
*/
export let getInfo = () => `/api/jlk/fkjl/getInfo`;



/**
* 激励卡发卡获取卡片类型
* @returns {string}
*/
export let getKplxByCountList = () => `/api/jlk/jlkglkpxx/getKplxByCountList`;

///////////////////姜璀20190228获取基础数据的临时接口////////////////////////
/**
* 查询激励卡琅琊榜展示规则  POST /jlkyftj/cxLybzsgz
* @returns {string}
*/
export let getXnxqList = () => `/api/jlk/jlk/getXnxqList`;

/**
* 激励卡琅琊榜统计查询  POST /jlkyftj/jlklybcx
* @returns {string}
*/
export let geLybList = () => `/api/jlk/jlkyftj/jlklybcx`;


/**
* 激励卡琅琊榜统计查询  POST /jlkyftj/jlklybcx
* @returns {string}
*/
export let geNjBjList = () => `/api/base/jcBjsj/getNjBjList`;

/**
* 激励卡发卡获取常用班级  GET fkqx/getCybjList
* @returns {string}
*/
export let getCybjList = () => `/api/jlk/fkqx/getCybjList`;



/**
* 激励卡发卡获取年级  GET jcNjsjlx/selectNjList
* @returns {string}
*/
export let selectNjList = () => `/api/base/jcNjsjlx/selectNjList`;



/**
* 激励卡发卡获取班级  GET jcNjsjlx/selectBjListByJbxn
* @returns {string}
*/
export let selectBjListByJbxn = () => `/api/base/jcBjsj/selectBjList`;



/**
* 激励卡发卡获取学生  GET jcNjsjlx/gettBjxsAll
* @returns {string}
*/
export let gettBjxsAll = (bjid) => `/api/base/jcXsbjgx/${bjid}/gettBjxsAll`;


/**
* 保存常用班级  GET jcNjsjlx/gettBjxsAll
* @returns {string}
*/
export let setCybjList = () => `/api/jlk/fkqx/setCybjList`;

/**
* 手机端-查询评语列表（卡片无分项传kpid,有卡片分项传分项id）  GET /kppy/selectKppyList
* @returns {string}
*/
export let getPyList = () => `/api/jlk/kppy/selectKppyList`;

/**
* 手机端激励卡记录保存接口  POST /fkjl/jlkJlSave
* @returns {string}
*/
export let saveJlkSave = () => `/api/jlk/fkjl/jlkJlSave`;

/**
* 手机端-点击卡片分项查询分项列表  GET /jlkglkpxx/selectKpfxList
* @returns {string}
*/
export let getKpFxList = () => `/api/jlk/jlkglkpxx/selectKpfxList`;


/**
* 获取老师权限班级    GET /xxdt/getTeacherClass
* @returns {string}
*/
export let getTeacherClass = () => `/api/jlk/xxdt/getTeacherClass`;

/**
* 根据多个班级代码查询学生信息列表   GET /jcXsjbsj/getStudentListByClass
* @returns {string}
*/
export let getStudentAllByClass = () => `/api/base/jcXsjbsj/getStudentListByClass`;
/**
* 根据多个年纪代码查询学生信息列表   GET /jcXsjbsj/getStudentListByGrade
* @returns {string}
*/
export let getStudentAllByGrade = () => `/api/base/jcXsjbsj/getStudentListByGrade`;


/**
* 获取短信通知
* @returns {string}
*/
export let getMessageNotice = () => `/api/jlk/xxdt/getMessageNotice`;


/**
* 发卡记录成功后调
* @returns {string}
*/
export let updateAllDo = () => `/api/jlk/xxdt/updateAllDo`;

/**
* 发布动态里的发布短信
* @returns {string}
*/

export let sendMessage = () => `/api/jlk/xxdt/sendMessage`;


/**
* 获取全部班级
* @returns {string}
*/

export let selectBjList = () => `/api/base/jcBjsj/selectBjList`;



/**
* 发卡查询 学生
* @returns {string}
*/

export let getStudentListBykeywords = () => `/api/base/jcXsjbsj/getStudentListBykeywords`;


/**
* 首页权限
* @returns {string}
*/

export let qxlist = () => `/api/jlk/yddxq/list`;

/**
* 点击动态时调用该接口，未读动态数量消失
* @returns {string}
*/

export let updateXxdtNum = () => `/api/jlk/jlkglIndex/updateXxdtNum`;


/**
* 动态列表获取发卡学生
* @returns {string}
*/

export let getStatePeople = () => `/api/jlk/xxdt/getStatePeople`;


/**
* 动态列表获取发卡学生
* @returns {string}
*/

export let getCardMessage = () => `/api/jlk/xxdt/getCardMessage`;
