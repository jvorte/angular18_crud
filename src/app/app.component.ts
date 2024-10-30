import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/Employee';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {


 employeeForm: FormGroup = new FormGroup({});
 employeeObj: EmployeeModel = new EmployeeModel();
 employeeList: EmployeeModel[] =[];

 constructor(){
  this.createForm();

  const oldData = localStorage.getItem("EmpData");
  if (oldData != null) {
    const parseData =JSON.parse(oldData);
    this.employeeList = parseData;
  }
 }

 createForm(){
  this.employeeForm = new FormGroup({

    empId: new FormControl(this.employeeObj.empId),
    name: new FormControl(this.employeeObj.name,[Validators.required]),
    city: new FormControl(this.employeeObj.city),
    state: new FormControl(this.employeeObj.state),
    emailId: new FormControl(this.employeeObj.emailId,[Validators.required,Validators.minLength(3)]),
    contactNum: new FormControl(this.employeeObj.contactNum),
    address: new FormControl(this.employeeObj.address),

    
  })
 }
 onSave(){

  const oldData = localStorage.getItem("EmpData");
  if (oldData != null) {
    const parseData =JSON.parse(oldData);
    this.employeeForm.controls['empId'].setValue(parseData.length +1);
    this.employeeList.unshift(this.employeeForm.value);
  } else{
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList))
  }
 }

 onEdit(item: EmployeeModel){
  this.employeeObj = item;
  this.createForm();
  
 }
 onUpdate(){
  const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
  if (record !=undefined) {
    record.address = this.employeeForm.controls['address'].value;
    record.address = this.employeeForm.controls['name'].value;
    record.address = this.employeeForm.controls['contactNum'].value;
  }
  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
  this.employeeObj = new EmployeeModel();
  this.createForm();
 }


 onDelete(id: number){
const isDelete = confirm("are you sure");
if (isDelete) {
  const index = this.employeeList.findIndex(m=>m.empId== id);
  this.employeeList.splice(index,1);
  localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
}
 }

}
