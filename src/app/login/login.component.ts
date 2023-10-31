import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup; // Definir uma instância do FormGroup

  constructor(private formBuilder: FormBuilder, private authService: AuthserviceService, private router: Router) {
    // Inicializar o formulário no construtor
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required], // Campo de nome de usuário com validação obrigatória
      password: ['', Validators.required]  // Campo de senha com validação obrigatória
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // O formulário é válido, você pode acessar os valores assim:
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(username, password).subscribe(
        (result) => {
          if (result) {
            // Login bem-sucedido, redirecione para a página principal ou outra página
            this.router.navigate(['/']); // Substitua 'home' pelo caminho da sua página principal
          } else {
            // Exibir mensagem de erro de login
          }
        }
      );
      // Aqui, você pode fazer o que quiser com os valores, como enviar uma solicitação de login.
      console.log('Nome de Usuário:', username);
      console.log('Senha:', password);
    } else {
      // O formulário é inválido, faça alguma coisa, como exibir uma mensagem de erro.
      console.log('Formulário inválido');
    }
  }

}
