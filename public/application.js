function updateElement($el, content) {
  $el.text(content);
  $el.addClass("flash");

  setTimeout( function(){
    $el.removeClass("flash");
  }, 1000); // Timeout must be the same length as the CSS3 transition or longer or the transition will mess up
}

function startLoading() {
  $('#updatemessage').slideDown();
}

function endLoading() {
  $('#updatemessage').slideUp();
  $('#stock_symbol').val('');
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
        if(!$('#quote_container').is(":visible")) {
          $('#splash_container').hide();
          $('#quote_container').show();
        }
        var attributes = ['name', 'symbol', 'lastTrade', 'time', 'date', 'updatedAt'];
        for (var i = 0; i < attributes.length; i++) {
          updateElement($('#' + attributes[i]), data[attributes[i]]);
        }
      },
      complete: endLoading
    });

  });
});

