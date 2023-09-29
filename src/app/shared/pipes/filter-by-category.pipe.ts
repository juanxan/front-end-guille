import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByCategory',
  standalone: true,
  pure: false
})
export class FilterByCategoryPipe implements PipeTransform {

  transform(items: any[], categoryId: string[]): any[] {
    if (!items || (categoryId[0] === '' || categoryId[0] === undefined)) {
      return items;
    }
    
    return items.filter(item => item.categoria_idcategoria.idcategoria === categoryId[0]);
  }

}
