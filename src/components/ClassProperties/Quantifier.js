import React, { PropTypes } from 'react'
import Class from '../../containers/Class'

const Quantifier  = ({ partOfStatement, quantifierObj, quantifierType /*TODO:: not currently doing something*/, classInfo }) => {
  const {ObjectSomeValuesFrom} = quantifierObj
  return (
    <span>
      {partOfStatement? '' : 'Something ' }that {ObjectSomeValuesFrom.ObjectProperty.abbreviatedIRI} a <Class  displayClass={ObjectSomeValuesFrom.Class}/>
    </span>
  )
}

Quantifier.propTypes = {
  quantifierObj: PropTypes.object.isRequired
}

export default Quantifier