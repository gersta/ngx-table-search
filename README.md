# NgxTableSearch

NgxTableSearch is a simple and lightweight library to add fulltext-search filter functionality for tables.

## Features

* Fulltext search for your tables (and collections in general)
* Exclude any columns/properties that you don't want to filter upon

## Usage

Define your template with an input field to enter the search string and the table you want to filter:

```html
<input type="text">

<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let post of posts">
      <td>{{ post.userId }}</td>
      <td>{{ post.id }}</td>
      <td>{{ post.title }}</td>
      <td>{{ post.body }}</td>
    </tr>
  </tbody>
</table>
```
Next, add the NgxTableSearch features to connect your input field with the filter:

```html
<input type="text" #search ngxTableSearch>

<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let post of posts | ngxtablesearch:search.value">
      <td>{{ post.userId }}</td>
      <td>{{ post.id }}</td>
      <td>{{ post.title }}</td>
      <td>{{ post.body }}</td>
    </tr>
  </tbody>
</table>
```
The `#search` creates a ViewChild that can be used to get the current value by `ngxtablesearch:search.value`. The ngxTableSearch directive makes any updates of
the input field available and triggers the change detection.

## Scenarios

1. Primitive data types
The filter wraps the input value in a string and then does the fulltext search.

2. Nested objects
In case your objects contain properties that itself are objects, these nested properties are unwrapped and part of the fulltext search.

## Eclude specific fields
If you want to filter an entire tables (i.e. by all its columns) expect for a few specific ones, you can specify these column names and they will be ignored when filtering.
Just add any column name as a string as the third (and any further argument, all separated by a colon) like this:

```html
<input type="text" #search ngxTableSearch>

<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let post of posts | ngxtablesearch:search.value:'title'">
      <td>{{ post.userId }}</td>
      <td>{{ post.id }}</td>
      <td>{{ post.title }}</td>
      <td>{{ post.body }}</td>
    </tr>
  </tbody>
</table>
```

An example for more than one column to exclude:

```html
<input type="text" #search ngxTableSearch>

<table>
  <thead>
    <tr>
      <th>User ID</th>
      <th>ID</th>
      <th>Title</th>
      <th>Body</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let post of posts | ngxtablesearch:search.value:'title':'body'">
      <td>{{ post.userId }}</td>
      <td>{{ post.id }}</td>
      <td>{{ post.title }}</td>
      <td>{{ post.body }}</td>
    </tr>
  </tbody>
</table>
```


Note: Make sure to use the actual property name of your items instead of the columns names you are displaying as they could be different.

## Heads-Up
The library is filtering the table by all properties of its items except for those that you specified for exclusion as opposed to those fields that you display in your table.
This actually confused me once myself ;-) 

## Source Code
Find the source code for this library on my [GitHub profile](https://github.com/gersta/ngx-table-search).

## License
MIT
