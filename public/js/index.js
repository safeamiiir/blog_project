

var loading = false;

$(window).scroll(function() {

    if (!loading && ($(window).scrollTop() >  $(document).height() - $(window).height() - 10)) {
        loading = true;

        console.log("Auto Load Works ");
        // $('#autoLoad').add("<div class=\"col s12 m12 l4 \"><div class=\"card small\"><div class=\"card-image waves-effect waves-block waves-light\"><img class=\"activator\"src=\"/img/blog-img.jpg\"></div><div class=\"card-content\"><span class=\"card-title activator grey-text text-darken-4\"><%= art[index].title %><i class=\"material-icons left\">more_vert</i></span><p><a href=\"/post/<%= art[index]._id %>\">بخوانید</a></p></div><div class=\"card-reveal\"><span class=\"card-title grey-text text-darken-4\"><i class=\"material-icons left\">close</i><%= art[index].title %></span><p><%= art[index].abstract %></p><% index ++;%></div></div></div>").appendTo( document.body );

    }


});