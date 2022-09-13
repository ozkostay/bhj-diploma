/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log('User.setCurrent() ', user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log('User.unsetCurrent() ' );
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    console.log('User.current() ');
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    console.log('User.fetch() ', callback());
    //callback();
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    console.log('User.login() ', data);
    console.log('User.login() URL', URL);
        
    // было изначально
    createRequest({
      url: URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      }
    });

    // console.log('11111111111');
    // //console.log('333333333333', createRequest());
    // console.log('222222222222');
    
    const xhr = new XMLHttpRequest();
    xhr.onload = function() {
      console.log('сработал онлоад');
      if (  xhr.status === 200 ) {
        console.log('Да === 200');
          if ( xhr.response.success ) {
              console.log(xhr.response);
              //setCookie ('login', form.login.value.trim());
              //setCookie ('user_id', user_id );
          } else {
              alert('Неверный логин/пароль');
          }
      } else {
        console.log('Статус НЕ 200 ===  стр 86');
      }
      //form.reset(); 
    };
    
    xhr.open('POST', 'localhost:8000/login');
    const formData = new FormData(data);
    xhr.responseType = 'json';
    xhr.send(formData);

    

    // function setCookie (name, value) {
    //   document.cookie = name + '=' + encodeURIComponent(value);
    // }
  
    // function getCookie (name) {
    //     const allCookies = document.cookie.split('; ');
    //     const isCookie = allCookies.find( (item) => item.startsWith( name+"=" ));
    //     return isCookie ? isCookie.substr( name.length + 1 ): isCookie;
    // }
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    console.log('User.register() ', callback);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    console.log('User.logout() ', callback);
  }
}
