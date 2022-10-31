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
    callback();
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback) {
    const dataFromForm = {};
    dataFromForm[data.elements.email.name] = data.elements.email.value;
    dataFromForm[data.elements.password.name] = data.elements.password.value;
    createRequest({
      //==========================
      url: User.URL + '/login',
      method: 'POST',
      responseType: 'json',
      data: dataFromForm,
      callback: (err, response) => {
        if (response && response.user) {
          User.setCurrent(response.user);
          callback();
        } else {
          alert(err);
        }
      }
      //==========================
      
    });

    
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    const dataFromForm = {};
    dataFromForm[data.elements.name.name] = data.elements.name.value;
    dataFromForm[data.elements.email.name] = data.elements.email.value;
    dataFromForm[data.elements.password.name] = data.elements.password.value;
    
    createRequest({
      url: User.URL + '/register',
      method: 'POST',
      responseType: 'json',
      data: dataFromForm,
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
