import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const LeftPane  = ({ loadedString }) => {
  const displayPane = () => {
    const paneView = 'inputOwl'
    switch (paneView) {
      case 'inputOwl':
        return <div className="scroll-box">
          <pre>
            {loadedString}
          </pre>
        </div>
      default:
        return <p>unknown pane option</p>
    }
  }
  const TabClicked = (e) => {
    console.log('clicked')
  }
  return (<div>
    {/*Denim addd your shiiiit*/}
    {displayPane()}
  </div>)
}

LeftPane.propTypes = {
}

const mapStateToProps = state => ({
  loadedString: state.loadedString
})

export default connect(
  mapStateToProps
)(LeftPane)
