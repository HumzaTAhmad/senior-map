import { Close, Send } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, connect } from 'react-redux';
import { updateAlert } from '../../actions/alert';
import { endLoading, startLoading } from '../../actions/loading';
import { closeLogin} from '../../actions/login';
import GoogleOneTapLogin from './GoogleOneTapLogin';
import PasswordField from './PasswordField';

function Login(props) {

    const {login} = props;
    const dispatch = useDispatch();
    const [title, setTitle] = useState('Login');
    const [isRegister, setIsRegiser] = useState(false);
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    
    

    function handleClose(){
        dispatch(closeLogin());
    }

    function handleSubmit(e){
        e.preventDefault();

        //testing Loading
        dispatch(startLoading())

        setTimeout(function(){
            dispatch(endLoading())
        }, 6000);

        //testing notification
        const password = passwordRef.current.value
        const confirmPassword = confirmPasswordRef.current.value
        if(password !== confirmPassword){
            dispatch(updateAlert({open:true, severity:'error', message:'Password do no match'}))
        }
    }

    useEffect(function() {
        isRegister ? setTitle('Register') : setTitle('Login');
      }, [isRegister]);

    return (
        <Dialog 
        open={login}
        onClose={handleClose}
        >
            <DialogTitle>
                {title}
                <IconButton sx={{position: 'absolute', top:8, right:8, color:(theme)=>theme.palette.grey[500]}} onClick={handleClose}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <DialogContentText dividers>
                        Please fill your information in the fields below:
                    </DialogContentText>
                    {isRegister && (
                    <TextField
                    autoFocus
                    margin="normal"
                    variant="standard"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    inputRef={nameRef}
                    inputProps={{ minLength: 2 }}
                    required
                    />
                    )}
                    <TextField
                    autoFocus={!isRegister}
                    margin="normal"
                    variant="standard"
                    id="email"
                    label="Email"
                    type="email"
                    fullWidth
                    inputRef={emailRef}
                    required
                    />
                    <PasswordField {...{passwordRef}}/>
                    {isRegister &&
                    <PasswordField passwordRef={confirmPasswordRef} id='confirmPassword' label='Confirm Password' />
                    }
                </DialogContent>
                <DialogActions sx={{px: '19px'}}>
                    <Button type='submit' variant='contained' endIcon={<Send />}>
                        Submit
                    </Button>
                </DialogActions>
            </form>
            <DialogActions sx={{justifyContent: 'left', p:'5px 24px'}}>
                {isRegister?'Do you have an account? Sign in now ' : "Don't you have an account? Creat one now"}
                <Button onClick={()=>setIsRegiser(!isRegister)}>
                    {isRegister ? 'Login' : 'Register'}
                </Button>
            </DialogActions>
            <DialogActions sx={{ justifyContent:'center', py:'24px' }}>
                <GoogleOneTapLogin />
            </DialogActions>
        </Dialog>
    )
}

function mapStateToProps(state) {
    console.log(state)
  return {
    login: state.login
  };
}

export default connect(mapStateToProps)(Login);