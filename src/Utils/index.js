import { Axios } from "@/helper/httpHelper";
const API_KEY = "23453c20cf954f23b17f3562cfb62a67"
const BASE_URL = "https://api.themoviedb.org/3";

export const GetTrendingMedias = async(type) => {
    try {
        const res = await Axios.get(`${BASE_URL}/trending/${type}/day?api_key=${API_KEY}&language=en-US`)
        return res.data.results
    } catch (err) {
        console.log(err);
    }
};

export const GetTopratedMedias = async(type) => {
    try {
        const res = await Axios.get(`${BASE_URL}/${type}/top_rated?api_key=${API_KEY}&language=en-US`)
        return res.data.results
    } catch (err) {
        console.log(err);
    }
};

export const GetPopularMedias = async(type) => {
    try {
        const res = await Axios.get(`${BASE_URL}/${type}/popular?api_key=${API_KEY}&language=en-US`)
        return res.data.results
    } catch (err) {
        console.log(err);
    }
};


export const GetMoviesBySearch = async(type , query) => {
    try {
        const res = await Axios.get(`${BASE_URL}/search/${type}?api_key=${API_KEY}&include_adult=false&language=en-US&query=${query}`)
        console.log("this works")
        return res.data.results
    } catch (err) {
        console.log(err);
    }
};

// export const GetPopularMoviesById = async(type, id) => {
//     try {
//         const res = await Axios.get(`${BASE_URL}/${type}/${id}/videos?api_key=${API_KEY}&language=en-US&append_to_response=videos`)
//         console.log("this works")
//         return res.data.results
//     } catch (err) {
//         console.log(err);
//         console.log("this is not working")
//     }
// };
//'https://api.themoviedb.org/3/movie/movie_id/videos?language=en-US'


export const getAllFavorites = async (uid, accountID ) => {
    try {
        const data = await Axios.get(
            `/api/favorites/getAllFavorite?id=${uid}&accountId=${accountID}`
          );
          return data
    } catch (err) {
        console.log(err);
    }
    
    

  };