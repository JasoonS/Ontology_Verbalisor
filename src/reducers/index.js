import { LOAD_OWL_STRING } from '../constants/ActionTypes'

const initialState = {
  loadedString: "",
  ui: {}
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_OWL_STRING:
      return {...state, loadedString: action.owlString}
    default:
      return state
  }
}

export default reducer
