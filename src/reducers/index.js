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
      let oldArray = state.classData
      console.log('in REDUCER', oldArray[action.className])
      let selectedClass
      if (!!state.selectedClass) {
        selectedClass = state.selectedClass
      } else {
        selectedClass = [action.className]
      }
      selectedClass.push()
      return {...state, classData: oldArray, selectedClass}
    default:
      return state
  }
}

export default reducer
