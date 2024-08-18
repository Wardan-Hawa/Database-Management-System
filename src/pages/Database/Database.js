import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class DataDisplayTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: false,
      error: null,
      filterText: '', // Filter text state
    };
  }

  componentDidMount() {
    this.fetchFiles();
  }

  fetchFiles = async () => {
    this.setState({ isLoading: true, error: null });
    try {
      const token = localStorage.getItem('the_token') || '';
      const response = await fetch('http://localhost:3000/api/files/all', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let files = await response.json();

      // Fetch tags for each file
      for (const file of files) {
        const tagsResponse = await fetch(`http://localhost:3000/api/files/${file.id}/tags`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (tagsResponse.ok) {
          file.tags = await tagsResponse.json();
        } else {
          file.tags = ['Error fetching tags'];
        }
      }

      this.setState({ data: files, isLoading: false });
    } catch (error) {
      console.error("Could not fetch files:", error);
      this.setState({ error, isLoading: false });
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filterText: e.target.value.toLowerCase() });
  };

  confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      this.handleDelete(id);
    }
  }

  handleDelete = async (id) => {
    const token = localStorage.getItem('the_token') || '';
    try {
      const response = await fetch(`http://localhost:3000/api/files/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        this.setState(prevState => ({
          data: prevState.data.filter(dataItem => dataItem.id !== id)
        }));
        toast.success('File deleted successfully!');
      } else {
        throw new Error('Failed to delete the file');
      }
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error('Error deleting file.');
    }
  }

  renderTableHeader() {
    let headers = ['Name', 'Filetype', 'Tags', 'Date', 'Access', 'Actions'];
    return headers.map((header, index) => (
      <th key={index}>{header.toUpperCase()}</th>
    ));
  }

  renderTableData() {
    const { data, filterText } = this.state;
    return data.filter(item => {
      return item.fileName.toLowerCase().includes(filterText) ||
        item.tags.some(tag => tag.tagName.toLowerCase().includes(filterText));
    }).map((dataItem) => (
      <tr key={dataItem.id}>
      <td>{dataItem.fileName}</td>
      <td>{dataItem.fileType}</td>
      <td>{dataItem.tags.map(tag => tag.tagName).join(', ')}</td>
      <td>{new Date(dataItem.dateUploaded).toLocaleDateString()}</td>
      <td>
        <a href={`http://localhost:3000/api/file/${dataItem.filePath.substring(8)}`} target="_blank" rel="noopener noreferrer">
          Link
        </a>
      </td>
      <td>
        <button onClick={() => this.confirmDelete(dataItem.id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  ));
}

render() {
const { isLoading, error } = this.state;
if (error) {
  return <div>Error: {error.message}</div>;
} else if (isLoading) {
  return <div>Loading...</div>;
} else {
  return (
    <div className="container">
      <ToastContainer />
      <h2 className='mt-4'>Data Display</h2>
      <input 
        type="text" 
        className="form-control mb-3" 
        placeholder="Filter by name or tags.." 
        onChange={this.handleFilterChange} 
      />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>{this.renderTableHeader()}</tr>
        </thead>
        <tbody>{this.renderTableData()}</tbody>
      </table>
    </div>
  );
}
}
}

export default DataDisplayTable;