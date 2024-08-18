const { sequelize } = require('./db'); // Update the path to where you configure your Sequelize instance
const { DataTypes } = require('sequelize');

// User model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  underscored: true
});

// Files model
const Files = sequelize.define('Files', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateUploaded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// Tags model
const Tags = sequelize.define('Tags', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tagName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true
});

// FileTags model
const FileTags = sequelize.define('FileTags', {
  fileId: {
    type: DataTypes.INTEGER,
    references: {
      model: Files,
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tags,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// MATLABWebApps model
const MATLABWebApps = sequelize.define('MATLABWebApps', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  appName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateUploaded: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  filePath: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// AppTags model
const AppTags = sequelize.define('AppTags', {
  appId: {
    type: DataTypes.INTEGER,
    references: {
      model: MATLABWebApps,
      key: 'id'
    }
  },
  tagId: {
    type: DataTypes.INTEGER,
    references: {
      model: Tags,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// ResearchGroups model
const ResearchGroups = sequelize.define('ResearchGroups', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  groupName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  groupDescription: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  isFav: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  underscored: true
});

// ResearchGroupMembers model
const ResearchGroupMembers = sequelize.define('ResearchGroupMembers', {
  memberId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  memberRole: {
    type: DataTypes.STRING,
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: ResearchGroups,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// ResearchGroupFiles model
const ResearchGroupFiles = sequelize.define('ResearchGroupFiles', {
  groupId: {
    type: DataTypes.INTEGER,
    references: {
      model: ResearchGroups,
      key: 'id'
    }
  },
  fileId: {
    type: DataTypes.INTEGER,
    references: {
      model: Files,
      key: 'id'
    }
  }
}, {
  underscored: true
});

// Associations
User.hasMany(Files, { foreignKey: 'user_id' });
Files.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(MATLABWebApps, { foreignKey: 'user_id' });
MATLABWebApps.belongsTo(User, { foreignKey: 'user_id' });

Files.belongsToMany(Tags, { through: FileTags, foreignKey: 'file_id', otherKey: 'tag_id' });
Tags.belongsToMany(Files, { through: FileTags, foreignKey: 'tag_id', otherKey: 'file_id' });

MATLABWebApps.belongsToMany(Tags, { through: AppTags, foreignKey: 'app_id', otherKey: 'tag_id' });
Tags.belongsToMany(MATLABWebApps, { through: AppTags, foreignKey: 'tag_id', otherKey: 'app_id' });

User.belongsToMany(ResearchGroups, { through: ResearchGroupMembers, foreignKey: 'user_id', otherKey: 'group_id' });
ResearchGroups.belongsToMany(User, { through: ResearchGroupMembers, foreignKey: 'group_id', otherKey: 'user_id' });

Files.belongsToMany(ResearchGroups, { through: ResearchGroupFiles, foreignKey: 'file_id', otherKey: 'group_id' });
ResearchGroups.belongsToMany(Files, { through: ResearchGroupFiles, foreignKey: 'group_id', otherKey: 'file_id' });

ResearchGroups.belongsToMany(Files, { through: ResearchGroupFiles, foreignKey: 'groupId' });
Files.belongsToMany(ResearchGroups, { through: ResearchGroupFiles, foreignKey: 'fileId' });

ResearchGroupFiles.belongsTo(ResearchGroups, { foreignKey: 'groupId' });
ResearchGroupFiles.belongsTo(Files, { foreignKey: 'fileId' });

// Synchronize all models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Models are synchronized with the database!');
}).catch((error) => {
  console.error('Failed to synchronize models with the database:', error);
});

module.exports = {
  User,
  Files,
  Tags,
  FileTags,
  MATLABWebApps,
  AppTags,
  ResearchGroups,
  ResearchGroupMembers,
  ResearchGroupFiles
};
