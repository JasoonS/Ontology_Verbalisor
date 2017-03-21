import * as types from '../constants/ActionTypes'
import {parseString} from 'xml2js'

export const getSubClassDetails = (subClasses, classData) => {
  for (let i = 0; i< subClasses.length; ++i) {
    if (!classData[subClasses[i].Class[0].$.abbreviatedIRI])
      classData[subClasses[i].Class[0].$.abbreviatedIRI] = subClasses[i].Class[0].$

    if (!classData[subClasses[i].Class[0].$.abbreviatedIRI].properties)
      classData[subClasses[i].Class[0].$.abbreviatedIRI].properties = {}

    if (subClasses[i].Class.length > 1) {
      classData[subClasses[i].Class[0].$.abbreviatedIRI].properties['SubClassOf'] = subClasses[i].Class[1].$.abbreviatedIRI
    } else {
      for(let key in subClasses[i]) {
        if (key != "Class"){
          if (!classData[subClasses[i].Class[0].$.abbreviatedIRI].properties['SubClassOf'])
            classData[subClasses[i].Class[0].$.abbreviatedIRI].properties['SubClassOf'] = {}
          // TODO:: add the correct structure of the Compound Concept.
          classData[subClasses[i].Class[0].$.abbreviatedIRI].properties['SubClassOf'][key] = subClasses[i][key]
        }
      }
    }
  }
}

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

    dispatch({
      type: types.SET_CLASS_DATA,
      classData
    })
  })
}
