import React, { useEffect, useState } from 'react'

const localCache = {};

export const useFetch = (url) => {
    const [state, setState] = useState({
        data: null,
        error: null,
        isLoading: true,
        hasError: false
    });

    useEffect(() => {
        getFetch();

    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            error: null,
            isLoading: true,
            hasError: false
        })
    }

    const getFetch = async () => {

        if (localCache[url]) {
            console.log('Usando cache');
            setState({
                data: localCache[url],
                error: null,
                isLoading: false,
                hasError: false
            });
            return;
        }

        setLoadingState();
        const resp = await fetch(url);

        // sleep
        await new Promise(resolve => setTimeout(resolve, 1500));



        if (!resp.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    status: resp.status,
                    message: resp.statusText
                }
            });
            return;
        }
        const data = await resp.json();
        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        });
        localCache[url] = data;
        console.log({ data });
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError
    }
}
