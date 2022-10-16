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
        data.reset();
        App.update();
        App.getModal('createAccount').close();
      } else {
        alert(err);
      }
    });
  }
}