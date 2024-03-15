import { useState,useEffect, Suspense } from "react";
import Link from "next/link";

async function getProducts(){
    let prods = await fetch("https://random-data-api.com/api/v2/appliances");

    if(!prods) throw new Error("Failed to fetch data");
   return prods.json();
}

export default function Products(){
let [item ,setItem] = useState({});
useEffect(() => {
    try{
        (async function(){
            let items = await getProducts();
            // console.log(items)
            setItem({...items});
        })()
    }
    catch(err){
console.log(err);
    }
},[])

return (
<>
<Suspense fallback={<div>Loading...</div>}>
<h3 key={item.uid}>{item.brand}</h3>
<i>{item.equipment}</i>
</Suspense>
<br />
<Link href="/">Back to Home</Link>
</>
)

}