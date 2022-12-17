import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {Quiz} from '../../models/pending-quizzes.model';
import {PendingQuizzesService} from '../../service/pendingQuizzesService/pending-quizzes.service';
import {ShareIdService} from "../../service/profileService/share-id.service";
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {Subject} from "rxjs";
import {QuizCheckService} from "../../service/quizCheckService/quiz-check.service";


@Component({
  selector: 'app-not-checked-quizzes',
  templateUrl: './pending-quizzes.component.html',
  styleUrls: ['./pending-quizzes.component.css']
})
export class PendingQuizzesComponent implements OnInit {
  pendingQuizzes: Quiz[];
  displayedColumns: string[] = ['name', 'category', 'date', 'authorEmail', 'actions'];
  dataSource: MatTableDataSource<Quiz>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  currentUserId: number;
  length = 0;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [10, 20, 30, 40, 50];
  selected = 'Pending';
  currentTable: string;

  public userRequest: string;
  userQuestionUpdate = new Subject<string>();
  constructor(private quizService: PendingQuizzesService,
              private router: Router,
              private shareId: ShareIdService,
              private quizCheckService: QuizCheckService) {
    this.currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;
  }

  ngOnInit(): void {
    this.setPaginationParamDefault();
    this.setCurrentTable('Pending');
    this.userQuestionUpdate.pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(userSearch => {
        this.setPaginationParamDefault();
        userSearch.length ==0 ? this.getAllPendingQuizzes() : this.filterRequest(userSearch);
      });
    this.getAllPendingQuizzes();
  }

  onPageChanged(e) {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    if (this.currentTable != 'Pending' && this.currentTable != null) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.getAssignedQuizzes();
    } else if (this.userRequest != undefined && this.userRequest) {
      if (this.pageSize == undefined) {
        this.setPaginationParamDefault();
      }
      this.filterRequest(this.userRequest);
    } else {
      this.getAllPendingQuizzes();
    }
  }

  filterRequest(filterText: string) {
    this.quizService.getFilteredPendingQuizzes(filterText, this.pageSize, this.pageIndex).subscribe(
      resp => {
        this.pendingQuizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
      }
    );
  }
  setPaginationParamDefault() {
    this.pageIndex = 0;
    this.pageSize = 10;
  }
  getAllPendingQuizzes(){
      this.quizService.getPendingQuizzes(this.pageSize, this.pageIndex).subscribe(resp => {
        this.pendingQuizzes = resp.responceList;
        this.length = resp.totalNumberOfElement;
    });
  }

  getAssignedQuizzes(){
    this.quizService.getAssignedQuizzes(this.currentUserId, this.pageSize, this.pageIndex).subscribe(resp => {
      this.pendingQuizzes = resp.responceList;
      this.length = resp.totalNumberOfElement;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  checkOut(id: string, email: string) {
    this.shareId.setEmail(email);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['profile', id, {outlets: {profilenav: 'profinfo'}}]);
    });
  }

  checkQuiz(quiz: Quiz) {
    if (this.currentTable === 'Pending') {
      this.quizCheckService.assignQuiz(quiz.id, JSON.parse(localStorage.getItem('currentUser')).id).subscribe
      ((resp: any) => {
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['checkquiz', quiz.id, {outlets: {quiznav: 'quizinfo'}}]);
          });
          localStorage.setItem('currentQuiz', JSON.stringify(quiz));
        },
        error => {
          alert('Something wrong while assigning quiz');
        }
      );
    }
    else{
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(['checkquiz', quiz.id, {outlets: {quiznav: 'quizinfo'}}]);
      });
      localStorage.setItem('currentQuiz', JSON.stringify(quiz));
    }
  }

  setCurrentTable(type: string) {
    this.currentTable = type;
  }
}
