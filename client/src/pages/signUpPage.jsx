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

const SignUpPage = () => {
  const classes = useStyles()

  // Loading state
  const [isLoading, setLoading] = useState(false)

  // Form fields states
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPwd, setUserPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  // New user creation
  const handleSignUp = async e => {
      e.preventDefault()

      if (userName === '' || userEmail === '' || userPwd === '' || confirmPwd === '') return toast.error('Please type the required data')

      if (userPwd !== confirmPwd) return toast.error("The passwords don't match")

      setLoading(true)

      await Meteor.call('createNewUser', userName, userEmail, userPwd, (err, res) => {
        if (err) {
          console.log('Sign up error:', err)

          if (err.reason = 'Email already exists.') {
            toast.warning('Email already exists')
            return setLoading(false)
          }

          if (err.reason = 'User already logged') {
            toast.warning('User already registered')
            return setLoading(false)
          }

          return setLoading(false)
        }

        if (res === 'User already logged') {
          toast.warning('User already registered')
          return setLoading(false)
        }

        if (res === 'New user created') toast.success('New user successfully created')

        return window.location.href = '/signInPage'
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
          Sign Up
        </Typography>

        <form className={classes.form} onSubmit={ handleSignUp } noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="userName"
            label="User"
            type="text"
            id="userName"
            autoComplete="userName"

            value={ userName }
            onChange={ e => setUserName(e.target.value) }
          />  

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            label="Email"
            type="text"
            id="email"
            autoComplete="email"

            value={ userEmail }
            onChange={ e => setUserEmail(e.target.value) }
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

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirm-password"
            label="Confirm password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"

            value={ confirmPwd }
            onChange={ e => setConfirmPwd(e.target.value) }
          />              

          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            color="primary"
            disabled={isLoading === true ? true : false}
          >
            {isLoading === true ? <span> Loading... </span> : <span> Sign Up </span>}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/signIn" variant="body2" style={{color: 'red'}}>
                I'm already registered
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

      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  )
}

export default SignUpPage