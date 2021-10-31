# ngx-http

Solution 1
```Typescript
this.ngxHttpClient
  .get<{ id: string }[]>('http://localhost:3000/test', {
    params: (new HttpParams()).set('test', 34)
  })
  .subscribe(({ data, loading, err }) => {
    if(loading) {
        console.log('Is loading');
    } else if(err) {
        console.log('Some error');
    } else {
        console.log('Done', data)
    }
});
```

Solution 2
```typescript
const userStream = this.ngxHttp.post<{ id: string }[]>(
    'http://localhost:3000/test',
    {
      params: (new HttpParams()).set('test2', 34)
    }
  );

// Subscribe inde of component
userStream.data$.subscribe((res) => {
  const { data, loading, err } = res;

  if (loading) {
    console.log('Is loading', loading)
  } else if(err) {
    console.log('Error', err)
  } else if(!loading) {
    console.log('Done', data)
  }
});

// userStream.fetch();
userStream.fetch({
  params: (new HttpParams()).set('test2', 35)
});

```
