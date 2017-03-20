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

    let classData = {}
    getSubClassDetails(owlJSON.Ontology.SubClassOf, classData)
  })
}

export const getSubClassDetails = (subClasses, classData) => {
  for (let i = 0; i< subClasses.length; ++i) {
    classData[subClasses[i].Class[0].$.abbreviatedIRI] = subClasses[i].Class[0].$
    if (subClasses[i].Class.length > 1) {
      classData[subClasses[i].Class[0].$.abbreviatedIRI]['subClassOf'] = subClasses[i].Class[1].i
    } else {
      for(let key in subClasses[i]) {
        if (key != "Class"){
          classData[subClasses[i].Class[0].$.abbreviatedIRI]['subClassOf'] = {}
          // TODO:: add the correct structure of the Compound Concept.
          classData[subClasses[i].Class[0].$.abbreviatedIRI]['subClassOf'][key] = subClasses[i][key]
        }
      }
    }
  }
}
