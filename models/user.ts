import { DataTypes } from 'sequelize';
import db from '../db/connection';

const User = db.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN
  }
})


export default User;
