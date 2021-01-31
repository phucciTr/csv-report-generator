

$(document).ready(function() {

  console.log('hello');

  let csv = $('#csv');

  $('form').on('submit', function(e){
    let data = new FormData($('#uploadForm')[0]);
    e.preventDefault();

    $.ajax({
      url: 'http://localhost:3000/csv',
      type: 'POST',
      contentType: false,
      processData: false,
      cache: false,
      data: data,
      success: function(res){
        csv.html('');
        csv.html(res);
      },
    });
  });

});

