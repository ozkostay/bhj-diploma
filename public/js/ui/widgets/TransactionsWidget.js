/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

 class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    // console.log('=!=!=!=! TrWid constr', element);
    this.registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const buttonsTransactions = Array.from(document.querySelectorAll('button.btn-block'));
    buttonsTransactions.forEach ((element) => {
      element.addEventListener('click', () => {
        if (element.classList.contains('create-income-button')) {
          App.getModal('newIncome').open();
        } else {
          App.getModal('newExpense').open();
        }
      });
    });
  }
}