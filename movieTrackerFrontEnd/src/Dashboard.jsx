import React from 'react';
import axiosInstance from "./axios";


import { useEffect, useState } from "react";

function Dashboard (even)  {
    const [favoriteGener, setFavoriteGener] = useState([]);
    const [averageMovies, setAverageMovies] = useState([]);
    const [currentMood, setCurrentMood] = useState([]);
    const [error, setError] = useState([])
    const [avgError, setAvgError] = useState([])
    const [favError, setFavError] = useState([])
    let emoji = ''
    let errorV = false

    useEffect(() => {
        errorV = false
        setAvgError(null)
        // setFavError(null)
        // setError(null)
        
        axiosInstance.get("http://localhost:3000/movie/fav").then((response) => {
      console.log(response.data);
      setFavoriteGener(response.data);
    }).catch(error => {
        setAvgError(error.response.data['message']);
        errorV = true
        console.log(error.response.data)
      });
      axiosInstance.get("http://localhost:3000/movie/avg").then((response) => {
      console.log(`avg ${response.data}`);
      setAverageMovies(response.data);
    }).catch(error => {
        // setAvgError(error.response.data.message);
        console.log(`avgerror : ${error}`)
      });
    axiosInstance.get("http://localhost:3000/movie/mood").then((response) => {
      console.log(`mood : ${response.data}`);
      if (response.data >= 4) {
        emoji = "https://media.istockphoto.com/id/519461902/vector/ok-sign-emoticon.jpg?s=612x612&w=0&k=20&c=QQI8o04z7lHiuU1kLb7NsvC5JZJxHPKdAq8qR8GGHmo="
      }
      if ((response.data >= 2) && (response.data < 4)) {
        emoji = "https://static-00.iconduck.com/assets.00/neutral-face-emoji-512x512-tn5yqwre.png"
      }
      if (response.data < 2) {
        emoji = "https://static5.depositphotos.com/1001911/508/v/450/depositphotos_5080703-stock-illustration-sad-emoticon.jpg"
      }
      setCurrentMood(emoji);
    }).catch(error => {
        setError(error.response.data);
        console.log(error)
      });

}, [even]);

console.log(`${avgError}`)


    return (<div>
<div className=" w-6/6  mx-auto  my-10 px-2">
        <div id="menu" className="bg-white/10 col-span-3 rounded-lg p-4 w-full">
            <h1 className="font-bold text-lg lg:text-3xl bg-gradient-to-br from-black via-black/50 to-transparent bg-clip-text text-transparent">Dashboard<span className="text-indigo-400">.</span></h1>
            <p className="text-slate-400 text-sm mb-2">Welcome back,</p>
            
            <hr className="my-2 border-slate-700"/>
            <div id="menu" className="flex flex-col space-y-2 my-5">
                <a href="#" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                                <path strokeLinecap="round" strokLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                              </svg>
                              
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-900 leading-4">Favorite Genre</p>
                            {(avgError) ?   <p className="text-slate-400 text-sm  md:block">{avgError}</p> :

                        (<p className="text-slate-400 text-sm  md:block">{favoriteGener[0]}  {favoriteGener[1]} {favoriteGener[2]} {favoriteGener[3]}</p>)}
                        {/* <p className="text-slate-400 text-sm  md:block">{favoriteGener}</p> */}
                        </div>
                        
                    </div>
                </a>
                <a href="#" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    <div className="relative flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>                              
                        </div>
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-900 leading-4">You have watched</p>
                            {avgError  ?   <p className="text-slate-400 text-sm  md:block">{error['message']}</p> :

                        <p className="text-slate-400 text-sm  md:block">{averageMovies} movies per month </p>}
                        </div>
                        
                    </div>
                </a>
                <a href="#" className=" rounded-lg py-3 px-2 group">
                    <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 space-x-2 items-center">
                        
                        <div>
                            <p className="font-bold text-base lg:text-lg text-slate-900 leading-4 ">Currrent mood</p>
                        {/* <p className="text-slate-400 text-sm hidden md:block">{ currentMood}</p> */}
                        { avgError ?   <p className="text-slate-400 text-sm  md:block">{error['message']}</p> :
                   <img className="rounded-full w-3/6 h-3/6 relative object-cover ml-10" src={currentMood} alt=""/>
                }
                        </div>
                        
                    </div>
                </a>
                <a href="#" className="hover:bg-white/10 transition duration-150 ease-linear rounded-lg py-3 px-2 group">
                    
                </a>
            </div>
        </div>
        </div>
    </div>)
}



export default Dashboard;