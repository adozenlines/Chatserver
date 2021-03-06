$(document).ready(function(){
  var socket = io.connect();
  
  socket.on('chat', function(data) {                  // Add Chat Data to Content
	$('#content').append(
	  $('<li></li>').append(
		 $('<span>').text('[' + getTime(data) + '] '),
		 $('<b>').text(typeof(data.name) != 'undefined' ? data.name + ': ' : ''),
		 $('<span>').text(data.text))
	);	
	window.scrollTo(0,document.body.scrollHeight); // Scroll to bottom      
	});
	
  function send(){                                    // Send Data to Server 
	var name = $('#name').val();
	var text = $('#text').val();
	socket.emit('chat', {name: name, text: text});
	$('#text').val('');
	}
	
  $('#send').click(send);                             // Mouse klick on Button
  $('#text').keypress(function(evt) {                 // Enter Key pressed
    if (evt.which == 13) {
        send();
    }
  });
});

function getTime(data) {                              // get Time in the Format HH:MM:SS
var date = new Date(data.time);
return date.getHours().toString().lpad("0",2) + ":" +
       date.getMinutes().toString().lpad("0",2) + ":" +
       date.getSeconds().toString().lpad("0",2);
}

String.prototype.lpad = function(padString,length) {  // add leading padding characters
  var string = this;
  while (string.length < length) {
    string = padString + string;
  }
  return string;
};
