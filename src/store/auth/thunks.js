import { loginwithEmailPassword, logoutFirebase, registerUserwithEmailPassword, singInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./"

export const chekingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
  }
}

export const startGoogleSingIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage))
    dispatch(login(result))
  }
}

export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await registerUserwithEmailPassword({email, password, displayName})
    if(!result.ok) return dispatch(logout(result.errorMessage))
    dispatch(login(result))
  }
}

export const startLoginWithEmailPassword = ({email, password}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials())
    const result = await loginwithEmailPassword({email, password})
    console.log(result)
    if(!result.ok) return dispatch(logout(result))
    dispatch(login(result))
  }
}

export const startLogout = () => {
  return async (dispatch)=> {
    await logoutFirebase();
    dispatch(clearNotesLogout())
    dispatch(logout({}));
  }
}