import React, {useEffect, useState} from "react";
import {db} from "../app/firebase";
import {doc, updateDoc, deleteDoc} from "firebase/firestore";
import {useParams, Link, useNavigate} from "react-router-dom";
import './edit.css'

const Edit = () => {

    const {idPost, namePost, titlePost, descriptionPost, persentagePost, numberPost, pricePost} = useParams();

    const navigate = useNavigate();

    const [id, setId] = useState(idPost)
    const [name, setName] = useState(namePost)
    const [title, setTitle] = useState(titlePost)
    const [description, setDescription] = useState(descriptionPost)
    const [persentage, setPersentage] = useState(persentagePost)
    const [number, setNumber] = useState(numberPost)
    const [price, setPrice] = useState(pricePost)

    const [nameDirty, setNameDirty] = useState(false);
    const [persentageDirty, setPersentageDirty] = useState(false);
    const [numberDirty, setNumberDirty] = useState(false);
    const [priceDirty, setPriceDirty] = useState(false);

    const [nameError, setNameError] = useState('Введите название');
    const [persentageError, setPersentageError] = useState('Введите %');
    const [numberError, setNumberError] = useState('Введите количество');
    const [priceError, setPriceError] = useState('Введите цену');

    const [formValid, setFormValid] = useState(false);

    useEffect(() => {
        if (nameError || persentageError || numberError || priceError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, persentageError, numberError, priceError])

    const nameHandler = (e) => {
        setName(e.target.value)
        if (e.target.value == "Сертификат" || e.target.value == "Купон" || e.target.value == "Игры") {
            setNameError("")
        } else {
            setNameError('Некорректное название - Используйте "Сертификат, Купон или Игры"')
        }
    }

    const numberHandler = (e) => {
        setNumber(e.target.value)
        if (e.target.value.match(/^[0-9]+$/) != null) {
            setNumberError('')
        } else {
            setNumberError('Используйте исключительно цифры')
        }
    }

    const persentageHandler = (e) => {
        setPersentage(e.target.value)
        if (e.target.value.match(/^[0-9]+$/) != null) {
            setPersentageError('')
        } else {
            setNumberError('Используйте исключительно цифры')
        }
    }

    const priceHandler = (e) => {
        setPrice(e.target.value)
        if (e.target.value.match(/^[0-9]+$/) != null) {
            setPriceError('')
        } else {
            setNumberError('Используйте исключительно цифры')
        }
    }

    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setNameDirty(true)
                break
            case 'persentage':
                setPersentageDirty(true)
                break
            case 'number':
                setNumberDirty(true)
                break 
            case 'price':
                setPriceDirty(true)
                break           
        }
    }


    function deletePost(id) {
        const docRef = doc(db, 'ads', id)
        navigate('/', {replace: true});
        deleteDoc(docRef).then(() => console.log('Post deleted'))
        .catch(error => console.log(error.message))
    }

    function handleSupmit(e) {
        e.preventDefault()
        if (name === '' || id === '') {
            return
        }
        const docRef = doc(db, 'ads', id)
        updateDoc(docRef, {name, title, description, persentage, number, price})
            .then(Response => {
                navigate('/', {replace: true});
                console.log(Response)
            })
            .catch(error => console.log(error.message))
    }
    return (
        <div class = "form-edit">
            <form onSubmit={handleSupmit}>
                <Link to={'/'}>
                    <button class="button-cancel">Назад</button>
                </Link>
            <button class="button-delete" onClick={() => deletePost(id)}>Удалить</button>
                <h1>Редактирование</h1>
                <h4>Идентификатор:</h4>
                <input
                    id = 'id'
                    type = 'text'
                    name = 'id'
                    value= {id}
                    onChange={e => setId(e.target.value)}
                />
                <h4>Вид:</h4>
                {(nameDirty && nameError) && <div class="error">{nameError}</div>}
                <input
                    id = 'name'
                    type = 'text'
                    name = 'name'
                    value= {name}
                    onBlur={e => blurHandler(e)}
                    onChange={e => {setName(e.target.value); nameHandler(e)}}
                />
                <h4>Название:</h4>
                <input
                    id = 'title'
                    type = 'text'
                    name = 'title'
                    value= {title}
                    onChange={e => setTitle(e.target.value)}
                />
                <h4>Описание:</h4>
                <input
                    id = 'description'
                    type = 'text'
                    name = 'description'
                    value= {description}
                    onChange={e => setDescription(e.target.value)}
                />
                <h4>Максимальый %:</h4>
                {(persentageDirty && persentageError) && <div class="error">{persentageError}</div>}
                <input
                    id = 'persentage'
                    type = 'text'
                    name = 'persentage'
                    value= {persentage}
                    onBlur={e => blurHandler(e)}
                    onChange={e => {setPersentage(e.target.value); persentageHandler(e)}}
                />
                <h4>Количество:</h4>
                {(numberDirty && numberError) && <div class="error">{numberError}</div>}
                <input
                    id = 'number'
                    type = 'text'
                    name = 'number'
                    value= {number}
                    onBlur={e => blurHandler(e)}
                    onChange={e => {setNumber(e.target.value); numberHandler(e)}}
                />
                <h4>Цена:</h4>
                {(priceDirty && priceError) && <div class="error">{priceError}</div>}
                <input
                    id = 'price'
                    type = 'text'
                    name = 'price'
                    value= {price}
                    onBlur={e => blurHandler(e)}
                    onChange={e => {setPrice(e.target.value); priceHandler(e)}}
                />
                <button disabled={!formValid} class="button-form-edit" type='submit'>Изменить</button>
            </form>
        </div>
    )

}

export default Edit