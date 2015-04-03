'use strict';

(function(){
  if(window.location.host !== 'booking.uz.gov.ua'){
    console.clear();
    console.log('Bad host: ' + window.location.host);

    return false;
  }
  console.clear();

  var Common = window.Common;
  
  var url = 'http://booking.uz.gov.ua/purchase/search/';
  var form = document.querySelector('.train_search');
  
  var from = document.querySelector('[name="station_id_from"]');
  var to = document.querySelector('[name="station_id_till"]');
  var date = document.querySelector('[name="date_dep"]');
  
  from.value = 2200001; //Set Kiev
  to.value = 2218095; //Set Uzh
  date.value = '09.04.2015'; //Set date
  
  var oldTrains = null;
  
  var catcher = function(res){
    if(res.error){
      return;
    }
    if(!oldTrains){
      oldTrains = res.value;
    }
    var trains = res.value;
    var train;
    var oldTrain;
    
    console.log(res.value);
    
    if(JSON.stringify(oldTrains) !== JSON.stringify(trains)){
      console.info('New changes', new Date());
      
      for(var i = 0; i < trains.length; i++){
        train = trains[i];
        console.info([
          'Train',
          train.num,
          'from',
          train.from.station,
          'to',
          train.till.station
        ].join(' '));
      }
    }
    
    oldTrains = res.value;
    console.log('reuse');
    
  };
  
  if(!Common){
    return;
  }
  
  var interval = null;
  
  window.spy = function(){
    Common.ajax(url, {form: form}, catcher, function(){});
  }
  window.spyOn = function(m){
    var time = 1000 * 60 * (m || 1);
    
    window.spy();
    
    interval = setInterval(function(){
      window.spy();
    }, time);
  }
  window.spyOff = function(){
    clearInterval(interval);
  }

})();