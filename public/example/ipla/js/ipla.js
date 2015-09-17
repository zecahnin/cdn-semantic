/*

* # INTELLETO IPLA
*
*
*
*

*/

$('.ipla-button-menuGlobal').click(function() {
        $('.ipla-sidebar-menuGlobal').sidebar({
            overlay: false
        }).sidebar('toggle');
        return false;
    }
);

$('.ui.dropdown')
  .dropdown()
;

$('.message .close')
  .on('click', function() {
    $(this)
      .closest('.message')
      .transition('fade')
    ;
  })
;

$(document)
  .ready(function() {
    $('.ui.form')
      .form({
        fields: {
          email: {
            identifier  : 'email',
            rules: [
              {
                type   : 'empty',
                prompt : 'Insira o seu email.'
              },
              {
                type   : 'email',
                prompt : 'Insira um e-mail válido.'
              }
            ]
          },
          password: {
            identifier  : 'password',
            rules: [
              {
                type   : 'empty',
                prompt : 'Insira sua senha.'
              },
              {
                type   : 'length[6]',
                prompt : 'Sua senha deve ter pelo menos 6 caracteres.'
              }
            ]
          }
        }
      })
    ;
  })
;