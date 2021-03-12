import bcrypt from 'bcryptjs';

const users = [
  {
    userName: 'Admin_User',
    emailId: 'Admin@abc.com',
    password: bcrypt.hashSync('Admin', 10),
    team: 'SmartVentory',
    isAdmin: true,
  },
  {
    userName: 'Alice',
    emailId: 'Alice@abc.com',
    password: bcrypt.hashSync('Alice', 10),
    team: 'SIT',
  },
  {
    userName: 'Bob',
    emailId: 'Bob@abc.com',
    password: bcrypt.hashSync('Bob', 10),
    team: 'QA',
  },
];

export default users;
