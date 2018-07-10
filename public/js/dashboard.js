/**
 * Created by amir on 7/6/18.
 */
function detectArticle(artId) {

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