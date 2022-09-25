/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element){
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    const closButtons = Array.from(this.element.querySelectorAll('[data-dismiss="modal"]'));
    closButtons.forEach( (item) => {
      item.addEventListener('click', () => {
        this.onClose();
      })
    });
    
    // const submitButton = this.element.querySelector('.btn-primary');
    // //console.log('bbb ', submitButton.getAttribute('form'));
    // submitButton.addEventListener('click', () => {
    // //   //console.log(submitButton.form.value);
    //   //LoginForm.onSubmit();
    //   // LoginForm
    //   console.log('press button');
    //   // let aaa = new LoginForm();
    //   // aaa.onSubmit('data_bebe');
    //   let aaa = App.forms;
    //   console.log('ddddd ',aaa);
    // })
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    console.log('=!=== e', e);
    this.close();
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    console.log('Modal.open()');
    this.element.setAttribute('style', 'display: block');
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close(){
    // console.log('00000000000000 ', this.element);
    this.element.setAttribute('style', 'display: none');
  }
}