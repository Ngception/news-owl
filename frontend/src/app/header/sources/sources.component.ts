import { LocalStorageService } from './../../shared/local-storage.service';
import { SourcesService } from './sources.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.scss'],
  providers: [SourcesService]
})
export class SourcesComponent implements OnInit {
  sourceList;

  constructor(private sources: SourcesService, private localStorage: LocalStorageService, private router: Router) { }

  ngOnInit() {
    const localData = JSON.parse(this.localStorage.fetchData('sources'));
    if (localData){
      this.sourceList = localData;
    } else {
      this.sources.fetchAllSources()
      .subscribe(res => {
        this.localStorage.addData('sources', JSON.stringify(res.data));
        this.sourceList = res.data;
      })
    }
  }

  onClick(event) {
    const source = event.target.textContent.replace(/\s/g, '-').toLowerCase();
    this.router.navigate(['/articles'], { queryParams: { sources: source }});
  }
}
