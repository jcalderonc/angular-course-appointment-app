import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  // It is like a virtual DOM for the component
  // It allows us to test the component without rendering it in the browser
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;
  // Spy because we want to mock the UserService's getUsers method
  // This allows us to control the behavior of the method during tests
  // We can simulate different scenarios without relying on the actual implementation
  let userServiceSpy: jasmine.Spy;
  beforeEach(async () => {
    // This sets up the testing module for the UserListComponent
    await TestBed.configureTestingModule({
      // Imports the UserListComponent and its dependencies
      declarations: [UserListComponent],
      // Provides the UserService which is required by the UserListComponent
      providers: [UserService]
        
    })
    // This compiles the component and its template
    .compileComponents();

    // This creates an instance of the UserListComponent
    fixture = TestBed.createComponent(UserListComponent);
    // This retrieves the component instance from the fixture
    // It allows us to access the component's properties and methods in the tests
    component = fixture.componentInstance;
    
    // This retrieves the UserService instance from the TestBed
    userService = TestBed.inject(UserService);
    // This creates a spy on the getUsers method of the UserService
    // It allows us to mock the method's behavior and return a predefined value
    // SIMULATES the behavior of the getUsers method
    userServiceSpy = spyOn(userService, 'getUsers').and.returnValue(of([
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Alice Johnson' }
    ]));

  });

  it('should create', () => {
    // This test checks if the component is created successfully
    // It is a basic test to ensure that the component is set up correctly
    // If the component is not created, the test will fail
    // This is a good practice to have a basic test for each component
    // It ensures that the component is properly initialized and ready for further testing
    expect(component).toBeTruthy();
  });

  it('should retrieve users from userService on init', () => {

    //Call on init method or fixture.detectChanges();
    // This triggers the ngOnInit lifecycle method of the component
    // It simulates the component being initialized in the application
    // This is where the component typically fetches data from services
    component.ngOnInit();
    
    // This checks if the getUsers method of the UserService was called
    expect(userServiceSpy).toHaveBeenCalled();

  });

  it('should retrieve users from userService when load-more-btn button is clicked', () => {
    // to force onInit to be called
    fixture.detectChanges();
    
    // This resets the spy to ensure it doesn't interfere with the next test
    userServiceSpy.calls.reset();

    // This loads the control of the component try with "dummy-btn" to cause fail
    const button = fixture.nativeElement.querySelector('.load-more-btn');
    
    // This simulates a click event on the load-more-btn button
    button.click();

    // Our Spy should be called again
    expect(userServiceSpy).toHaveBeenCalled();

    // This checks if the users array in the component is populated with the mocked data
    expect(component.users.length).toBe(3);

  });





});
