import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `<div #mapContainer style="height: 400px; width: 100%"></div>`,
})
export class MapComponent implements OnInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  ngOnInit() {
    this.loadGoogleMap();
  }

  loadGoogleMap() {
    const center = { lat: 43.238949, lng: 76.889709 };

    const map = new google.maps.Map(this.mapContainer.nativeElement, {
      center,
      zoom: 12,
    });

    new google.maps.Marker({
      position: center,
      map,
    });
  }
}
