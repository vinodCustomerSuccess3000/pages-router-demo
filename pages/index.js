"use client"
import Image from "next/image";
import Link from "next/link"
import { useEffect, useState } from "react";
// import shuffle from "/shuffle-products.js"

async function getData() {
  const res = await fetch('https://my-json-server.typicode.com/horizon-code-academy/fake-movies-api/movies');

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default function Page() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData();
        console.log(data);
        setMovies(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <h1>Iron Man!</h1>
      <Image
        alt="Ironman"
        width={200}
        height={300}
        src="/ironman.jpg"
      />      
      {movies && movies.map((movie, index) => (
        <h2 key={index}>{movie?.Title}</h2>
      ))}

      <Link href="/shuffle-products">Shuffle Page</Link>
    </>
  );
}
