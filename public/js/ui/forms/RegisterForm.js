/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log('RegisterForm.onSubmit', data);
    let callback = () => { console.log('WWWWWWWWWWWWWWWW') };
    User.register(data, callback);
    
  }
}