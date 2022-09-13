/**
 * Класс AsyncForm управляет всеми формами
 * приложения, которые не должны быть отправлены с
 * перезагрузкой страницы. Вместо этого данные
 * с таких форм собираются и передаются в метод onSubmit
 * для последующей обработки
 * */
class AsyncForm {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    //console.log('AsyncФорм после конструктора ', element);
    this.element = element;
    this.registerEvents();
    //console.log("=== modal-content ", element.closest("div.modal-content"));
    //div class="modal-content
    
    
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    const submitButton = this.element.closest("div.modal-content").querySelector('button.btn-primary');
    console.log('AsyncФорм кнопки ', submitButton);

    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.onSubmit(this.element);
    });
  }

  /**
   * Преобразует данные формы в объект вида
   * {
   *  'название поля формы 1': 'значение поля формы 1',
   *  'название поля формы 2': 'значение поля формы 2'
   * }
   * */
  getData() {

  }

  onSubmit(options){
    console.log('AsincForm.onSubmit', options);
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {

  }
}