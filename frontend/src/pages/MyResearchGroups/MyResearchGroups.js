import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa'; 

const MyResearchGroupsPage = () => {
  const [researchGroupsData, setResearchGroupsData] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/research-groups/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`,
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch groups');
        }

        const data = await response.json();
        setResearchGroupsData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching groups');
        setResearchGroupsData([]);
      }
    };

    fetchGroups();
  }, []);

  const handleLeaveGroup = (groupId) => {
    if (window.confirm(`Are you sure you want to leave the group with ID ${groupId}?`)) {
      fetch(`http://localhost:3000/api/research-groups/leave/${groupId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to leave group');
        }
        toast.success(`Successfully left the group with ID ${groupId}`);
        setResearchGroupsData(currentGroups => currentGroups.filter(group => group.id !== groupId));
      })
      .catch(error => {
        console.error('Error leaving group:', error);
        toast.error(`Error leaving group: ${error.message}`);
      });
    }
  };

  const toggleFavorite = (groupId, isCurrentlyFav) => {
    fetch(`http://localhost:3000/api/research-groups/${groupId}/favorite`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isFav: !isCurrentlyFav }) 
      })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update favorite status');
      }
      return response.json();
    })
    .then(updatedGroup => {
      setResearchGroupsData(currentGroups => currentGroups.map(group => 
        group.id === groupId ? updatedGroup : group
      ));
      toast.success(`Favorite status updated for group ${groupId}`);
    })
    .catch(error => {
      console.error('Error updating favorite status:', error);
      toast.error(`Error updating favorite status: ${error.message}`);
    });
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2>My Research Groups</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Fav</th>
            <th>Name</th>
            <th>Description</th>
            <th>Members</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {researchGroupsData.map(group => (
            <tr key={group.id}>
             <td>
    <button 
      onClick={() => toggleFavorite(group.id, group.isFav)}
      className="btn"
    >
      {group.isFav ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  </td>
              <td>{group.groupName}</td>
              <td>{group.groupDescription}</td>
              <td>
                {group.Users && group.Users.length > 0 ? 
                  group.Users.map(user => user.username).join(', ') : 
                  'No members'}
              </td>
              <td>
                <Link to={`/research-group/${group.id}`} className="btn btn-primary me-2">
                  Go to Group
                </Link>
                <button onClick={() => handleLeaveGroup(group.id)} className="btn btn-warning">
                  Leave Group
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default MyResearchGroupsPage;
