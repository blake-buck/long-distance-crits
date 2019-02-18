import axios from 'axios';

let initialState ={
    charsheet:{},
    lines:[],
    saveChecks:[false, false, false],
    failChecks:[false, false, false],
    selectedTool:'pan'
}

const GET_CHARSHEET = 'GET_CHARSHEET';
const UPDATE_CHARSHEET = 'UPDATE_CHARSHEET';
const UPDATE_LINES = 'UPDATE_LINES';
const UPDATE_SAVECHECKS = 'UPDATE_SAVECHECKS';
const UPDATE_FAILCHECKS = 'UPDATE_FAILCHECKS'
const UPDATE_SELECTEDTOOL = 'UPDATE_SELECTEDTOOL';

export function getCharSheet(gameID){
    return{
        type:GET_CHARSHEET,
        payload:axios.get(`/api/user/${gameID}/charsheet`)
    }
}

export function updateCharSheet(gameID, columnTitle, value, charsheet){
    axios.put(`/api/user/${gameID}/charsheet`, {columnTitle, value});
    charsheet[columnTitle]=value;
    console.log('updateCharSheet')
    return{
        type:UPDATE_CHARSHEET,
        payload:charsheet
    }
}

export function updateLines(lines){
    console.log('UPDATING LINES IN REDUCER', lines)
    return{
        type:UPDATE_LINES,
        payload:lines
    }
}

export function updateSaveChecks(saveChecks){
    return{
        type:UPDATE_SAVECHECKS,
        payload:saveChecks
    }
}

export function updateFailChecks(failChecks){
    return{
        type:UPDATE_FAILCHECKS,
        payload:failChecks
    }
}

export function updateSelectedTool(selectedTool){
    return{
        type:UPDATE_SELECTEDTOOL,
        payload:selectedTool
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case `${GET_CHARSHEET}_FULFILLED`:
        return{
            ...state,
            charsheet:action.payload.data
        }

        case `${UPDATE_CHARSHEET}`:
        return{
            ...state,
            charsheet:action.payload
        }
        
        case `${UPDATE_LINES}`:
        return{
            ...state,
            lines:action.payload
        }

        case `${UPDATE_SAVECHECKS}`:
        return{
            ...state,
            saveChecks:action.payload
        }

        case `${UPDATE_FAILCHECKS}`:
        return{
            ...state, 
            failChecks:action.payload
        }

        case `${UPDATE_SELECTEDTOOL}`:
        return{
            ...state,
            selectedTool:action.payload
        }

        default :
            console.log('reducer default');
            return state;
    }
}