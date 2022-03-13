//Проверка работы
$(document).ready(function(){
	$('#button').on('click', function(){
		alert('jQuery работает!');
	});

//Загрузка из файла и вставка
$('#buttonLoadJSON').on('click', function(file){
	$.ajax({
		url: "gallery.json",
		dataType: "json",
		success: function(data) {
			file = data;
			progress();
		}
	});

	var load = function(){
		$('#galleryName').empty();
		$('#galleryName').prepend(file.gallery);
		for (var i = 0; i < file.images.length ; i++) {
				$('#main').append('<p>' + file.images[i].name + '</p>');
				$('#main').append('<img class="image" src="images/' + file.images[i].file +'" /> <br> <br>');
			}
		}
	//ProgressBar загрузки изображений
	var progress = function(){
		var val = 0;
        $( '#main ').empty();
		var interval = setInterval(function() {
			val = val + 1;
			$(".progressBar").progressbar({value: val});
			if (val == 100) {
				clearInterval(interval);
				load();
				alert('Успешно загружено!');
			}
		}, 5);
	}
	});
});

//Код слайдера
var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;
var slideInterval = 1000;
var navBtnId = 0;
var translateWidth = 0;

$(document).ready(function() {
    var switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function() {
        clearInterval(switchInterval);
    }, function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});

function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}

//Код приближения картинки
$(function(){
  $('.slide-img').click(function(event) {
    var i_path = $(this).attr('src');
    $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
    $('#magnify').css({
	    left: ($(document).width() - $('#magnify').outerWidth())/2, top: ($(window).height() - $('#magnify').outerHeight())/2
	  });
    $('#overlay, #magnify').fadeIn('fast');
  });

  $('body').on('click', '#close-popup, #overlay', function(event) {
    event.preventDefault();
    $('#overlay, #magnify').fadeOut('fast', function() {
      $('#close-popup, #magnify, #overlay').remove();
    });
  });
});

//Меню аккордеон и смена классов toggleClass
var accordion = function() {
	var data = $(".accordion").attr("data-accordion");
	$(".accordion-header").on("click", function() {
		if (data === "close") {
			$(".accordion-body").slideUp();
			if ($(this).hasClass("active")) {
				$(this).toggleClass("active");
			}
			else {
				$(".accordion-header").removeClass("active");
				$(this).toggleClass("active");
			}
		}
		else {
			$(this).toggleClass("active");
		}
		$(this).next(".accordion-body").not(":animated").slideToggle();
	});
}

accordion();

//Datepicker
$("#datepicker").on('click', function(){
	$("#datepicker").datepicker();
});

//Progressbar
$(function() {
	$(".progressBar").progressbar({
		value: 0
	});
});

//Категории изображений Tabs
$(function() {
	$( "#tabs" ).tabs();
});

//15 вариант - эффект Pulsate
$('#transfer').click(function() {
    var i = 1 - $( "a" ).index( this );
    $( this ).transfer( {
      to: "#slider-scrolling",
      duration: 1000
    } );
  });

  $(document).ready(function() {
  $(".ui-progressbar-value").css({ 'background': 'green' });
  });