import React, { useState } from 'react'
import { Meteor } from 'meteor/meteor'

// Toast notifications imports
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Material UI imports
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

// Material UI styling
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignInPage = () => {
  const classes = useStyles()

  // Loading state
  const [isLoading, setLoading] = useState(false)

  // Form fields states
  const [userName, setUserName] = useState('')
  const [userPwd, setUserPwd] = useState('')

  // User auth by username and password
  const handleLogin = async e => {
    e.preventDefault()

    if (userName === '' || userPwd === '') return toast.error('Please type all required data')

    setLoading(true)

    Meteor.loginWithPassword(userName, userPwd, async err => {
      if (err) return console.log('Login error:', err)

      return toast.success('User successfully authenticated')
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <form className={classes.form} onSubmit={handleLogin} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="userName"
            label="User"
            name="userName"
            autoComplete="userName"
            autoFocus

            value={ userName }
            onChange={ e => setUserName(e.target.value) }
          />

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"

            value={ userPwd }
            onChange={ e => setUserPwd(e.target.value) }
          />     

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            disabled={isLoading === true ? true : false}
          >
            {isLoading === true ? <span> Loading... </span> : <span> Confirm </span>}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/signUp" variant="body2" style={{color: 'red'}}>
                It is my first access
              </Link>
            </Grid>
                  
            <Grid item>
              <Link href="/newPwd" variant="body2" style={{color: 'red'}}>
                I forgot my password
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignInPage