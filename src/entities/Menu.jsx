import {useAuth} from "app/hooks/use-auth";
import {Link} from "react-router-dom";
import "firebase/auth";
import './menu.css';

const Menu = () => {
    const {isAuth} = useAuth();

    return isAuth ? (
            <ul className="menu">
            <li><Link class="left" to={"/"}>Главная</Link></li>
            <li><Link class="right" to={"/login"}>Выйти</Link></li>
            </ul>
    ) : (
            <ul className="menu">
            <li><Link class="left" to={"/"}>Главная</Link></li>
            <li><Link class="right" to={"/login"}>Войти</Link></li>
            </ul>
    )
}

export {Menu}