import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { changeTab } from '../actions'
import ClassEditor from './ClassEditor'

const LeftPane  = ({ loadedString, changeTab, tab }) => {
  const getData = () =>{
    let form = new FormData()
    form.set('xml', loadedString)
    fetch('http://attempto.ifi.uzh.ch/service/owl_verbalizer/owl_to_ace', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/text',
      },
      body: form
    }).then(function(response) {
      console.log(response.type)
    })
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
          <p>This functionality doesn't work.</p>
          <p>After spending hours and hours, and more hours.</p>
          <p>Trying to get the <a href='https://github.com/Kaljurand/owl-verbalizer'>server</a> to allow cross-origin requests.</p>
          <a href='http://stackoverflow.com/a/41921909/3103033'>See here for the issue</a>.
          <p>Please 'inspect' the page to see the 'Network' tab for the response to this request.</p>
          <button onClick={getData}>Load own verbalisation</button>
        </div>
      case 'editor':
          return <div className="scroll-box">
            <ClassEditor/>
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
      <button className="tablinks" onClick={() => changeTab('inputOwl')}>OWL</button>
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
