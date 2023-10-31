import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  displayedColumns: string[] = ['position', 'village', 'lancas', 'espadas', 'arqueiros', 'check'];
  dataSource = new MatTableDataSource<any>([]);
  formBlindagem : FormGroup;
  showForm: boolean = false;

  constructor(private fb: FormBuilder) {
    this.formBlindagem  = this.fb.group({
      position: [''],
      village: [''],
      lancas: [''],
      espadas: [''],
      arqueiros: ['']
    });
  }

  addEntry() {
    const data = this.dataSource.data; // pegue os dados atuais
    data.push(this.formBlindagem.value); // adicione a nova entrada
    this.dataSource.data = data; // atualize a fonte de dados

    console.log(this.dataSource.data);
    this.formBlindagem.reset();
    this.showForm = false;
  }

  deductionForm = new FormGroup({
    village: new FormControl(''),
    position: new FormControl(''),
    lancas: new FormControl(''),
    espadas: new FormControl(''),
    arqueiros: new FormControl('')
  });

  deductValues() {
    const selectedVillage = this.deductionForm.get('village')?.value ?? ''; // Use uma string vazia como valor padrão
    const entry = this.dataSource.data.find(item => item.village === selectedVillage);

    if (entry) {
      const lancasValue = parseInt(this.deductionForm.get('lancas')?.value ?? '0', 10);
      const espadasValue = parseInt(this.deductionForm.get('espadas')?.value ?? '0', 10);
      const arqueirosValue = parseInt(this.deductionForm.get('arqueiros')?.value ?? '0', 10);

      // Verifique se as conversões foram bem-sucedidas antes de realizar operações
      if (!isNaN(lancasValue) && !isNaN(espadasValue) && !isNaN(arqueirosValue)) {
        entry.lancas -= lancasValue;
        entry.espadas -= espadasValue;
        entry.arqueiros -= arqueirosValue;

        // Adicione a propriedade 'check' com base em suas condições
        entry.check = entry.lancas === 0 && entry.espadas === 0 && entry.arqueiros === 0;
      } else {
        console.error('Valores do formulário inválidos');
      }
    }

    this.deductionForm.reset();
  }






  toggleForm() {
    this.showForm = !this.showForm;
  }
}
