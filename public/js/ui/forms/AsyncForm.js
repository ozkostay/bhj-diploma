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
    this.element = element;
    this.registerEvents();
  }

  /**
   * Необходимо запретить отправку формы и в момент отправки
   * вызывает метод submit()
   * */
  registerEvents() {
    // console.log('Asy registerEvents');
    const submitButton = this.element.closest("div.modal-content").querySelector('button.btn-primary');
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      this.submit();
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
    const dataFromForm = {};
    const inputName = Array.from(this.element.querySelectorAll('[name]'));
    inputName.forEach((item) => {
      if(item.name === 'sum') {
        dataFromForm[item.name] = Number(item.value);
      } else {
        dataFromForm[item.name] = item.value;
      }
    });
    return dataFromForm;
  }

  onSubmit(options){
    // console.log('AsincForm.onSubmit', options);
  }

  /**
   * Вызывает метод onSubmit и передаёт туда
   * данные, полученные из метода getData()
   * */
  submit() {
    // console.log('Asy submit() 58 ' );
    this.onSubmit( this.getData() );  
  }
}