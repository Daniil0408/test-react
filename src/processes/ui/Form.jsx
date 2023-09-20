import {useEffect, useState} from "react";
import './form.css'
import {Link} from "react-router-dom";

const Form = ({title, nameButton, textLink, nameLink, link, handleClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailDirty, setEmailDirty] = useState(false);
    const [passwordDirty, setPasswordDirty] = useState(false);
    const [emailError, setEmailError] = useState('Введите Email');
    const [passwordError, setPasswordError] = useState('Введите пароль');
    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (emailError || passwordError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [emailError, passwordError])

    const emailHandler = (e) => {
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(e.target.value).toLowerCase())) {
            setEmailError('Некорректный Email')
        } else {
            setEmailError("")
        }
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (e.target.value.length < 8 || e.target.value.length > 16) {
            setPasswordError('Слишком короткий пароль')
            if (!e.target.value) {
                setPasswordError('Введите пароль')
            }
        } else {
            setPasswordError('')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'password':
                setPasswordDirty(true)
                break
        }
    }

    return (
        <body>
            <div className="background">
                <div className="shape"></div>
            </div>
            <form class = "form-auth">
                <h1>{title}</h1>
                {(emailDirty && emailError) && <div class="error">{emailError}</div>}
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); emailHandler(e)}}
                    onBlur={e => blurHandler(e)}
                    placeholder="Email"
                />
                {(passwordError && passwordDirty) && <div class="error">{passwordError}</div>}
                <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => passwordHandler(e)}
                    onBlur={e => blurHandler(e)}
                    placeholder="Пароль"
                />
                <button
                    disabled={!formValid}
                    class = "button-form-auth"
                    onClick={() => handleClick(email,password)}
                >
                    {nameButton}
                </button>
                <h4>
                    <a class = "form-auth-link">
                        {textLink}
                        <Link class = "form-auth-link" to={link}>{nameLink}</Link>
                    </a>
                </h4>
            </form>
        </body>
    )
}

export {Form}