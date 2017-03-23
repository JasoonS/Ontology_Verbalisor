import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeTab } from '../actions'
import '../index.css'

const LeftPane  = ({ loadedString, changeTab, tab }) => {
  const getData = (e) =>{
    console.log("something kosher", e)
  }
  const displayPane = () => {
    switch (tab) {
      case 'inputOwl':
        return <div className="scroll-box">
          <pre>
            {loadedString}
          </pre>
        </div>
      case 'attempto':
        return <div className="scroll-box">



        <div class="form">

  <form action="http://192.168.0.14:5123" method="post" id="form">

  <div>
  <textarea name="xml" title="OWL ontology in XML syntax" rows="24" cols="80">
    {loadedString}
  </textarea>
  </div>

  <input type="submit" onSubmit={getData(e)} value="Verbalize" title="Verbalize the ontology!"/>
  </form>



      </div>
        </div>
      case 'editor':
          return <div className="scroll-box">

          </div>
      default:
        return <p>unknown pane option</p>
    }
  }
  const TabClicked = what => {
    console.log('clicked', what)
    changeTab(what)
  }
  return (<div>
    <div className="tab">
      <button className="tablinks" onClick={() => changeTab('inputOwl')}>OWL to ACE</button>
      <button className="tablinks" onClick={() => changeTab('attempto')}>Attempto</button>
      <button className="tablinks" onClick={() => changeTab('editor')}>Editor</button>
    </div>
    {displayPane()}
  </div>)
}

LeftPane.propTypes = {
}

const mapStateToProps = state => ({
  loadedString: state.loadedString,
  tab: state.ui.leftTab
})

export default connect(
  mapStateToProps,
  { changeTab }
)(LeftPane)
