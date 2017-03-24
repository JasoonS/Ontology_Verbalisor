import * as types from '../constants/ActionTypes'

const initialState = {
  loadedString: "",
  ui: {
    leftTab: 'inputOwl'
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_OWL_STRING:
      return {...state, loadedString: action.owlString}
    case types.SAVE_JSON_OWL:
      return {...state, loadedJSON: action.owlJSON}
    case types.SET_CLASS_DATA:
      return {...state, classData: action.classData}
    case types.SET_INDIVIDUALS:
      return {...state, individuals: action.individuals}
    case types.SET_RELATIONS:
      return {...state, relations: action.relations}
    case types.CHANGE_TAB:
      const newUI = {...state.ui, leftTab: action.tabName}
      return {...state, ui: newUI}
    case types.CLICK_CLASS:
      let oldArray = JSON.parse(JSON.stringify(state.classData))
      let selectedClass
      if (!!state.selectedClass) {
        selectedClass = state.selectedClass
      } else {
        selectedClass = []
      }
      selectedClass.push(action.className)
      return {...state, classData: oldArray, selectedClass: selectedClass}
    case types.CLASS_NAME_CHANGE:
      let oldClass = JSON.parse(JSON.stringify(state.classData))
      oldClass[action.className].alias = action.newName
      return {...state, classData: oldClass}
    case types.CLASS_COLOUR_CHANGE:
      let oldClas = JSON.parse(JSON.stringify(state.classData))
      oldClas[action.className].stlye = {color: action.newColour}
      return {...state, classData: oldClas}
    default:
      return state
  }
}

export default reducer
