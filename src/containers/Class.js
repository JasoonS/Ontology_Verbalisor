import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeAndSomething } from '../util'

const Class  = ({ classData, displayClass }) => {
  if (typeof displayClass == 'string') {
    return <span>{displayClass}</span>
  } else {
    console.log('display class', displayClass)
    for (let type in displayClass) {
      switch(type) {
        case 'ObjectIntersectionOf':
          const hideAndSomething = removeAndSomething
          return <span>{displayClass[type][0]} {hideAndSomething? '' : 'and'} bla bla</span>
        default:
          console.log('the wrong thingy')
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
