import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { removeAndSomething, getClassEditorArticle } from '../util'
import { changeName } from '../actions'

const ClassEditor  = ({ classData, selectedClass }) => {
  const nameChange = (e) => {
    console.log(e.target.vector)
  }
  let classes = (!!selectedClass? selectedClass.map((name, i) => {
    return (<div key={i}>
      <p>
        {name} - {classData[name].alias}
      </p>
      <p>
      -----------------
      </p>
      <button>red</button>
      <button>green</button>
      <button>blue</button>
      <p>
        Set Class name
        <input onChange={nameChange}/>
      </p>
    </div>)
}
  ) :
  <p>Nothing to show, please click on a class</p>
 )
  return (
    <div>
      hello
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
  mapStateToProps
  // TODO:: create this action for advanced interaction
  { changeName }
)(ClassEditor)
