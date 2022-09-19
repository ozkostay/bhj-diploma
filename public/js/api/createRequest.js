/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
    //   console.log('Нет сработал онлоад');
      if (  xhr.status === 200 ) {
        options.callback(xhr.response.error, xhr.response);
      } else {
        console.error('Запрос не выполнен/ Статус: ', xhr.status);
      }
    };
    
    //console.log('method: ', options.method.trim());
    xhr.open(options.method, options.url);
    const formData = new FormData(options.data);
    xhr.responseType = options.responseType;
    xhr.send(formData);
};
