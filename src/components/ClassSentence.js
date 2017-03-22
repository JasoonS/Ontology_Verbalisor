import React, { PropTypes } from 'react'
import Class from '../containers/Class'

const ClassSentence  = ({ classInfo }) => {
  const {properties} = classInfo
  const numProps = properties ? Object.keys(properties).length : 0
  const classSentences = properties ?
    Object.keys(properties).map(( propertyName, index ) => {

      switch(propertyName) {
        case 'SubClassOf':
          return properties.SubClassOf.map((concept, i) =>
            <p key={index + i*numProps}>Every <Class displayClass={classInfo.abbreviatedIRI}/> is a <Class displayClass={concept}/>.</p>
          )
        case 'EquivalentClasses':
          return properties.EquivalentClasses.map((concept, i) =>
            <p key={index + i*numProps}>Every <Class displayClass={classInfo.abbreviatedIRI}/> is a <Class displayClass={concept}/>.
              <br/>Every <Class displayClass={concept}/> is a <Class displayClass={classInfo.abbreviatedIRI}/>.</p>
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
