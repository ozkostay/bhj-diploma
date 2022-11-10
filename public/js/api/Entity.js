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
      url: this.URL,
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
    const inputName = Array.from(data.querySelectorAll('[name]'));
    // console.log('names: ', inputName);
    inputName.forEach((item) => {
      // console.log('???== name: ', item.name, ' value: ',item.value);
      if(item.name === 'sum') {
        dataFromForm[item.name] = Number(item.value);
      } else {
        dataFromForm[item.name] = item.value;
      }
    });
    // console.log(dataFromForm);
    // sum
    // account_id

    createRequest({
      url: this.URL,
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
      url: this.URL,
      method: 'DELETE',
      responseType: 'json',
      data : data,
      callback: callback,
    });
  }
}
