/**
 * Created by amir on 7/6/18.
 */
function detectArticleRemove(artId) {

    var articleRemoved = {};
    articleRemoved.id = artId;

    // alert(articleAdded.title + articleAdded.content);

    console.log("deleted Fileeeee Pressed is :" + artId );
    $.ajax({
        type: "POST",
        url: "/user/deleteArticle",
        data: articleRemoved
    })
}

function detectArticleEdit(artId) {

    var articleEdited = {};
    articleEdited.id = artId;

    // alert(articleAdded.title + articleAdded.content);

    console.log("Edit Fileeeee Pressed is :" + artId );
    $.ajax({
        type: "POST",
        url: "/user/editArticle",
        data: articleEdited
    })
}