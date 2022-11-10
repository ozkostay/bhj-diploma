/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  //======================================================
  // console.log('======== !!!!= =========== options.data, выходим', options.data)
  // if (!options.data) {
  //   console.log('Нет options.data, выходим');
  //   return;
  // }
  
  const xhr = new XMLHttpRequest();
  formData = new FormData();
  xhr.onload = function() {
    // console.log('STATUS ', xhr.status);
    if (  xhr.status === 200 ) {
      // console.log('Запрос ' + options.method + ' выполнен');
      // console.log('error', xhr.response.error);
      // console.log('response', xhr.response);
      
      let callback = () => options.callback(xhr.response.error, xhr.response);
      // options.callback(xhr.response.error, xhr.response);
      
      // Без setTimeout() при создании нового счета виджет при App.update() не отображает новый счет
      // Как будто не успевает. По этому поставил setTimeout()
      
      setTimeout(callback , 600);
    } else {
      // console.error('Запрос не выполнен/ Статус: ', xhr.status, xhr.response);
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
    console.log('options.url', options.url);
    xhr.open(options.method, options.url);
    xhr.send();
  }
  //======================================================
};

// тестовый запрос
// Запрос GET вернул пользователя
// судя по файлу /routes/user.js в data должен быть id, а не email и password
// в дальнейшем вместо "1" в id нужно будет подставлять id из локального хранилища.

// Тестовый запрос GET
createRequest({
  url: '/account',
  method: 'GET',
  responseType: 'json',
  data : {
    id: "1",
  },
  callback: (err, res) => {
    console.log("2 err=", err);
    console.log("2 res=", res);
  }
});