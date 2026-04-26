/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum ProblemType {
  EVEN_ODD = "even_odd",
  MARKS_GRADE = "marks_grade",
  SUM_N_NUMBERS = "sum_n_numbers",
  PALINDROME_POINTER = "palindrome_pointer",
  RECTANGLE_AREA = "rectangle_area",
  EMPLOYEE_SALARY = "employee_salary",
  BANK_SYSTEM = "bank_system",
  STUDENT_RESULT = "student_result",
  COMPLEX_ADDITION = "complex_addition",
  MANAGER_INHERITANCE = "manager_inheritance",
}

export interface ProblemDefinition {
  id: ProblemType;
  label: string;
  description: string;
  fields: {
    id: string;
    label: string;
    type: "number" | "text";
    placeholder: string;
  }[];
}

export const PROBLEMS: ProblemDefinition[] = [
  {
    id: ProblemType.EVEN_ODD,
    label: "Even / Odd Check",
    description: "Take an integer input and check whether it is odd or even using an if-else statement.",
    fields: [{ id: "number", label: "Number", type: "number", placeholder: "e.g. 15" }],
  },
  {
    id: ProblemType.MARKS_GRADE,
    label: "Marks to Grade Classification",
    description: "Accept marks (0-100) and classify them into grades using a switch statement.",
    fields: [{ id: "marks", label: "Marks (0-100)", type: "number", placeholder: "e.g. 85" }],
  },
  {
    id: ProblemType.SUM_N_NUMBERS,
    label: "Sum of N Natural Numbers",
    description: "Calculate the sum of the first N natural numbers using a for loop.",
    fields: [{ id: "n", label: "Value of N", type: "number", placeholder: "e.g. 10" }],
  },
  {
    id: ProblemType.PALINDROME_POINTER,
    label: "Palindrome Check (Pointers)",
    description: "Write a function that checks if a given string is a palindrome using pointers.",
    fields: [{ id: "text", label: "Input String", type: "text", placeholder: "e.g. madam" }],
  },
  {
    id: ProblemType.RECTANGLE_AREA,
    label: "Rectangle Area Calculation",
    description: "Create a Rectangle class with length and breadth. Calculate and return the area.",
    fields: [
      { id: "length", label: "Length", type: "number", placeholder: "e.g. 10" },
      { id: "breadth", label: "Breadth", type: "number", placeholder: "e.g. 5" },
    ],
  },
  {
    id: ProblemType.EMPLOYEE_SALARY,
    label: "Employee Salary & Allowance",
    description: "Define an Employee class and add a function that adds 20% allowance to basic salary.",
    fields: [
      { id: "name", label: "Employee Name", type: "text", placeholder: "e.g. Rahul" },
      { id: "salary", label: "Basic Salary", type: "number", placeholder: "e.g. 30000" },
    ],
  },
  {
    id: ProblemType.BANK_SYSTEM,
    label: "Bank Account Management",
    description: "Define a BankAccount class with private members: accountNumber and balance.",
    fields: [
      { id: "accNo", label: "Account Number", type: "text", placeholder: "e.g. SBI1001" },
      { id: "balance", label: "Opening Balance", type: "number", placeholder: "e.g. 5000" },
    ],
  },
  {
    id: ProblemType.STUDENT_RESULT,
    label: "Student Result Processing",
    description: "Create a Student class with private members: rollNo, name, and marks.",
    fields: [
      { id: "rollNo", label: "Roll Number", type: "text", placeholder: "e.g. 22CSE01" },
      { id: "name", label: "Student Name", type: "text", placeholder: "e.g. Priya" },
      { id: "marks", label: "Current Marks", type: "number", placeholder: "e.g. 92" },
    ],
  },
  {
    id: ProblemType.COMPLEX_ADDITION,
    label: "Complex Number Addition",
    description: "Perform addition of two complex numbers using operator overloading (+).",
    fields: [
      { id: "r1", label: "Real Part 1", type: "number", placeholder: "e.g. 4" },
      { id: "i1", label: "Imaginary Part 1", type: "number", placeholder: "e.g. 2" },
      { id: "r2", label: "Real Part 2", type: "number", placeholder: "e.g. 3" },
      { id: "i2", label: "Imaginary Part 2", type: "number", placeholder: "e.g. 5" },
    ],
  },
  {
    id: ProblemType.MANAGER_INHERITANCE,
    label: "Manager-Employee Hierarchy",
    description: "Inheritance: Create a base class Emp and derive a class Manager with dept details.",
    fields: [
      { id: "name", label: "Manager Name", type: "text", placeholder: "e.g. Vikram" },
      { id: "dept", label: "Department", type: "text", placeholder: "e.g. IT Operations" },
    ],
  },
];
