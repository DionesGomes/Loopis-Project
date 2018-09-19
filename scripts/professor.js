$(function () {
  var operacao = "C"; //"C"=Crear
  var selected_index = -1; // Indíce do elemento selecionado na lista.
  var tblPersons = localStorage.getItem("tblPersons"); //Retornar os dados armazenados.
  tblPersons = JSON.parse(tblPersons); //Converte String em um Object.
  if (tblPersons === null) // Se não houver dados, inicializa um array vazio.
      tblPersons = [];

  function Criar() {
    //Capturar os dados do forulário HTML e transforma-los em String.
    var person = JSON.stringify({
      Matricula: $("#txtMatricula").val(),
      Nome: $("#txtNome").val(),
      Nascimento: $("#txtNascimento").val(),
      Salario: $("txtSalario").val(),
    }); 
    //Adicionar o objeto a tabela.
    tblPersons.push(person);
    //Armazenar os dados em um Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons));
    alert("Os dados foram armazenados com sucesso!"); //alerta!
    return true;
  }

  function Editar() {
    // Editar um item seleccionado na tabela.
    tblPersons[selected_index] = JSON.stringify({
        Matricula: $("#txtMatricula").val(),
        Nome: $("#txtNome").val(),
        Nascimento: $("#txtNascimento").val(),
        Salario: $("txtSalario").val(),
    });
    //Armazenando os dados em um Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Os dados foram editados"); //alerta!
    return true;
  }

  function Deletar() {
    //Excluindo um elemento selecionado na tabela!
    tblPersons.splice(selected_index, 1); 
    //Atualizando os dados no Local Storage
    localStorage.setItem("tblPersons", JSON.stringify(tblPersons)); 
    alert("Pessoa exlcuída"); //alerta!
  }

  function Listar() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Matricula</th>" +
            "<th>Nome</th>" +
            "<th>Data de Nascimento</th>" +
            "<th>Salário </th>" +
            "<th>Opções</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregando tabela a  estrutura HTML
    for (var i in tblPersons) {
        var per = JSON.parse(tblPersons[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.Matricula + "</td>" +
                "<td>" + per.Nome + "</td>" +
                "<td>" + per.Nascimento + "</td>" +
                "<td>" + per.Salario + "</td>" +                 
                "<td><img src='img/edit.png' alt='Edit" + i + "' class='btnEdit'/>&nbsp &nbsp<img src='img/delete.png' alt='Delete" + i + "' class='btnDelete'/></td>" +
                "</tr>"
                );
    } 
  }

  $("#frm").bind("submit", function () {
    if (operacao === "C")
        return Criar();
    else
        return Editar();
  }); 
  
  Listar();

  $(".btnEdit").bind("click", function () {
    operacao = "E"; //"E" = Editar
    //Obter o identificador do item editado.
    selected_index = parseInt($(this).attr("alt").replace("Edit", ""));
    // Convertando de JSON para o formato editável dos dados.
    var per = JSON.parse(tblPersons[selected_index]); 
    $("#txtMatricula").val(per.Matricula);
    $("#txtCpf").val(per.Cpf);
    $("#txtNome").val(per.Nome);
    $("#txtNascimento").val(per.Nascimento);
    $("#txtNota1").val(per.Nota1);
    $("#txtNota2").val(per.Nota2);
    $("#txtNota3").val(per.Nota3);
    $("#txtMatricula").attr("readonly", "readonly");
    $("#txtNome").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtendo o identificador de um item a ser Excluido.
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Deletar(); //Excluir o item
    Listar(); //Listar os items da tabela.
  });
});
