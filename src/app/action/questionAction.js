
import { databaseGetAll , shuffle } from '../utility/helper'
import { CookieMap } from '../utility/cookieLib.js';
const cookie = new CookieMap();


function loadQuestion(data = null, examStatus = null) {
    return dispatch => {
        console.log('action data ',data);

        if (data && examStatus){
            dispatch(loadQuestionDone(data, examStatus));
        } else {
            databaseGetAll()
            .then((res)=>{
                    res.questionBank = shuffle(res.questionBank);

                    let ansQ = new Array( res.totalQuestion - 1);
                    let editQ = new Array( res.totalQuestion - 1);

                    let i=0;
                    for(i=0 ; i < res.totalQuestion ; i++){
                        ansQ[i] = false;
                        editQ[i] = false;
                    }

                    let status = {
                        qno: 0,
                        answers: ansQ,
                        edited: editQ
                        }
                    
                    cookie.setCookie('questions', res);
                    cookie.setCookie('examStatus',status )

                    dispatch(loadQuestionDone(res, status));
            });
        }
    }
}

function loadQuestionDone(data, examStatus) {

    console.log('in action ', data);
    return {
        type: "LOAD_QUESTION_FULFILLED",
        payload: {
            totalQuestion : data.totalQuestion,            
            questionBank: data.questionBank,
            questionNo: examStatus.qno,
            answers: examStatus.answers,
            edited: examStatus.edited
        }
    }
}


function nextQuestion(){ 
    return {
        type: "NEXT_QUESTION",
        payload: {} 
    }     
}


function prevQuestion(){
    return {
        type: "PREV_QUESTION",
        payload: {} 
    } 
}

function submitQuestion(){
    return (dispatch, getState) => {
        let questionState = getState().questions;
        questionState.answers[ questionState.questionNo ] = true;

        dispatch(submitQuestionDone(  questionState.answers ));
    }  
}

function submitQuestionDone(questionAnswer){
    return {
        type: "SUBMIT_ANSWER",
        payload:{
            answers: questionAnswer
        }
    }
}


export {
    loadQuestion,
    nextQuestion,
    prevQuestion,
    submitQuestion
}

