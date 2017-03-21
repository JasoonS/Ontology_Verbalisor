import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FileUpload from '../components/FileUpload'
import ClassSentence from '../components/ClassSentence'
import { loadOwlString } from '../actions'

const Verbalised = ({ classData }) => {
  const classSentences = classData ?
              Object.keys(classData).map(( className, index ) =>
                       <ClassSentence key={index} classInfo={classData[className]}/>)
              : <p>Please load an OWL ontology into the pane on the left</p>
  return (
    <div className='scroll-box'>
      <div className='verbalised-text'>
        {classSentences}
      </div>
    </div>
)}

Verbalised.propTypes = {
  classData: PropTypes.object
}

const mapStateToProps = state => ({
  classData: state.classData
})

export default connect(
  mapStateToProps
)(Verbalised)
