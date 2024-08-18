import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTable, faUsers, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const NavigationCard = ({ icon, title, description, linkTo, buttonText }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`col-md-6 mb-4 ${isHovered ? 'blur-effect' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <FontAwesomeIcon icon={icon} size="2x" className={`mb-3 ${isHovered ? 'text-primary' : ''}`} />
          <h5 className={`card-title ${isHovered ? 'text-primary' : ''}`}>{title}</h5>
          <p style={{ width: '80%' }} className={`card-text ${isHovered ? 'text-muted' : ''}`}>{description}</p>
        </div>
        <Link
          to={linkTo}
          onClick={scrollToTop}
          className={`btn btn-${isHovered ? 'primary' : 'secondary'} btn-action`}
          style={{ width: '45%' }}
        >
          {buttonText || title}
        </Link>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const [favoriteGroups, setFavoriteGroups] = useState([]);

  useEffect(() => {
    fetchFavoriteGroups();
  }, []);

  const fetchFavoriteGroups = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/research-groups/user', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('the_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch research groups');
      }

      const data = await response.json();
      const favoriteGroups = data.filter(group => group.isFav);
      setFavoriteGroups(favoriteGroups);
    } catch (error) {
      console.error('Error fetching research groups:', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-75">
      <div className="row">
        {/* Other NavigationCard components */}
        <NavigationCard
          icon={faPlusCircle}
          title="Research Data Entry"
          description="Enter data that will be displayed in the database table."
          linkTo="/DataEntryForm"
        />
        <NavigationCard
          icon={faTable}
          title="My Data Display"
          description="View and manage the data displayed in the database table."
          linkTo="/Database"
        />
        <NavigationCard
          icon={faUsers}
          title="Create Research Group"
          description="Create a new research group for collaboration."
          linkTo="/CreateResearchGroup"
        />
        <NavigationCard
          icon={faUserFriends}
          title="My Research Groups"
          description="View and manage your research groups."
          linkTo="/MyResearchGroupsPage"
        />

        {favoriteGroups.map(group => (
          <NavigationCard
            key={group.id}
            icon={faUserFriends}
            title={group.groupName}
            description={group.groupDescription || 'No description available'}
            linkTo={`/Research-Group/${group.id}`}
            buttonText="Go to Researh Group"
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
