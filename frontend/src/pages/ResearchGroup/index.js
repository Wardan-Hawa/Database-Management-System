import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResearchGroup = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');
  const { groupId } = useParams(); // Use useParams hook

  useEffect(() => {
    fetchFiles();
  }, [groupId]); // Add groupId as a dependency

  const fetchFiles = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('the_token') || '';
      const response = await fetch(`http://localhost:3000/api/research-group/${groupId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      let groupFiles = await response.json();

      // Process the data to fit the expected structure for rendering
      const processedFiles = groupFiles.map(groupFile => {
        const { File, ...rest } = groupFile;
        return { ...File, ...rest };
      });

      setData(processedFiles);
      setIsLoading(false);
    } catch (error) {
      console.error("Could not fetch files:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value.toLowerCase());
  };

  const confirmDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this file?")) {
      handleDelete(id);
    }
  };

  const handleDelete = async (fileId) => {
    const token = localStorage.getItem('the_token') || '';
    try {
      const response = await fetch(`http://localhost:3000/api/research-group/${groupId}/${fileId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Remove the file from the state to update the UI
      setData(prevData => prevData.filter(file => file.id !== fileId));
      toast.success('File deleted successfully!');
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error('Failed to delete file.');
    }
  };

  const renderTableHeader = () => {
    let headers = ['Name', 'Filetype', 'Tags', 'Date', 'Access', 'Actions'];
    return headers.map((header, index) => (
      <th key={index}>{header.toUpperCase()}</th>
    ));
  };

  const renderTableData = () => {
    return data.filter(item => item.fileName.toLowerCase().includes(filterText) || (item.Tags && item.Tags.some(tag => tag.tagName.toLowerCase().includes(filterText)))).map(dataItem => (
      <tr key={dataItem.id}>
        <td>{dataItem.fileName}</td>
        <td>{dataItem.fileType}</td>
        <td>{dataItem.Tags ? dataItem.Tags.map(tag => tag.tagName).join(', ') : ''}</td>
        <td>{new Date(dataItem.dateUploaded).toLocaleDateString()}</td>
        <td>
          <a href={`http://localhost:3000/api/file/${dataItem.filePath.substring(8)}`} target="_blank" rel="noopener noreferrer">
            Link
          </a>
        </td>
        <td>
          <button onClick={() => confirmDelete(dataItem.id)} className="btn btn-danger">
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  const handleUploadButtonClick = () => {
    window.location.href = `http://localhost:3001/research-group/${groupId}/upload`;
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="container">
        <ToastContainer />
        <h2 className='mt-4'>Group Data Display</h2>
        <div className="mb-3 d-flex">
          <input 
            type="text" 
            style={{ maxWidth: '1200px', marginRight: '30px' }}
            className="form-control mb-3" 
            placeholder="Filter by name or tags.." 
            onChange={handleFilterChange} 
          />
          <button onClick={handleUploadButtonClick} className="btn btn-success" style={{ height: '38px' }}>Upload Data</button>
        </div>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>{renderTableHeader()}</tr>
          </thead>
          <tbody>{renderTableData()}</tbody>
        </table>
      </div>
    );
  }
};

export default ResearchGroup;
