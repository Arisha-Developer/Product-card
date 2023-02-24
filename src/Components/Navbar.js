import React, { useState, useEffect } from 'react';
import axios from "axios"
import {NavLink} from"react-router-dom"

function Navbar() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState()

  const getHandler = () => {
    axios.get("https://fakestoreapi.com/products/")
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    getHandler()
  }, [])
  
  
  return (
    <>
      <div className='main'>
        <div className='search ' style={{ textAlign: "center", padding: "2rem", }}>
          <input type="text"
            className='bg-dark text-white'
            value={search}
            placeholder="Search Products here "
            onChange={(e) => { setSearch(e.target.value) }}
            style={{ width: "30%", borderRadius: "7px", height: "5vh" }} />
        </div>
        <div className='grid'>
          {

            data
              .filter((post) => {
                if (search == "") {
                  return post;
                }
                else if (post.title.includes(search)) {
                  return post
                }
              })
              .map((post, i) => {
                return <div className='card bg-dark text-light'
                  style={{ display: "flex", gridTemplateColumns: "1fr 1fr 1fr", }} key={i}>
                  <img src={post.image} style={{ textAlign: 'center', margin: "0 auto", width: "40%" }} width="30%"></img>
                  <hr className='text-black'></hr>
                  <h2>{post.clothing}</h2>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <h4>${post.price}</h4>\

                </div>
                
              })}

        </div>
      </div>
    </>
  );
}


export default Navbar;

