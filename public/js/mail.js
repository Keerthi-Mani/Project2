$("#send-btn").on("click", function (event) {
    event.preventDefault();

    // Make a new mail
    var person_name = $("#name").val().trim();
    var person_email_id = $("#email").val().trim();
    var person_relation = $("#relation").val().trim();
    var subject_text = $("#subject").val().trim();
    var text_area = $("#text-message").val().trim();
    //var attachments = $("#exampleFormControlFile1").val().trim();
    // //console.log("\nName :" + person_name, +"\nEmail id : " + person_email_id + "\nRelation :" + person_relation,
    //+
    //"\nSubject :" + lie_text);
    // var anc = "";
    // anc += "mailto:" + person_email_id + "?subject=" + lie_text + "&body=" + text_area;

    // //console.log(anc);
    // window.location.href = anc;
    var data = {
        person_name,
        person_email_id,
        subject_text,
        text_area
    }
    $.post("/send-email", data).then(function (results) {
        console.log(results);
    });
    // Empty each input box by replacing the value with an empty string
    $("#name").val("");
    $("#email").val("");
    $("#relation").val("");
    $("#subject").val("");
    $("#text-message").val("");
});


// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");