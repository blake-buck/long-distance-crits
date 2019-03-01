import axios from 'axios';

let initialState ={
    charsheet:{},
    lines:[],
    saveChecks:[false, false, false],
    failChecks:[false, false, false],

    selectedTool:'pan',
    strokeWidth:5,
    strokeWidths:[],
    strokeColor:'rgb(0,0,0)',
    strokeColors:[],

    gmToolsIsOpen:false,
    playersCanDraw:true,
    playersCanMove:true,
    displayGrid:false,
    grid:[],

    tokens:[],
    activeTokens:[],
    tokenXPos:[],
    tokenYPos:[],
    selectedToken:-1,
    scaleX:[],
    scaleY:[],
    rotation:[],

    questLog:[],
    backgroundImage:'',
    backgroundImages:[]
}

const GET_QUESTLOG ='GET_QUESTLOG';
const GET_CHARSHEET = 'GET_CHARSHEET';

const UPDATE_CHARSHEET = 'UPDATE_CHARSHEET';
const UPDATE_LINES = 'UPDATE_LINES';
const UPDATE_SAVECHECKS = 'UPDATE_SAVECHECKS';
const UPDATE_FAILCHECKS = 'UPDATE_FAILCHECKS';
const UPDATE_SELECTEDTOOL = 'UPDATE_SELECTEDTOOL';
const UPDATE_STROKEWIDTH = 'UPDATE_STROKEWIDTH';
const UPDATE_STROKEWIDTHS = 'UPDATE_STROKEWIDTHS';
const UPDATE_STROKECOLOR = 'UPDATE_STROKECOLOR';
const UPDATE_STROKECOLORS = 'UPDATE_STROKECOLORS'
const UPDATE_GRID = 'UPDATE_GRID';
const UPDATE_TOKENS = 'UPDATE_TOKENS';
const UPDATE_ACTIVETOKENS = 'UPDATE_ACTIVETOKENS';
const UPDATE_TOKENXPOS = 'UPDATE_TOKENXPOS';
const UPDATE_TOKENYPOS = 'UPDATE_TOKENYPOS';
const UPDATE_SELECTEDTOKEN ='UPDATE_SELECTEDTOKEN';
const UPDATE_SCALEX = 'UPDATE_SCALEX';
const UPDATE_SCALEY = 'UPDATE_SCALEY';
const UPDATE_ROTATION = 'UPDATE_ROTATION';
const UPDATE_QUESTLOG = 'UPDATE_QUESTLOG';
const UPDATE_BACKGROUNDIMAGE = 'UPDATE_BACKGROUNDIMAGE';
const UPDATE_BACKGROUNDIMAGES = 'UPDATE_BACKGROUNDIMAGES';

const CLEAR_CANVAS = 'CLEAR_CANVAS';

const TOGGLE_GMTOOLSISOPEN = 'TOGGLE_GMTOOLSISOPEN';
const TOGGLE_PLAYERSCANDRAW = 'TOGGLE_PLAYERSCANDRAW';
const TOGGLE_PLAYERSCANMOVE = 'TOGGLE_PLAYERSCANMOVE';
const TOGGLE_DISPLAYGRID = 'TOGGLE_DISPLAYGRID';

export function getCharSheet(gameID){
    return{
        type:GET_CHARSHEET,
        payload:axios.get(`/api/user/${gameID}/charsheet`)
    }
}

export function getQuestLog(gameID){
    return{
        type:GET_QUESTLOG,
        payload:axios.get(`/api/game/${gameID}/questlog`)
    }
}

export function updateCharSheet(gameID, columnTitle, value, charsheet){
    axios.put(`/api/user/${gameID}/charsheet`, {columnTitle, value});
    charsheet[columnTitle]=value;
    console.log('updateCharSheet', value, charsheet[columnTitle])
    return{
        type:UPDATE_CHARSHEET,
        payload:charsheet
    }
}

export function updateLines(lines){
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

export function updateStrokeWidth(strokeWidth){
    return{
        type:UPDATE_STROKEWIDTH,
        payload:strokeWidth
    }
}

export function updateStrokeWidths(strokeWidths){
    return{
        type:UPDATE_STROKEWIDTHS,
        payload:strokeWidths
    }
}

export function updateStrokeColor(strokeColor){
    return{
        type:UPDATE_STROKECOLOR,
        payload:strokeColor
    }
}

export function updateStrokeColors(strokeColors){
    return{
        type:UPDATE_STROKECOLORS,
        payload:strokeColors
    }
}

export function updateGrid(grid){
    return{
        type:UPDATE_GRID,
        payload:grid
    }
}

export function updateTokens(tokens){
    return{
        type:UPDATE_TOKENS,
        payload:tokens
    }
}

export function updateActiveTokens(activeTokens){
    return{
        type:UPDATE_ACTIVETOKENS,
        payload:activeTokens
    }
}

export function updateTokenXPos(tokenXPos){
    return{
        type:UPDATE_TOKENXPOS,
        payload:tokenXPos
    }
}

export function updateTokenYPos(tokenYPos){
    return{
        type:UPDATE_TOKENYPOS,
        payload:tokenYPos
    }
}

export function updateSelectedToken(selectedToken){
    return{
        type:UPDATE_SELECTEDTOKEN,
        payload:selectedToken
    }
}

export function updateScaleX(scaleX){
    return{
        type:UPDATE_SCALEX,
        payload:scaleX
    }
}

export function updateScaleY(scaleY){
    return{
        type:UPDATE_SCALEY,
        payload:scaleY
    }
}

export function updateRotation(rotation){
    return{
        type:UPDATE_ROTATION,
        payload:rotation
    }
}

export function updateQuestLog(questLog){
    return{
        type:UPDATE_QUESTLOG,
        payload:questLog
    }
}

export function updateBackgroundImage(backgroundImage){
    return{
        type:UPDATE_BACKGROUNDIMAGE,
        payload:backgroundImage
    }
}

export function updateBackgroundImages(backgroundImages){
    return{
        type:UPDATE_BACKGROUNDIMAGES,
        payload:backgroundImages
    }
}

export function toggleGmToolsIsOpen(isOpen){
    return{
        type:TOGGLE_GMTOOLSISOPEN,
        payload:isOpen
    }
}

export function togglePlayersCanDraw(playersCanDraw){
    return{
        type:TOGGLE_PLAYERSCANDRAW,
        payload:playersCanDraw
    }
}

export function togglePlayersCanMove(playersCanMove){
    return{
        type:TOGGLE_PLAYERSCANMOVE,
        payload:playersCanMove
    }
}

export function clearCanvas(){
    return{
        type:CLEAR_CANVAS,
        payload:[]
    }
}

export function toggleDisplayGrid(displayGrid){
    return{
        type:TOGGLE_DISPLAYGRID,
        payload:displayGrid
    }
}



export default function reducer(state = initialState, action){
    switch(action.type){
        case `${GET_CHARSHEET}_FULFILLED`:
        return{
            ...state,
            charsheet:action.payload.data
        }

        case `${GET_QUESTLOG}_FULFILLED`:
        return{
            ...state,
            questLog:action.payload.data
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

        case UPDATE_STROKEWIDTH:
        return{
            ...state,
            strokeWidth:action.payload
        }

        case UPDATE_STROKEWIDTHS:
        return{
            ...state,
            strokeWidths:action.payload
        }

        case UPDATE_STROKECOLOR:
        return{
            ...state,
            strokeColor:action.payload
        }

        case UPDATE_STROKECOLORS:
        return{
            ...state,
            strokeColors:action.payload
        }

        case UPDATE_TOKENS:
        return{
            ...state,
            tokens:action.payload
        }

        case UPDATE_ACTIVETOKENS:
        return{
            ...state,
            activeTokens:action.payload
        }

        case UPDATE_TOKENXPOS:
        return{
            ...state,
            tokenXPos:action.payload
        }

        case UPDATE_TOKENYPOS:
        return{
            ...state,
            tokenYPos:action.payload
        }

        case UPDATE_SELECTEDTOKEN:
        return{
            ...state,
            selectedToken:action.payload
        }

        case UPDATE_SCALEX:
        return{
            ...state,
            scaleX:action.payload
        }

        case UPDATE_SCALEY:
        return{
            ...state,
            scaleY:action.payload
        }

        case UPDATE_ROTATION:
        return{
            ...state,
            rotation:action.payload
        }

        case UPDATE_QUESTLOG:
        return{
            ...state,
            questLog:action.payload
        }

        case UPDATE_BACKGROUNDIMAGE:
        return{
            ...state,
            backgroundImage:action.payload
        }

        case UPDATE_BACKGROUNDIMAGES:
        return{
            ...state,
            backgroundImages:action.payload
        }

        case TOGGLE_GMTOOLSISOPEN:
        return{
            ...state,
            gmToolsIsOpen:action.payload
        }

        case TOGGLE_PLAYERSCANDRAW:
        return{
            ...state,
            playersCanDraw:action.payload
        }

        case TOGGLE_PLAYERSCANMOVE:
        return{
            ...state,
            playersCanMove:action.payload
        }

        case TOGGLE_DISPLAYGRID:
        return{
            ...state,
            displayGrid:action.payload
        }

        //For whatever reason I have to click Clear Canvas 2 times in order for lines to be updated
        case CLEAR_CANVAS:
        console.log('CLEARING CANVAS')
        return{
            ...state, 
            lines:[],
            strokeWidths:[],
            strokeColors:[]
        }

        case UPDATE_GRID:
        return{
            ...state,
            grid:action.payload
        }

        default :
            console.log('reducer default');
            return state;
    }
}