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
      console.log('Запрос ' + options.method + ' выполнен');
      // console.log('error', xhr.response.error);
      // console.log('response', xhr.response);
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
    // const url = options.url + '?email=' + encodeURIComponent(options.data.email)
    // + '&password=' + encodeURIComponent(options.data.password);
    const url = options.url + '?id=' + encodeURIComponent(options.data.id);
    // console.log('url: ', url);
    xhr.open(options.method, url);
    xhr.responseType = options.responseType;
    xhr.send();
  }
  //======================================================
};

// Запрос GET вернул пользователя
// судя по файлу /routes/user.js в data должен быть id, а не email и password
// в дальнейшем вместо "1" в id нужно будет подставлять id из локального хранилища.

createRequest({
  url: '/user/current',
  method: 'GET',
  responseType: 'json',
  data : {
    id: "1",
  },
  callback: (err, res) => {
    console.log("err=", err);
    console.log("res=", res);
  }
});