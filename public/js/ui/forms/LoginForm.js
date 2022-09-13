/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  
  // constructor(element){
  //   console.log('ЛогинФорм после конструктора ', element);
  //   super(element);
  //   this.element = element;
    
  //   const submitButton = this.element.querySelector('.btn-primary');
  //   submitButton,addEventListener('click', (event) => {
  //     event.preventDefault();
  //     this.onSubmit(this.element)
  //   });
    

  // }
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log('LoginForm.onSubmit', data);
    //выполняем вход
    
    User.login(data);
    //console.log('LoginForm.onSubmit() ', data);
    //console.log('LoginForm.onSubmit() ', callback);
    

  }
}