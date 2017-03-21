import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeAndSomething } from '../util'
import Quantifier from '../components/ClassProperties/Quantifier'

const Class  = ({ classData, displayClass, extra }) => {
  if (typeof displayClass == 'string') {
    return <span>{displayClass}</span>
  } else {
    for (let type in displayClass) {
      switch(type) {
        case 'ObjectIntersectionOf':
          const hideAndSomething = !removeAndSomething(displayClass[type])
          return <span>{displayClass[type][0]} {hideAndSomething? '' : 'and '}<Class classData={classData} displayClass={displayClass[type][1]} extra={hideAndSomething}/></span>
        case 'ObjectSomeValuesFrom':
          return <Quantifier partOfStatement={extra} quantifierObj={displayClass} />
        default:
          return <span>COMPOUND_CONCEPT</span>
      }
    }
  }
}

Class.propTypes = {
  classData: PropTypes.object.isRequired
}

const mapStateToProps = ({classData}) => ({
  classData
})

export default connect(
  mapStateToProps
  // TODO:: create this action for advanced interaction
  // { classClicked }
)(Class)
