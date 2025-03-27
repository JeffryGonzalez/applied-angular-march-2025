import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Book } from '../type';

@Component({
  selector: 'app-book-table-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <tr>
      <th>{{ book().id }}</th>
      <td>{{ book().author }}</td>
      <td>{{ book().title }}</td>
      <td>{{ book().year }}</td>
    </tr>
  `,
  styles: ``,
})
export class BookTableRowComponent {
  book = input.required<Book>();
}
