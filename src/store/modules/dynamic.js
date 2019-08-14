const dynamic = {
    state:{
        studentInfo:{},
    },
    mutations:{
        SET_STUDENTINFO:(state,data) => {
            state.studentInfo = data;
        },  
    },
    actions:{
        setStudentInfo({commit},data){
            commit("SET_STUDENTINFO",data);
        },
    }
}

export default dynamic