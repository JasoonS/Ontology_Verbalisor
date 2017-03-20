import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FileUpload from '../components/FileUpload'
import { loadOwlString } from '../actions'

const App = ({ loadOwlString, loadedString }) => {
  return (
    <div className="entire-window">
      <h2>OWL english translator</h2>
      <div className="container">
        <div className="half-section left-pannel">
        <h2>Original OWL</h2>
        <div className="scroll-box">
          <pre>
            {loadedString}
          </pre>
        </div>
        <FileUpload className ="bottom" uploadFileFunction={loadOwlString}/>
        </div>
        <div className="half-section right-pannel">
        <h2>OWL translation</h2>
        </div>
      </div>
    </div>
)}

App.propTypes = {
  loadOwlString: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  loadedString: state.loadedString
})

export default connect(
  mapStateToProps,
  { loadOwlString }
)(App)
