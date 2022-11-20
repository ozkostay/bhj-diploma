/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element;
    this.registerEvents();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    // this.element
    const newAccount = document.querySelector('.create-account');
    newAccount.addEventListener('click', (event) => {
      App.getModal('createAccount').open();
    });

    // console.log('AccountsWidget registerEvents()', this.element);
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    // console.log('AccWid update()');
    const isThereUser = User.current();
    if (isThereUser) {
      const data = {};
      data.id = localStorage.getItem('id').trim();
      Account.list(data, (err, response) => {
        if (response.success) {
          this.clear();
          this.renderItem(response.data);
        } else {
          alert('AcWi' + err);
        }
      });
    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    // console.log('AccWid clear()');
    const accounts = Array.from(document.querySelectorAll('li.account'));
    if (accounts) {
      accounts.forEach( ( element ) => {
        element.remove();
      });
    }
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    // console.log('== == == == == ', element);
    const parentLi = element.closest('li');
    const accounts = Array.from(document.querySelectorAll('li.account'));
    let activeId;
    if (accounts) {
      accounts.forEach( (item, index) => {
        item.classList.remove('active');
        if (parentLi === item) {
          parentLi.classList.add('active');
          activeId = parentLi.dataset.id;
        }
      });
    }
    // console.log('Cruto!!!!!!!!!! id^ ', activeId);
    App.showPage( 'transactions', { account_id: activeId });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item){
    const accountsPanel = document.querySelector('ul.accounts-panel');

    let accountLi = document.createElement('li');
    accountLi.classList.add('account');
    accountLi.dataset.id = item.id;

    accountsPanel.insertAdjacentElement('beforeend', accountLi);
    
    let accountAnchor = document.createElement('a');
    accountAnchor.href = "#";
    accountLi.insertAdjacentElement('beforeend', accountAnchor);
    
    let spanName = document.createElement('span');
    spanName.textContent = item.name;
    accountAnchor.insertAdjacentElement('beforeend', spanName);
    accountAnchor.innerHTML += ' / ';
    
    let spanSum = document.createElement('span');
    spanSum.textContent = item.sum + ' ₽';
    accountAnchor.insertAdjacentElement('beforeend', spanSum);
    
    accountAnchor.addEventListener('click', (item) => {
      this.onSelectAccount(item.target);       
    });
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(data){
    // console.log('AccWid renderItem()', data);
    data.forEach ( (item) => {
      this.getAccountHTML(item);
    });
  }
}
