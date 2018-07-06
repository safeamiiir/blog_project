/**
 * Created by amir on 5/24/18.
 */
function addSubmit() {
    var articleAdded = {};
    articleAdded.title = $('#art_title').val();
    articleAdded.content = $('#art_content').val();
    articleAdded.abstract = 'abstract';
    articleAdded.author = 'amir';
    articleAdded.createDate = Date;
    articleAdded.lastEdit = Date;
    articleAdded.likes = 5;
    // alert(articleAdded.title + articleAdded.content);
    return articleAdded;
}

function addToDB() {
    $.ajax({
        type: 'POST',
        data: addSubmit(),
        dataType : "json",
        url : '/user/addingart'
    });
    console.log("Article From Client Has Been Sent");
    // document.location.href = "http://localhost:8181/user";
}
