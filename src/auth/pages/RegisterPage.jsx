import { Link as RouterLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { AuthLayout } from '../layout/AuthLayout'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startCreatingUserWithEmailPassword } from '../../store/auth'

const formData = {
  email: "",
  password: "",
  displayName: "",
}

const formValidations = {
  email: [(value) => value.includes('@'), 'Email is not valid'],
  password: [(value) => value.length >= 6, 'Password must be 6 characters long'],
  displayName: [(value) => value.length >= 1, 'Name is required']
}

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false)

  const {status, errorMessage} = useSelector(state => state.auth)
  const isCheckingAuthentication = useMemo(() => status === 'checking',[status])

  const {displayName, email, password, onInputChange, formState, isFormValid, emailValid, passwordValid, displayNameValid} = useForm(formData, formValidations)

  const onSubmit = (e) => {
    e.preventDefault()
    setFormSubmited(true)
    if( !isFormValid ) return;
    dispatch(startCreatingUserWithEmailPassword(formState))
  }

  return (
    <AuthLayout title='Register'>
      <h1>FormValid: {isFormValid ? 'Valid' : 'Invalid'}</h1>
          <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
            <Grid container>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Full Name"
                  type="text"
                  placeholder='Full Name'
                  fullWidth
                  name='displayName'
                  value={displayName}
                  onChange={onInputChange}
                  error = {!!displayNameValid && formSubmited}
                  helperText={displayNameValid}
                  />
              </Grid>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Email"
                  type="email"
                  placeholder='email@google.com'
                  fullWidth
                  name='email'
                  value={email}
                  onChange={onInputChange}
                  error = {!!emailValid && formSubmited}
                  helperText={emailValid}/>
              </Grid>
              <Grid item xs={12} sx={{mt: 2}}>
                <TextField
                  label="Password"
                  type="password"
                  placeholder='Password'
                  fullWidth
                  name='password'
                  value={password}
                  onChange={onInputChange}
                  error = {!!passwordValid && formSubmited}
                  helperText={passwordValid}/>
              </Grid>

              <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                <Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
                  <Alert severity='error'>
                    {errorMessage}
                  </Alert>
                </Grid>

                <Grid item xs={12} >
                  <Button
                    type='submit'
                    variant='contained'
                    fullWidth
                    disabled={isCheckingAuthentication}>
                    Create account
                  </Button>
                </Grid>
              </Grid>
              <Grid container direction={"row"} justifyContent="end">
                <Typography sx={{mr: 1}}>Already have an account?</Typography>
                <Link component={RouterLink} color={'inherit'} to="/auth/login">
                  Login
                </Link>
              </Grid>
            </Grid>
          </form>
    </AuthLayout>
  )
}
