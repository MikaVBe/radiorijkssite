$(document).ready(function () {
    // typing animation
    (function ($) {
        $.fn.writeText = function (content) {
            var contentArray = content.split(""),
                current = 0,
                elem = this;
            setInterval(function () {
                if (current < contentArray.length) {
                    elem.text(elem.text() + contentArray[current++]);
                }
            }, 80);
        };
    })(jQuery);

    // input text for typing animation
    $("#holder").writeText("IF YOU DARE TO LISTEN");

    // initialize wow.js
    new WOW().init();

    // Push the body and the nav over by 285px over
    var main = function () {
        $(".fa-bars").click(function () {
            $(".nav-screen").animate(
                {
                    right: "0px"
                },
                200
            );

            $("body").animate(
                {
                    right: "285px"
                },
                200
            );
        });

        // Then push them back */
        $(".fa-times").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                200
            );

            $("body").animate(
                {
                    right: "0px"
                },
                200
            );
        });

        $(".nav-links a").click(function () {
            $(".nav-screen").animate(
                {
                    right: "-285px"
                },
                500
            );

            $("body").animate(
                {
                    right: "0px"
                },
                500
            );
        });
    };

    $(document).ready(main);

    // initiate full page scroll

    $("#fullpage").fullpage({
        scrollBar: true,
        responsiveWidth: 400,
        navigation: true,
        navigationTooltips: ["home", "verzoekjes", "onze tijdlijn", "over ons", "aansluiten"],
        anchors: ["home", "verzoekjes", "onze-tijdlijn", "overons", "aansluiten"],
        menu: "#myMenu",
        fitToSection: false,

        afterLoad: function (anchorLink, index) {
            var loadedSection = $(this);

            //using index
            if (index == 1) {
                /* add opacity to arrow */
                $(".fa-chevron-down").each(function () {
                    $(this).css("opacity", "1");
                });
                $(".header-links a").each(function () {
                    $(this).css("color", "white");
                });
                $(".header-links").css("background-color", "transparent");
            } else if (index != 1) {
                $(".header-links a").each(function () {
                    $(this).css("color", "black");
                });
                $(".header-links").css("background-color", "white");
            }

            //using index
            if (index == 2) {
                /* animate skill bars */
                $(".skillbar").each(function () {
                    $(this)
                        .find(".skillbar-bar")
                        .animate(
                            {
                                width: $(this).attr("data-percent")
                            },
                            2500
                        );
                });
            }
        }
    });

    // move section down one
    $(document).on("click", "#moveDown", function () {
        $.fn.fullpage.moveSectionDown();
    });

    // fullpage.js link navigation
    $(document).on("click", "#skills", function () {
        $.fn.fullpage.moveTo(2);
    });

    $(document).on("click", "#projects", function () {
        $.fn.fullpage.moveTo(3);
    });

    $(document).on("click", "#contact", function () {
        $.fn.fullpage.moveTo(4);
    });

    // smooth scrolling
    $(function () {
        $("a[href*=#]:not([href=#])").click(function () {
            if (
                location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
                location.hostname == this.hostname
            ) {
                var target = $(this.hash);
                target = target.length
                    ? target
                    : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html,body").animate(
                        {
                            scrollTop: target.offset().top
                        },
                        700
                    );
                    return false;
                }
            }
        });
    });

    //ajax form
    $(function () {
        // Get the form.
        var form = $("#ajax-contact");

        // Get the messages div.
        var formMessages = $("#form-messages");

        // Set up an event listener for the contact form.
        $(form).submit(function (e) {
            // Stop the browser from submitting the form.
            e.preventDefault();

            // Serialize the form data.
            var formData = $(form).serialize();

            // Submit the form using AJAX.
            $.ajax({
                type: "POST",
                url: $(form).attr("action"),
                data: formData
            })
                .done(function (response) {
                    // Make sure that the formMessages div has the 'success' class.
                    $(formMessages).removeClass("error");
                    $(formMessages).addClass("success");

                    // Set the message text.
                    $(formMessages).text(response);

                    // Clear the form.
                    $("#name").val("");
                    $("#email").val("");
                    $("#message").val("");
                })
                .fail(function (data) {
                    // Make sure that the formMessages div has the 'error' class.
                    $(formMessages).removeClass("success");
                    $(formMessages).addClass("error");

                    // Set the message text.
                    if (data.responseText !== "") {
                        $(formMessages).text(data.responseText);
                    } else {
                        $(formMessages).text(
                            "Oops! An error occured and your message could not be sent."
                        );
                    }
                });
        });
    });


    var lastfmData = {
        baseURL:
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
        // Your Last.fm Username
        user: "radiorijks",
        // Your API key
        api_key: "8f943669814cfbfddad805092f434cbb",
        additional: "&format=json&limit=4"
      };
      
      var getSetLastFM = function() {
        $.ajax({
          type: "GET",
          url:
            lastfmData.baseURL +
            lastfmData.user +
            "&api_key=" +
            lastfmData.api_key +
            lastfmData.additional,
          dataType: "json",
          success: function(resp) {
            var recentTrack = resp.recenttracks.track[0];
            var recent1 = resp.recenttracks.track[1];
            var recent2 = resp.recenttracks.track[2];
            var recent3 = resp.recenttracks.track[3];
            var formatted =
              "<img src='https://i.imgur.com/EgWjJry.png'>" + recentTrack.name;
            $("a#tracktitle")
              .html(formatted)
              .attr("href", recentTrack.url)
              .attr("title", recentTrack.name + " by " + recentTrack.artist["#text"])
              .attr("target", "_blank");
            $("a#track2title")
              .html(recent1.name)
              .attr("href", recent1.url)
              .attr("title", recent1.name + " by " + recent1.artist["#text"])
              .attr("target", "_blank");
            $("a#track3title")
              .html(recent2.name)
              .attr("href", recent2.url)
              .attr("title", recent2.name + " by " + recent2.artist["#text"])
              .attr("target", "_blank");
            $("a#track4title")
              .html(recent3.name)
              .attr("href", recent3.url)
              .attr("title", recent3.name + " by " + recent3.artist["#text"])
              .attr("target", "_blank");
      
            var artistFormatted =
              "<img src='https://i.imgur.com/fae5XZA.png'>" +
              recentTrack.artist["#text"];
            $("a#trackartist")
              .html(artistFormatted)
              .attr("title", "Artist : " + recentTrack.artist["#text"]);
            $("a#track2artist")
              .html(recent1.artist["#text"])
              .attr("title", "Artist : " + recent1.artist["#text"]);
            $("a#track3artist")
              .html(recent2.artist["#text"])
              .attr("title", "Artist : " + recent2.artist["#text"]);
            $("a#track4artist")
              .html(recent3.artist["#text"])
              .attr("title", "Artist : " + recent3.artist["#text"]);
      
            $("img#trackart").attr("src", recentTrack.image[2]["#text"]);
            $("img#track2art").attr("src", recent1.image[1]["#text"]);
            $("img#track3art").attr("src", recent2.image[1]["#text"]);
            $("img#track4art").attr("src", recent3.image[1]["#text"]);
            // alert(resp.recenttracks.track[1].name)
          },
          error: function(resp) {
            $("a#tracktitle").html(
              "<img src='https://i.imgur.com/EgWjJry.png'>" + "Silence!"
            );
            $("img#trackart").attr("src", "https://picsum.photos/80");
            var artistFormatted =
              "<img src='https://i.imgur.com/fae5XZA.png'>Prashant Shrestha";
            $("a#trackartist")
              .html(artistFormatted)
              .attr("href", "www.prashant.me/");
          }
        });
      };
      
      // Get the new one.
      getSetLastFM();
      // Start the countdown.
      setInterval(getSetLastFM, 10 * 1000);
      var lastfmData = {
        baseURL:
          "https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=",
        // Your Last.fm Username
        user: "radiorijks",
        // Your API key
        api_key: "8f943669814cfbfddad805092f434cbb",
        additional: "&format=json&limit=4"
      };
      


});