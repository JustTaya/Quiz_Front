import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {ProfileService} from '../../service/profileService/profile.service';
import {Router} from '@angular/router';
import {ShareIdService} from '../../service/profileService/share-id.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../../service/registrationService/registration.service';

import {Gender} from '../../models/gender.enum';
import {NotificationStatus} from '../../models/notification-status.enum';
import {User} from "../../models/user";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Subject} from "rxjs";
import {Role} from "../../models/role.enum";

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  model: User = {
    id: null,
    email: '',
    password: '',
    name: '',
    surname: '',
    gender: Gender[Symbol.hasInstance],
    birthdate: new Date(),
    city: '',
    about: '',
    image: '',
    role: Role[Symbol.hasInstance],
    notificationStatus: NotificationStatus[Symbol.hasInstance],
    countryId: null,
    rating: null
  };
  adminUsers: User[];
  displayedColumns: string[] = ['name', 'email', 'role', 'active', 'actions'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public isCollapsed = true;
  registerForm: FormGroup;
  submitted = false;
  currentUserId: string;
  isAdmin = false;
  isSuperAdmin = false;
  roleUs: Role;
  selectedRole = 'AllRole';
  selectedStatus = 'AllStatus';

  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  currentUserRole = 'AllRole';
  currentUserStatus = 'AllStatus';
  public userRequest: string;
  userQuestionUpdate = new Subject<string>();

  constructor(private profileService: ProfileService,
              private router: Router,
              private shareId: ShareIdService,
              public regService: RegistrationService,
              private formBuilder: FormBuilder) {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
    this.roleUs = JSON.parse(localStorage.getItem('currentUser')).role;
  }

  ngOnInit(): void {
    this.adminCheck();
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['MODERATOR']
    });
    this.setPaginationParamDefault();
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        this.setPaginationParamDefault();
        userSearch.length ==0 ? this.getAllAdminUsers() : this.filterRequest(userSearch);
      });
    this.searchByRoleStatus(this.currentUserRole, this.currentUserStatus);
  }
  onPageChanged(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    if (this.currentUserRole != undefined && this.currentUserStatus != undefined) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.searchByRoleStatus(this.currentUserRole, this.currentUserStatus);
    } else if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.filterRequest(this.userRequest);
    } else {
      this.getAllAdminUsers();
    }
  }

  searchByRoleStatus(userRole: string, userStatus: string) {
    this.profileService.getUsersByRoleStatus(userRole, userStatus, this.pageSize, this.pageIndex).subscribe(
      resp => {
        this.adminUsers = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }


  filterRequest(filterText: string) {
    this.profileService.getFilteredUsers(filterText, this.pageSize, this.pageIndex).subscribe(
      resp => {
        this.adminUsers = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }

  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 10;
  }
  setCurrentRole(role: string) {
    this.currentUserRole = role;
  }
  setCurrentStatus(status: string) {
    this.currentUserStatus = status;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const input: User = JSON.parse(JSON.stringify(this.registerForm.value));
    this.model.email = input.email;
    if (this.roleUs === Role.ADMIN){
      this.model.role = Role.MODERATOR;
    }
    else {
      this.model.role = input.role;
    }
    this.addNewUser();
  }
  addNewUser(): void{
    this.profileService.postRegisterInfo(this.model).subscribe(
      res => {
        alert('Activation code was sent');
      },
      error => {
        alert(error.error.message);
      }
    );
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'adminUsers'}}]);
    });
  }
  adminCheck(){
    if (this.roleUs.toString() === Role[Role.SUPER_ADMIN]){
      this.isSuperAdmin = true;
    }
    if (this.roleUs.toString() === Role[Role.ADMIN]){
      this.isAdmin = true;
    }
  }
  getAllAdminUsers() {
    this.profileService.getAdminUsers(this.pageSize, this.pageIndex).subscribe(
      resp => {
        this.currentUserRole = undefined;
        this.adminUsers = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }

  checkOut(id: string, email: string) {
    this.shareId.setEmail(email);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profile', id, {outlets: {profilenav: 'profinfo'}}]);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  deleteAdminUser(id) {
    this.profileService.deleteAdminUsers(id).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'adminUsers'}}]);
        });
      },
      error => {
        alert('Something wrong while deleting user');
      }
    );
  }
  updateActiveStatusUser(id) {
    this.profileService.updateActiveStatusUser(id).subscribe(
      (resp: any) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['profile', this.currentUserId, {outlets: {profilenav: 'adminUsers'}}]);
        });
      },
      error => {
        alert('Something wrong while change active status');
      }
    );
  }
  get f() { return this.registerForm.controls; }
}
