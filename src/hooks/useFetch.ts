import { useEffect, useState } from "react";

export function useFetch<T>(url: string){
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(()=>{
        const controller = new AbortController();
       let isMounted = true;
        fetch(url, {signal: controller.signal})
        .then((res)=>{
            if(!res.ok){
                throw new Error ("Something went wrong");
            }
            return res.json();
        }).then((result)=>{
            if(isMounted){
                setData(result);
                setLoading(false);
            }
        }).catch((err)=>{
            if(err.name === "AbortError") return;
           if(isMounted){
            setError(err.message);
            setLoading(false);
           }
        });
        return ()=> {isMounted= false; controller.abort()};
    },[url]);
    return {data, loading, error};
}