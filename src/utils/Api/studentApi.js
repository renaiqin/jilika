
/**
 * 验证设备是否有保管人
 * @returns {string}
 */


/////////////////////////////姜璀20190304编写的接口//////////////////////////
/**
* 查询激励卡当前学号，当前学年学期的全部卡片  GET /jlkhkcx/getCardInfoByXh
* @returns {string}
*/
export let getCardInfoByXh = () => `/api/jlk/jlkhkcx/getCardInfoByXh`;

/**
* 获取当前序号的学年学期
* @returns {string}
*/
export let getCurrentXnxq = () => `/api/base/jcXndm/getCurrentXnxq`;

/**
* 获取相关卡片的列表信息通过学号和卡牌类型
* @returns {string}
*/
export let getCardInfo = () => `/api/jlk/jlkhkcx/getCardDatilInfo`;

/**
* 根据学校代码查询教师列表
* @returns {string}
*/
export let getZghList = () => `/api/jlk/jcJzgjbsj/selectJsList`;

/**
* 根据学号和学校代码查询学生和班级数据
* @returns {string}
*/
export let getStuInfo = () => `/api/jlk/jcXsjbsj/selectXsByXh`;

/**
* 根据学号和学校代码查询学生和班级数据
* @returns {string}
*/
export let getBjInfo = (id) => `/api/base/jcBjsj/`+id;


/**
* 卡片走势----雷达图
* @returns {string}
*/
export let getRadarInfo = () => `/api/jlk/jlkhkcx/getRadarChartInfo`;

/**
* 卡片走势----折线图
* @returns {string}
*/
export let getLineChartInfo = () => `/api/jlk/jlkhkcx/getLineChartInfo`;

/**
* 卡片走势----排行榜信息图
* @returns {string}
*/
export let getRankInfo = () => `/api/jlk/jlkhkcx/getRankInfo`;

/**
* 查询卡片类型信息列表 
* @returns {string}
*/
export let geKplxList = () => `/api/jlk/jlkglkpxx/getKplxList`;


/**
* 获取发布动态的相关全部信息 
* @returns {string}
*/
export let getReleaseDynamic = () => `/api/jlk/xxdt/getStateMessage`;

/**
* 保存发布动态 
* @returns {string}
*/
export let saveDynamic = () => `/api/jlk/xxdt/saveState`;

/**
* 获取用户信息 
* @returns {string}
*/
export let getStudentMsg = () => `/api/jlk/xxdt/getStudentMessage`;

/**
* 获取动态列表信息 
* @returns {string}
*/
export let getDynamicList = () => `/api/jlk/xxdt/getStateList`;

/**
* 上传图片或视频文件
* @returns {string}
*/
export let uploadFile = () => `/api/jlk/jlkfj/uploadFile`;

/**
* 点赞
* @returns {string}
*/
export let saveRelay = () => `/api/jlk/xxdt/saveRelayThumbsup`;

/**
* 删除评论,点赞,动态记录
* @returns {string}
*/
export let delRelay = () => `/api/jlk/xxdt/deleteRelayThumbsup`;


/**
* 查询卡片和子项类型信息列表
* @returns {string}
*/
export let getKpAllList = () => `/api/jlk/jlkglkpxx/getKplxAllList`;

/**
* 获取部门
* @returns {string}
*/
export let getGroupList = () => `/api/jlk/xxdt/getGroupList`;


/**
* 根据部门获取老师姓名
* @returns {string}
*/
export let getTeacherList = () => `/api/jlk/xxdt/getTeacherList`;


/**
* 根据学号和学校代码查询学生具体信息
* @returns {string}
*/
export let getStuInfoByXh = () => `/api/base/jcXsjbsj/getStudentListByStudent`;


/**
* 首页最新获卡
* @returns {string}
*/
export let getMyKpxxList = () => `/api/jlk/jlkglIndex/getMyKpxxList`;

