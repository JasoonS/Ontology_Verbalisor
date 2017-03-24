import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeAndSomething, getClassEditorArticle } from '../util'
import { changeName, changeColour } from '../actions'

const ClassEditor  = ({ classData, selectedClass, changeName, changeColour }) => {
  const nameChange = (e, name) => {
    if (!!e.target.value)
      changeName(name, e.target.value)
  }
  const colorChange = (name, colour) => {
    changeColour(name, colour)
  }
  let classes = (!!selectedClass? selectedClass.map((name, i) => {
    return (<div key={i}>
      <p>
        {name} - {classData[name].alias}
      </p>
      <p>
      -----------------
      </p>
      <button onClick={() => colorChange(name, 'red')}>red</button>
      <button onClick={() => colorChange(name, 'green')}>green</button>
      <button onClick={() => colorChange(name, 'blue')}>blue</button>
      <p>
        Set Class name
        <input onChange={(e) => nameChange(e, name)}/>
      </p>
    </div>)
}
  ) :
  <p>Nothing to show, please click on a class</p>
 )
  return (
    <div>
      {classes}
    </div>
  )
}

ClassEditor.propTypes = {
  // classData: PropTypes.object.isRequired,
  // individuals: PropTypes.object.isRequired
}

const mapStateToProps = ({classData, individuals, selectedClass}) => ({
  classData,
  selectedClass
})

export default connect(
  mapStateToProps,
  // TODO:: create this action for advanced interaction
  { changeName, changeColour }
)(ClassEditor)
