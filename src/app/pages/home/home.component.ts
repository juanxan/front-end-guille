import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slideIndex = 1;

  constructor(
    private readonly element: ElementRef,
    private readonly renderer: Renderer2
  ){}

  ngOnInit(): void {
    this.processCarousel();
  }
  
  processCarousel(){
    this.showSlides(this.slideIndex);
    setInterval(()=>{
      this.plusSlides(1);
  }, 4000);
  }

  showSlides(n: number) {
    let i;
    const slides = this.element.nativeElement.querySelectorAll(".mySlides");
    const dots = this.element.nativeElement.querySelectorAll(".dot");

    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }

    for (i = 0; i < slides.length; i++) {
      this.renderer.setStyle(slides[i], 'display', 'none');
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].classList.remove("active");
    }

    this.renderer.setStyle(slides[this.slideIndex - 1], 'display', 'block');
    dots[this.slideIndex - 1].classList.add("active");

    setTimeout(() => {
      this.showSlides(this.slideIndex + 1);
    }, 2000);
  }

  plusSlides(n: number) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n: number) {
    this.showSlides(this.slideIndex = n);
  }

}
