import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CountryDetailPage } from "./country-detail-page";

describe('DetailComponent', () => {
  let component: CountryDetailPage;
  let fixture: ComponentFixture<CountryDetailPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDetailPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
