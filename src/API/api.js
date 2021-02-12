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