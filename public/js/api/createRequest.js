/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  //======================================================
  //console.log('createRequest', options);  
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (  xhr.status === 200 ) {
      options.callback(xhr.response.error, xhr.response);
    } else {
      console.error('Запрос не выполнен/ Статус: ', xhr.status);
    }
  };
  
  if ( options.method === "POST" ) {
    xhr.open(options.method, options.url);
    xhr.responseType = options.responseType;
    const formData = new FormData(options.data);
    xhr.send(formData);
  } else {
    xhr.open(options.method, options.url + options.data);
    xhr.responseType = options.responseType;
    xhr.send();
  }
  //======================================================
  
  
  
  






};
