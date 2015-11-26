function updatePage(data) {
  console.debug("updatePage");
  if(!$('#quote_container').is(":visible")) {
    $('#splash_container').hide();
    $('#quote_container').show();
  }
  var attributes = ['name', 'symbol', 'lastTrade', 'time', 'date', 'updatedAt'];

  $.each(attributes, function(i, attribute){
    updateElement($('#' + attribute), data[attribute]);
  });
}

function updateElement($el, content) {
  $el.text(content);
  $el.effect('highlight', 1000);

  setTimeout( function(){
    $el.removeClass("flash");
  }, 1000); // Timeout must be the same length as the CSS3 transition or longer or the transition will mess up
}

function startLoading() {
  var $submitButton = $('form input[type="submit"]')
  $submitButton.attr('disabled', true).val('Please wait...');
  $('#updatemessage').slideDown();
}

function endLoading() {
  $('#updatemessage').slideUp();
  $('#stock_symbol').val('');
  var $submitButton = $('form input[type="submit"]')
  $submitButton.attr('disabled', false).val('Query');

}

$(function() {
  $('#stock_search').on("submit", function(e) {
    e.preventDefault();
    var stockSymbol = $('#stock_symbol').val();
    var url = '/' + stockSymbol;

    $.ajax({
      url: url,
      type: 'GET',
      beforeSend: startLoading,
      success: function(data) {
        updatePage(data);
      },
      complete: endLoading
    });

  });
});

