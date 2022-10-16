/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    //console.log('CreateAccountForm onSubmit()', data);
    Account.create(data, (err, response) => {
      if (response.success) {
        console.log('TimeOut');
        data.reset();
        App.getModal('createAccount').close();
        App.update();
      } else {
        alert(err);
      }
    });
  }
}