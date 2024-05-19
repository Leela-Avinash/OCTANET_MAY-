$("#darkmode").click(function () {
    if ($("#darkmode").hasClass("bx-moon")) {
        $("#darkmode").removeClass("bx-moon").addClass("bx-sun");
        $("body").addClass("color");
    } else {
        $("#darkmode").removeClass("bx-sun").addClass("bx-moon");
        $("body").removeClass("color");
    }
});

$("#menu-icon").click(function () {
    $("#menu-icon").toggleClass("bx-x");
    $(".navlist").toggleClass("open");
});

$(window).scroll(function () {
    $("#menu-icon").removeClass("bx-x");
    $(".navlist").removeClass("open");
});

const sr = ScrollReveal({
    distance: "70px",
    duration: 2700,
    reset: true,
});

sr.reveal(".hero-text", { delay: 200, origin: "bottom" });
sr.reveal(".hero-img", { delay: 350, origin: "top" });
sr.reveal(".down-arrow", { delay: 450, origin: "right" });