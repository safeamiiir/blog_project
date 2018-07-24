
function like(artID) {
    $('#like').html('favorite');
    $.ajax({
        type: 'POST',
        data: {'id' : artID },
        dataType : "json",
        url : '/user/likeIt'
    });
    console.log("Like Has Been Clicked Client Side");
}
