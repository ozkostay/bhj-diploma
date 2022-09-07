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
    //const registerButton = document.querySelector('li.menu-item_register');
    //const registerButtons = Array.from(document.querySelectorAll('sidebar-menu'));
    const registerButton = document.querySelector('.sidebar'); 
    console.log(registerButton);
    registerButton.addEventListener('click', (item) => {
      console.log('item ', item.target);
      if ( item.target.outerText === "Регистрация" ) {
        App.getModal('register').element.setAttribute('style', 'display: block');
      } else if ( item.target.outerText === "Вход" ) {
        App.getModal('login').element.setAttribute('style', 'display: block');
      }
    //   // let aaa = App.getModal('register');
    //   ////App.getModal('register').element.setAttribute('style', 'display: block');
    //   // console.log('1111 ', aaa);
    //   // aaa.element.setAttribute('style', 'display: block')
    })
    //const reg2 = new Modal(reg);
    //console.log('111 ', App.getModal('register'));
    //console.log('222 ', App.modals);
    //console.log(reg2);
  }
}