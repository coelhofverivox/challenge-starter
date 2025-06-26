import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;
  userId?: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = +idParam;
        this.userService.getUsers().subscribe(users => {
          //
          //
        });
      }
    });
  }

  submit() {
    const user: User = this.form.value;
    if (user.id) {
      this.userService.updateUser(user);
    } else {
      this.userService.addUser(user);
    }
    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}