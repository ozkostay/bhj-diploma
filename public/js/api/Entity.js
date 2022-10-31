/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";
  //
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback){
    createRequest({
      url: this.URL + 'account/',
      method: 'GET',
      responseType: 'json',
      data : data,
      callback: callback,
    });
    //return accoutList;
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback) {
    console.log('WWW====== ', data);
    const dataFromForm = {};
    dataFromForm[data.elements.name.name] = data.elements.name.value;
    createRequest({
      url: this.URL + 'account/',
      method: 'PUT',
      responseType: 'json',
      data : dataFromForm,
      callback: callback,
    });
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(data, callback ) {
    createRequest({
      url: this.URL + 'account/',
      method: 'DELETE',
      responseType: 'json',
      data : data,
      callback: callback,
    });
  }
}
