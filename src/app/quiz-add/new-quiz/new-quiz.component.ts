import { CurrentUserService } from '../../service/current-user.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../service/categoryService/category.service';
import { Category } from '../../models/category.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Quiz } from '../../models/add-quiz.model';
import { StatusType } from '../../models/quiz.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Tag } from '../../models/tag.model';
import { ImageUploadComponent } from 'src/app/image-upload/image-upload.component';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.css']
})
export class NewQuizComponent implements OnInit {
  @ViewChild('chipList') chipList: ElementRef<HTMLInputElement>;
  @ViewChild(ImageUploadComponent) imageComponent: ImageUploadComponent;

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
    id: null,
    name: "",
    author: parseInt(this.currentUserService.getCurrentUser().id),
    category_id: 1,
    date: new Date().toISOString(),
    description: "",
    status: StatusType.PENDING.toString(),
    modification_time: new Date().toISOString(),
    image: null,
    questions: [],
    tags: [],
    changed: true
  };
  image: File;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private currentUserService: CurrentUserService,
    private router: Router) {
    if (this.router.getCurrentNavigation().extras.state?.quiz)
      this.quiz = this.router.getCurrentNavigation().extras.state.quiz;
    this.tags = this.quiz.tags;
  }

  ngOnInit(): void {
    this.loadCategories();

    console.log(this.quiz);

    this.quizForm = this.formBuilder.group({
      name: [this.quiz.name, [Validators.required, Validators.maxLength]],
      category: [],
      description: [this.quiz.description, [Validators.maxLength]]
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

  loadCategories(): Observable<Category[]> {
    return this.categoryService.getCategories().pipe(
      map(resp => {
        this.categories = resp;
        if (this.quiz.id != null)
          this.getCategory();
        return this.categories;
      })
    );
  }

  getCategory() {
    let category = null;
    if (this.quiz.id) {
      category = this.categories?.find(item => item.id == this.quiz.category_id);
    } else {
      category = this.categories[0];
    }
    this.quizForm.get('category').setValue(category);
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
    this.router.navigateByUrl('/add_questions', {
      state: {
        quiz: this.quiz,
        image: this.image
      }
    });

  }

  getData(): void {
    let input: Quiz = JSON.parse(JSON.stringify(this.quizForm.value));
    this.quiz.name = input.name;
    let category = this.quizForm.get('category').value;
    this.quiz.category_id = category.id;
    this.quiz.description = input.description;
    this.quiz.status = this.quiz.status.toUpperCase();
    this.image = this.imageComponent.selectedFile?.file;
    this.quiz.tags = this.tags;
    console.log(this.quiz);
  }
}
