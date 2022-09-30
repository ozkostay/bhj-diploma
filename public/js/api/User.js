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
    //console.log('User.setCurrent() ', user);
    localStorage.setItem('id', user.id);
    localStorage.setItem('name', user.name);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    console.log('User.unsetCurrent() ' );
    this.logout( () => { localStorage.clear() } ); 
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let userObject = {};
    userObject.name = localStorage.getItem('name');
    userObject.id = localStorage.getItem('id');
    return userObject.name;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    //console.log('User.fetch() ', callback);
    callback();
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    console.log('User.login');
    createRequest({
      //==========================
      // url: User.URL + '/login',
      // method: 'POST',
      // responseType: 'json',
      // data,
      // callback: (err, response) => {
      //   if (response && response.user) {
      //     User.setCurrent(response.user);
      //     callback();
      //   } else {
      //     alert(err);
      //   }
      // }
      //==========================
      url: '/user/login',
      //method: 'POST',
      method: 'GET',
      responseType: 'json',
      data: {
        email: 'demo@demo',
        password: 'demo',
      },
      callback: (err, res) => {
        console.log("err=", err)
        console.log("res=", res)
      }
    });

    
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    //console.log('User.register() ', data);
    createRequest({
      url: User.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data,
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
          callback();
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
    callback();
    App.setState( 'init' );
    console.log('User.logout() ');
  }
}
