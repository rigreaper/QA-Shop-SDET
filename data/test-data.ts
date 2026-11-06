export const loginTestData = {
  validUser: {
    email: "demo@qashop.test",
    password: "Password123!",
  },

  invalidPassword: {
    email: "demo@qashop.test",
    password: "WrongPassword123!",
  },

  invalidEmail: {
    email: "invalid-email",
    password: "Password123!",
  },
  
  invalidBoth: {
    email: "invalid-email",
    password: "Password123fsd!",
  },

  emptyCredentials: {
    email: "",
    password: "",
  },
};

