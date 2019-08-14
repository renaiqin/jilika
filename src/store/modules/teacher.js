const teacher = {
    state:{
        selectCard:{},
        selectStudent:[],
        selectAllClass:[],
        selectAllGrade:[],
    },
    mutations:{
        SET_SELECTCARD:(state,data) => {
            state.selectCard = data;
        },
        SET_SELECTSTUDENT:(state,data) => {
            state.selectStudent = data;
        },
        SET_SELECTALLCLASS:(state,data) => {
            state.selectAllClass = data;
        },
        SET_SELECTALLGRADE:(state,data) => {
            state.selectAllGrade = data;
        },
    },
    actions:{
        setSelectCard({commit},data){
            commit("SET_SELECTCARD",data);
        },
        setSelectStudent({commit},data){
            commit("SET_SELECTSTUDENT",data);
        },
        setSelectAllClass({commit},data){
            commit("SET_SELECTALLCLASS",data);
        },
        setSelectAllGrade({commit},data){
            commit("SET_SELECTALLGRADE",data);
        },
    }
}

export default teacher