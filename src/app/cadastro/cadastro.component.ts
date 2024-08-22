import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../services/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(private router: Router, private cepService: ConsultaCepService) {}

  ngOnInit(): void {}

  cadastrar(form: NgForm) {
    if (form.valid) {
      this.router.navigate(["sucesso"]);
    } else {
      alert("form inválido");
    }
    console.log(form.controls);
  }

  populateAddress(data: any, f: NgForm) {
    f.form.patchValue({
      endereco: data.logradouro,
      complemento: data.complemento,
      bairro: data.bairro,
      cidade: data.localidade,
      estado: data.uf,
    });
  }

  consultaCep(event: any, f: NgForm) {
    const cep = event.target.value;
    if (!cep) {
      return;
    }
    this.cepService.getConsultaCep(cep).subscribe((result) => {
      this.populateAddress(result, f);
    });
  }
}
