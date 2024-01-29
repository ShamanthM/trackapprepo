const User = require('../models/User'); // Adjust the path based on your project structure

class AuthService {
  static async validateUser(username, password) {
    console.log('Received parameters:', username, password);

    try {
      const user = await User.findOne({ where: { UserName: username, UserPassword: password } });

      if (user) {
        return { success: true, user };
      } else {
        return { success: false, message: 'Invalid username or password' };
      }
    } catch (error) {
      throw new Error('Error validating user');
    }
  }
}

module.exports = AuthService;
