

const postHandler =async (url, formData) => {
    try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
console.log(response)
    
        let data = await response.json()
        console.log("lll", data)
      return {status: response.status, data :data }
    
  } catch (err) {
    return {status : 500 }
  } 
};


export default postHandler
