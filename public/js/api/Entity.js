/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor() {
    this.URL = "";
  }
  //
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      url: 'account/',
      method: 'GET',
      responseType: 'json',
      data : data,
      callback: (err, response) => {
        if (response) {
          console.log('dddddddddddddd ', response);
          //AccountsWidget.renderItem(response);
          //console.log('dddddddddddddd ', response.data);
          //this.clear();
          //Account.list( response );
          //sss = response;
          //console.log(sss);
          //return response;      
          //User.setCurrent(response.user);
          //data.reset();
          //App.getModal('createAccount:').close(); // 
          //App.setState('user-logged');
          console.log('AccWidget YES!!!', response);
        } else {
          alert(err);
        }
      }
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {

  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {

  }
}
