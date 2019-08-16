var server = 'http://localhost:8000/'
$(document).ready(function () {
    $("#save").click(function () {
        $.ajax({
            url: server + "create",
            type: 'post',
            data: {
                name: "jkjk",
                role: "jkk"
            },
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            }
        })
            .done(function (msg) {
                console.log(msg);
                // $("#resultado").html(msg);
            })
            .fail(function (jqXHR, textStatus, msg) {
                console.log(msg);
            });
    })

    $("#getAll").click(function () {

        $.ajax({
            url: server + "getAll",
            type: 'get',
            beforeSend: function () {
                $("#resultado").html("ENVIANDO...");
            }
        })
            .done(function (msg) {
                console.log(msg);

                $("#resultado").html(msg);
            })
            .fail(function (jqXHR, textStatus, msg) {
                console.log(msg);
            });
    })
})

