const config = {
   
  }

  const Rebase = require('re-base')
  const firebase  = require('firebase/app')
  require('firebase/database')
  require('firebase/storage')

  const app = firebase.initializeApp(config)
  const base = Rebase.createClass(app.database())

  export const storage = app.storage()
  
  export default base