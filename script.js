const carouselContent = $(".carousel-content");
const carouselLen = carouselContent.children().length;

let isAnimating = false;
const itemWidth = 100 / carouselLen;

let cursor = 1;

function resizeContainer() {
    carouselContent.css({"width": carouselLen * 100 + "%"});
    carouselContent.children().each(function() {
        $( this ).css("width", itemWidth + "%");
    });
}

resizeContainer();

// check if it needs to jump to the front of the images or the back of them
function checkIndex() {
    if (cursor == carouselLen - 1) {
        cursor = carouselLen - cursor;
        carouselContent.animate({ right : 100 * cursor + "%" }, 0);
    } else if (cursor == 0) {
        cursor = carouselLen - 2;
        $(carouselContent.children()[cursor]).children().addClass('shadow');
        carouselContent.animate({ right : 100 * cursor + "%" }, 0);
    }
    //
    return;
}

// move towards that image by the given index
function getNthImage() {
    $(carouselContent.children()[cursor]).children().addClass('shadow');
    if (cursor == carouselLen - 1) {
        $(carouselContent.children()[carouselLen - cursor]).children().addClass('shadow');
    } else if (cursor == 0) {
        $(carouselContent.children()[carouselLen - 2]).children().addClass('shadow');
    }

    $(carouselContent).animate({right: 100*cursor + "%"}, 1200, "swing", function() {
        isAnimating = false;
        checkIndex();
        return;
    });
    return;
}

function slide() {
    if (isAnimating) {
        return;
    }
    cursor++;
    isAnimating = true;
    getNthImage();
}

let timer = setInterval(function() {slide();}, 5000);

$(".nav-right").click(function() {
    if (isAnimating) {
        return;
    }

    clearInterval(timer);
    isAnimating = true;
    cursor++;
    getNthImage(true);
    timer = setInterval(function() {slide();}, 5000);
});

$(".nav-left").click(function() {
    if (isAnimating) {
        return;
    }
    clearInterval(timer);
    isAnimating = true;
    cursor--;
    getNthImage(true);
    timer = setInterval(function() {slide();}, 5000);
});

$("img").on('animationend', function() {
    $(this).removeClass('shadow');
})