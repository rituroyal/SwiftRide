

const User = require('../models/user.model');

module.exports.createUser = async ({ firstname, lastname, email, password, phone }) => {
    if (!firstname || !email || !password) {
      throw new Error('All fields are required');
    }
  
    const user = await User.create({
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
      phone,
    });
  
    return user;
  };
  

