/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
 class Account extends Entity {
  
    
  static URL = '/account';
  
  /**
   * Получает информацию о счёте
   * */

  static get(id = '', callback){
    console.log('Acc get id:', id, ' === ', callback );
    createRequest({
      url: this.URL,
      method: 'GET',
      responseType: 'json',
      data : id,
      callback: callback,
    });
    // console.log('aaa', aaa);
  }
}