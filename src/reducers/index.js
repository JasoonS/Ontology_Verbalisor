import * as types from '../constants/ActionTypes'

const initialState = {
  loadedString: "",
  ui: {}
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
    default:
      return state
  }
}

export default reducer
