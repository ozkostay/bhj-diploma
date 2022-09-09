/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  constructor(element){
    console.log('ЛогинФорм после конструктора ', element);
    super(element);
    this.el = element;
    console.log('ЛогинФорм посл super el= ', this.el);
    
    this.onSubmit(this.el);
    //console.log('ttt');
    //this.element = ;
    //this .bbb = element;
    //this.registerEvents();
  }
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    console.log('gggggggggggggggg ', data);
    console.log('constructor ', this.el , 'super ');
  }
}