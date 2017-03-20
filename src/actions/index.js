import * as types from '../constants/ActionTypes'
import {parseString} from 'xml2js'

export const loadOwlString = owlString => (dispatch) => {
    dispatch({
      type: types.LOAD_OWL_STRING,
      owlString
    })
    parseString(owlString, function (err, owlJSON) {
      dispatch({
        type: types.SAVE_JSON_OWL,
        owlJSON
      })
    });
}
