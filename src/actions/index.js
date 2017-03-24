import * as types from '../constants/ActionTypes'
import {parseString} from 'xml2js'
import {getClassAlias} from '../util'

export const setupClass = (classToSet, classData) => {
  let classToSetName = classToSet.abbreviatedIRI

  if (!classData[classToSetName]) {
    console.log('what I have', classToSet)
    classData[classToSetName] = classToSet
    classData[classToSetName].alias = getClassAlias(classToSetName)
  }

  if (!classData[classToSetName].properties)
    classData[classToSetName].properties = {}
}

let globalCount = 0

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
              // setupClass(conceptJSON.ObjectSomeValuesFrom[i][prop][0].$)

              if (!classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI]) {
                classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectSomeValuesFrom[i][prop][0].$
                classData[conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI)
              }
            } else if (prop === 'ObjectInverseOf'){
              console.log('object inverse', conceptJSON.ObjectSomeValuesFrom[i][prop] )
              someValuesFrom[prop] = conceptJSON.ObjectSomeValuesFrom[i][prop][0].$.abbreviatedIRI
              // setupClass(conceptJSON.ObjectSomeValuesFrom[i][prop][0].$)

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
      case 'ObjectIntersectionOf':
        let intersectionOf = {}

        for (let i = 0; i < conceptJSON.ObjectIntersectionOf.length; ++i) {
          for(let prop in conceptJSON.ObjectIntersectionOf[i]) {
            console.log('Intersection', conceptJSON.ObjectIntersectionOf[i][prop], prop)
            if (prop === 'ObjectProperty') {
              if (!relations[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI]) {
                relations[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectIntersectionOf[i][prop][0].$
                relations[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI)
              }
              someValuesFrom.ObjectProperty = conceptJSON.ObjectIntersectionOf[i].ObjectProperty[0].$
            } else if (prop === 'Class'){
              intersectionOf[prop] = conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI
              // setupClass(conceptJSON.ObjectIntersectionOf[i][prop][0].$)

              if (!classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI]) {
                classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectIntersectionOf[i][prop][0].$
                classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI)
              }
            } else if (prop === 'ObjectInverseOf'){
              console.log('object inverse', conceptJSON.ObjectIntersectionOf[i][prop] )
              intersectionOf[prop] = conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI
              // setupClass(conceptJSON.ObjectIntersectionOf[i][prop][0].$)

              if (!classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI]) {
                classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectIntersectionOf[i][prop][0].$
                classData[conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectIntersectionOf[i][prop][0].$.abbreviatedIRI)
              }
            } else {
              intersectionOf[prop] = dealWithConcepts(conceptJSON.ObjectIntersectionOf[i][prop][0], classData, individuals, relations)
            }
          }
        }
        newConcept.push({ObjectIntersectionOf: intersectionOf})
        break;
      case 'ObjectAllValuesFrom':
        let allValuesFrom = {}

        for (let i = 0; i < conceptJSON.ObjectAllValuesFrom.length; ++i) {
          for(let prop in conceptJSON.ObjectAllValuesFrom[i]) {
            if (prop === 'ObjectProperty') {
              if (!relations[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI]) {
                relations[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectAllValuesFrom[i][prop][0].$
                relations[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI)
              }
              allValuesFrom.ObjectProperty = conceptJSON.ObjectAllValuesFrom[i].ObjectProperty[0].$
            } else if (prop === 'Class'){
              allValuesFrom[prop] = conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI
              // setupClass(conceptJSON.ObjectAllValuesFrom[i][prop][0].$)

              if (!classData[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI]) {
                classData[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI] = conceptJSON.ObjectAllValuesFrom[i][prop][0].$
                classData[conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI].alias = getClassAlias(conceptJSON.ObjectAllValuesFrom[i][prop][0].$.abbreviatedIRI)
              }
            } else {
              allValuesFrom[prop] = dealWithConcepts(conceptJSON.ObjectAllValuesFrom[i][prop][0], classData, individuals, relations)
            }
          }
        }
        newConcept.push({ObjectAllValuesFrom: allValuesFrom})
        break;
      default:
        newConcept[key] = conceptJSON[key][0]
    }
  }
  return newConcept
}

export const getSubClassDetails = (subClasses, classData, individuals, relations) => {
  if (!subClasses)
    return

  for (let i = 0; i< subClasses.length; ++i) {
    let classOneName = 'complexClass' + (globalCount++)

    if (!!subClasses[i].Class){
      setupClass(subClasses[i].Class[0].$, classData)
      classOneName = subClasses[i].Class[0].$.abbreviatedIRI


      if (!classData[classOneName].properties['SubClassOf'])
        classData[classOneName].properties['SubClassOf'] = []

      if (subClasses[i].Class.length > 1) {
        classData[classOneName].properties['SubClassOf'].push(subClasses[i].Class[1].$.abbreviatedIRI)
        setupClass(subClasses[i].Class[1].$, classData)
      } else {
        for (let key in subClasses[i]) {
          switch (key){
            case 'Class':
              break
            case 'ObjectOneOf':
              let oneOf = []
              let namedIndividuals = subClasses[i][key][0].NamedIndividual

              for (let i = 0; i < namedIndividuals.length; ++i) {
                let individual = namedIndividuals[i].$
                let individualName = individual.abbreviatedIRI

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
    } else {
      classData[classOneName] = {}
      classData[classOneName].properties = {}
      classData[classOneName].properties.SubClassOf = []

      let first = true
      for (let key in subClasses[i]) {
        switch (key){
          case 'Class':
            break
          case 'ObjectOneOf':
            let oneOf = []
            let namedIndividuals = subClasses[i][key][0].NamedIndividual

            for (let i = 0; i < namedIndividuals.length; ++i) {
              let individual = namedIndividuals[i].$
              let individualName = individual.abbreviatedIRI

              if (!individuals[individualName]) {
                individuals[individualName] = individual
                individuals[individualName].alias = getClassAlias(individualName)
              }
              oneOf.push({NamedIndividual: individualName})
            }
            if (first) {
              // Note:: doing it like this with abbreviatedIRI is a complete hack...
              classData[classOneName].abbreviatedIRI = {ObjectUnionOf: oneOf}
            } else {
              classData[classOneName].properties.SubClassOf.push({ObjectUnionOf: oneOf})
            }
            break;
          default:
            let concept = {}
            concept[key] = dealWithConcepts(subClasses[i][key][0], classData, individuals, relations) // TODO:: pre-process the subclass recursively...
            if (first) {
              // Note:: doing it like this with abbreviatedIRI is a complete hack...
              classData[classOneName].abbreviatedIRI = concept
            } else {
              classData[classOneName].properties['SubClassOf'].push(concept)
            }
        }
        first = false
      }
    }
  }
}

export const getEquivalentClasses = (equivalentClasses, classData, individuals, relations) => {
  if (!equivalentClasses)
    return

  for (let i = 0; i< equivalentClasses.length; ++i) {
    setupClass(equivalentClasses[i].Class[0].$, classData)
    let classOneName = equivalentClasses[i].Class[0].$.abbreviatedIRI

    if (!classData[classOneName].properties['EquivalentClasses'])
      classData[classOneName].properties['EquivalentClasses'] = []

    if (equivalentClasses[i].Class.length > 1) {
      classData[classOneName].properties['EquivalentClasses'].push(equivalentClasses[i].Class[1].$.abbreviatedIRI)
      setupClass(equivalentClasses[i].Class[1].$, classData)
    } else {
      for (let key in equivalentClasses[i]) {
        switch (key){
          case 'Class':
            break
          case 'ObjectOneOf':
            let oneOf = []
            let namedIndividuals = equivalentClasses[i][key][0].NamedIndividual

            for (let i = 0; i < namedIndividuals.length; ++i) {
              let individual = namedIndividuals[i].$
              let individualName = individual.abbreviatedIRI

              if (!individuals[individualName]) {
                individuals[individualName] = individual
                individuals[individualName].alias = getClassAlias(individualName)
              }
              oneOf.push({NamedIndividual: individualName})
            }
            classData[classOneName].properties['EquivalentClasses'].push({ObjectUnionOf: oneOf})
            break;
          case 'ObjectAllValuesFrom':
            const objConcept = dealWithConcepts({ObjectAllValuesFrom: equivalentClasses[i][key]}, classData, individuals, relations) // TODO:: pre-process the subclass recursively...
            classData[classOneName].properties['EquivalentClasses'].push(objConcept)
            break;
          default:
            let concept = {}
            concept[key] = dealWithConcepts(equivalentClasses[i][key][0], classData, individuals, relations) // TODO:: pre-process the subclass recursively...
            classData[classOneName].properties['EquivalentClasses'].push(concept)
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
    getEquivalentClasses(owlJSON.Ontology.EquivalentClasses, classData, individuals, relations)
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
  })
}

export const changeTab = tabName => (dispatch) => {
  dispatch({
    type: types.CHANGE_TAB,
    tabName
  })
}

export const classClicked = className => (dispatch) => {
  dispatch({
    type: types.CLICK_CLASS,
    className
  })
}

export const changeName = (className, newName) => (dispatch) => {
  dispatch({
    type: types.CLASS_NAME_CHANGE,
    className,
    newName
  })
}
export const changeColour = (className, newColour) => (dispatch) => {
  dispatch({
    type: types.CLASS_NAME_CHANGE,
    className,
    newColour
  })
}
