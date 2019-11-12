var attachment_base = "";
$("#send-btn").on("click", async function (event) {
    event.preventDefault();

    // Make a new mail
    var person_name = $("#name").val().trim();
    var person_email_id = $("#email").val().trim();
    var person_relation = $("#relation").val().trim();
    var subject_text = $("#subject").val().trim();
    var text_area = $("#text-message").val().trim();

    //var file = $("#exampleFormControlFile1").val.trim();

    var files = document.getElementById('file').files;
    if (files.length > 0) {
        await getBase64(files[0]);
    }

    var details = {
        contact_name: person_name,
        contact_email: person_email_id,
        contact_relation: person_relation,
        contact_subject: subject_text,
        message: text_area,
        attachment_data: attachment_base,
        attachment_filename: files[0].name,
    }
    console.log(details);
    $.post("/sendemail", details)
        .then(function () {

        });

    async function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            attachment_base = reader.result;
            console.log(attachment_base);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }
    //Empty each input box by replacing the value with an empty string
    // $("#name").val("");
    // $("#email").val("");
    // $("#relation").val("");
    // $("#subject").val("");
    // $("#text-message").val("");
});

document.getElementById('button').addEventListener('click', function () {
    var files = document.getElementById('file').files;
    if (files.length > 0) {
        getBase64(files[0]);
    }
});

async function getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {

        attachment_base = reader.result;
        console.log(attachment_base);
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}