/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
//const createRequest = (options = {}) => {
const createRequest = (options) => {
    console.log('createRequest options= ', options);
    
    // const xhr = new XMLHttpRequest();
    // xhr.onload = function() {
    //   console.log('Нет сработал онлоад');
    //   if (  xhr.status === 200 ) {
    //     console.log('Да === 200');
    //       if ( xhr.response.success ) {
    //           //signin.classList.remove('signin_active');
    //           console.log(xhr.response);
    //           //user_id = xhr.response.user_id;
    //           //wellcomeWindow( user_id );
    //           // Запись в кукки
    //           //console.log('222', form.login.value, '333');
    //           //setCookie ('login', form.login.value.trim());
    //           //setCookie ('user_id', user_id );
    //       } else {
    //           alert('Неверный логин/пароль');
    //       }
    //   } else {
    //     console.log('Нет стр 43');
    //   }
    //   //form.reset();
    // };
    
    // xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    // const formData = new FormData(form);
    // xhr.responseType = 'json';
    // xhr.send(formData);
};
