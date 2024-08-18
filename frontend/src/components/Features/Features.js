import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faUpload, faUsers, faChartLine, faArchive, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

const features = [
  {
    icon: <FontAwesomeIcon icon={faLightbulb} size="2x" />,
    title: 'Empower Your Research',
    content: 'Enhance your research journey with our intuitive tools, simplifying data management, and accelerating scientific discovery.',
  },
  {
    icon: <FontAwesomeIcon icon={faUpload} size="2x" />,
    title: 'Streamline Data Workflow',
    content: 'Seamlessly upload, organize, and access your research data, allowing you to focus on your experiments and analysis without the hassle of data management.',
  },
  {
    icon: <FontAwesomeIcon icon={faUsers} size="2x" />,
    title: 'Collaborate Effectively',
    content: 'Foster interdisciplinary collaboration by sharing your findings effortlessly. Our platform encourages knowledge exchange, enabling a global network of researchers.',
  },
  {
    icon: <FontAwesomeIcon icon={faShieldAlt} size="2x" />,
    title: 'Innovate with Confidence',
    content: 'Innovate boldly knowing your data is secure and accessible. Trust in our robust database management system to safeguard your research, allowing you to explore new horizons fearlessly.',
  },
  {
    icon: <FontAwesomeIcon icon={faChartLine} size="2x" />,
    title: 'Harness Advanced Analytics',
    content: 'Leverage collabrative groups within our system. Dive deep into your research data, uncovering valuable insights efficiently.',
  },
  {
    icon: <FontAwesomeIcon icon={faArchive} size="2x" />,
    title: 'Stay Organized, Stay Ahead',
    content: 'Organize your research files with smart tagging and structured presentation. Stay ahead of the game with quick access to your data, ensuring you never miss a breakthrough.',
  },
];

const Features = () => {
  return (
    <section id="content">
      <div className="content-wrap">
        <div className="container clearfix">
          <div className="row col-mb-50 mb-0">
            {features.map((feature, i) => {
              return (
                <div className="col-sm-6 col-md-4" key={i}>
                  <div className="feature-box fbox-plain">
                    <div className="fbox-icon" >
                      {feature.icon}
                    </div>
                    <div className="fbox-content">
                      <h3>{feature.title}</h3>
                      <p>{feature.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
