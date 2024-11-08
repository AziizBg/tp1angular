import { DecimalPipe } from '@angular/common';
import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ttc',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './ttc.component.html',
  styleUrl: './ttc.component.css',
})
export class TtcComponent {
  // ht: number =0; //hors tax
  // quantity:number = 1;
  // tva:number = 18;
  // discount: number = 0;
  // ttc: number = 0;
  // ttc_u:number = 0;

  // calculate(){
  //   this.ttc_u = this.ht * ( 1+ this.tva/100)  ;
  //   const discount = (this.quantity<=15 && 10<this.quantity)?0.2 : (15 <this.quantity? 0.3 : 0);
  //   this.ttc =  this.ttc_u*this.quantity*(1-discount);
  //   this.discount = discount *  this.ttc_u*this.quantity;
  // }

  // 2nd method
  ht_s: WritableSignal<number> = signal(0);
  tva_s: WritableSignal<number> = signal(18);
  q_s: WritableSignal<number> = signal(1);

  set_ht(val: number) {
    this.ht_s.set(val);
  }
  set_tva(val: number) {
    this.tva_s.set(val);
  }
  set_q(val: number) {
    this.q_s.set(val);
  }

  ttc_us = computed(() => this.ht_s() * (1 + this.tva_s() / 100));

  d_s = computed(() => {
    const discount =
      this.q_s() <= 15 && 10 < this.q_s() ? 0.2 : 15 < this.q_s() ? 0.3 : 0;
    return discount * this.ttc_us() * this.q_s();
  });

  ttc_s = computed(() => this.ttc_us() * this.q_s() - this.d_s());
}
