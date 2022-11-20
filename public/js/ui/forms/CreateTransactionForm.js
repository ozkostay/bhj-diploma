/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
 class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    // console.log('renderAccountsList', this.element);
    const data = {};
    data.id = localStorage.getItem('id').trim();
    Account.list(data, (err, response) => {
      if (response.success) {
        // Заполняем форму счетами
        let accountListIdName;
        if (this.element.id === "new-income-form") {
          accountListIdName = 'income-accounts-list';
        } else {
          accountListIdName = 'expense-accounts-list';
        }
        const SelectElement = document.getElementById(accountListIdName);
        SelectElement.innerHTML = '';
        response.data.forEach((item) => {
          const option = document.createElement('option');
          option.textContent = item.name;
          option.value = item.id;
          SelectElement.insertAdjacentElement('beforeend', option);
        });
      } else {
        alert(err);
      }
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    // console.log('Доход Расход :-)', data);
    let curentModal = 'newExpense';
    if (data.type === "income") {
      curentModal = 'newIncome';
    }

    Transaction.create(data, (err, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal(curentModal).close();
        App.update();
      } else {
        alert(err);
      }
    });
  }
}