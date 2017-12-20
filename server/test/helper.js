
module.exports = {
  validUser: {
    username: 'candy',
    email: 'chopper@email.com',
    password: 'medicine'
  },

  invalidUpdate: {
    username: 'candy',
    email: 'chopper@email.com'
  },

  dummyUser: {
    username: 'candydum45',
    email: 'chopperdum45@email.com',
    password: 'medicinedum'
  },
  dummy2User: {
    username: 'candydum45gh',
    email: 'chopperdum45gh@email.com',
    password: 'medicinedum'
  },
  dumUser: {
    username: 'dumdum',
    email: 'dumduma@email.com',
    password: 'dum'
  },
  existingEmail: {
    username: 'userssname',
    email: 'chopper@email.com',
    password: 'invalid'
  },
  updatedUser: {
    username: 'updated me',
    email: 'updated me at test.com',
    password: 'update'
  },
  invalidEmail: {
    username: 'good',
    email: 'bad.com',
    password: 'badd'
  },

  noPassword: {
    username: 'goods',
    email: 'badstuff@email.com',
    password: null

  },

  invalidPassword: {
    username: 'candy',
    password: 'isewujfikf'
  },

  validSignin:
  {
    username: 'candy',
    password: 'medicine'
  },

  validIdea: {
    title: 'my idea',
    description: 'for doing stuff',
    category: 'comedy',
    access: 'public'
  },
  valid2Idea: {
    title: 'my ideaSS',
    description: 'for doing stuff',
    category: 'comedy',
    access: 'public'
  },
  valid3Idea: {
    title: 'my ideaSSS',
    description: 'for doing stuffs',
    category: 'comedy',
    access: 'public'
  },
  editIdea: {
    title: 'edit idea',
    description: 'for doing stuff',
    category: 'comedy',
    access: 'public'
  },
  deleteIdea: {
    title: 'delete idea',
    description: 'for doing stuff',
    category: 'comedy',
    access: 'public'
  },

  invalidIdea: {
    description: 'for doing stuff',
    category: 'comedy',
    access: 'public'
  },

  myComment: {
    comment: 'I enjoyed this piece'
  },
  nullComment: {
    comment: null
  }

};
