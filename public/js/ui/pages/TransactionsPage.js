/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    // console.log('TrPa Update account_id: ',localStorage.getItem('account_id'));
    const accountId = {};
    accountId.account_id = localStorage.getItem('account_id');
    this.render(accountId);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const buttonRemoveAccount = document.querySelector('button.remove-account');
    buttonRemoveAccount.addEventListener('click', () => {
      this.removeAccount();
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets() и App.updateForms(),
   * либо обновляйте только виджет со счетами и формы создания дохода и расхода
   * для обновления приложения
   * */
  removeAccount() {
    const result = confirm('Вы действительно хотите удалить счет?');
    if (result) {
      // удаляем текущий счет
      const data = {};
      const accounts = Array.from(document.querySelectorAll('li.account'));
      if (accounts) {
        const activeAccount = accounts.find((item) => item.classList.contains('active'));
        if (!activeAccount) {
          alert('Счет не выбран');
          return;
        }
        data.id = activeAccount.dataset.id;
      }

      Account.remove(data, (err, response) => {
        if (response.success) {
          localStorage.removeItem('account_id');
          this.clear();
          App.updateWidgets();
          App.updateForms();
        } else {
          alert(err);
        }
      });
    } else {
      console.log('Счет не удаляем');
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
  removeTransaction( id ) {
    // console.log('TrPa removeTransaction'), id;
    const result = confirm('Вы действительно хотите удалить транзакцию?');
    if (result) {
      // удаляем текущую транзакцию
      const data = {};
      data.id = id;
      Transaction.remove(data, (err, response) => {
        if (response.success) {
          this.update();
          App.updateWidgets();
        } else {
          alert(err);
        }
      });
    } else {
      console.log('Транзакция не удалена');
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options){
    // console.log('TrPa render', options);
    localStorage.setItem('account_id', options.account_id);
    if (String(options.account_id) != 'null') {
      Account.get(options, (err, response) => {
        if (response.success) {
          this.clear();
          this.renderTitle(response.data.name);
        } else {
          alert('TrPa 121' + err);
        }
      });
   
      Transaction.list(options, (err, response) => {
        if (response.success) {
          this.renderTransactions(response.data);
        } else {
          alert('TrPa 129' + err);
        }  
      });
    }
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    // console.log('TrPa clear ');
    this.renderTitle('Название счёта');
    this.renderTransactions([]);
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name){
    // console.log('renderTitle ',name);
    const title = document.querySelector('span.content-title');
    title.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date){
    let dateObj = new Date(date);
    let options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    let arr = dateObj.toLocaleString("ru", options).split(' ');
    let dateReturn = `${arr[0]} ${arr[1]} ${arr[2]} г. в ${arr[4]}`;
    return dateReturn;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item){
    // console.log('TrPa getTransactionHTML', item);
    let classType = 'transaction_income';
    if (item.type === "expense") {
      classType = 'transaction_expense';
    }
    
    const transaction = `<div class="transaction ${classType} row">
      <div class="col-md-7 transaction__details">
        <div class="transaction__icon">
            <span class="fa fa-money fa-2x"></span>
        </div>
        <div class="transaction__info">
            <h4 class="transaction__title">${item.name}</h4>
            <!-- дата -->
            <div class="transaction__date">${this.formatDate(item.created_at)}</div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="transaction__summ">
        <!--  сумма -->
        ${item.sum} <span class="currency">₽</span>
        </div>
      </div>
      <div class="col-md-2 transaction__controls">
          <!-- в data-id нужно поместить id -->
          <button class="btn btn-danger transaction__remove" data-id="${item.id}">
              <i class="fa fa-trash"></i>  
          </button>
      </div>
    </div>`;
    const sectionContent = document.querySelector('section.content');
    sectionContent.insertAdjacentHTML("beforeend", transaction);
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data){
    // console.log('TrPa renderTransactions ', data);
    const sectionContent = document.querySelector('section.content');
    sectionContent.innerHTML = '';
    data.forEach((item) => {
      this.getTransactionHTML(item);
    });
    const buttonsDeleteTransaction = Array.from(document.querySelectorAll('button.transaction__remove'));
    buttonsDeleteTransaction.forEach((element) => {
      element.addEventListener('click', (item) => {
        this.removeTransaction(item.target.dataset.id);
      });
    });

    
  }
} 