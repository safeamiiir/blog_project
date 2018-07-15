
function addCommentSubmit(artId) {
    var articleAdded = {};
    articleAdded.content = $('#commentField').val();
    articleAdded.author = 'unknown';
    articleAdded.articleId = artId;
    articleAdded.createDate = Date;
    return articleAdded;
}

function addCommentToDB(artID) {
    // console.log(" in Add Comment ");
    console.log(" Art ID IS  ", artID);
    $.ajax({
        type: 'POST',
        data: addCommentSubmit(artID),
        dataType : "json",
        url : '/user/addingcom'
    });
    // console.log("Article From Client Has Been Sent");
    document.location.href = "http://localhost:8181/post/" + artID;
}
