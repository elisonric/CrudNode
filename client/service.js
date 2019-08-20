var server = 'http://localhost:8000'
$(document).ready(function () {
    $("#save").click(function () {
        axios.post(`${server}/create`, {
            name: $('#name').val(),
            role: $('#role').val()
        })
            .then(function (response) {
                console.log(response);
                location.href = '../index.html';
            })
            .catch(function (error) {
                console.log(error);
            });
    })

    $("#list").ready(function () {
        axios.get(`${server}/getAll`)
            .then(function (response) {
                var list = '<table class="table"><thead><tr><th scope="col">Matricula</th><th scope="col">Nome</th><th scope="col">Cargo</th></tr></thead><tbody>';
                for (let index = 0; index < response.data.list.length; index++) {
                    const element = response.data.list[index];
                    list += '<tr>'
                    list += `<td>${element.id}</td>`
                    list += `<td>${element.obj.name}</td>`
                    list += `<td>${element.obj.role}</td>`
                    list += '</tr>'
                }
                $("#list").html(list += '</tbody></table>')
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    $("#listUpdate").ready(function () {
        axios.get(`${server}/getAll`)
            .then(function (response) {
                var list = '<table class="table"><thead><tr><th scope="col">Matricula</th><th scope="col">Nome</th><th scope="col">Cargo</th><th></th></tr></thead><tbody>';
                var button
                for (let index = 0; index < response.data.list.length; index++) {
                    const element = response.data.list[index];
                    if (window.location.pathname == '/CrudNode/client/views/update.html') {
                        button = `<td><button type="button" class="btn btn-primary" onclick="edit(${element.id},'${element.obj.name}','${element.obj.role}')"><i class="fas fa-edit"></i></button></td>`
                    } else {
                        button = `<td><button type="button" class="btn btn-primary" onclick="deleteById(${element.id})"><i class="fas fa-trash-alt"></i></button></td>`
                    }
                    list += '<tr>'
                    list += `<td>${element.id}</td>`
                    list += `<td>${element.obj.name}</td>`
                    list += `<td>${element.obj.role}</td>`
                    list += button
                    list += '</tr>'
                }
                $("#listUpdate").html(list += '</tbody></table>')
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    $("#update").click(function () {
        let params = (new URL(document.location)).searchParams;
        axios.post(`${server}/updateById`, {
            id: params.get('id'),
            obj: {
                name: $('#name').val(),
                role: $('#role').val()
            }
        })
            .then(function (response) {
                console.log(response);
                location.href = '../index.html';
            })
            .catch(function (error) {
                console.log(error);
            });
    })

})
function deleteById(id) {
    axios.post(`${server}/deleteById`, {
        id: id
    })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

if (window.location.pathname == '/CrudNode/client/views/register.html' && window.location.search) {
    let params = (new URL(document.location)).searchParams;
    $('#name').val(params.get('name'))
    $('#role').val(params.get('role'))
    $('#save').html('Editar')
    $('#save').attr('id', 'update')
}

function edit(id, name, role) {
    window.location.href = `./register.html?id=${id}&name=${name}&role=${role}`
}

