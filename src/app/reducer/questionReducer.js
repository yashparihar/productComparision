const questionReducer = (state = {
    questionBank: null,
    totalquestion: null,

    questionNo: null,
    answers: new Array(5),
    edited: new Array(5)

}, action) => {
    switch (action.type) {
        case "LOAD_QUESTION_FULFILLED":
            state = {
                ...state,
                totalquestion: action.payload.totalQuestion,
                questionBank: action.payload.questionBank,

                questionNo: action.payload.questionNo,
                answers: action.payload.answers,
                edited: action.payload.edited
            }
            break;
        case "NEXT_QUESTION":
            state = {
                ...state,                     
                questionNo: state.questionNo + 1
            }
            break;
        case "PREV_QUESTION":
            state = {
                ...state,
                questionNo: state.questionNo - 1
            }
            break;
        case "SUBMIT_ANSWER":
            state = {
                ...state,
                questionNo: state.questionNo + 1,
                answers: action.payload.answers
            }        

    }
    return state;
};

export default questionReducer;
