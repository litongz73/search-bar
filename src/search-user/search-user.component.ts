import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';
import { debounceTime, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.css'],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    NgFor,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
})
export class SearchUserComponent implements OnInit, OnDestroy {
  inputForm = new FormControl('');

  resultlist: User[] = [];
  renderList: User[] = [];
  constructor(private userService: UserService) {}
  subscription: any;

  ngOnInit() {
    this.subscription = this.userService
      .getUsers()
      .subscribe((result: User[]) => {
        this.resultlist = result;
        console.log(this.resultlist);
      });

    this.inputForm.valueChanges
      .pipe(
        debounceTime(500),
        switchMap((value: any) => {
          this.renderList = this.resultlist.filter((each) => {
            return each.name
              .toLocaleLowerCase()
              .includes(value.toLocaleLowerCase());
          });
          console.log(this.renderList);
          return value;
        })
      )
      .subscribe();
  }

  clickName(inputUser: User) {
    this.inputForm.setValue(inputUser.name);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
