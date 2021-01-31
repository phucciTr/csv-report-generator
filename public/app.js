

$(document).ready(function() {

  console.log('hello');

  $('form').on('submit', function(e){
    e.preventDefault();

    $('#uploadForm').submit(() => {
      let data = new FormData($('#uploadForm')[0]);
      $.ajax({
        url: 'http://localhost:3000/csv',
        type: 'POST',
        contentType: false,
        processData: false,
        cache: false,
        data: data,
        success: function(res){
          console.log('res = ', res);
        },
      })
    });
  });




});