var mobile_view = false;

function default_menu() {
	if (mobile_view === false) {
		$('nav').removeClass('show_menu');
		$('nav .nav_menu:hidden').show();
		$('nav .show_submenu').removeClass('show_submenu');
		$('nav .sub:visible').hide();
	} else {
		$('nav .nav_menu:visible').hide();
	}
}

var resize_window_addl = null;

function resize_window() {
	var width = find_screen_width();
	var current_mobile_view = mobile_view;;

	if (width <= 800) {
		mobile_view = true;
	} else {
		mobile_view = false;
	}

	// If view has changed
	if (current_mobile_view != mobile_view) {
		current_mobile_view = mobile_view;
		default_menu();
	}

	if (typeof(resize_window_addl) == 'function') {
		resize_window_addl(width);
	}
}

function find_screen_width() {
	var width = $(window).width();

	// <= IE8 (backward-compatibility mode)
	if (document.body && document.body.offsetWidth) {
		width = document.body.offsetWidth;
	}

	// <= IE8 (standards mode)
	if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
		width = document.documentElement.offsetWidth;
	}

	// Other browsers
	if (window.innerWidth) {
		width = window.innerWidth;
	}

	return width;
}

function toggle_menu() {
	var nav = $('nav');

	if (nav.is('.show_menu')) {
		nav.removeClass('show_menu');
		$('.nav_menu', nav).slideUp(500);
	} else {
		nav.addClass('show_menu');
		$('.nav_menu', nav).slideDown(500);
	}
}

$(document).ready(function() {
	// Resize window events
	resize_window();
	$(window).resize(function() {
		resize_window();
	});

	// Toggle menu capability - Hide/show main menu
	$('.menu_icon').click(function() {
		toggle_menu();
	});

	$('#rss').on('click', function() {
	  ga('send', 'event', 'nav links', 'click', 'rss');
	});
});