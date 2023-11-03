import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApoiosService } from '../apoios.service';
import { AuthserviceService } from '../authservice.service';
import { ModalImagemComponent } from '../modal-imagem/modal-imagem.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthserviceService]
})
export class HomeComponent {
  @ViewChild('positionSelect') positionSelect!: ElementRef;

  displayedColumns: string[] = ['position', 'village', 'lancas', 'espadas', 'arqueiros', 'check', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  formBlindagem : FormGroup;
  showForm: boolean = false;
  public formulários: any[] = [];
  isVillageDisabled: boolean = true;


  constructor(public dialog: MatDialog, private fb: FormBuilder, public authService: AuthserviceService, private apoiosService: ApoiosService, private router: Router, private _snackBar: MatSnackBar) {
    this.apoiosService.formularioIncluido.subscribe(() => {
      // Atualize os dados do componente após a inclusão bem-sucedida
      this.atualizarDados();
    });
    this.formBlindagem  = this.fb.group({
      position: [''],
      village: [''],
      url: [''],
      lancas: [''],
      espadas: [''],
      arqueiros: ['']
    });

    this.deductionForm.get('position')?.valueChanges.subscribe(() => {
      const selectedVillage = this.getSelectedVillage();
      this.deductionForm.get('village')?.setValue(selectedVillage);
    });
  }

  atualizarDados() {
    this.apoiosService.listarFormularios().subscribe((data: any) => {
      // Defina os dados na propriedade dataSource
      const dataArray = Object.values(data);
      this.dataSource.data = dataArray;
      console.log('Dados atualizados', this.dataSource);
    });
  }

  openModal() {
    this.dialog.open(ModalImagemComponent);
  }

  addEntry() {
    const formData = this.formBlindagem.value;
    console.log('formdata', formData)

    if (formData.lancas === '') {
      formData.lancas = '0';
    }
    if (formData.espadas === '') {
      formData.espadas = '0';
    }
    if (formData.arqueiros === '') {
      formData.arqueiros = '0';
    }

    // Chame o serviço para enviar os dados para o servidor
    this.apoiosService.enviarFormulario(formData).subscribe(
      (response) => {
        console.log('Formulário enviado com sucesso!', response);
        // Limpe o formulário ou execute outras ações após o envio bem-sucedido.
        this.formBlindagem.reset();
        this.showForm = false;
        this.apoiosService.formularioIncluido.emit();
        this.getAllListagem();
        this._snackBar.open('Blindagem efetivada', 'Fechar');

      },
      (error) => {
        console.error('Erro ao enviar o formulário:', error);
      }
    );
  }



  ngOnInit(): void {
    this.getAllListagem();

  }

  getSelectedVillage(): string {
    const selectedPosition = this.deductionForm.get('position')?.value ?? '';
    const selectedEntry = this.dataSource.data.find((item) => item.position === selectedPosition);
    return selectedEntry ? selectedEntry.village : '';
  }

  ngAfterViewInit() {
    this.formBlindagem.get('position')?.valueChanges.subscribe((selectedPosition) => {
      const selectedEntry = this.dataSource.data.find((entry) => entry.position === selectedPosition);
      console.log('afterinit', selectedEntry)
      if (selectedEntry) {
        this.formBlindagem.patchValue({
          village: selectedEntry.village,
        });
      }
    });
  }

  getAllListagem(){
    this.apoiosService.listarFormularios().subscribe((data: any) => {
      console.log('data',data)
      const dataArray = Object.values(data);

      dataArray.forEach((element: any) => {
        if (element.url) {
          // Decodifique a URL
          const decodedUrl = decodeURIComponent(element.url);

          // Use uma expressão regular para encontrar o valor do parâmetro "id"
          const match = decodedUrl.match(/id=([^&]+)/);

          if (match && match[1]) {
            // Extraia o valor do parâmetro "id"
            const id = match[1];

            // Construa a nova URL com as alterações desejadas
            element.url = `https://br123.tribalwars.com.br/game.php?village=4332&screen=place&target=${id}`;
          }
        }
      });

      // Defina os dados na propriedade dataSource
      this.dataSource.data = dataArray;
      console.log('dados',this.dataSource)
    });
  }



  deductionForm = new FormGroup({
    village: new FormControl({ value: '', disabled: true }),
    position: new FormControl(''),
    lancas: new FormControl(''),
    espadas: new FormControl(''),
    arqueiros: new FormControl('')
  });

  deductValues() {
    const selectedVillage = this.deductionForm.get('village')?.value ?? '';
    const entry = this.dataSource.data.find((item) => item.village === selectedVillage);

    if (entry) {
      const id = entry.id;
      const lancasValue = parseInt(this.deductionForm.get('lancas')?.value ?? '0', 10);
      const espadasValue = parseInt(this.deductionForm.get('espadas')?.value ?? '0', 10);
      const arqueirosValue = parseInt(this.deductionForm.get('arqueiros')?.value ?? '0', 10);

      if (!isNaN(lancasValue) && !isNaN(espadasValue) && !isNaN(arqueirosValue)) {
        this.apoiosService.deduzirValores(id, {
          lancas: lancasValue,
          espadas: espadasValue,
          arqueiros: arqueirosValue
        }).subscribe(
          (response) => {
            console.log('Valores deduzidos com sucesso!', response);
            this.apoiosService.formularioIncluido.emit(); // Recarregar os dados após a dedução
            this._snackBar.open('Apoio enviado com sucesso!', 'Fechar');
          },
          (error) => {
            console.error('Erro ao deduzir valores:', error);
          }
        );
      } else {
        console.error('Valores do formulário inválidos');
      }
    } else {
      console.error('Entrada não encontrada ou inválida.');
    }

    this.deductionForm.reset();
  }

  excluirRegistro(id: string): void {
    console.log('id deletar', id)
    this.apoiosService.excluirRegistro(id).subscribe(
      (response) => {
        console.log('Registro excluído com sucesso!', response);
        this.apoiosService.formularioIncluido.emit();
        // Atualize a lista de registros ou faça qualquer ação necessária após a exclusão bem-sucedida.
      },
      (error) => {
        console.error('Erro ao excluir registro:', error);
        // Trate qualquer erro que possa ocorrer durante a exclusão.
      }
    );
  }




  toggleForm() {
    this.showForm = !this.showForm;
  }
}
