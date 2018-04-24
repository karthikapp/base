import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reversepipe',
  pure: false
})
export class ReversepipePipe implements PipeTransform {

 transform (values) {
    if (values) {
      return values.reverse();
    }
  }

}
