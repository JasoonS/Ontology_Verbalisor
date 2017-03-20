import React, { PropTypes } from 'react'
import RaisedButton from 'material-ui/RaisedButton';

const FileUpload  = ({uploadFileFunction}) => {

  const fileUpload = (e) => {
    var selectedFile = document.getElementById('owl-upload').files[0]

    var reader = new FileReader()

		reader.onload = function(e) {
      uploadFileFunction(reader.result)
		}

		reader.readAsText(selectedFile)
  }
  const exampleImageInput = {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  }
  return (
    <div>
      <h3>Your File Upload Button</h3>
        <input id='owl-upload' type='file' accept='.owl' style={exampleImageInput}
        onChange={fileUpload}
        />
    </div>
  )
}

FileUpload.propTypes = {
}

export default FileUpload
