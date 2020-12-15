import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDatabase } from 'src/app/shared/interfaces/database-i';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-view-candidates',
  templateUrl: './view-candidates.component.html',
  styleUrls: ['./view-candidates.component.css']
})
export class ViewCandidatesComponent implements OnInit {
  id: string;
  candidates: User[];
  withoutCandidates: boolean = true;
  constructor(private route: ActivatedRoute, private database: IDatabase) { }

  ngOnInit(): void {
    this.candidates = [];
    this.id = this.route.snapshot.paramMap.get('id');
    this.database.getOffer(this.id).subscribe(res => {
      for (const user of res.candidates) {
        this.database.getUser(user).subscribe(res => {
          this.candidates.push(res);
          this.withoutCandidates = false;
        });
      }
    });
  }

}
