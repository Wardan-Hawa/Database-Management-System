import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';

const DataEntryFormRG = () => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const { groupId } = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'tags') {
      setTags(value);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (tags && !tags.split(',').every(tag => tag.trim().length > 0)) {
      alert('Please enter tags separated by commas without any empty tags.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', name);
    formData.append('tags', tags);

    try {
      const response = await fetch(`http://localhost:3000/api/research-group/${groupId}/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setName('');
      setTags('');
      setFile(null);

      toast.success('File uploaded successfully!');
    } catch (error) {
      console.error('Error during file upload:', error);
      toast.error('Failed to upload file.');
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2 className='mt-4'>Data Entry Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" value={name} onChange={handleInputChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (separated by commas)</label>
          <input type="text" className="form-control" id="tags" name="tags" value={tags} onChange={handleInputChange} placeholder="tag1, tag2, tag3" required />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">File Upload</label>
          <input type="file" className="form-control" id="file" name="file" onChange={handleFileChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default DataEntryFormRG;
