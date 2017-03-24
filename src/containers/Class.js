import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeAndSomething, getClassArticle } from '../util'
import Quantifier from '../components/ClassProperties/Quantifier'
import { classClicked } from '../actions'

const Class  = ({ classData, displayClass, extra, individuals, classClicked }) => {
  if (typeof displayClass === 'string') {
    const article = getClassArticle(classData[displayClass].alias)
    return <span onClick={() => classClicked(displayClass)}>{article} {classData[displayClass].alias}</span>
  } else {
    for (let type in displayClass) {
      switch(type) {
        case 'NamedIndividual':
          const article = getClassArticle(individuals[displayClass[type]].alias)
          return <span>{individuals[displayClass[type]].alias}</span>
        case 'ObjectIntersectionOf':
          const hideAndSomething = !removeAndSomething(displayClass[type])
          return <span><ClassRec displayClass={displayClass[type][0]} /> {hideAndSomething? '' : 'and '}<ClassRec displayClass={displayClass[type][1]} extra={hideAndSomething}/></span>
        case 'ObjectSomeValuesFrom':
          return <Quantifier partOfStatement={extra} quantifierObj={displayClass} />
        case 'ObjectUnionOf':
          return <span>something that is <ClassRec displayClass={displayClass[type][0]} /> or that is <ClassRec displayClass={displayClass[type][1]} /></span>
        default:
          return <span>COMPOUND_CONCEPT</span>
      }
    }
  }
}

Class.propTypes = {
  classData: PropTypes.object.isRequired,
  individuals: PropTypes.object.isRequired
}

const mapStateToProps = ({classData, individuals}) => ({
  classData,
  individuals
})

const ClassRec = connect(
  mapStateToProps,
  // TODO:: create this action for advanced interaction
  { classClicked }
)(Class)

export default ClassRec
