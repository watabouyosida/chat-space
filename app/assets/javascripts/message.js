$(function(){
  function buildHTML(message){
    if(message.image) {
      var html =
        `<div class="message-box">
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
            <image_tag ${message.image}> 
          </div>
         </div>`
      return html 
    }else{
      var html =
        `<div class="message-box">
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
});