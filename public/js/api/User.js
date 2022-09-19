/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    console.log('User.setCurrent() ', user);
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
    
    // setCookie ('email', user.email.trim());
    // setCookie ('password', user.password );
    // function setCookie ( name, value) {
    //    document.cookie = name + '=' + encodeURIComponent(value);
    // }
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
    //aaa = localStorage.getItem('id');
    //console.log('User.current() ', localStorage.getItem('id'));
    //return localStorage.getItem('id');
    return localStorage.getItem('name');
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
    //console.log('User.login() ', data);
    //console.log('User.login() URL', User.URL);
    
    createRequest({
      url: User.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
          data.reset();
          App.getModal('login').close();
          App.setState('user-logged');
        } else {
          alert(err);
        }
        //console.log('888', response);
        //console.log('8882', response.user);
        //callback(err, response);
      }
    });

    console.log('909090909090 ');


  
  
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
    console.log('User.register() ', data);
    //User.login(data);
    
    
    createRequest({
      url: User.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
          data.reset();
          App.getModal('register').close();
          App.setState('user-logged');
        } else {
          alert(err);
        }
      }
    });
    
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(callback) {
    console.log('User.logout() ', callback);
  }
}
