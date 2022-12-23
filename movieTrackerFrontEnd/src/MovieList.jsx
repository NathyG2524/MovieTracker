import React from "react";
import axiosInstance from "./axios";
import Rating from "@mui/material/Rating";
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";

import { useEffect, useState } from "react";

function EditMovie({movie, editMovie, setEditMovie} ) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [rating, setRating] = useState(movie.rating);
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState(movie.genre);
  const [startDate, setStartDate] = useState(new Date());


  const handleUpdate = () => {
    const req = {
      title: title,
      rating: rating,
      genre: genre,
      watchedDate: startDate
    };
    axiosInstance
      .patch(`http://localhost:3000/movie/${movie.id}`, req)
      .then(() => {
        axiosInstance.get("http://localhost:3000/movie").then((response) => {
          setEditMovie(response.data);
        });
      });
  };
  return (
    <>
      <tr>
        <td>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            type="text"
            placeholder={movie.title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </td>
        <td>
          <select
            onChange={(event) => {
              setGenre(event.target.value);
            }}
            class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="" defaultValue disabled hidden>
              {movie.genre}
            </option>
            <option value="Action">Action</option>
            <option value="Drama">Drama</option>
            <option value="Comedy">Comedy</option>
            <option value="Adventure">Adventure</option>
          </select>
        </td>
        <td>
              <div>

              <DatePicker className="my-3"   onChange={(date) => setStartDate(date)} />

              </div>
        </td>
        <td>
          <Rating
            name="read-only"
            value={rating}
            size="large"
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </td>
        <td>
          <button
            onClick={handleUpdate}
            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
          >
            Update
          </button>
        </td>
      </tr>
    </>
  );
}

function MovieList(even) {
  const [movies, setMovies] = useState([]);
  const [editMovie, setEditMovie] = useState(false);

  useEffect(() => {
    axiosInstance.get("http://localhost:3000/movie").then((response) => {
      setMovies(response.data);
    });
  }, [even, editMovie]);

  //   const function getMovies() {

  //   }

  const edit = async (movie) => {
    setEditMovie(movie.id);
  };

  const remove = async (id) => {
    axiosInstance.delete(`http://localhost:3000/movie/${id}/`).then(() => {
      axiosInstance.get("http://localhost:3000/movie").then((response) => {
        setMovies(response.data);
      });
    });
  };

  return (
    <div>

      <div class="bg-white p-8 rounded-md w-full">
        
        <div>
          <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table class="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Genre
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Watched at
                    </th>

                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                    <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                {movies.map((movie) => {
                  return editMovie == movie.id ? (
                    <EditMovie
                      movie={movie}
                      editMovie={editMovie}
                      setEditMovie={setEditMovie}
                    />
                  ) : (
                    <tbody>
                      <tr>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            {/* <div class="flex-shrink-0 w-10 h-10">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/298820741_737293840920896_1249126908010515096_n.png?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R_oVZB9_d-UAX_9EOsm&_nc_oc=AQmLIRiYQzkp5ek0civaRWFNDZC3WbWr4_wHDgWcYkEpK_FZ40IkrWs1OijyHxeWh04&_nc_ht=scontent.fadd2-1.fna&oh=00_AfAIE8DUoOKZhdcxWok4EsfCIpxSdIUD1sdseTG9_Dm7OQ&oe=63A7C773"
                                alt=""
                              />
                            </div> */}
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                                {movie.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {movie.genre}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                            {moment(movie.watchedDate).format(
                              "ddd, MMM Do YYYY, ha"
                            )}
                          </p>
                        </td>

                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                            <span
                              aria-hidden
                              class="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative">
                              {movie.rating}
                              <Rating
                                name="read-only"
                                value={movie.rating}
                                size="large"
                                readOnly
                              />
                            </span>
                          </span>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            class="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            onClick={() => edit(movie)}
                          >
                            Edit
                          </button>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <button
                            class="bg-red-500 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            onClick={() => remove(movie.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
