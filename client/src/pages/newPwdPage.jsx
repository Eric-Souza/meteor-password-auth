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

const NewPwdPage = () => {
  const classes = useStyles()

  const [isLoading, setLoading] = useState(false)

  const [userName, setUserName] = useState('')
  const [userNewPwd, setUserPwd] = useState('')
  const [confirmNewPwd, setConfirmPwd] = useState('')

  const handlePwdChange = async e => {
    e.preventDefault()

    if (userName === '' || userNewPwd === '' || confirmNewPwd === '') return toast.error('Please type all required data')

    if (userNewPwd !== confirmNewPwd) return toast.error("The passwords don't match")

    setLoading(true)

    await Meteor.call('setNewPassword', userName, userNewPwd, err => {
      if (err) {
        console.log('New password creation error:', err)
        return setLoading(false)
      }

      toast.success('Password successfully redefined')
      return window.location.href = '/signIn'
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
          Password Redefinition
        </Typography>

        <form className={classes.form} onSubmit={ handlePwdChange } noValidate>
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
            name="password"
            label="New password"
            type="password"
            id="password"
            autoComplete="current-password"

            value={ userNewPwd }
            onChange={ e => setUserPwd(e.target.value) }
          />    

          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirm-password"
            label="Confirm new password"
            type="password"
            id="confirm-password"
            autoComplete="confirm-password"

            value={ confirmNewPwd }
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
            {isLoading === true ? <span> Loading... </span> : <span> Redefine password </span>}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="/cadastro" variant="body2" style={{color: 'red'}}>
                It's my first access
              </Link>
            </Grid>

            <Grid item>
              <Link href="/login" variant="body2" style={{color: 'red'}}>
                I'm already registered
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default NewPwdPage