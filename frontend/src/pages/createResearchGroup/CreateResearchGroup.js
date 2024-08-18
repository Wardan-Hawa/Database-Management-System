import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class CreateResearchGroup extends Component {
  constructor() {
    super();
    this.state = {
      groupName: '',
      members: '',
      groupDescription: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { groupName, members, groupDescription } = this.state;

    // Convert members string to an array of emails
    const memberEmails = members.split(',').map(email => email.trim());

    fetch('http://localhost:3000/api/research-groups/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`
      },
      body: JSON.stringify({
        groupName,
        members: memberEmails, // Assuming the backend expects an array of emails
        groupDescription,
      }),
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      // If the response is not ok, convert non-2xx HTTP responses into errors.
      return response.json().then(body => Promise.reject(new Error(body.error)));
    })
    .then(data => {
      toast.success('Group created successfully!');
      this.setState({
        groupName: '',
        members: '',
        groupDescription: '',
      });
    })
    .catch(error => {
      toast.error(`Failed to create group: ${error.message}`);
    });
  };

  render() {
    const { groupName, members, groupDescription } = this.state;

    return (
      <div className="container">
        <ToastContainer />
        <h2 className="mt-4">Create Research Group</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="groupName" className="form-label">
              Group Name
            </label>
            <input
              type="text"
              className="form-control"
              id="groupName"
              name="groupName"
              value={groupName}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="members" className="form-label">
              Members (comma-separated emails)
            </label>
            <input
              type="text"
              className="form-control"
              id="members"
              name="members"
              value={members}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="groupDescription" className="form-label">
              Group Description
            </label>
            <textarea
              className="form-control"
              id="groupDescription"
              name="groupDescription"
              value={groupDescription}
              onChange={this.handleInputChange}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Create Group
          </button>
        </form>
      </div>
    );
  }
}

export default CreateResearchGroup;
