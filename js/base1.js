var body = document.body, html = document.documentElement;
var pageHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );

var TxtRotate = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
    var that = this;
    var delta = 300 - Math.random() * 100;
    if (this.isDeleting) {
        delta /= 4;
    }
    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }
    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-rotate');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
};

var dcount = 0;
$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
    dcount = parseInt($(window).scrollTop()/window.innerHeight);    
    console.log(parseInt($(window).scrollTop()/window.innerHeight));
});

var scrollPos;
$(window).scroll(function(){
    scrollPos = $(window).scrollTop();  
    if (scrollPos >= $("#profile").offset().top && scrollPos < $("#profile").offset().top + window.innerHeight) {
        $("#pcol").addClass('sOutL');
        $("#pimg").addClass('sOutR');
    }
});


/*=========================
    Keyboard Shortcuts
=========================*/
document.addEventListener('keyup', function(event) {
    if (event.which === 40) {
        dcount = parseInt($(window).scrollTop()/window.innerHeight);            
        if ($(window).scrollTop() < pageHeight - window.innerHeight) dcount++;
        console.log(dcount);
        $('html, body').animate({
            scrollTop: window.innerHeight*dcount
        }, 800);
    }
    if (event.which === 38) {
        if (dcount>0) dcount--;
        $('html, body').animate({
            scrollTop: window.innerHeight*dcount
        }, 800);
    }
});

