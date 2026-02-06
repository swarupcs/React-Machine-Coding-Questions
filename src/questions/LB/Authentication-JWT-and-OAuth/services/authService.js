const authService = {
  login: async (email, password) => {
    await new Promise((r) => setTimeout(r, 800));

    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    const response = {
      userDetails: {
        id: 1,
        email,
        username: 'John Doe',
      },
      accessToken: 'mock_jwt_token_' + Date.now(),
    };

    localStorage.setItem('user', JSON.stringify(response));
    return response;
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.userDetails || null;
  },

  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.accessToken || null;
  },
};

export default authService;
