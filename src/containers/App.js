import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import FileUpload from '../components/FileUpload'
import Verbalised from './Verbalised'
import LeftPane from './LeftPane'
import { loadOwlString } from '../actions'

const App = ({ loadOwlString, loadedString }) => {

  const tospeech = () => {

      var x= document.getElementsByClassName("verbalised-text")[0].innerText

      var msg = new SpeechSynthesisUtterance(x)
      window.speechSynthesis.speak(msg)
  }

  return (
    <div className="entire-window">
      <h1 className="center-div">OWL English Translator</h1>
      <div className="container">
        <div className="half-section left-pannel">
        <h2 className="center-div">Original OWL</h2>
          <LeftPane/>
        <FileUpload className="bottom center-div" uploadFileFunction={loadOwlString}/>
        </div>
        <div className="half-section right-pannel">
          <h2 className="center-div">OWL to ACE Translation</h2>
          <Verbalised/>
          <button onClick={tospeech}>
          the speech button </button>
        </div>
      </div>
    </div>
)}

document.body.style.backgroundColor = "#2F3241";
document.body.style.color ="#F9EFC1";
document.body.style.fontFamily = "sans-serif";
//document.getElementsByClassName("center-div").style.margin ="auto";

App.propTypes = {
  loadOwlString: PropTypes.func.isRequired
}

const mapStateToProps = state => ({

})

export default connect(
  mapStateToProps,
  { loadOwlString }
)(App)
