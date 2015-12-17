//<![CDATA[
	$(window).load(function() { // makes sure the whole site is loaded
		$('#status').fadeOut(); // will first fade out the loading animation
		$('#preloader').delay(50).fadeOut('slow'); // will fade out the white DIV that covers the website.
		$('body').delay(50).css({'overflow':'visible'});
	})
//]]>

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top-scroll").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top-scroll").removeClass("top-nav-collapse");
    }
});