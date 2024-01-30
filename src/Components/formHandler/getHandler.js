

const getHandler =async (url) => {
    try {
    const response = await fetch(url, {
     });

    if (response.status == 200) {
        let data = response.json()
      return {status_code: response.status, data :data }
    } else {
        return {status_code : response.status }
    }
  } catch (err) {
    return {status : response.status }
  } 
};


export default getHandler
