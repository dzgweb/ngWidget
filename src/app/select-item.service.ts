import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Item } from './item';
import { ITEMS } from './mock-items';

@Injectable({
  providedIn: 'root'
})
export class SelectItemService {

  selectedItems: Item[] = [
    {id: 2, title: 'Item', selected: true },
    {id: 3, title: 'Item', selected: true},
  ];

  constructor() { }

  getItems(): Observable<Item[]> {
    return of(ITEMS);
  }

  delete(item: Item): void {
    console.log(`${item.id} was deleted`);
  }

  getSelectedItems(): Observable<Item[]> {
    return of(this.selectedItems);
  }
}
