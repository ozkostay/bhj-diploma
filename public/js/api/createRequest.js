/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  const xhr = new XMLHttpRequest();
  formData = new FormData();
  xhr.onload = function() {
    if (  xhr.status === 200 ) {
      let callback = () => options.callback(xhr.response.error, xhr.response);
      setTimeout(callback , 600);
    } else {
      console.error('Запрос не выполнен/ Статус: ', xhr.status, xhr.response);
    }
  };
  
  xhr.responseType = options.responseType;
  if ( options.method !== 'GET' ) {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    }
    xhr.open(options.method, options.url);
    xhr.send(formData);
  } else {
    options.url += '?';
    for (let key in options.data) {
      options.url += `${key}=${options.data[key]}&`;
    }
    xhr.open(options.method, options.url);
    xhr.send();
  }
};

// тестовый запрос

// Тестовый запрос GET
// createRequest({
//   url: '/account/2',
//   method: 'GET',
//   responseType: 'json',
//   data : {
//     id: "1",
//   },
//   callback: (err, res) => {
//     console.log("2 err=", err);
//     console.log("2 res=", res);
//   }
// });

// Тестовый запрос delete
// createRequest({
//   url: '/transaction',
//   method: 'DELETE',
//   responseType: 'json',
//   data : {
//     id: "8cyi0imn5lanitdhd",
//   },
//   callback: (err, res) => {
//     console.log("3 err=", err);
//     console.log("3 res=", res);
//   }
// });