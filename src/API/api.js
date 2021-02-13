import * as axios from 'axios';

/*
instance created by axios
can add headers, withCredentials etc. 
*/
const instance = axios.create({
    baseURL: 'http://localhost:3004/'
});


/*
indicatorAPI - all that applies indicators request 
*/
export const indicatorAPI = {


    //add new indicator to db
    addIndicator(newIndicator){
        return instance.post(`indicators/`, newIndicator)

        //mb use fetch?
        // return fetch(instance + `indicators/`, {
        //     method: 'POST',
        //     body: JSON.stringify(newIndicator)
        //   })
    },

    //delete some indicator
    deleteIndicator(indicatorId){
        return instance.delete(`indicators/${indicatorId}`)
    },

    //get all indicators
    getIndicators(){
        return instance.get(`indicators`)
        .then(response => {
            return response.data;
        })
    }
}


    //get current from kuna API
    // [0] - get array
    // [7] - get last price (https://docs.kuna.io/docs/%D0%BF%D0%BE%D1%81%D0%BB%D0%B5%D0%B4%D0%BD%D0%B8%D0%B5-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5-%D0%BF%D0%BE-%D1%80%D1%8B%D0%BD%D0%BA%D1%83-%D1%82%D0%B8%D0%BA%D0%B5%D1%80%D1%8B)
    

export function getCurrentPrice(symbol){
    return axios.get(`https://api.kuna.io/v3/tickers?symbols=${symbol}`)
    .then(response => {
        return response.data[0][7];
    }) 
}
