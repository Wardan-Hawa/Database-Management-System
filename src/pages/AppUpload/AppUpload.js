import React, { Component } from 'react';

class AppUpload extends Component {
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

  handleSubmit = (e) => {
    e.preventDefault();
    // You can send the form data to your backend API or perform any desired actions here
    console.log('Form Data:', this.state);
    // Clear the form fields
    this.setState({
      name: '',
      tags: '',
      file: null,
    });
  };

  render() {
    return (
      <div className="container">
        <h2 className='mt-4'>Upload a MATLAB App</h2>
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
              Tags
            </label>
            <input
              type="text"
              className="form-control"
              id="tags"
              name="tags"
              value={this.state.tags}
              onChange={this.handleInputChange}
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

export default AppUpload;
