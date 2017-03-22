import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


const Relation = ({ relations, displayRelation }) => {
  return <span>{relations[displayRelation].alias}</span>
}

Relation.propTypes = {
  relations: PropTypes.object.isRequired,
  displayRelation: PropTypes.string.isRequired
}

const mapStateToProps = ({relations}) => ({
  relations
})

export default connect(
  mapStateToProps
  // TODO:: create this action for advanced interaction
  // { RelationClicked }
)(Relation)
