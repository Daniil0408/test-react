import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth';
import {Form} from './ui/Form';
import {setUser} from "../widgets/store/slices/userSlice";

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = (email, password) => {
        navigate('/login', {replace: true});
        const auth = getAuth();
        createUserWithEmailAndPassword(auth,email,password)
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
            title="Регистрация"
            nameButton="Зарегистрироваться"
            textLink="Уже зарегистрировались? "
            nameLink = "Войти"
            link = "/login"
            handleClick={handleRegister}
        />
    )
}

export {SignUp}