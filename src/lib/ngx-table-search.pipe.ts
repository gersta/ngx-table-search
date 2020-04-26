import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxtablesearch'
})
export class NgxTableSearchPipe implements PipeTransform {

  excludedColumns: string[];

  /**
   * takes an array of objects and a searchTerm and filters the array by checking
   * whether the search term is included in any of the properties
   */
  transform(items: any[], searchValue: string, ...excludedColumns: string[]): any[] {
    // make sure that exclusions and filtering are case insensitive
    this.excludedColumns = excludedColumns.map( (column: string) => column.toLowerCase());

    if (searchValue && searchValue.length > 0) {
      // return all that have property including the search string
      return items.filter(item => this.getPropertyString(item).includes(searchValue.toLowerCase()));
    } else {
      return items;
    }
  }

  /**
   * concat all the properties of the item into one giant string
   * which is then used by the pipe to compare with the search string
   * @param item: single entry of the items array passed to the pipe
   */
  private getPropertyString(item: any) {
    // if the item is actually an object, loop through its properties
    if (typeof item === 'object') {
      let propertyString = '';
      const keys = this.getRelevantProperties(item);
      for (const key of keys) {
        // check for null values
        if (item[key]) {
          // recursiveley check for nested object structures
          if (typeof item[key] === 'object') {
            propertyString = propertyString + this.getPropertyString(item[key]);
          } else {
            // append the lower string value of the key
            const value = item[key].toString().toLowerCase();
            propertyString = propertyString + value;
          }
        }
      }
      return propertyString;
    } else { // if the item is a primitive data type, just return it as a string
      // this can be the case if a table of numbers (for example) is being filtered
      return item.toString();
    }
  }
  private getRelevantProperties(item: any): string[] {
    const keys: string[] = Object.keys(item);
    return keys.filter(
      (column: string) => {
        // make sure that exclusions and filtering are case insensitive
        return this.excludedColumns.indexOf(column.toLowerCase()) === -1;
      }
    );
  }
}


