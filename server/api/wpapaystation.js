//connect api endpoint
console.log("reached wpapastation")
//const request = require("request");
const fetch = (...args) => import('node-fetch')
  .then(({default: fetch}) => fetch(...args));

const url = "https://data.winnipeg.ca/resource/b85e-mbuw.json?$$app_token=PROCESS.ENV.APP_TOKEN";

//GETs all paystation data
const getWpaPaystation = async function (req, res) {
console.log("reached fetch url")
  await fetch(url, {
    method: 'GET',
    headers: {
      content: 'application/json;charset=utf-8',
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
const getWpaPaystationByStreet = async function (req,res) {
  //get by street

  const urlfilter = url +
    
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

const getWpaPaystationByTimeLimit = async function (req, res) {
  //get by time_limit
   const urlfilter = url+
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