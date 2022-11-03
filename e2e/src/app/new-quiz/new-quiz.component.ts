import { mergeMap, map, defaultIfEmpty } from 'rxjs/operators';
import { TagService } from './../service/tagService/tag.service';
import { Router } from '@angular/router';
import { NewQuizService } from './../service/newQuizService/new-quiz.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from './../service/categoryService/category.service';
import { Category } from './../models/category.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quiz } from '../models/add-quiz.model';
import { StatusType } from '../models/quiz.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../models/tag.model';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.css']
})
export class NewQuizComponent implements OnInit {
  @ViewChild('chipList') chipList: ElementRef<HTMLInputElement>;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: Tag[] = [];

  quizForm: FormGroup;
  submitted: boolean = false;
  categories: Category[];

  quiz: Quiz = {
    id: 0,
    name: "",
    author: 2,
    category_id: 1,
    date: new Date().toISOString(),
    description: "",
    status: StatusType.PENDING.toString(),
    modification_time: new Date().toISOString()
  };

  constructor(
    private categoryService: CategoryService,
    private newQuizService: NewQuizService,
    private tagService: TagService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();

    this.quizForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength]],
      category: ['General'],
      description: ['', [Validators.maxLength]]
    });
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim() && !(this.tags.find(element => element.name == value.trim()))) {
      this.tags.push({ id: null, name: value.trim() });
      if (input) {
        input.value = '';
      }
    }
  }

  remove(fruit: Tag): void {
    const index = this.tags.indexOf(fruit);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(
      resp => { this.categories = resp },
      err => console.error(err),
      () => console.log('Done loading categories')
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.quizForm.invalid) {
      return;
    }

    this.getData()

    this.saveQuiz();
  }

  saveQuiz(): void {

    this.newQuizService.postQuiz(this.quiz).pipe(
      map(quiz =>
        this.quiz.id = quiz.id),
      mergeMap(
        () => {
          return this.saveTags();
        }
      ),
      defaultIfEmpty([])
    ).subscribe(
      () => {
        console.log('Quiz info added');
        this.router.navigateByUrl('/add_questions', {
          state: {
            id: this.quiz.id,
            name: this.quiz.name
          }
        });
      },
      err => {
        alert(err.error['message']);
      }
    );
  }

  saveTags(): Observable<any> {
    let observableBatch: Observable<any>[] = [];

    this.tags.forEach(
      (item, index) => {
        observableBatch.push(this.tagService.postTag(item).pipe(
          map(
            tag => {
              this.tags[index].id = tag.id;
              return this.tags[index];
            }
          ),
          mergeMap(
            (tag) => {
              return this.tagService.addTagToQuiz(this.quiz.id, tag.id);
            }
          )
        ));
      }
    )

    return forkJoin(observableBatch);
  }

  getData(): void {
    let input: Quiz = JSON.parse(JSON.stringify(this.quizForm.value));
    console.log(input);
    this.quiz.name = input.name;
    let category = this.quizForm.get('category').value;
    this.quiz.category_id = this.categories.find(function (el) { return el.name === category; }).id;
    this.quiz.description = input.description;
    this.quiz.status = this.quiz.status.toUpperCase();
  }
}
