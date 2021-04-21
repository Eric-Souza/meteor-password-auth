import { Meteor } from 'meteor/meteor'

// Auth imports
import { addUser } from './auth/addUser'
import { newPwd } from './auth/newPwd'

Meteor.startup(() => {
  addUser()
  newPwd()
})