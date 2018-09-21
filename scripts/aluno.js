$(function () {
  var operacao = "C"; //"C"=Crear
  var selected_index = -1; // Indíce do elemento selecionado na lista.
  var tblAluno = localStorage.getItem("tblAluno"); //Retornar os dados armazenados.
  tblAluno = JSON.parse(tblAluno); //Converte String em um Object.
  if (tblAluno === null) // Se não houver dados, inicializa um array vazio.
      tblAluno = [];

  function Criar() {
    //Capturar os dados do forulário HTML e transforma-los em String.
    var aluno = JSON.stringify({
      MatriculaAluno: $("#txtMatriculaAluno").val(),
      CpfAluno: $("#txtCpfAluno").val(),
      NomeAluno: $("#txtNomeAluno").val(),
      NascimentoAluno: $("#txtNascimentoAluno").val(),
      nota1: $("#txtNota1").val(),
      nota2: $("#txtNota2").val(),
      nota3: $("#txtNota3").val()
    }); 
    //Adicionar o objeto a tabela.
    tblAluno.push(aluno);
    //Armazenar os dados em um Local Storage
    localStorage.setItem("tblAluno", JSON.stringify(tblAluno));
    alert("Os dados foram armazenados com sucesso!"); //alerta!
    return true;
  }

  function Editar() {
    // Editar um item seleccionado na tabela.
    tblAluno[selected_index] = JSON.stringify({
      MatriculaAluno: $("#txtMatriculaAluno").val(),
      CpfAluno: $("#txtCpfAluno").val(),
      NomeAluno: $("#txtNomeAluno").val(),
      NascimentoAluno: $("#txtNascimentoAluno").val(),
      nota1: $("#txtNota1").val(),
      nota2: $("#txtNota2").val(),
      nota3: $("#txtNota3").val()
    });
    //Armazenando os dados em um Local Storage
    localStorage.setItem("tblAluno", JSON.stringify(tblAluno)); 
    alert("Os dados foram editados"); //alerta!
    return true;
  }

  function Deletar() {
    //Excluindo um elemento selecionado na tabela!
    tblAluno.splice(selected_index, 1); 
    //Atualizando os dados no Local Storage
    localStorage.setItem("tblAluno", JSON.stringify(tblAluno)); 
    alert("Pessoa exlcuída"); //alerta!
  }

  function Listar() {
    $("#tblList").html("");
    $("#tblList").html(
            "<thead>" +
            "<tr>" +                
            "<th>Matricula do Aluno</th>" +
            "<th>CPF do Aluno</th>" +
            "<th>Nome do Aluno</th>" +
            "<th>Data de Nascimento do Aluno</th>" +
            "<th>Primeira nota</th>" +
            "<th>Segunda nota</th>" +
            "<th>Terceira nota</th>" +
            "<th>Opções</th>" +
            "</tr>" +
            "</thead>" +
            "<tbody>" +
            "</tbody>"
            ); //Agregando tabela a  estrutura HTML
    for (var i in tblAluno) {
        var per = JSON.parse(tblAluno[i]);
        $("#tblList tbody").append("<tr>" +                    
                "<td>" + per.MatriculaAluno + "</td>" +
                "<td>" + per.CpfAluno + "</td>" +
                "<td>" + per.NomeAluno + "</td>" +
                "<td>" + per.NascimentoAluno + "</td>" + 
                "<td>" + per.nota1 + "</td>" + 
                "<td>" + per.nota2 + "</td>" + 
                "<td>" + per.nota3 + "</td>" +                 
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
    var per = JSON.parse(tblAluno[selected_index]); 
    $("#txtMatriculaAluno").val(per.MatriculaAluno);
    $("#txtCpfAluno").val(per.CpfAluno);
    $("#txtNomeAluno").val(per.NomeAluno);
    $("#txtNascimentoAluno").val(per.NascimentoAluno);
    $("#txtNota1").val(per.nota1).attr("readonly", "reandoly");    
    $("#txtNota2").val(per.nota2).attr("readonly", "reandoly");
    $("#txtNota3").val(per.nota3).attr("readonly", "reandoly"); 
    $("#txtMatriculaAluno").attr("readonly", "readonly");
    $("#txtNomeAluno").focus();
  });

  $(".btnDelete").bind("click", function () {
    //Obtendo o identificador de um item a ser Excluido.
    selected_index = parseInt($(this).attr("alt").replace("Delete", "")); 
    Deletar(); //Excluir o item
    Listar(); //Listar os items da tabela.
  });
});

