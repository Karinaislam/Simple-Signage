function updateTime() {
	
    var today = new Date();

    var weekday =['Sunday','Monday','Tuesday','Wednesday', 'Thursday','Friday', 'saturday'];
    var n = weekday[today.getDay()];
    document.getElementById('week').innerHTML = n;
  

	var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var en = 'AM'

    if (h>12){
    	h =h -12;
    	en = 'PM';
    }
    if(h==0){
    	h= 12;
    }


    if(h<10){
    	h ='0' + h;
    }

     if(m<10){
    	m ='0' + m;
    }
     if(s<10){
    	s ='0' + s;
    }

document.getElementById('time').innerHTML = h + ":" + m + ":" + s +' ' + en;
}


setInterval(updateTime ,1000) ;

function callApi(url) {
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json().then(response => ({ response }));
      }

      return response.json().then(error => ({ error }));
    })
  ;
}

function updateTrainInfo(){
	const url = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=d37555ccc09141848543ab21e287b560&max=10&mapid=40050&outputType=JSON'


	fetch(url)
		.then(function(response) {
		  if (!response.ok) {
		    throw Error(response.statusText);
		  }
		  // Read the response as json.
		  return response.json();
		})
		.then(function(responseAsJson) {
		  const trains = responseAsJson.ctatt.eta.filter(item => item.stpDe.includes('Howard'))
		  const time1 = new Date(trains[0].arrT) - new Date();
		  const time2 = new Date(trains[1].arrT) - new Date()
		  const time1mm = Math.ceil(time1/1000/60);
		  const time2mm = Math.ceil(time2/1000/60);
		  document.getElementById('train1_time').innerHTML = time1mm + 'min'
		  document.getElementById('train2_time').innerHTML = time2mm + 'min'
		  console.log(responseAsJson);
		})
		.catch(function(error) {
		  console.log('Looks like there was a problem: \n', error);
		});
}
updateTrainInfo();
setInterval(updateTrainInfo ,30000) ;
