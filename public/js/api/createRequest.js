/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options) => {
  //======================================================
  console.log('createRequest', options);  
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    // console.log('STATUS ', xhr.status);
    if (  xhr.status === 200 ) {
      // console.log('Запрос ' + options.method + ' выполнен');
      // console.log('error', xhr.response.error);
      // console.log('response', xhr.response);
      let callback = () => options.callback(xhr.response.error, xhr.response);
      // Без setTimeout() при создании нового счета виджет при App.update() не отображает новый счет
      // Как будто не успевает. По этому поставил setTimeout()
      setTimeout(callback , 600);
    } else {
      // console.error('Запрос не выполнен/ Статус: ', xhr.status, xhr.response);
    }
  };
  
  // console.log('crReq metod!!!!!!!!!!!!!! ', options.method, options.data)

  if ( options.method !== "GET" ) {
    xhr.open(options.method, options.url);
    xhr.responseType = options.responseType;
    if ( options.method !== "DELETE" ) {
      formData = new FormData(options.data);
    } else {
      formData = new FormData();
      formData.append('id', options.data.id);
    }
    xhr.send(formData);
  } else {
    console.log('777 ', options.url + '?id=' + encodeURIComponent(options.data.id));
    const url = options.url + '?id=' + encodeURIComponent(options.data.id);
    xhr.open(options.method, url);
    xhr.responseType = options.responseType;
    xhr.send();
  }
  //======================================================
};

// тестовый запрос
// Запрос GET вернул пользователя
// судя по файлу /routes/user.js в data должен быть id, а не email и password
// в дальнейшем вместо "1" в id нужно будет подставлять id из локального хранилища.

// Тестовый запрос GET
// createRequest({
//   url: '/user/current',
//   method: 'GET',
//   responseType: 'json',
//   data : {
//     id: "1",
//   },
//   callback: (err, res) => {
//     console.log("err=", err);
//     console.log("res=", res);
//   }
// });