

$(document).ready(function() {

  console.log('hello');

  let csv = $('#csv');

  $('#uploadForm').on('submit', function(e) {
    let data = new FormData($('#uploadForm')[0]);
    console.log('data = ', $('#uploadForm'));
    e.preventDefault();

    $.ajax({
      url: 'http://localhost:3000/csv',
      type: 'POST',
      contentType: false,
      processData: false,
      cache: false,
      data: data,
      success: function([html, id]){
        csv.html('');
        csv.html(html);
        $('#download').attr('action', `http://localhost:3000/download/${id}`);
      },
    });
  });

});

