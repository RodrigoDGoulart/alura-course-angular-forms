import { Directive } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from "@angular/forms";
import { map, Observable } from "rxjs";
import { ConsultaCepService } from "../services/consulta-cep.service";

@Directive({
  selector: "[cepValidator]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useClass: CepValidatorDirective,
      multi: true,
    },
  ],
})
export class CepValidatorDirective implements AsyncValidator {
  constructor(private cepService: ConsultaCepService) {}

  validate(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.cepService
      .getConsultaCep(cep)
      .pipe(
        map((resultado: any) =>
          resultado.erro ? { cepValidator: true } : null
        )
      );
  }
}
