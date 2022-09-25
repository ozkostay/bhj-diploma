/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  console.log('createRequest', options);  
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
  //   console.log('Нет сработал онлоад');
    if (  xhr.status === 200 ) {
      console.log('cR 200 xhr.response: ',xhr.response);
      options.callback(xhr.response.error, xhr.response);
    } else {
      console.log('cR 200');
      console.error('Запрос не выполнен/ Статус: ', xhr.status);
    }
  };
  
  //console.log('method: ', options.method.trim());
  xhr.open(options.method, options.url);
  const formData = new FormData(options.data);
  xhr.responseType = options.responseType;
  xhr.send(formData);
};
