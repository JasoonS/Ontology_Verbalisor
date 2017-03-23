import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeTab } from '../actions'
import '../index.css'

const LeftPane  = ({ loadedString, changeTab, tab }) => {
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
          Attempto tab
        </div>
      case 'editor':
          return <div className="scroll-box">
            Editor tab
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
