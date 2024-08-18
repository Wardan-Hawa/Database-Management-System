import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DataEntryForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      tags: '',
      file: null,
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    // Check if tags are provided in the correct format
    if (this.state.tags && !this.state.tags.split(',').every(tag => tag.trim().length > 0)) {
      alert('Please enter tags separated by commas without any empty tags.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.state.file);
    formData.append('fileName', this.state.name);
    formData.append('tags', this.state.tags); // Assuming backend expects a string of tags separated by commas

    try {
      const response = await fetch('http://localhost:3000/api/files/upload', {
        method: 'POST',
        body: formData,
        // If your API requires an Authorization token, uncomment and set it here:
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Clear the form fields after successful upload
      this.setState({
        name: '',
        tags: '',
        file: null,
      });

      


    toast.success('File uploaded successfully!');
  } catch (error) {
    console.error('Error during file upload:', error);
    toast.error('Failed to upload file.');
  };
  }
  render() {
    return (
     
      <div className="container">
      <ToastContainer /> {/* Make sure this is within the render method but not inside form */}

        <h2 className='mt-4'>Data Entry Form</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={this.state.name}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tags" className="form-label">
              Tags (separated by commas)
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={this.state.tags}
              onChange={this.handleInputChange}
              placeholder="tag1, tag2
, tag3"
required
/>
</div>
<div className="mb-3">
<label htmlFor="file" className="form-label">
File Upload
</label>
<input
           type="file"
           className="form-control"
           id="file"
           name="file"
           onChange={this.handleFileChange}
           required
         />
</div>
<button type="submit" className="btn btn-primary">
Submit
</button>
</form>
</div>
);
}
}

export default DataEntryForm;