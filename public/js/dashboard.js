/**
 * Created by amir on 7/6/18.
 */
$('#delete').on('click', function () {
    console.log("deleted Fileeeee Pressed");
    $.ajax({
        type: "POST",
        url: "/user/deleteArticle"
        // data: valueOfInput,
    })
});