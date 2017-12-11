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

if (window.innerWidth < 1000) {
    $("#pcol").css("opacity",1);
}

var scrollPos;
$(window).scroll(function(){
    scrollPos = $(window).scrollTop();  
    if (scrollPos >= $("#profile").offset().top && scrollPos < $("#profile").offset().top + window.innerHeight && window.innerWidth >= 1000) {
        $("#pcol").addClass('sOutL');
        $("#pimg").addClass('sOutR');
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach(function ($el) {
            $el.addEventListener('click', function () {
                // Get the target from the "data-target" attribute
                var target = $el.dataset.target;
                var $target = document.getElementById(target);
                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                $el.classList.toggle('is-active');
                $target.classList.toggle('is-active');
            });
        });
    }
});

/*=========================
    Keyboard Shortcuts
=========================*/
document.addEventListener('keyup', function(event) {
    if(dcount < 2) {
        if (event.which === 40) {
            dcount = parseInt($(window).scrollTop()/window.innerHeight);            
            if (($(window).scrollTop() < pageHeight - window.innerHeight)&&dcount<2) dcount++;
            console.log(dcount);
            $('html, body').animate({
                scrollTop: window.innerHeight*dcount
            }, 800);
        }
    }
    if ($(window).scrollTop() < window.innerHeight*2) {
        if (event.which === 38) {
            if (dcount>0) dcount--;
            $('html, body').animate({
                scrollTop: window.innerHeight*dcount
            }, 800);
        }
    }
});

/*=========================
    Skill Section
=========================*/

var skills = [
    { 
        "header" : "INTERESTS",
        "captions" : ["Reading", "Web", "Mobile", "Design", "Movies"],
        "values" : [0.70, 0.90, 0.80, 0.85, 0.90 ]
    },
    {
        "header" : "LANGUAGES",
        "captions" : ["C", "HTML", "JS", "Python", "Java"],
        "values" : [0.80, 0.9, 0.85, 0.70, 0.70]
    },
    {
        "header" : "MISC",
        "captions" : ["VS Code", "Git", "Photoshop", "DBMS", "Linux"],
        "values" : [0.8, 0.85, 0.6, 0.75, 0.80]
    }
  ];
  
  var pentagonIndex = 0;
  var valueIndex = 0;
  var width = 0;
  var height = 0;
  var radOffset = Math.PI/2
  var sides = 5; // Number of sides in the polygon
  var theta = 2 * Math.PI/sides; // radians per section
  
  function getXY(i, radius) {
    return {"x": Math.cos(radOffset +theta * i) * radius*width + width/2,
      "y": Math.sin(radOffset +theta * i) * radius*height + height/2};
  }
  
  var hue = [];
  var hueOffset = 25;
  
  for (var s in skills) {
    $(".content-skills").append('<div class="pentagon" id="interests"><div class="header-skills"></div><canvas class="pentCanvas"/></div>');
    hue[s] = (hueOffset + s * 255/skills.length) % 255;
  }
  
  $(".pentagon").each(function(index){
    width = $(this).width();
    height = $(this).height();
    var ctx = $(this).find('canvas')[0].getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    ctx.font="20px Raleway";
    ctx.textAlign="center";
    
    /*** LABEL ***/
    color = "hsl("+hue[pentagonIndex]+", 100%, 50%)";
    ctx.fillStyle = color;
    ctx.fillText(skills[pentagonIndex].header, width/2, 15);
  
    ctx.font="17px Raleway";   
  
    /*** PENTAGON BACKGROUND ***/
    for (var i = 0; i < sides; i++) {
      // For each side, draw two segments: the side, and the radius
      ctx.beginPath();
      xy = getXY(i, 0.3);
      colorJitter = 25 + theta*i*2;
      color = "hsl("+hue[pentagonIndex]+",100%," + colorJitter + "%)";
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.moveTo(0.5*width, 0.5*height); //center
      ctx.lineTo(xy.x, xy.y);
      xy = getXY(i+1, 0.3);
      ctx.lineTo(xy.x, xy.y);
      xy = getXY(i, 0.37);
      console.log();
      ctx.fillText(skills[ pentagonIndex].captions[valueIndex],xy.x, xy.y +5);
      valueIndex++;
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
    
    valueIndex = 0;
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    ctx.lineWidth = 5;
    var value = skills[pentagonIndex].values[valueIndex];
    xy = getXY(i, value * 0.3);
    ctx.moveTo(xy.x,xy.y);
    /*** SKILL GRAPH ***/
    for (var i = 0; i < sides; i++) {
      xy = getXY(i, value * 0.3);
      ctx.lineTo(xy.x,xy.y);
      valueIndex++;
      value = skills[pentagonIndex].values[valueIndex];
    }
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    valueIndex = 0;  
    pentagonIndex++;
  });
  
