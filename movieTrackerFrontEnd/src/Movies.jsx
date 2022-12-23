import React from "react";
import Rating from "@mui/material/Rating";
import { useRef, useState } from "react";
import { Form, Button, FormField } from "semantic-ui-react";
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axiosInstance from "./axios";
import Dashboard from "./Dashboard";





function Movies(  {even, setEven}) {
  const [genre, setGenre] = useState(null)
  const [startDate, setStartDate] = useState(new Date());
  const titleRef = useRef()


  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [value, setValue] = useState(1);



  const onSubmit = (e) => {
    // const Ref = useRef()

    const req = {
      "title": e.title,
      "rating": value,
      "genre": genre,
      "watchedDate": startDate
    };
    if (req.genre == null){
      
    }

    
    even ? setEven(even=false) : setEven(even=true)

    axiosInstance.post('http://localhost:3000/movie', req)
  };

  return (
    <div>
      <div className="container mx-auto rounded-lg border">
        <div className="h-50 w-full rounded-lg bg-white ">
          <div className="justify-center flex items-center border-b">
            <Dashboard even={even}/>
            {/* <div class="flex-shrink-0 w-2/6  6 mx-8">
                              <img
                                class="w-full h-full rounded-full"
                                src="https://scontent.fadd2-1.fna.fbcdn.net/v/t39.30808-6/298820741_737293840920896_1249126908010515096_n.png?_nc_cat=101&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=R_oVZB9_d-UAX_9EOsm&_nc_oc=AQmLIRiYQzkp5ek0civaRWFNDZC3WbWr4_wHDgWcYkEpK_FZ40IkrWs1OijyHxeWh04&_nc_ht=scontent.fadd2-1.fna&oh=00_AfAIE8DUoOKZhdcxWok4EsfCIpxSdIUD1sdseTG9_Dm7OQ&oe=63A7C773"
                                alt=""
                              />
                              <p className="pb-3 font-mono text-2xl">Movie Tracker</p>
                                        </div> */}
            <div className="w-5/6">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Field>
                <br></br>
                <label className="font-semibold block py-2" htmlFor="">
                  Movie Title<span></span>
                </label>

                <input
                  className="focus:outline-none border-b w-4/6 pb-2 border-sky-400 placeholder-gray-500"
                  type="text"
                  name="Title"
                  ref={titleRef}
                  placeholder={"FRIENDS"}
                  {...register("title", {
                    required: true,
                    maxLength: 20,
                  })}
                />
              </Form.Field>
              {errors.title && (
                <p className="hover:red-yellow-500 w-full mb-2 select-none border-l-4 border-red-400 bg-red-100 p-4 font-medium">
                  Please enter movie title 
                </p>
              )}

              <br></br>
              <div onChange={(event) => {
                    setGenre(event.target.value);
                  }} className="my-8 mx-4">
                <input className="mx-2 font-semibold " type="radio" value="Action" name="gender" /> Action
                <input className="mx-2 font-semibold " type="radio" value="Drama" name="gender" /> Drama
                <input className="mx-2 font-semibold " type="radio" value="Comedy" name="gender" /> Comedy
                <input className="mx-2 font-semibold " type="radio" value="Adventure" name="gender" /> Adventure
              </div>
              {(genre == null) && (
                <p className="hover:red-yellow-500 w-full mb-2 select-none border-l-4 border-red-400 bg-red-100 p-4 font-medium">
                  Please select movie genre 
                </p>
              )}

              <div className="my-8">
                <Rating
                  name="simple-controlled"
                  value={value}
                  size="large"
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>
              <div>

              <DatePicker className="my-3" selected={startDate} onChange={(date) => setStartDate(date)} />
              <p class="text-slate-400 text-sm  md:block">Select date you watched the movie</p> 

              </div>


              

              <button className=" rounded-full  my-8 sm:w-56 w-full   bg-gradient-to-r from-sky-600  to-teal-300 text-white text-lg font-semibold ">
                save
              </button>
            </Form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
