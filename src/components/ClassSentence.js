import React, { PropTypes } from 'react'
import Class from '../containers/Class'

const ClassSentence  = ({ classInfo }) => {
  const {properties} = classInfo
  const classSentences = properties ?
    Object.keys(properties).map(( propertyName, index ) => {

      switch(propertyName) {
        case 'SubClassOf':
          return <p key={index}>Every {classInfo.abbreviatedIRI} is a <Class displayClass={properties[propertyName]}/>.</p>
        default:
          return <p key={index}>We cannot recognise the definition of {propertyName} on {classInfo.abbreviatedIRI}</p>
      }
    })
     : <p>There seems to be an error, the class</p>
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
