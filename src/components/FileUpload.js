import React, { PropTypes } from 'react'

const FileUpload  = ({uploadFileFunction}) => {

  const fileUpload = (e) => {
    var selectedFile = document.getElementById('owl-upload').files[0]

    var reader = new FileReader()

		reader.onload = function(e) {
      uploadFileFunction(reader.result)
		}

		reader.readAsText(selectedFile)
  }
  return (
    <div className="center-div">
      <h3>Your File Upload Button</h3>
        <input id='owl-upload' type='file' accept='.owl'
        onChange={fileUpload}
        />
    </div>
  )
}

FileUpload.propTypes = {
}

export default FileUpload
