import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-olp-login',
  templateUrl: './olp-login.component.html',
  styleUrl: './olp-login.component.css',
  standalone: false
})
export class OlpLoginComponent implements OnInit {
  olpLoginForm: FormGroup | undefined;
  userName: string | undefined;
  isHovered: boolean = false;
  loading: boolean = true;
  currentSlide = 0;
  slideshowImages: string[] = [
    'https://images.unsplash.com/photo-1527525443983-6e60c75fff46?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRlYW18ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHRlYW18ZW58MHx8MHx8fDA%3D',
    'https://images.unsplash.com/photo-1552581234-26160f608093?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fHRlYW18ZW58MHx8MHx8fDA%3D'
  ];

  @ViewChild('bgMusic') bgMusicRef!: ElementRef<HTMLAudioElement>;

  constructor(private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initFormValidation();
    setTimeout(() => {
      this.loading = false;
      this.bgMusicRef?.nativeElement?.play();
       this.startSlideshow();
    }, 2000);
    this.startSlideshow();
  }

  initFormValidation() {
    this.olpLoginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin(): void {
    if (this.olpLoginForm?.valid) {
      const formValue = this.olpLoginForm.value;
      console.log('Login submitted', formValue);
      this.router.navigateByUrl('/dashboard');
    }
  }

  startSlideshow(): void {
    setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slideshowImages.length;
    }, 5000);
  }
}
