
module.exports = {
  validUser: {
    username: 'candy',
    email: 'chopper@email.com',
    password: 'medicine'
  },

  existingUsername: {
    username: 'candy',
    email: 'invalid@test.com',
    password: 'invalid'
  },

  existingEmail: {
    username: 'userssname',
    email: 'chopper@email.com',
    password: 'invalid'
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
  nullUser: {
    username: null,
    password: null
  },

  newUser: {
    email: 'zimzim1@chess.com',
    username: 'zimzim1',
    password: 'waitingMove',
    phoneNumber: '09082091930'
  },

  invalidPassword: {
    username: 'candy',
    password: 'isewujfikf'
  },

  noUsername: {
    password: 'medicine'
  },

  validSignin:
  {
    username: 'candy',
    password: 'medicine'
  },

  usergroupSignin: {
    email: 'zugzwang@chess.com',
    username: 'winner',
    password: 'waitingMove',
    phoneNumber: '09082091930'
  },

  usergroupGroup: {
    groupName: 'abcdefgijklmnop'
  },

  usergroupUser: {
    email: 'zugzzaw@chess.com',
    username: 'winnerme',
    password: 'waitinglove',
    phoneNumber: '09082091932'
  },

  usergroupsUsergroup: {
    userId: 1,
    groupId: 1,
    groupName: 'abcdefgijklmnop',
    username: 'winner'
  },

  messagesGroup: {
    groupName: 'abcdefgijklmnop'
  },

  messagesUsergroups: {
    userId: 1,
    groupId: 1,
    groupName: 'abcdefgijklmnop',
    username: 'eyepencil'
  },

  message: {
    message: 'Test message',
    messagePriority: 'normal'
  },

  groupUser: {
    email: 'abracad@chess.com',
    username: 'abracad',
    password: 'waitingMove',
    phoneNumber: '09082091930'
  },

  group: {
    groupName: 'People'
  },

  // model data

  userDetails: {
    email: 'power.rangers@super.com',
    username: 'zack',
    password: 'alfalfa',
    phoneNumber: '09082091930'
  },

  requiredFields: [
    'username', 'email', 'password', 'phoneNumber'
  ],

  uniqueFields: ['email', 'username'],

  invalidUserid: {
    groupId: 17, userId: null
  },

  invalidGroupid: {
    groupId: null, userId: 20
  },

  messageInfo: {
    groupId: 2,
    userId: 2,
    message: 'this is a test',
    messagePriority: 'Urgent'
  },

  newGroup: {
    groupName: 'test'
  },

  emptyGroupname: {
    groupName: ' '
  },

  nullGroupname: {
    groupName: null
  }
};
