/**
 * Created by amir on 5/24/18.
 */
function addSubmit() {
    var articleAdded = {};
    articleAdded.title = $('#art_title').val();
    articleAdded.content = CKEDITOR.instances.art_content.getData();
    articleAdded.abstract = $('#art_abstract').val();
    articleAdded.author = 'unknown';
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
    document.location.href = "http://localhost:8181/user";
}

function editSubmit() {
    var articleEdited = {};
    articleEdited.title = $('#art_title').val();
    articleEdited.content = CKEDITOR.instances.art_content.getData();
    articleEdited.abstract = $('#art_abstract').val();
    articleEdited.author = 'unknown';
    articleEdited.createDate = Date;
    articleEdited.lastEdit = Date;
    // alert(articleAdded.title + articleAdded.content);
    return articleEdited;
}

function editInDB() {
    $.ajax({
        type: 'POST',
        data: editSubmit(),
        dataType : "json",
        url : '/user/editingart'
    });
    console.log("Article Client Side Has Been Edited");
    document.location.href = "http://localhost:8181/user/dashboard";
}