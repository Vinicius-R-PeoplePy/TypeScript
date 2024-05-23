// SOLID->

// Single Responsability Principle - SRP 
// Open-closed principle - OCP 
// Liskov substitution principle -LSP 
// Interface Segregation Principle - ISP 
// Dependency Inversion Principle - DIP 

// ***


// Single Responsability Principle - SRP 

// This way is problematic ->

class TaskManager { 
    constructor() {} 
    connectAPI(): void {} 
    createTask(): void {
        console.log("Create Task");
    }
    updateTask(): void {
        console.log("Update Task");
    }
    removeTask(): void {
        console.log("Remove Task");
    }
    sendNotification(): void {
        console.log("Send Notification");
    }
    sendReport(): void { 
        console.log("Send Report")
    }
}

// This way is good (Each class have one, and only one, reason to change)

class APIConnector { 
    constructor() {} 
    connectAPI(): void {} 
}

class Report { 
    constructor() {}
    sendReport(): void { 
        console.log("Send Report");
    }
}
class Notificator { 
    constructor() {} 
    sendNotification(): void { 
        console.log("Send notification");
    }
}

class TaskManager {
    constructor() {} 
    createTask(): void { 
        console.log("Create Task");
    }
    updateTask(): void {
        console.log("Update Task");
    }
    removeTask(): void {
        console.log("Remove Task");
    }
}

/// Open Closed Principle - OCP 

/// If you notice that you have a lot of conditions in some method
// to verify something, perhaps you are in case of OCP.

type ExamType = { 
    type: "BLOOD" | "XRay";
};

class ExamApprove { 
    constructor() {}
    approveRequestExam(exam: ExamType): void {
        if (exam.type === "BLOOD") {
            if (this.verifyConditionsBlood(exam)) {
                console.log("Blood Exam Approved");
            }
        }   else if (exam.type === "XRay") {
            if (this.verifyConditionsXRay(exam)) {
                console.log("XRay Exam Approved!");
            }
        }
    }

    verifyConditionBlood(exam: ExamType): boolean {
        return true;
    }
    verifyConditionsBlood(exam: ExamType): boolean {
        return false;
    }
} 

// let's refact the code // for some reason, some parts of it are wrong yet...

type ExamType = {
    type: "BLOOD" | "XRay";
  };
  
  interface ExamApprove {
    approveRequestExam(exam: NewExamType): void;
    verifyConditionExam(exam: NewExamType): boolean;
  }
  
  class BloodExamApprove implements ExamApprove {
    approveRequestExam(exam: ExamApprove): void {
      if (this.verifyConditionExam(exam)) {
        console.log("Blood Exam Approved");
      }
    }
    verifyConditionExam(exam: ExamApprove): boolean {
      return true;
    }
  }
  
  class RayXExamApprove implements ExamApprove {
    approveRequestExam(exam: ExamApprove): void {
      if (this.verifyConditionExam(exam)) {
        console.log("RayX Exam Approved");
      }
    }
    verifyConditionExam(exam: NewExamType): boolean {
      return true;
    }
  }
  

// Liskov Substitution Principle - LSP 

class Student { 
    constructor(public name: string) {}

    study(): void {
        console.log(`${this.name} is studying`);
    }

    deliverTCC() {
        /** Problem: Post graduate Students don't delivery TCC */
    }
}

class PostgraduateStudent extends Student { 
    study(): void { 
        console.log(`${this.name} is studying and searching`);
    }
}

// Let's create a class Student and separate the Student 
// of graduation and Post Graduation 
// Definition: Derived classes (or child classes) must be able
// to replace their base classes (or parent classes)

class Student { 
    constructor(public name: string) {}

    study(): void {
        console.log(`${this.name} is studying`);
    }
}

class StudentGraduation extends Student { 
    study(): void {
        console.log(`${this.name} is studying`);
    }

    deliverTCC() {}
}

class StudentPostGraduation extends Student { 
    study(): void { 
        console.log(`${this.name} is studying and searching`);
    }
}

// Interface Segregation Principle - ISP 

// To undestand this principle, the trick is remember of the definiton. 
// A class should not be forced to implement methods that will not be used.
// So imagine that you have a class that implement a interface 
// that its never being used. 
// Let's imagine a scenario with a Seller and a Receptionist of some shop. 
// Both seller and receptionist have a salary, but only a seller have a commission. 

interface Employee { 
    salary(): number; 
    generatecommission(): void;
}

class Seller implements Employee { 
    salary(): number  {
        return 1000;
    }
    generateCommission(): void {
        console.log("Generating Commision");
    }
}

class Receptionist implements Employee { 
    salary(): number { 
        return 1000;
    }
    generateCommission(): void { 
        /** Problem: Receptionist don't have commision */
    }
}

// Both implements the Employee interface, but the receptionist
// don't have comission. So we are forced to implement a method
// that never it will be used. 

// So the solution: 

interface Employee { 
    salary(): number; 
}

interface Commisionable {
    generateComission(): void;
}

class Seller implements Employee, Commissionable { 
    salary(): number {
        return 1000;
    }
    
    generateCommission(): void { 
        console.log("Generating Comission");
    }
}

class Receptionist implements Employee {
    salary(): number { 
        return 1000;
    }
}

// Now we have two interfaces! The employer class and the comissionable
// interface. Now only the Seller will implement the two interfaces
// where it will have the commission. The receptionist don't only
// implements the employee. So the Receptionist don't be forced
// to implement the method that will never be used. 

// Dependency Inversion Principle - DIP 

// Imagine that you have a Service class that integrates with a 
// Repository class that will call the Database, for example Postgres.
// But if the repository class change and the database change
// for a MongoDB, for example. 

interface Order { 
    id: number; 
    name: string;
}

class OrderRepository {
    constructor() {} 
    saveOrder(order: Order) {} 
}

class OrderService { 
    private orderRepository: OrderRepository;

    constructor() { 
        this.orderRepository = new OrderRepository();
    }

    processOrder(order: Order) {
        this.orderRepository.saveOrder(order);
    }
}

// We notice that the repository OrderService class is 
// directly coupled to the concrete implementation of OrderRepository class.
// Let's refact. 

interface Order { 
    id: number; 
    name: string; 
}

class OrderRepository {
    constructor() {} 
    saveOrder(order: Order) {}
}

class OrderService {
    private orderRepository: OrderRepository;

    constructor(repository: OrderRepository) {
        this.orderRepository = repository;
    }

    processOrder(order: Order) {
        this.orderRepository.saveOrder(order);
    }
}

// Now we receive the repository as parameter on the constructor
// to instantiate and use. Now we depend of the abstraction and
// we don't need to know what repository we are using.

// Definition: depend on abstractions rather than concrete implementations.
