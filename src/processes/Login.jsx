import {useDispatch} from "react-redux";
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth';
import {Form} from './ui/Form';
import {setUser} from "../widgets/store/slices/userSlice";
import {useNavigate} from 'react-router-dom';
import {removeUser} from "widgets/store/slices/userSlice"

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    dispatch(removeUser());

    const handleLogin = (email, password) => {
        navigate('/', {replace: true});
        const auth = getAuth();
        signInWithEmailAndPassword(auth,email,password)
            .then(({user}) => {
                console.log(user);
                dispatch(setUser({
                    email: user.email,
                    id: user.uid,
                    token: user.accessToken,
                }));
            })
            .catch(console.error)
    }

    return (
        <Form
            title="Авторизация"
            nameButton="Войти"
            textLink=""
            nameLink = "Зарегистрироваться"
            link = "/registration"
            handleClick={handleLogin}
        />
    )
}

export {Login}