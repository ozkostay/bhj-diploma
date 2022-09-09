/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const pushMenu = document.querySelector('a.sidebar-toggle');
    const body = document.querySelector('body.skin-blue');
    
    pushMenu.addEventListener('click', () => {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const registerButton = document.querySelector('.sidebar'); 
    console.log(registerButton);
    registerButton.addEventListener('click', (item) => {
      if ( item.target.outerText === "Вход" ) {
        App.getModal('login').open();
      } else if ( item.target.outerText === "Регистрация" ) {
        //console.log(App.getModal('register')); 
        App.getModal('register').open();
      } else if ( item.target.outerText === "Выход" ) {
        App.setState( 'init' );
      }
    })
  }
}