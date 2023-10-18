import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HistoricalDataComponent } from './historical-data.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

describe('HistoricalDataComponent', () => {
  let component: HistoricalDataComponent;
  let fixture: ComponentFixture<HistoricalDataComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoricalDataComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        }
      ]
    });

    fixture = TestBed.createComponent(HistoricalDataComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });
  //No data found Test
  it('should display "No data found" when data list is empty', () => {
    component.rows = [];
    fixture.detectChanges();

    const noDataElement = fixture.debugElement.query(By.css('.history-table'));
    expect(noDataElement.nativeElement.textContent).toContain('No data to display');
  });

  
  //Pagination Test
  it('should display data in multiple pages with correct navigation', () => {
   
    const rows = [
      { id: '1', image: 'image-1', timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: 'image-2', timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      
     
    ];
    
    component.rows = rows;
    fixture.detectChanges();

    const datatable = fixture.debugElement.query(By.css('ngx-datatable'));

    // Ensure that the ngx-datatable component is displayed
    expect(datatable).toBeTruthy();

    // Check the number of rows and the pagination controls
    const rowsPerPage = component.tempRows.length; // Number of rows per page
    const totalPages = Math.ceil(rows.length / rowsPerPage);

    const pageButtons = fixture.debugElement.queryAll(By.css('.datatable-pager-number'));
    
    expect(pageButtons.length).toBe(totalPages); // Check if the correct number of page buttons is displayed

    // Simulate clicking on each page button and check if the data updates
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = pageButtons[i - 1].nativeElement;
      pageButton.click();
      fixture.detectChanges();

      // Check if the data on the page matches the expected data
      const currentPageData = component.tempRows;
      const startIndex = (i - 1) * rowsPerPage;
      const endIndex = i * rowsPerPage;
      const expectedPageData = rows.slice(startIndex, endIndex);

      expect(currentPageData).toEqual(expectedPageData);
    }
  });

  //Base 64 Image Decoding Test
  it('should decode images from Base64 format', () => {
    // Define sample base64-encoded images
    const base64Image1 = 'base64-encoded-image-1';
    const base64Image2 = 'base64-encoded-image-2';

    // Set up your data with base64-encoded images
    component.rows = [
      { id: '1', image: base64Image1, timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: base64Image2, timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      // Add more data as needed
    ];

    fixture.detectChanges();

    // Get the image elements in the component
    const imageElements = fixture.debugElement.queryAll(By.css('img'));

    // Check if the images' src attributes are correctly decoded from base64
    expect(imageElements.length).toBe(2); // Assuming there are two images in the data

    // Check the src attribute of each image
    expect(imageElements[0].nativeElement.src).toContain(base64Image1);
    expect(imageElements[1].nativeElement.src).toContain(base64Image2);
  });
  //Timestamp Format Test
  it('should display timestamps in a consistent and correctly formatted way', () => {
    // Set up your data with various timestamps
    component.rows = [
      { id: '1', image: 'base64-encoded-image', timestamp: new Date('2023-01-15T12:30:00'), verdict: 'Guilty', confidence: '20.01' },
      // Add more data as needed
    ];
    fixture.detectChanges();

    const timestampElements = fixture.debugElement.queryAll(By.css('.timestamp-class')); // Adjust the selector based on your actual implementation
    timestampElements.forEach(element => {
      const timestampText = element.nativeElement.textContent;
      // Write expectations to check the format and consistency of timestamps
    });
  });
  //Search without Filters Test
  it('should search across all columns without filters', () => {
    // Set up your data
    component.rows = [
      { id: '1', image: 'image-1', timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: 'image-2', timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      // Add more data as needed
    ];
    fixture.detectChanges();

    const searchInput = fixture.debugElement.query(By.css('#search'));
    searchInput.nativeElement.value = 'Guilty'; // Search for a specific value
    searchInput.triggerEventHandler('input', { target: searchInput.nativeElement });
    fixture.detectChanges();

    const rowsDisplayed = fixture.debugElement.queryAll(By.css('.row-class')); // Adjust the selector based on your actual implementation
    expect(rowsDisplayed.length).toBe(1); // Only one row should match the search query
    // Write expectations to check if the correct row is displayed
  });

  //Search with ID Test
  it('should only consider "ID" when searching with the "ID" filter', () => {
    // Set up your data with various IDs
    component.rows = [
      { id: '123', image: 'image-1', timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '456', image: 'image-2', timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      { id: '789', image: 'image-3', timestamp: new Date(), verdict: 'Guilty', confidence: '22.11' },
      // Add more data as needed
    ];

    // Set the selected filter option to "ID"
    component.selectedOption = 'ID';

    // Trigger the filter function
    component.filter();

    // Simulate user input in the search input element
    component.searchText = '123'; // Search for a specific ID
    component.filter();

    // Check if the filtered data matches the expected result
    const filteredData = component.tempRows;

    // Only the row with the ID '123' should match the search query
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].id).toBe('123');
  });

  //Search with Timestamp Test
  it('should only consider "Timestamp" when searching with the "Timestamp" filter', () => {
    // Set up your data with various timestamps
    component.rows = [
      { id: '1', image: 'image-1', timestamp: new Date('2023-01-15T12:30:00'), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: 'image-2', timestamp: new Date('2023-01-16T14:45:00'), verdict: 'Innocent', confidence: '30.05' },
      { id: '3', image: 'image-3', timestamp: new Date('2023-01-17T10:15:00'), verdict: 'Guilty', confidence: '22.11' },
      // Add more data as needed
    ];

    // Set the selected filter option to "Timestamp"
    component.selectedOption = 'Timestamp';

    // Trigger the filter function
    component.filter();

    // Simulate user input in the search input element
    component.searchText = '2023-01-15'; // Search for a specific timestamp
    component.filter();

    // Check if the filtered data matches the expected result
    const filteredData = component.tempRows;

    // Only the row with the specified timestamp should match the search query
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].timestamp.toISOString()).toBe(new Date('2023-01-15T12:30:00').toISOString());
  });

  //Search with Verdict Test
  it('should only consider "Verdict" when searching with the "Verdict" filter', () => {
    // Set up your data with various verdicts
    component.rows = [
      { id: '1', image: 'image-1', timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: 'image-2', timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      { id: '3', image: 'image-3', timestamp: new Date(), verdict: 'Guilty', confidence: '22.11' },
      // Add more data as needed
    ];

    // Set the selected filter option to "Verdict"
    component.selectedOption = 'Verdict';

    // Trigger the filter function
    component.filter();

    // Simulate user input in the search input element
    component.searchText = 'Guilty'; // Search for a specific verdict
    component.filter();

    // Check if the filtered data matches the expected result
    const filteredData = component.tempRows;

    // Only the rows with the specified verdict should match the search query
    expect(filteredData.length).toBe(2); // Assuming two rows have the "Guilty" verdict
    expect(filteredData[0].verdict).toBe('Guilty');
    expect(filteredData[1].verdict).toBe('Guilty');
  });

  //Search with Confidence Test
  it('should only consider "Confidence" when searching with the "Confidence" filter', () => {
    // Set up your data with various confidence values
    component.rows = [
      { id: '1', image: 'image-1', timestamp: new Date(), verdict: 'Guilty', confidence: '20.01' },
      { id: '2', image: 'image-2', timestamp: new Date(), verdict: 'Innocent', confidence: '30.05' },
      { id: '3', image: 'image-3', timestamp: new Date(), verdict: 'Guilty', confidence: '22.11' },
      // Add more data as needed
    ];

    // Set the selected filter option to "Confidence"
    component.selectedOption = 'Confidence';

    // Trigger the filter function
    component.filter();

    // Simulate user input in the search input element
    component.searchText = '20.01'; // Search for a specific confidence value
    component.filter();

    // Check if the filtered data matches the expected result
    const filteredData = component.tempRows;

    // Only the row with the specified confidence value should match the search query
    expect(filteredData.length).toBe(1);
    expect(filteredData[0].confidence).toBe('20.01');
  });

  
  //Go Back Button Test
  it('should navigate to "current-target" when the "Go back" button is clicked', () => {
    // Find the "Go back" button and trigger a click event
    fixture.detectChanges();
    const goBackButton = fixture.debugElement.nativeElement.querySelector('#back');
    goBackButton.click();
    tick();

    // Expect the navigate function to have been called with the correct parameter
    expect(router.navigate).toHaveBeenCalledWith(['../current-target']);
  });
});

