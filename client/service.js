var server = 'http://localhost:8000'
$(document).ready(function () {
    $("#save").click(function () {
        axios.post(`${server}/create`, {
            name: $('#name').val(),
            role: $('#role').val()
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    $("#getAll").(function () {
        axios.get(`${server}/getAll`)
            .then(function (response) {
                var list = '<table style="width:60%"><tr><th>Matricula</th><th>Nome</th><th>Cargo</th></tr>';
                for (let index = 0; index < response.data.list.length; index++) {
                    const element = response.data.list[index];
                    console.log(element);
                    
                    list += '<tr>'
                    list += `<td>${element.id}</td>`
                    list += `<td>${element.obj.name}</td>`
                    list += `<td>${element.obj.role}</td>`
                    list += '</tr>'
                }
                console.log(list);
                
                $("#list").html(list += '</table>')
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    $("#update").click(function () {
        axios.post(`${server}/updateById`, {
            id: $("#idUpdate").val(),
            obj: {
                name: $('#name').val(),
                role: $('#role').val()
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    $("#delete").click(function () {
        axios.post(`${server}/deleteById`, {
            id: $("#idDelete").val()
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    })
})

