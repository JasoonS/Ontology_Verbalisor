import React, { PropTypes } from 'react'
import Class from '../containers/Class'
import Relation from '../containers/Relation'

const ClassSentence  = ({ classInfo }) => {
  const {properties} = classInfo
  const numProps = properties ? Object.keys(properties).length : 0
  const classSentences = properties ?
    Object.keys(properties).map(( propertyName, index ) => {

      switch(propertyName) {
        case 'SubClassOf':
          return properties.SubClassOf.map((concept, i) =>
            <p key={index + i*numProps}>Every <Class displayClass={classInfo.abbreviatedIRI}/> is <Class displayClass={concept}/>.</p>
          )
        case 'EquivalentClasses':
          return properties.EquivalentClasses.map((concept, i) =>
            concept.map((equivalent, j) =>
              <p key={index + i*numProps}>Everything that is <Relation displayRelation={equivalent.ObjectAllValuesFrom.ObjectProperty.abbreviatedIRI}/> by <Class displayClass={classInfo.abbreviatedIRI}/> is <Class displayClass={equivalent.ObjectAllValuesFrom.Class}/>.
              <br/>Everything that <Relation displayRelation={equivalent.ObjectAllValuesFrom.ObjectProperty.abbreviatedIRI}/> nothing but <Class displayClass={equivalent.ObjectAllValuesFrom.Class}/> is <Class displayClass={classInfo.abbreviatedIRI}/>.</p>
            )
          )
        default:
          return <p key={index}>We cannot recognise the definition of {propertyName} on {classInfo.abbreviatedIRI}</p>
      }
    })
     : <span/>
  return (
    <div>
      {classSentences}
    </div>
  )
}

ClassSentence.propTypes = {
  classInfo: PropTypes.object.isRequired
}

export default ClassSentence
