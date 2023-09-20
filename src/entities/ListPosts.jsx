import {db} from "../app/firebase";
import {collection, doc, query, onSnapshot} from "firebase/firestore";
import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
import {useAuth} from "app/hooks/use-auth";
import Paginate from 'react-paginate';
import './listposts.css'

function ListPosts() {

    const {isAuth} = useAuth();
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [sortInput, setSortInput] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [pageNumber, setPageNumber] =useState(0);
    const dataPerPage =2;
    const pageVisited = pageNumber * dataPerPage;

    const pageCount = Math.ceil(posts.length/dataPerPage)
    const changePage = ({selected}) => {
        setPageNumber(selected);
      }

    useEffect(() => {
        const q = query(collection(db, 'ads'));
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
    }, [])

    useEffect(() => {
        setFilteredPosts(posts
            .filter(post => post.data.name.match(searchInput))
        );
    }, [searchInput, posts])

    function sortPosts(array) {
        if (sortInput == "price") {
            array.sort((a, b) => (a.data.price - b.data.price));
        } else if (sortInput == "percentage") {
            array.sort((a, b) => (a.data.percentage - b.data.percentage));
            array.reverse()
        } else if (sortInput == "number") {
            array.sort((a, b) => (a.data.number - b.data.number));
            array.reverse()
        };
        return array;
    }

    function handleSearchChange(e) {
        e.preventDefault();
        setSearchInput(e.target.value)
        console.log(e.target.value)
    }

    function handleSortChange(e) {
        e.preventDefault();
        setSortInput(e.target.value)
        console.log(e.target.value)
    }
    
    return isAuth ? (
        <div>
            <div class="custom-select-box">
                <label class="custom-label">Отсортировать по:</label>
                <select
                        id="search-bar"
                        class="custom-select"
                        type="text"
                        value={sortInput}
                        onChange={handleSortChange}
                > 
                    <option value="all">Не выбрано</option>
                    <option value="price">Цене</option>
                    <option value="percentage">Максимальному %</option>
                    <option value="number">Количеству</option>
                </select>
                <label class="custom-label">Фильтр:</label>
                <select 
                        id="search-bar"
                        class="custom-select"
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                >   
                    <option>Не выбрано</option>
                    <option value="Сертификат">Сертификат</option>
                    <option value="Купон">Купон</option>
                    <option value="Игры">Игры</option>
                </select>
            </div>
            <div>
                {sortPosts(filteredPosts).slice(pageVisited, pageVisited + dataPerPage).map(post => (
                    <div class="card" key={post.id}>
                        <Link to={`post/${post.id}/${post.data.name}/${post.data.title}/${post.data.description}/${post.data.percentage}/${post.data.number}/${post.data.price}`}>
                            <h2>{post.data.name}</h2>
                        </Link>
                        <h2>{post.data.title}</h2>
                        <h4>{post.data.description}</h4>
                        <h3>Скидка до {post.data.percentage} %</h3>
                        <h3>Количество: {post.data.number}</h3>
                        <h3>Цена: {post.data.price} руб.</h3>
                    </div>
                ))}
            </div>
            <Paginate
            previousLabel ={"Пред."}
            nextLabel ={"След."}
            afterLabel ={"After"}
            pageCount ={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"active"}
            />
        </div>
    ) : (
        <div>
            <div class="custom-select-box">
                <label class="custom-label">Отсортировать по:</label>
                <select
                        id="search-bar"
                        class="custom-select"
                        type="text"
                        value={sortInput}
                        onChange={handleSortChange}
                > 
                    <option value="all">Не выбрано</option>
                    <option value="price">Цене</option>
                    <option value="percentage">Максимальному %</option>
                    <option value="number">Количеству</option>
                </select>
                <label class="custom-label">Фильтр:</label>
                <select 
                        id="search-bar"
                        class="custom-select"
                        type="text"
                        value={searchInput}
                        onChange={handleSearchChange}
                >   
                    <option>Не выбрано</option>
                    <option value="Сертификат">Сертификат</option>
                    <option value="Купон">Купон</option>
                    <option value="Игры">Игры</option>
                </select>
            </div>
            <div>
                {sortPosts(filteredPosts).slice(pageVisited, pageVisited + dataPerPage).map(post => (
                    <div class="card" key={post.id}>
                        <h2>{post.data.name}</h2>
                        <h2>{post.data.title}</h2>
                        <h4>{post.data.description}</h4>
                        <h3>Скидка до {post.data.percentage} %</h3>
                        <h3>Количество: {post.data.number}</h3>
                        <h3>Цена: {post.data.price} руб.</h3>
                    </div>
                ))}
            </div>
            <Paginate
            previousLabel ={"Пред."}
            nextLabel ={"След."}
            afterLabel ={"After"}
            pageCount ={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"active"}
            />
        </div>
    )
}
  
export  {ListPosts}
    