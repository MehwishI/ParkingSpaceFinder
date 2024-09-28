//connect api endpoint
console.log("reached wpapastation")
//const request = require("request");
const fetch = (...args) => import('node-fetch')
  .then(({ default: fetch }) => fetch(...args));
const token = process.env.APP_TOKEN;

const url = `https://data.winnipeg.ca/resource/b85e-mbuw.json?$$app_token=${token}`;

//GETs all paystation data
const getWpaPaystation = async function () {
console.log("reached fetch url")
  await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      //Authorization: `Bearer ${apiKey}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Request failed!')
    }
    return response.json();
  })
    .then(data => {
      console.log('Pay station data:', data)
      
    })
    .catch(error => {
      console.error('Error:', error);
        
    });


}
const getWpaPaystationByStreet = async function (streetName) {
  //get by street

  const urlFilter = url + `?street=${streetName}`;
    
    await fetch(urlFilter, {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${apiKey}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Request failed!')
    }
    return response.json();
  })
    .then(data => {
      console.log('Pay station data:', data)
      
      
    })
    .catch(error => {
      console.error('Error:', error);
        
    });

}

const getWpaPaystationByTimeLimit = async function (time_limit) {
  //get by time_limit
   const urlFilter = url+`?time_limit=${time_limit}`;
    await fetch(urlFilter, {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${apiKey}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Request failed!')
    }
    return response.json();
  })
    .then(data => {
      console.log('Pay station data:', data)
      
    })
    .catch(error => {
      console.error('Error:', error);
        
    });
  
}



const getWpaPaystationByHourlyRate = async function (req, res) {
  //get by hourly_rate
  const hourly_rate = req.body.hourly_rate 
  const urlfilter = url + '?where=hourly_rate=' + hourly_rate;
   await fetch(url, {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${apiKey}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Request failed!')
    }
    return response.json();
  })
    .then(data => {
      console.log('Pay station data:', data)
      
    })
    .catch(error => {
      console.error('Error:', error);
        
    });
  
}


const getWpaPaystationByAccesibleSpace = async function (req, res) {
  //get by accessible_space
   const urlfilter = url+'?where=accessible_space>0'
   await fetch(url, {
    method: 'GET',
    headers: {
      //Authorization: `Bearer ${apiKey}`,
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Request failed!')
    }
    return response.json();
  })
    .then(data => {
      console.log('Pay station data:', data)
      
    })
    .catch(error => {
      console.error('Error:', error);
        
    });
  
}

    


module.exports = { getWpaPaystation ,getWpaPaystationByStreet, getWpaPaystationByTimeLimit, getWpaPaystationByHourlyRate, getWpaPaystationByAccesibleSpace};