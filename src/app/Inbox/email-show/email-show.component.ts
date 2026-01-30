import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { EmailService } from '../email.service';
import { Email } from '../email';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-email-show',
  imports: [NgIf],
  templateUrl: './email-show.component.html',
  styleUrl: './email-show.component.css'
})
export class EmailShowComponent {
  email!: Email;

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ){
    // Add this line just optional to make sure that we get email into our rendered html
    //this.email = route.snapshot.data?.['email'];
    this.route.data.subscribe(({email}) => {
      this.email = email;
    });
  }

  ngOnInit(){
    //Using Snpashot, but it will give id for first time as email show component is not being recreated it is being reused instead
    //console.log(this.route.snapshot.params?.['id'])

    // Wayout using observable
    // But by nesting subscrie inside subscribe can lag in case user quickly click on dif emails it may give old id
    // this.route.params.subscribe(({id}) => {
    //   this.emailService.getEmail(id).subscribe(email => {
    //     console.log(email);
    //   })
    // })

    // this.route.params.pipe(
    //   switchMap(({id}) => {
    //     return this.emailService.getEmail(id);
    //   })
    // ).subscribe((email) => {
    //   this.email = email;
    // });


    // Another wayout to get id
    // this.route.url.pipe( 
    //   map((value) => value[0].path)
    // ).subscribe((snapshot) => {
    //   console.log(snapshot);
    // })
  }

}
