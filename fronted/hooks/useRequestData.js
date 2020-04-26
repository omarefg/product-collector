import { useEffect, useState } from 'react'
import { request } from 'graphql-request';

const useRequestData = (query) => {
    const [data, setData] = useState([])

    useEffect(() => {
        const requestData = () => {
            request('https://products-api.now.sh', query)
                .then((res) => setData(res));
        }
        requestData()
    }, [query])

    return data
}

export default useRequestData