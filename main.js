var fs = require('fs');

const readline = require('readline');
var menu = '1) Criar \n' +
    '2) Listar \n' +
    '3) Atualizar \n' +
    '4) Deletar \n'
var data = loadFile();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question(menu, res => {
    switch (parseInt(res)) {
        case 1:
            create()
            break;
        case 2:
            list()
            break;
        case 3:
            updateById()
            break;
        case 4:
            deleteById()
            break;
        default:
            console.log("Digite uma opção valida");
            break;
    }

    // rl.close();
});

function create() {
    console.log("Criar");
    var name;
    var role;
    var input;
    rl.question("Digite o nome: ", res => {
        name = res;
        rl.question("Digite o cargo: ", res => {
            role = res;
            input = {
                id: data[data.length-1] ? data[data.length-1].id + 1 : 1,
                obj: {
                    name: name,
                    role: role
                }
            }
            data.push(input)
            fileUpdate(JSON.stringify(data));
        });
    });
}

function list() {
    console.clear();
    console.log("------LISTAR-------");
    data.forEach(element => {
        console.log(element.id + ' - ' + element.obj.name + ' - ' + element.obj.role);
    });
}

function updateById() {
    rl.question("Digite a matricula: ", res => {
        getByid(parseInt(res));

    })
}

function deleteById(id) {

}

function fileUpdate(data) {
    fs.writeFile("Banco.txt", data, function (err) {
        if (err) {
            throw err;
        }
    });
}

function loadFile() {
    return fs.readFileSync('Banco.txt', 'utf8') ? JSON.parse(fs.readFileSync('Banco.txt', 'utf8')) : [];
}

function getByid(id) {
    data.forEach(element => {
        if(element.id == id) {
            console.log(data[data.indexOf(element)]);
            return data[data.indexOf(element)];
        }
    });
}
