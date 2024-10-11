import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-hotel-app',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule, FloatLabelModule, InputTextareaModule],
  templateUrl: './hotel-app.component.html',
  styleUrl: './hotel-app.component.css'
})
export class HotelAppComponent {
  HotelForm: FormGroup;
  formOutput: any;

  constructor(private fb: FormBuilder) {
    this.HotelForm = this.fb.group({
      HotelName: ['Serena Hotel Islamabad'],
      description: ['Serena Hotel is situated in the capital city of pakistan'],
      hotelImages: this.fb.array([]),
      categories: this.fb.array([this.newCategories()])
    });
    this.addItems(0);
  }

  get hotelImages(): FormArray {
    return this.HotelForm.get('hotelImages') as FormArray;
  }

  get categories() {
    return this.HotelForm.get('categories') as FormArray;
  }

  getCatImage(index: number): FormControl {
    return this.categories.at(index).get('catImage') as FormControl;
  }

  newCategories(): FormGroup {
    return this.fb.group({
      catName: ['Fast Food'],
      catDescription: ['This category is for fast food alot of items are in this category'],
      catImage: this.fb.control(''),
      items: this.fb.array([])
    });
  }
  addCategory() {
    this.categories.push(this.newCategories());
    this.addItems(this.categories.length - 1);
  }

  removeCategory(index: number) {
    this.categories.removeAt(index);
  }

  getItems(index: number): FormArray {
    return this.categories.at(index).get('items') as FormArray;
  }

  addItems(index: number) {
    this.getItems(index).push(this.fb.group({
      itemName: ['Burger'],
      itemPrice: ['500']
    }));

  }

  removeItem(categoriesIndex: number, itemsIndex: number) {
    this.getItems(categoriesIndex).removeAt(itemsIndex);
  }

  hotelImageS(event: any) {
    const files = event.target.files;
    if (this.hotelImages.length >= 4) {
      alert("You can only upload a maximum of 4 images.");
      return;
    }
    for (let file of files) {
      if (this.hotelImages.length < 4) {
        for (let file of files) {
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.hotelImages.push(this.fb.control(e.target.result));
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
  categoryImage(event: any, categoryIndex: number) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.getCatImage(categoryIndex).setValue(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.formOutput = this.HotelForm.value;
    this.HotelForm.reset();
    this.hotelImages.clear();
  }
}