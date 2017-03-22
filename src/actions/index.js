import * as types from '../constants/ActionTypes'
import {parseString} from 'xml2js'
import {getClassAlias} from '../util'

export const dealWithConcepts = (conceptJSON, classData, individuals, relations) => {
  let newConcept = []

  for(let key in conceptJSON) {
    switch (key) {
      case 'Class':
        for (let i = 0; i < conceptJSON.Class.length; ++i) {
          newConcept.push(conceptJSON.Class[i].$.abbreviatedIRI)
          if (!classData[conceptJSON.Class[i].$.abbreviatedIRI]) {
            classData[conceptJSON.Class[i].$.abbreviatedIRI] = conceptJSON.Class[i].$
            classData[conceptJSON.Class[i].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.Class[i].$.abbreviatedIRI)
          }
        }
        break;
      case 'ObjectSomeValuesFrom':
        let someValuesFrom = {}

        for (let i = 0; i < conceptJSON.ObjectSomeValuesFrom.length; ++i) {
          for(let prop in conceptJSON.ObjectSomeValuesFrom[i]) {
            if (prop === 'ObjectProperty') {
              if (!relations[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI]) {
                relations[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectSomeValuesFrom[i][prop][0].$
                relations[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI)
              }
              someValuesFrom.ObjectProperty = conceptJSON.ObjectSomeValuesFrom[i].ObjectProperty[0].$
            } else if (prop === 'Class'){
              someValuesFrom[prop] = conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI
              if (!classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI]) {
                classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectSomeValuesFrom[i][prop][0].$
                classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI)
              }
            } else {
              someValuesFrom[prop] = dealWithConcepts(conceptJSON.ObjectSomeValuesFrom[i][prop][0], classData, individuals, relations)
            }
          }
        }
        newConcept.push({ObjectSomeValuesFrom: someValuesFrom})
        break;
      default:
        newConcept[key] = conceptJSON[key][0]
    }
  }
  return newConcept
}

export const transformObjectOneOf = (subClasses, classData, individuals, relations) => {

}

export const getSubClassDetails = (subClasses, classData, individuals, relations) => {
  for (let i = 0; i< subClasses.length; ++i) {
    let classOne = subClasses[i].Class[0].$
    let classOneName = subClasses[i].Class[0].$.abbreviatedIRI

    if (!classData[classOneName]) {
      classData[classOneName] = classOne
      classData[classOneName].alias = getClassAlias(classOneName)
    }

    if (!classData[classOneName].properties)
      classData[classOneName].properties = {}

    if (!classData[classOneName].properties['SubClassOf'])
      classData[classOneName].properties['SubClassOf'] = []

    if (subClasses[i].Class.length > 1) {
      classData[classOneName].properties['SubClassOf'].push(subClasses[i].Class[1].$.abbreviatedIRI)
      if (!classData[subClasses[i].Class[1].$.abbreviatedIRI]) {
        classData[subClasses[i].Class[1].$.abbreviatedIRI] = subClasses[i].Class[1].$
        classData[subClasses[i].Class[1].$.abbreviatedIRI].alias = getClassAlias(subClasses[i].Class[1].$.abbreviatedIRI)
      }
    } else {
      for (let key in subClasses[i]) {
        switch (key){
          case 'Class':
            break
          case 'ObjectOneOf':
            console.log('insude object one of', subClasses[i][key][0])
            let oneOf = []
            let namedIndividuals = subClasses[i][key][0].NamedIndividual

            for (let i = 0; i < namedIndividuals.length; ++i) {
              let individual = namedIndividuals[i].$
              let individualName = individual.abbreviatedIRI
              console.log('inside object one of', individual, individualName)

              if (!individuals[individualName]) {
                individuals[individualName] = individual
                individuals[individualName].alias = getClassAlias(individualName)
              }
              oneOf.push({NamedIndividual: individualName})
            }
            classData[classOneName].properties['SubClassOf'].push({ObjectUnionOf: oneOf})
            break;
          default:
            let concept = {}
            concept[key] = dealWithConcepts(subClasses[i][key][0], classData, individuals, relations) // TODO:: pre-process the subclass recursively...
            classData[classOneName].properties['SubClassOf'].push(concept)
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
    let individuals = {}
    let relations = {}
    getSubClassDetails(owlJSON.Ontology.SubClassOf, classData, individuals, relations)

    dispatch({
      type: types.SET_INDIVIDUALS,
      individuals
    })
    dispatch({
      type: types.SET_RELATIONS,
      relations
    })
    dispatch({
      type: types.SET_CLASS_DATA,
      classData
    })
    // console.log(JSON.stringify(owlJSON))
  })
}
