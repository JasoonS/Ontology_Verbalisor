import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Class  = ({ classData, displayClass }) => {
  console.log('displayClass', displayClass)
  console.log(typeof displayClass)
  if (typeof displayClass == 'string') {
    return <span>{displayClass}</span>
  } else {
    return <span>COMPOUND_CONCEPT</span>
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
