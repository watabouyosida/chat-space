$(function(){
  function buildHTML(message){
    if(message.image) {
      var html =
        `<div class="message-box" data-id=` + message.id + `>
          <div class="message-name">
            <div class="message-name__user-name">
              ${message.user_name}
            </div>
            <div class="message-name__date">
              ${message.date}
            </div>
          </div>
          <div class="message-message">
              <p class="message-message__content">
                ${message.content}
              </p>
            <image src=${message.image}> 
          </div>
         </div>`
      return html 
    }else{
      var html =
        `<div class="message-box"data-id=` + message.id + `>
           <div class="message-name">
            <div class="message-name__user-name">
              ${message.user_name}
            </div>
            <div class="message-name__date">
              ${message.date}
            </div>
          </div>
          <div class="message-message">
              <p class="message-message__content">
                ${message.content}
              </p>
          </div>
         </div>`
      return html;
    };
  }
  var reloadMessages = function() {
    last_message_id = $(".message-box:last").data('id')
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.message').append(insertHTML);
      $('.message').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast');
    })
    .fail(function() {
      console.log('error');
    });
  };
  
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html);
       $('.message').animate({scrollTop: $('.message')[0].scrollHeight}, 'fast');   
       $('form')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
    return false;
  })
  setInterval(reloadMessages, 7000);
});