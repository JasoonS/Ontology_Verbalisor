import React, { PropTypes } from 'react'
import Class from '../../containers/Class'
import Relation from '../../containers/Relation'

const Quantifier  = ({ partOfStatement, quantifierObj, quantifierType /*TODO:: not currently doing something*/, classInfo }) => {
  const {ObjectSomeValuesFrom} = quantifierObj

  if (!ObjectSomeValuesFrom.ObjectProperty) {
    console.log('quantifier', ObjectSomeValuesFrom)
  }
  if (!!ObjectSomeValuesFrom.ObjectInverseOf) {
    return (
      <span>
        The other thing...
      </span>
    )
  } else {
    return (
      <span>
        {partOfStatement? '' : 'Something ' }that <Relation displayRelation={ObjectSomeValuesFrom.ObjectProperty.abbreviatedIRI}/> <Class  displayClass={ObjectSomeValuesFrom.Class}/>
      </span>
    )
  }
}

Quantifier.propTypes = {
  quantifierObj: PropTypes.object.isRequired
}

export default Quantifier
