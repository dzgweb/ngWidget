import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import { Item } from '../item';
import { SelectItemService } from '../select-item.service';

@Component({
  selector: 'app-selection',
  templateUrl: './selection.component.html',
  styleUrls: ['./selection.component.scss']
})
export class SelectionComponent implements OnInit {

  items: Item[];

  currentSelectItems: Item[] = [];

  constructor(private selectItemService: SelectItemService) { }

  ngOnInit() {
    this.getItems();
    this.currentSelectItems = this.items.filter(h => h.selected === true);
  }

  getItems(): void {
    this.selectItemService.getItems()
      .subscribe(items => this.items = items);
  }

  delete(item) {
    this.currentSelectItems = this.currentSelectItems.filter(h => h !== item);

   this.items[item.id].selected = false;


    console.log(this.items);

    this.selectItemService.delete(item);
  }

  @Output() onClose = new EventEmitter<boolean>();
  dialogClose() {
    this.onClose.emit(false);
  }

  onCheck(e) {
    // console.log(`${e.target.checked}`);
    if (e.target.checked) {
      this.currentSelectItems.push({ id: e.target.value, title: 'Item', selected: true });
    } else {
        const ind = this.currentSelectItems.findIndex(value => value.id === e.target.value);
        this.currentSelectItems.splice(ind, 1);
    }

  // this.selectItemService.selectedItems.push({ id: e.target.value, title: 'Item' });
  }

  // saveSelectItem() {
  //   this.selectItemService.selectedItems.length = 0;
  //
  //   this.currentSelectItems.map((item) => {
  //     this.selectItemService.selectedItems.push(item);
  //   });
  //  //  this.selectItemService.selectedItems = Array.from(this.currentSelectItems);
  //  //  this.selectItemService.selectedItems = this.currentSelectItems.slice();
  // }

  cancel() {
    this.onClose.emit(false);
  }

  getSelectedItem() {
    const selected = this.items.filter(c => c.selected);
    console.log(selected);

    this.onClose.emit(false);
  }
}


