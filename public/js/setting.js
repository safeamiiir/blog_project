function checkPhoto() {
    let regis = false;
    let theFile = document.getElementById("fileUpload");
    let size = theFile.files[0].size;
    console.log(size);
    let extension = theFile.value.split('.').pop().toLowerCase();
    if (size <= 30000 && extension === "png") {
        var url = URL.createObjectURL(theFile.files[0]);
        var img = new Image;
        img.src = url;
        img.onload = function () {
            let width = img.width;
            let height = img.height;
            if (width <= 170 && height <= 170) {
                document.getElementById("succ").innerHTML = "The photo uploaded successfully"
                document.getElementById("succ").style.color = "green";
                //regis = true;
                return true;
            } else {
                alert("The photo must has dimension lower than 170*170 px")
            }

        };
    } else {
        alert("The photo must be smaller than 30KB and must has png format")
    }
    console.log(img);
}




$(document).ready(function () {
    var options = {
        beforeSubmit: showRequest,
        // pre-submit callback 
        success: showResponse
        // post-submit callback 
    };
    // bind to the form's submit event 
    $('#frmUploader').submit(function () {
        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation return false; 
    });
});
// pre-submit callback 
function showRequest(formData, jqForm, options) {
    alert('Uploading is starting.');
    return true;
}
// post-submit callback 
function showResponse(responseText, statusText, xhr, $form) {
    alert('status: ' + statusText + '\n\nresponseText: \n' + responseText);
}







$('.button-collapse').sideNav({
    menuWidth: 300,
    closeOnClick: true,
    edge: 'right', // <--- CHECK THIS OUT
}
);
$('.collapsible').collapsible();
(function() {
var load_chart;

load_chart = function() {
    $("body").removeClass("loaded");
    return setTimeout(function() {
        return $("body").addClass("loaded");
    }, 500);
};

$(".js-do-it-again").on("click", function() {
    return load_chart();
});

load_chart();

}).call(this);

$('#edit').click(function(){
$('.show').show(1100);
$('.name').hide(1100);
$('.show').css('color','black');
$('#exit').show();
$('#editConfirmation').show();
$(this).hide();

});


$('#exit').click(function(){
$('.show').hide();
$('.name').show();
$('#exit').hide(600);
$('#editConfirmation').hide(600);
$('#edit').show();
});

$('#editConfirmation').click(function(){
    let valueOfInput = {
        fname: $('#fnameInput').val(),
        lname: $('#lnameInput').val(),
        userName: $('#userNameInput').val(),
        email: $('#emailInput').val(),
        phoneNumber : $('#phoneNumberInput').val(),
        password: $('#passwordInput').val()
    };
    console.log(valueOfInput);
    $.ajax({
        type: "POST",
        url: "/user/settingsUpdate",
        data: valueOfInput,
        success: function (userInformationUpdate) {
            alert(userInformationUpdate);
        }
})
});