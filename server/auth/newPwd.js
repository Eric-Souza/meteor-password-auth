import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

export const newPwd = () => {
  Meteor.methods({
    setNewPassword: (userName, userNewPwd) => {
      const currentUser = Accounts.findUserByUsername(userName)
      
      Accounts.setPassword(currentUser, userNewPwd)
    }
  })
}