import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeTab } from '../actions'

const LeftPane  = ({ loadedString, changeTab, tab }) => {
  const displayPane = () => {
    switch (tab) {
      case 'inputOwl':
        return <div className="scroll-box">
          <pre>
            {loadedString}
          </pre>
        </div>
      case 'clicked':
        TabClicked()
        return <div className="scroll-box">
          some shiiiit other tab
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
    {/*Denim addd your shiiiit*/}
    <button onClick={() => changeTab('clicked')}>click me</button>
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
