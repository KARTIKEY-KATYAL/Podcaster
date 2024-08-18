import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="bg-blue-900 px-12 h-screen flex flex-col items-center justify-center">
      <div className="w-full flex items-center justify-between gap-4">
        <div className="w-5/6">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-orange-500 lobster-regular ">
            Create & Listen <br />
            <h1 className="flex items-center">
              The P
              <span>
                <img src="./headphones.png" width={50}></img>
              </span>
              dCast
            </h1>
          </h1>
        </div>
        <div className="w-1/6">
          <div className="py-4 border border-black font-semibold rounded-full text-center bg-slate-50 -rotate-90">
            Scroll Down
          </div>
        </div>
      </div>
      <div className="">
        <p className="text-zinc-200 font-semibold justify-end it">
          App Contains More than 2000 Podcast for You !
        </p>
      </div>
      <div className="mt-12 w-full justify-between items-center">
        <p className="text-xl font-semibold focus:font-bold text-white">
          Create and Listen most Popular Podcasts on one Platform -{" "}
          <b>PODCASTER</b>
        </p>
        <button className="bg-red-600 px-6 py-4 text-white font-semibold rounded-full mt-8">
          <Link
            to="/login"
          >
            Login To Listen
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home
